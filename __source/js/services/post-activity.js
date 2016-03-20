/*This service is responsible for
* upload files from client to the used api' endpoints
* post activity to specific social network using sprocket api
* get the captcha image if it will be used to post activity on specific social network
* comment on activity and reply to comment
* vote on activity and vote on comment
* engage activity
*/
App.PostActivity = App.Service.extend({
    /*configuration object contains the following properties : {
     sizeLimit: number,
     sizeUnit: string [KB/MB], //unit of sizeLimit value
     supportedTypes : array of strings [image/video/audio],
     typesCount{
        string (image/video/audio): number (max count of files of this type that can be uploaded in one time)
     },
     maxCount : number,
     uploadUrl : url,
     typesUploadUrl:{ //this is useful if we have different endpoint to upload each type of files like in facebook
        string (image/video/audio): url (url that used to upload files of that type)
     }
    }*/
    configuration : {},
    //array contains all files that will be uploaded on this session
    files : [],
    //object contains all files that will be uploaded on this session but divided according to their type
    filesCategorized : {},
    //boolean indicate if upload files to upload is in progress or not
    uploadInProgress : false,
    //last time when user make action to cancel upload process
    lastStopTime : 0,
    //function called when user want to cancel upload process
    stopUpload : function(){
        this.set('uploadInProgress',false);
        this.set('lastStopTime',new Date().getTime());
        this.reset();
    },
    //function to remove all files data in files array and filesCategorized object
    reset : function(){
        //prevent user from reset arrays because that will corrupt upload process
        if(this.get('uploadInProgress')){
            return;
        }
        this.set('files',[]);
        this.set('filesCategorized',{})
    },
    //function to remove all files data of specific type(image/video/audio)
    resetCategory : function(type){
        //prevent user from reset arrays because that will corrupt upload process
        if(this.get('uploadInProgress')){
            return;
        }
        var files = this.get('files');
        var filtered = [];
        var self = this;
        _.each(files,function(file){
            if(self.typeToString(file) != type){
                filtered.push(file);
            }
        });
        this.set('files',filtered);
        this.set('filesCategorized.'+type,[]);
    },
    /*
    get {configuration} object
        @return object
    */
    getConfiguration : function(){
        return this.get('configuration');
    },
    /*
     set configuration of this service
        @param config : object
    */
    setConfiguration : function(config){
        this.set('configuration',config ? config : {});
    },
    /*
     get all files added to this service
        @return array
     */
    getFiles : function(){
        return this.get('files');
    },
    /*
    function to check if size of {file} exceeds the limit specified in {configuration} or not
        @param file : File
        @return bool
     */
    isExceedSizeLimit : function(file){
        var config = this.get('configuration');
        if(config.sizeLimit && file.size){
            var unit = config.sizeUnit ? config.sizeUnit : 'MB';
            var divide = 1;
            if(unit == 'KB'){
                divide *= 1024;
            }else if(unit == 'MB'){
                divide *= (1024*1024);
            }
            var size = file.size / divide;
            if(size > config.sizeLimit){
                return true;
            }
        }
        return false;
    },
    /*
    function to convert type of {file} to string , ex : if the passed file is .png , this function return "image" string
        @param file : File
        @return string
    */
    typeToString : function(file){
        if(file.type.match(/image.*/)){
            return 'image';
        }else if(file.type.match(/video.*/)){
            return 'video';
        }else if(file.type.match(/audio.*/)){
            return 'audio';
        }
        return (file.type && file.type.length) ? file.type : '-';
    },
    /*
    function check if the {file} is in supported type specified on {configuration} or not
        @param file : File
        @return bool
    */
    isSupported : function(file){
        var config = this.get('configuration');
        if(_.isArray(config.supportedTypes)){
            return (config.supportedTypes.indexOf(this.typeToString(file))!=-1);
        }
        return true;
    },
    /*
    function check if the number of uploaded files in type of the {file}  exceeds count specified in {typesCount} of {configuration}
     also if this file will make {files array} exceeds the count specified on {maxCount} specified in {configuration}
         @param file : File
         @return bool
    */
    isTypeExceedCount : function(file){
        var filesCategorized = this.get('filesCategorized');
        var config = this.get('configuration');
        var type = this.typeToString(file);
        var maxCount = (config.typesCount && config.typesCount[type]) ? config.typesCount[type] : 1;
        var typeCount =(filesCategorized[type]&&filesCategorized[type].length) ? filesCategorized[type].length : 0;

        if(((typeCount + 1) > maxCount) || (config.maxCount && ((this.get('files').length + 1) > config.maxCount))){
            return true;
        }
        return false;
    },
    /*
    function is called when user select one or more file to be uploaded , this function just added those files to {files array}
        @param files : array [File] (array of files uploaded by user)
        @param callbacks : object  (object of functions to be called on the specific cases , currently we support the following cases
                        1 - start processing a file uploaded by user and in this case function 'fileLoadStart ' is called
                        2 - end processing the file  and in this case function 'fileLoadEnd ' is called
                        3 - if processing of files failed because it exceeds limit or exceed count to be uploaded or is not supported and in this case function 'fileLoadFail ' is called
                        4 - after all files uploaded by user is processed and in this case function 'filesAddCompleted ' is called
        @param ftype : string ('image'/'video'/'audio')
                        the type that should be accepted in current uploaded files , in some cases we need to filter the uploaded files to accept files from specific type
                        and ignore others although the others may be in {supported type} (specified in {configuration})
        @param resetType : string ('all'/'image'/'video'/'audio')
                        type of files that should be removed before current uploaded files are added
                        (as example we want to remove files of type image when video file is added)
    */
    addFiles : function(files,callbacks,ftype,resetType){
        //callbacks {fileLoadStart,fileLoadEnd,fileLoadFail,filesAddCompleted} //{filesAddCompleted} will fire before {fileLoadEnd} because second one wait for file reader
        if(this.get('uploadInProgress')){
            return;
        }
        var self = this;
        var type;
        var typeFiles;
        var isSupported;
        var isExceedSize;
        var isExceedCount;
        var skippedFiles=[];

        callbacks = callbacks ? callbacks : {};

        if(resetType=='all'){
            self.reset();
        }else if(resetType && resetType.length){
            self.resetCategory(resetType);
        }
        _.each(files,function(file,index){
            //file.size in bytes >> /1024 KB / 1024 MB
            isSupported = self.isSupported(file) && (!ftype || (ftype==self.typeToString(file)));//if type provide check on it
            isExceedSize = self.isExceedSizeLimit(file);
            isExceedCount = self.isTypeExceedCount(file);
            //
            if(isSupported && (!isExceedSize) && (!isExceedCount)){
                type = self.typeToString(file);
                typeFiles = self.get('filesCategorized.'+type);
                //check if no files of this type is uploaded before then create new array for this type in {filesCategorized} object
                if(!typeFiles){
                    typeFiles = [];
                    self.set('filesCategorized.'+type,typeFiles)
                }

                //file info object used in four function specified in {callback} parameter to identify the file processed now
                //index : is index of array in current uploaded files
                //fileId : is id of files in {files} array of this service
                //fileType : is type of file 'image'/'video'/'audio'
                //fileTypeId : the id of file in its type array specified using array on {fileCategorized} object in this service
                var fileInfo = {
                    index : index,//useful to track, in case we not added some files due to above if
                    fileId : self.get('files').length,
                    fileType : type,
                    fileTypeId : typeFiles.length
                };

                //keep reference on both arrays
                self.get('filesCategorized.'+type).push(file);
                self.get('files').push(file);

                //call the 'fileLoadStart' callback function using (file : File) represent the current processed file and (fileInfo : object) as specified above
                if(callbacks.fileLoadStart){
                    callbacks.fileLoadStart(file,fileInfo);
                }

                //use js fileReader object to read the file uploaded by user and return its binary data as data url which is useful to display preview for image uploaded by user
                var reader  = new FileReader();
                reader.readAsDataURL(file);

                //onloadend : is called after file is read and converted to data url using FileReader
                reader.onloadend = function(){
                    //call the 'fileLoadEnd' callback function using (file : File) , (fileInfo : object) , (reader : FileReader) with url data on it
                    if(callbacks.fileLoadEnd){
                        callbacks.fileLoadEnd(file,fileInfo,reader);
                    }
                }
            }else{
                //skippedFiles is array contains file that failed to be added to the {files} array
                //each element in this array contains the (file : File) , (fileInfo : object) contains type and id of file also the reason prevent this file to be added
                //is it not supported or exceed size or exceed count and all that is specified according to {configuration} of this service
                skippedFiles.push({
                    file : file,
                    fileInfo :{
                        index : index,
                        isSupported : isSupported,
                        isExceedSize : isExceedSize,
                        isExceedCount : isExceedCount,
                        fileType : self.typeToString(file)
                    }
                });
                //call 'fileLoadFail' with the (file : File) that failed to be uploaded and (fileInfo : object)
                if(callbacks.fileLoadFail){
                    callbacks.fileLoadFail(_.last(skippedFiles).file,_.last(skippedFiles).fileInfo)
                }
            }
        });

        //after all files are added to {files} array , call 'filesAddCompleted'
        // parameters are (number of file that added successfully , number of files that failed to be added , array of files that failed to be added)
        //      note : this function may be called before 'fileLoadEnd' is called on the last file since reading of file using FileReader takes some time
        if(callbacks.filesAddCompleted){
            callbacks.filesAddCompleted(files.length-skippedFiles.length , skippedFiles.length , skippedFiles);//#sucess , #fail , #fail files info
        }
    },
    /*
    get the id of file according to its type in {filesCategorized} object
        @param file : File
        @return number
    */
    getFileTypeId : function(file){
        var type = this.typeToString(file);
        var files = this.get('filesCategorized.'+type);
        //console.log(files)
        files = files ? files : [];
        return files.indexOf(file);
    },
    /*
    get the id of file in {files} array
        @param file : File
        @return number
    */
    getFileId : function(file){
        var files = this.get('files');
        files = files ? files : [];
        return files.indexOf(file);
    },
    /*
    remove file from the {files} array and {filesCategorized} object in this service
        @param fileId : number , the id of file to be removed
        @param type : string ('all'/'image'/'video'/'audio') : specify if the file id is on {files} array or on {filesCategorized} object
        @param removeCallback : function , the function that will be called when file is successfully deleted
    * */
    removeFile : function(fileId,type,removeCallback){
        if(this.get('uploadInProgress') || fileId < 0){
            return;
        }
        var file;
        var fileType = type;
        var fileTypeId = fileId;
        if(!type || type=='all'){
            file = this.get('files')[fileId];
            fileType = this.typeToString(file);
            fileTypeId = this.getFileTypeId(file);
        }else if(type.length){
            file = this.get('filesCategorized.' + fileType)[fileTypeId];
            fileId = this.getFileId(file);
        }
        if(fileId > -1){
            this.get('files').splice(fileId,1);
        }
        if(fileTypeId > -1) {
            this.get('filesCategorized.' + fileType).splice(fileTypeId, 1);
        }
        if((fileId>-1 || fileTypeId>-1) && removeCallback){
            //call the removeCallback function by (fileId : number) which is the id of file in {files} array , (fileTypeId : number) id of file in {fileCategorized} object
            //(fileType : string) type of file ('image'/'video'/'audio')
            removeCallback(fileId,fileTypeId,fileType);
        }
    },
    /*
    function to be called after all files are uploaded to api (is called in uploadFiles function below) which call 'uploadCompleted' function provided in callbacks object
        @param type : string , type of files to be uploaded to api (all/image/video/audio)
        @param options : object is sent to 'uploadFiles' function
        @param callbacks : object of functions is sent to 'uploadFiles' function
        @param skippedFiles : array of file that failed to be uploaded
        @param xhr : object represent last response received from the server on upload the last file
    * */
    uploadFilesCompleted : function(type,options,callbacks,skippedFiles,xhr){
        var self = this;
        self.set('uploadInProgress',false);
        if(callbacks.uploadCompleted){
            callbacks.uploadCompleted(skippedFiles,xhr);
        }

        if(type=='all' || options.resetAll){
            self.reset();
        }else if(type.length){
            self.resetCategory(type);
        }
    },
    /*
    function to be called to upload files to api
        @param type : string , type of files to be uploaded to api (all/image/video/audio)
        @param options : object includes{
                fileName : string represent the name of filed hold the file object
                parameters : object include all additional parameters will send to api beside the file
                url : string represent the url to upload files to it , if provided it will override the values in {configuration} of this service
                resetAll : bool indicate if we will delete all files from the service after we apply the upload process or just remove files from the same type provide in {type} parameter above
            }
        @param callback : object contains function that called in specific case , for now we support four functions
                1 - fileUploadStart which is called when start processing the file before sent it to api
                2 - fileUploadSuccess which is called when receive success response after we upload the file
                3 - fileUploadError which is called when receive error response after we upload the file
                4 - uploadCompleted which is called after all files are uploaded (called inside 'uploadFilesCompleted' above)
        @param maxRetries : number of retries to make after file failed to be uploaded in first time
        --
        this function call it self after upload of current file since the upload is async operation , we added more 3 parameters to keep upload history of current file
            @param retryCount : number of retries that made to upload the current file
            @param skippedFiles : array that contains the files that failed to be uploaded (because it will be finally send to 'uploadCompleted' function so we have to keep it)
            @param fileId : number represent id of current file
    * */
    uploadFiles : function(type,options,callbacks,maxRetries,retryCount,skippedFiles,fileId){
        //[retryCount,skippedFiles,fileId] shouldn't be passed to method (callback params)
        //callbacks {fileUploadStart,fileUploadSuccess,fileUploadError,uploadCompleted}

        if(this.get('uploadInProgress')){
            return;
        }
        this.set('uploadInProgress',true);

        var self = this;
        var files = [];
        var file;
        var fileInfo;

        type = type ? type : 'all';
        if(type == 'all'){
            files = this.get('files');
        }else if(type.length){
            files = this.get('filesCategorized.'+type);
            files = files ? files : [];
        }

        //set default values for parameter which is not passed for this function
        options = options ? options : {};
        callbacks = callbacks ? callbacks : {};
        maxRetries = maxRetries ? maxRetries : 1;

        //set default values for callback parameter
        retryCount = retryCount ? retryCount : 0;
        fileId = fileId ? fileId : 0;
        skippedFiles = skippedFiles ? skippedFiles : [];

        //
        var isLastRetry = (retryCount+1) == maxRetries;
        //since we remove the file before start processing it , if files array contains one element that mean it's last file to be uploaded
        var isLastFile = files.length==1 ? true : false;
        //keep track of time we start to send file to api so if user request to stop upload process (using 'stopUpload' function on this service) , we stop sending the remaining files to server
        var requestTime = new Date().getTime();

        if(files.length){
            //remove the file from its array and start process it
            file = files.splice(0,1)[0];

            //fileTypeId is id of file when it was in its type array
            // note : if the upload was on type=='all' you can access this file safely by this id because splice not applied on {fileCategorized} array
            //        if type != 'all' , you can't use this id because it will not lead to the correct file because splice is applied on {fileCategorized} array
            fileInfo = {
                fileTypeId: (type=='all' ? self.getFileTypeId(file) : fileId),
                fileType: self.typeToString(file)//this will be the correct type image/video/audio not the type assigned in {type} parameter
            };

            //call the 'fileUploadStart' using (file : File) , (fileInfo : object)
            if(callbacks.fileUploadStart){
                callbacks.fileUploadStart(file,fileInfo);
            }

            var fd = new FormData();
            fd.append(options.fileName ? options.fileName : "file" , file);

            _.each(options.parameters,function(param){
                fd.append(param.name,param.value);
            });

            var xhr = new XMLHttpRequest();

            //handle the response sent from sever , readyState=4 means the request is sent and response is received
            xhr.onreadystatechange=function()
            {
                //isSuccess = status >= 200 && status < 300 || status === 304;

                //check that response is received and user didn't stop upload process after request is sent to api
                if (xhr.readyState==4 && requestTime > self.get('lastStopTime'))
                {
                    if(xhr.status==200){ //|| (status > 200 && status < 300) || status === 304;
                        //call the 'fileUploadSuccess' using (file : File) , (fileInfo : object) , (xhr : object ) represent response returned from the server
                        if(callbacks.fileUploadSuccess){
                            callbacks.fileUploadSuccess(file,fileInfo,xhr);
                        }

                        //if not last file set uploadInProgress to false to be able to recall the 'uploadFiles' function to upload next file
                        if(!isLastFile){
                            self.set('uploadInProgress',false);
                            self.uploadFiles(type,options,callbacks,maxRetries,0,skippedFiles, (fileId + 1) );
                        }else{
                            //if it was the last one call the 'uploadFilesCompleted' function
                            self.uploadFilesCompleted(type,options,callbacks,skippedFiles,xhr);
                        }
                    }else{
                        //on error call the 'fileUploadError' function using (file : File) , (fileInfo : object) , (xhr : object ) represent response returned from the server
                        if(callbacks.fileUploadError){
                            callbacks.fileUploadError(file,fileInfo,xhr,isLastRetry,skippedFiles);
                        }
                        //if it was last retry to upload the current file , add this file to 'skipperFiles' array and start upload the next file
                        if(isLastRetry){
                            fileId++;
                            retryCount = 0;
                            skippedFiles.push({
                                file : file,
                                fileInfo : fileInfo
                            });
                        }else{
                            //if wasn't then re insert the file on files array (because we removed it before when sending it to server) and try to resend it
                            files.splice(0,0,file);
                            retryCount++;
                        }
                        //not last file [or] it's last but we have to retry again call the 'uploadFiles' to tru to upload this file again
                        if(!isLastFile || !isLastRetry){
                            self.set('uploadInProgress',false);
                            self.uploadFiles(type,options,callbacks,maxRetries,retryCount,skippedFiles,fileId);
                        }else{
                            self.uploadFilesCompleted(type,options,callbacks,skippedFiles,xhr);
                        }
                    }
                }
            };

            var service = App.Service;
            var sprocketUploadEndpoint = (service.baseUrl + "users/" + service.userId + "/uploaded");

            //if the the 'url' (of endpoint that we will upload it wasn't provide) , we start get endpoint url from {configuration}
            //we start check the {typesUploadUrl} array to see the url should used to upload files of current type
            //if not then check the {uploadUrl} provided in {configuration}
            //else we use the default endpoint for upload on sprocket api
            if(!options.url){
                var config = self.get('configuration');
                //check array {typesUploadUrl} defined in {configuration} also url for this type is provided
                if(config.typesUploadUrl && config.typesUploadUrl[fileInfo.fileType]) {
                    options.url = config.typesUploadUrl[fileInfo.fileType];
                }else if(config.uploadUrl){
                    options.url = config.uploadUrl;
                }else{
                    options.url = sprocketUploadEndpoint;
                }
            }

            xhr.open("POST", options.url);
            //add the api key on header because upload endpoint in sprocket is secure endpoint
            if(options.url == sprocketUploadEndpoint) {
                xhr.setRequestHeader(App.CONSTANT.api.headerKey, 'Basic ' + APP_Cookies.getCookie(APP_Cookies.apiKey));
            }
            xhr.send(fd);
        }else{
            self.set('uploadInProgress',false);
        }
    },
    /*
    function used to post activity to sprocket api
        @param externalNetworkId : number represent the id of network that activity will be uploaded to it
        @param data : object include data that is required to send to activities endpoint
        @return ajaxRequest : object : so the handling of error and success will be in function that call this function and not here
    * */
    post:function(externalNetworkId,data){
        //externalNetworkId and activityTypeId aren't optional parameter so if one of them not sent we ignore that post request
        if(_.isUndefined(externalNetworkId) || _.isUndefined(data.activityTypeId)){
            return;
        }
        var service = App.Service;
        var self = this;
        return Ember.$.ajax(service.baseUrl + "social/users/" + service.userId + "/providers/" + externalNetworkId + "/activities", {
            "type": 'POST',
            "dataType": 'JSON',
            headers: {
                'Content-type': 'application/json'
            },
            "data": JSON.stringify(data),
            success: function (data, textStatus, jqXHR) {

            },
            error: function (jqXHR, textStatus, errorThrown) {

            }
        })
    },
    /*
    function to get files from sprocket api and convert it to base64 string to use it in different purpose like display images
        @param url : string represent url of endpoint that will return file
        @param successCallback : function that will be called when success response is return from sprocket api
        @param errorCallback : function that will be called when error response is return from sprocket api
    * */
    getBase64FromBinaryRequest:function(url,successCallback,errorCallback){
        var xhr = new XMLHttpRequest();

        xhr.onreadystatechange = function() {
            if (xhr.readyState==4) {
                if (xhr.status == 200) {
                    var uInt8Array = new Uint8Array(xhr.response);//get the binary response not the text
                    var i = uInt8Array.length;
                    var binaryString = new Array(i);
                    while (i--) {
                        binaryString[i] = String.fromCharCode(uInt8Array[i]);
                    }
                    var data = binaryString.join('');

                    //btoa : javascript function to convert binary string data to base64 string
                    var base64 = window.btoa(data);

                    if(successCallback){
                        successCallback(base64,xhr);//base64 response , xhr
                    }
                }else if(errorCallback){
                    errorCallback(xhr);//in case of error xhr, will not contain responseText as we set responseType as 'arraybuffer' not text or json
                }
            }
        };

        xhr.open('GET', url);
        xhr.setRequestHeader(App.CONSTANT.api.headerKey, 'Basic ' + APP_Cookies.getCookie(APP_Cookies.apiKey));
        xhr.responseType = 'arraybuffer';//get binary response in array buffer

        xhr.send();
    },
    /*
    get captcha image from sprocket api which is used for some network like reddit to post activity , this function use 'getBase64FromBinaryRequest' function above
    to convert the file sent from api to image data url that will be displayed for user
        @param externalNetworkId : number represent network id that we need to get captcha for post on it
        @param successCallback : function that will be called when success response is return from sprocket api
        @param errorCallback : function that will be called when error response is return from sprocket api
    * */
    getCaptchaImage:function(externalNetworkId,successCallback,errorCallback){
        var service = App.Service;
        var self = this;
        var url = service.baseUrl + "social/users/"+ service.userId + "/providers/" + externalNetworkId + "/captcha";
        this.getBase64FromBinaryRequest(url,function(base64,xhr){
            if(successCallback){
                successCallback("data:image/*;base64," +base64 , xhr.getResponseHeader('captcha-identifier') , xhr);
            }
        },function(xhr){
            if(errorCallback){
                errorCallback(xhr)
            }
        });
    },
    /*
     function used to vote on activity or comment on specific social network using sprocket api
        @param externalNetworkId : number represent the id of network that vote will happen on
        @param data : object include data that is required to send to vote
        @return ajaxRequest : object : so the handling of error and success will be in function that call this function and not here
     * */
    vote : function(externalNetworkId,data){
        var service = App.Service;
        var self = this;
        return Ember.$.ajax(service.baseUrl + "social/users/" + service.userId + "/providers/" + externalNetworkId + "/vote", {
            "type": 'POST',
            "dataType": 'JSON',
            headers: {
                'Content-type': 'application/json'
            },
            "data": JSON.stringify(data),
            success: function (data, textStatus, jqXHR) {

            },
            error: function (jqXHR, textStatus, errorThrown) {

            }
        })
    },
    /*
     function used to comment on activity or reply on comment on specific social network using sprocket api
         @param externalNetworkId : number represent the id of network that comment will happen on
         @param data : object include data that is required to send comment
         @return ajaxRequest : object : so the handling of error and success will be in function that call this function and not here
     * */
    comment : function(externalNetworkId,data){
        var service = App.Service;
        var self = this;
        return Ember.$.ajax(service.baseUrl + "social/users/" + service.userId + "/providers/" + externalNetworkId + "/comment", {
            "type": 'POST',
            "dataType": 'JSON',
            headers: {
                'Content-type': 'application/json'
            },
            "data": JSON.stringify(data),
            success: function (data, textStatus, jqXHR) {

            },
            error: function (jqXHR, textStatus, errorThrown) {

            }
        })
    },
    /*
     function used to engage activity
         @param activity : object represent activity that will be engaged
         @return ajaxRequest : object : so the handling of error and success will be in function that call this function and not here
     * */
    engageActivity : function(activity){
        var service = App.Service;
        return Ember.$.ajax(service.baseUrl + "social/users/" + service.userId + "/activities/engaged", {
            type: 'POST',
            dataType: 'JSON',
            contentType: "application/json; charset=utf-8",//fix problem of sending `?` question mark in data
            headers: {
                'Content-type': 'application/json'
            },
            "data": JSON.stringify(
                {
                    activities:[activity]
                }
            )
            ,"success": function (data, textStatus, jqXHR) {

            }, "error": function (jqXHR, textStatus, errorThrown) {

            }
        })
    }
});