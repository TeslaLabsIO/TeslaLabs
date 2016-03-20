function iframeLoaded() {
    var iFrameID = document.getElementById('embedCodeFrame');
    //alert(iFrameID)
    if(iFrameID) {
        // here you can make the height, I delete it first, then I make it again
        //iFrameID.height = "";
        //document.body.clientHeight+"|"+document.body.scrollHeight
        alert(iFrameID.contentWindow.document.body.scrollHeight)
        //$('#embedCodeFrame').css('height',(iFrameID.contentWindow.document.body.scrollHeight+20)+'px')
        //iFrameID.height = iFrameID.contentWindow.document.body.scrollHeight + "px";
        //iFrameID.contentWindow.document.body.style.overflow="hidden";
    }
}
App.TumblrController = Ember.ObjectController.extend({
    // vars
    queryParams: ['oauth_token','oauth_verifier'],
    oauth_token:null,
    oauth_verifier: null,

    lastDisplayedModel: null,
    selectedActivity: null,
    selectedMessage: null,
    entityModelMap: {
        activities: 'activities',
        messages:'messages'
    },
    isModelUpdated: {
        activities: false,
        messages:false
    },
    scrollPosition: {
        activities: 0,
        messages:0
    },
    // property
    nameOfTheBlog: function () {
        return APP_Storage.getValue(this.get('constant.network.9.authorization.contactStorageKeys.displayName'));
    }.property('model'),
    //
    //upload related variables not defined here to prevent keep value while switching between routes(pages)
    //
    //observers
    modelLoaded: function () {
        if (APP_Storage.getValue(APP_Storage.tumblrUserID()) != null) {
            var controller = this;
            controller.set('lastDisplayedModel', null);
            App.PollingManager.startNetworkSync(
                controller.get('constant').tumblrId,
                function (entityName, entitySyncOptions, isStored, newData, updatedIds, data, textStatus, jqXHR) {
                    console.log('*** Tumblr *** ', entitySyncOptions, isStored, newData, updatedIds);
                    if (controller.get('entityModelMap.' + entityName) && (newData[0].length || (updatedIds.length && updatedIds[0].length))) {
                        controller.set('isModelUpdated.' + entityName, true);
                        controller.set(controller.get('entityModelMap.' + entityName), APP_Storage.getValue(entitySyncOptions.storageKey, [], true));
                        //@TODO update current display element details :: what if element is removed on the new list ??
                    }
                },
                function (entityName, entitySyncOptions, jqXHR, textStatus, errorThrown) {//error function
                }
            )
        }
    }.observes('model'),
    activitiesLoaded: function () {
        var controller = this;
        Ember.run.scheduleOnce('afterRender', this, function () {
            ConvertTextElementToHtml('.social_post_html');
            $("#social_posts_results").mCustomScrollbar({
                callbacks: {
                    onScroll: function () {
                        controller.set('scrollPosition.activities', this.mcs.top);
                        controller.set('isModelUpdated.activities', false);
                    }
                }
            });
        });
    }.observes('activities'),
    messagesLoaded: function () {
        var controller = this;
        Ember.run.scheduleOnce('afterRender', this, function () {
            ConvertTextElementToHtml('.social_message_html');
            $("#social_messages_results").mCustomScrollbar({
                callbacks: {
                    onScroll: function () {
                        controller.set('scrollPosition.messages', this.mcs.top);
                        controller.set('isModelUpdated.messages', false);
                    }
                }
            });
        });
    }.observes('messages'),
    selectedActivityLoaded: function () {
        var controller = this;
        Ember.run.scheduleOnce('afterRender', this, function () {
            ConvertTextElementToHtml('.social_post_details_html');
            //
            if(controller.get('selectedActivity.video.embedCode') || controller.get('selectedActivity.audio.embedCode')) {
                setEmbedIframeScript('embedCodeFrame','embedCodeFrame',$('#embedCode').text());
            }
            //
            setTimeout(function () {
                $(".columnTwo").mCustomScrollbar("scrollTo", "top")
            }, 150)
        });
    }.observes('selectedActivity'),
    selectedMessageLoaded: function () {
        Ember.run.scheduleOnce('afterRender', this, function () {
            ConvertTextElementToHtml('.social_message_details_html');
            setTimeout(function () {
                $(".columnTwo").mCustomScrollbar("scrollTo", "top")
            }, 150)
        });
    }.observes('selectedMessage'),
    getPostService:function(){
        var postService = this.get('postService');
        if(!postService) {
            postService = App.PostActivity.create({});
            postService.setConfiguration({
                //sizeLimit : 50,
                //sizeUnit : 'MB',
                supportedTypes: ['image', 'video', 'audio'],
                typesCount: {
                    image: 1,
                    video: 1,
                    audio: 1
                }
                //,maxCount : 3
                //,uploadUrl:'simpleapi/upload.php'
                //,typesUploadUrl
            });
            this.set('postService', postService);
        }
        return this.get('postService');
    },
    actions: {
        displayData: function (type, model, id) {
            var self = this;
            var copy = $.extend(true, {}, model); // we have to take copy to prevent model from keep refresh value to be displayed again not only one time

            if (this.get('selectedActivity'))
                this.set('selectedActivity.refresh', true);//to reset the old value and recompute variable with new values

            if (type == 'activity') {
                this.set('selectedMessage', null);
                this.set('isModelUpdated.activities', false);
                this.set('selectedActivity', copy);
                this.getPostService().engageActivity(model).
                    then(function (data, textStatus, jqXHR) {
                    }, function (jqXHR, textStatus, errorThrown) {
                        if(jqXHR.status != 200){
                            SetErrorMessage(jqXHR,self.get('constant').tumblrId)
                        }
                    }
                );
                //this.notifyPropertyChange('selectedActivity');
            } else if (type == 'message'){
                this.set('selectedActivity', null);
                this.set('isModelUpdated.messages', false);
                this.set('selectedMessage', copy);
                
            }

        },
        cancelPost : function(type){
            this.getPostService().stopUpload();
            this.send('resetShareData');//remove all data instead for current type only
            HideLoadingImage();

            /*if(type == 'link' || type=='text'){
                this.set(type+'Title','');
                this.set(type+'Comment','');
                if(type=='link'){
                    this.set(type+'Url','');
                }
            }else{
                //image,video,audio
                var postService =  this.getPostService();
                postService.resetCategory(type);
                //
                this.set(type+'sPreview',[]);
                this.set(type+'Caption','');
            }*/
        },
        resetShareData : function(){
            var postService = this.getPostService();
            var config = postService.getConfiguration();
            var self = this;
            //link data
            this.set('linkTitle','');
            this.set('linkComment','');
            this.set('linkUrl','');
            //text data
            this.set('textTitle','');
            this.set('textComment','');
            //media data
            postService.reset();//remove all files
            _.each(config.supportedTypes,function(type){
                self.set(type+'sPreview',[]);
                self.set(type+'Caption','');
                self.set(type+'Url','');
                $('#tumblr_'+type+'_upload').val('');
            });
        },
        sharePost : function(type){
            var postService = this.getPostService();
            var self = this;
            if (type == 'link' || type == 'text') {
                var data = {
                    activityTypeId:(type=='text' ? 3 : 2)
                };
                var title = this.get(type + 'Title');
                var body = this.get(type + 'Comment');
                if (title) {
                    data['title'] = title;
                }
                if (body) {
                    data['body'] = body;
                }else if(type=='text'){
                    App.growl.info('Please provide Comment to be able to Share your Post');
                    return;//body is required in text activity
                }
                if (type == 'link') {
                    if(this.get('linkUrl') && isValidUrl(this.get('linkUrl'))){
                        data['link'] = this.get('linkUrl');
                    }else{
                        App.growl.info('Please provide Valid Url to be able to Share your Post');
                        return;//body is required in text activity
                    }
                }
                ShowLoadingImage()
                postService.post(this.get('constant').tumblrId, data).
                    then(function (data, textStatus, jqXHR) {
                    }, function (jqXHR, textStatus, errorThrown) {
                        HideLoadingImage();
                        if(jqXHR.status == 200){
                            self.send('resetShareData');
                            //
                            $('.postBoxContainer').addClass('success_border_color');
                            setTimeout(function () {
                                $('.postBoxContainer').removeClass('success_border_color');
                            }, 1000)
                            //
                        }else{
                            SetErrorMessage(jqXHR,self.get('constant').tumblrId)
                        }
                    }
                );
            }else if(this.get(type+'Url')){
                var self = this;
                var data = {};
                var url = this.get(type+'Url');
                if(type != 'video' && !isValidUrl(url)){
                    App.growl.info('Please provide Valid Url to be able to Share your Post');
                    return;
                }
                ShowLoadingImage();
                if(type == 'image'){
                    data['activityTypeId']=1;
                    data['link'] = url;
                }else if(type == 'video'){
                    data['activityTypeId']=0;
                    data['embed'] = url;
                }else{
                    data['activityTypeId']=4;
                    data['link'] = url;
                }
                if(self.get(type+'Caption')){
                    data['body'] = self.get(type+'Caption');
                }
                postService.post(this.get('constant').tumblrId, data).
                then(function (data, textStatus, jqXHR) {
                }, function (jqXHR, textStatus, errorThrown) {
                        HideLoadingImage();
                        if(jqXHR.status == 200){
                            self.send('resetShareData');
                            //
                            $('.postBoxContainer').addClass('success_border_color');
                            setTimeout(function () {
                                $('.postBoxContainer').removeClass('success_border_color');
                            }, 1000);
                            //
                        }else{
                            SetErrorMessage(jqXHR,self.get('constant').tumblrId);
                        }
                    }
                );
            } else {
                this.send('uploadFiles', type);
            }
        },
        uploadFiles : function(type){
            var postService = this.getPostService();
            var self = this;
            var filesUrl = [];

            postService.uploadFiles(type,{
                resetAll : true
            },{
                fileUploadStart:function(file,fileInfo){
                    //as sometime not file will be in that category so we have to ensure start of upload process to show loading
                    ShowLoadingImage();
                    //
                    console.log('upload start ',file,fileInfo);
                },
                fileUploadSuccess:function(file,fileInfo,xhr){
                    try{
                        var response = JSON.parse(xhr.responseText);
                        if(response.url){
                            filesUrl.push({
                                url:response.url,
                                type:fileInfo.fileType,
                                file:file
                            });
                        }else{
                            App.growl.danger('invalid response '+xhr.responseText,true);
                        }
                    }catch (e){
                        App.growl.danger('invalid response '+xhr.responseText,true);
                    }

                    //
                    console.log('upload success ',file,fileInfo,xhr);
                },
                fileUploadError:function(file,fileInfo,xhr,isLastRetry,skippedFiles){
                    App.growl.danger('Upload file '+file.name+' failed',true);
                    SetErrorMessage(xhr,self.get('constant').tumblrId);
                    //if isLastRetry >> remove the preview
                    //but here we have only one file & will remove all previews so we move it to upload completed callback
                    //
                    console.log('upload error ',file,fileInfo,xhr,isLastRetry,skippedFiles);
                },
                uploadCompleted:function(skippedFiles,xhr){
                    //reset previews from all tabs
                    //start post activity using url

                    if(filesUrl.length){
                        var fileData = filesUrl[0];
                        var data = {};
                        if(fileData.type == 'image'){
                            data['activityTypeId']=1;
                            data['link'] = fileData.url;
                        }else if(fileData.type == 'video'){
                            data['activityTypeId']=0;
                            data['embed'] = fileData.url;
                        }else{
                            data['activityTypeId']=4;
                            data['link'] = fileData.url;
                        }
                        if(self.get(fileData.type+'Caption')){
                            data['body'] = self.get(fileData.type+'Caption');
                        }
                        postService.post(self.get('constant').tumblrId, data).
                            then(function (data, textStatus, jqXHR) {

                            }, function (jqXHR, textStatus, errorThrown) {
                                HideLoadingImage();
                                self.send('resetShareData');//because it's already remove from post service files
                                if(jqXHR.status != 200){
                                    SetErrorMessage(jqXHR,self.get('constant').tumblrId)
                                    if(data.body){
                                        self.set(fileData.type+'Caption',data.body)
                                    }
                                    self.send('addFiles',{
                                        target:{
                                            files : [fileData.file]
                                        }
                                    },{
                                        hiddenInsertion:true,
                                        accept_type: fileData.type,
                                        reset_type : fileData.type
                                    });

                                }else{
                                    //
                                    $('.postBoxContainer').addClass('success_border_color');
                                    setTimeout(function () {
                                        $('.postBoxContainer').removeClass('success_border_color');
                                    }, 1000)
                                    //
                                }
                            }
                        );
                    }else{
                        self.send('resetShareData');//because it's already remove from post service files
                        HideLoadingImage();
                    }
                    //
                    console.log('upload completed ',skippedFiles,xhr);
                }
            },1);//1 try only to send file if it fails there will not re-send for the upload request
        },
        removeFile : function(type){
            console.log(type);
            var postService = this.getPostService();
            var self = this;
            var id=0;
            postService.removeFile(id,type,function(){
                //add removal in callback as removal shouldn't be happen during upload process and this is check in post activity service
                if(self.get(type+'sPreview').length){
                    self.get(type+'sPreview').replace(id,1);
                }
            })
        },
        addFiles : function(event,attrs){
            console.log(event,attrs)

            var self = this;
            var postService = this.getPostService();
            //attrs.reset_type=null;
            var config = postService.getConfiguration();
            if(attrs.reset_type == 'all'){
                _.each(config.supportedTypes,function(type){
                    self.set(type+'sPreview',[]);
                    self.set(type+'Url','');
                });
            }else if(attrs.reset_type){
                self.set(attrs.reset_type+'sPreview',[]);
                self.set(attrs.reset_type+'Url','');
            }
            postService.addFiles(event.target.files,{
                fileLoadStart : function(file,fileInfo){
                    if(!self.get(fileInfo.fileType+'sPreview')){
                        self.set(fileInfo.fileType+'sPreview',[])
                    }
                    self.get(fileInfo.fileType+'sPreview').pushObject({
                        src: (attrs.hiddenInsertion ? "assets/images/headericons/transparent.png" : "assets/images/upload_progress.gif"),
                        loaded: false,
                        name: file.name
                    });
                    self.notifyPropertyChange(fileInfo.fileType+'sPreview');
                    //
                    console.log('load start ',file,fileInfo , postService.getFileId(file),postService.getFileTypeId(file));
                },
                fileLoadEnd : function(file,fileInfo,reader){
                    if(fileInfo.fileType=='image'){
                        self.set('imagesPreview.'+fileInfo.fileTypeId+'.src', reader.result);
                    }else{
                        self.set(fileInfo.fileType+'sPreview.'+fileInfo.fileTypeId+'.src', 'assets/images/'+fileInfo.fileType+'.png');
                    }
                    self.set((fileInfo.fileType+'sPreview')+'.'+fileInfo.fileTypeId+'.loaded' , true);
                    self.notifyPropertyChange(fileInfo.fileType+'sPreview');
                    //
                    console.log('load end ',file,fileInfo,postService.getFileId(file),postService.getFileTypeId(file))
                },
                fileLoadFail : function(file,fileInfo){
                    var reason = '';
                    if(!fileInfo.isSupported){
                        reason = 'it isn\'t '+(attrs.accept_type ? attrs.accept_type : (config.supportedTypes.join(' or ')));
                    }else if(fileInfo.isExceedCount){
                        reason = 'you are only allowed to upload '+ (config.typesCount ? (config.typesCount[fileInfo.fileType]+' '+fileInfo.fileType+'(s)') : (config.maxCount + ' files'))
                    }else if(fileInfo.isExceedSize){
                        reason = 'you are not allowed to upload files more than '+config.sizeLimit+' '+config.sizeUnit;
                    }
                    App.growl.info('Upload file '+file.name+' failed because '+reason);
                    //
                    console.log('load fail ',file,fileInfo,postService.getFileId(file),postService.getFileTypeId(file))
                },
                filesAddCompleted : function(successCount,failCount,skippedFile){
                    console.log('add completed ',successCount,failCount,skippedFile)
                }
            },attrs.accept_type,attrs.reset_type)

        }
    }
});
