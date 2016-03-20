/**
 * Created by mahmoud on 7/13/14.
 */

var lastDisplayedFBType = '';
var lastDisplayedFBID = 0;

function restoreFbScroll(index, accordionStatus) {
    var controller = App.__container__.lookup('controller:facebook');
    if (accordionStatus == "visible") {
        setTimeout(function () {
            if (index == 0) {
                $("#fb_msg_results").mCustomScrollbar("scrollTo", controller.get('scrollPosition.messages'), {scrollInertia: 0})
            } else if (index == 1) {
                $("#fb_posts_results").mCustomScrollbar("scrollTo", controller.get('scrollPosition.activities'), {scrollInertia: 0})
            } else if (index == 2) {
                $("#fb_local_posts_results").mCustomScrollbar("scrollTo", controller.get('scrollPosition.localActivities'), {scrollInertia: 0})
            } else {
                $("#fb_recommended_posts_results").mCustomScrollbar("scrollTo", controller.get('scrollPosition.recommended'), {scrollInertia: 0})
            }
        }, 100)
    }
    $("#fbData").mCustomScrollbar("scrollTo", 0, {scrollInertia: 0});
}
function setFbSelected(index, accordionStatus) {
    APP_Storage.setValue(APP_Storage.facebookLastSelected, index);
    restoreFbScroll(index, accordionStatus)
}
function selectFbTab() {
    var index = APP_Storage.getValue(APP_Storage.facebookLastSelected, 0);
    var tabs = Em.$('#fbData .social_accordion_header');
    var accordionStatus = performAccordionSelection(tabs[index]);
    restoreFbScroll(index, accordionStatus)
}


//var FbAccessToken=APP_Storage.getValue(APP_Storage.facebookUserID());
//var FbUserID=APP_Storage.getValue(APP_Storage.facebookTokenKey());
function StoreFbData(response){
    /*if (response.authResponse) {
     APP_Storage.setValue(APP_Storage.facebookUserID(),response.authResponse.userID,false,true);
     APP_Storage.setValue(APP_Storage.facebookTokenKey(),response.authResponse.accessToken,false,true);
     if(APP_Storage.getValue(APP_Storage.facebookUserID(),0)==0){
     alert('please disable private browsing mode so you can post on facebook by SPROCKET')
     }
     }*/
}
function GetFacebookUserName(callback,params){
    if(APP_Storage.getValue(APP_Storage.facebookUserName())==null){
        console.log('--new name--')
        FB.api(('/'+APP_Storage.getValue(APP_Storage.facebookUserID())), 'GET',
            {
                access_token:APP_Storage.getValue(APP_Storage.facebookTokenKey())
            },
            function(response){
                if(response.name){
                    console.log('your name is ' + response.name);
                    APP_Storage.setValue(APP_Storage.facebookUserName(),response.name,false,true);
                }
                if(callback){
                    callback(APP_Storage.getValue(APP_Storage.facebookUserName()),params)
                }

            }
        );

    }else{
        console.log('--cached name--')
        if(callback){
            callback(APP_Storage.getValue(APP_Storage.facebookUserName()),params)
        }else{
            return APP_Storage.getValue(APP_Storage.facebookUserName());
        }

    }
}
function GetFacebookUserPic(callback,params){
    if(APP_Storage.getValue(APP_Storage.facebookUserPic())==null){
        console.log('--new img--')
        FB.api(('/'+APP_Storage.getValue(APP_Storage.facebookUserID()))+"/picture", 'GET',
            {
                access_token:APP_Storage.getValue(APP_Storage.facebookTokenKey()),
                redirect:false,
                type:"square"
            },
            function(response){
                console.log(response)
                if(response.data && response.data.url){
                    APP_Storage.setValue(APP_Storage.facebookUserPic(),response.data.url,false,true);
                }
                if(callback){
                    callback(APP_Storage.getValue(APP_Storage.facebookUserPic()),params)
                }
            }
        );
    }else{
        console.log('--cached img--')
        if(callback){
            callback(APP_Storage.getValue(APP_Storage.facebookUserPic()),params)
        }else{
            return APP_Storage.getValue(APP_Storage.facebookUserPic());
        }

    }
}

function ExchangeFbToken(userid,token,successCallback,errorCallback){
    ShowLoadingImage()

    console.log('short token >> ' + token)

    APP_Storage.removeValues([APP_Storage.facebookUserID(),APP_Storage.facebookTokenKey()]);

    var longToken=null;
    Ember.$.ajax(API_Base_Url+'users/'+getCookie(APP_Cookies.userID)+'/exchangedToken', {
        async : false , //prevent request return before exchange token so we can use it in after calling method
        type : 'POST',
        "dataType": 'JSON',headers:{"Content-Type":'application/json'},
        data: JSON.stringify(
            {
                accessToken:token,
                externalNetworkId:APP_External_Network.Facebook
            }
        ),
        success : function (response, textStatus, jqXHR) {
            //HideLoadingImage() //caller is responsible for that
            console.log('success');
            console.log('auth user id '+userid);
            console.log(response);

            longToken = response.accessToken;

            APP_Storage.setValue(APP_Storage.facebookUserID(),userid,false,true);
            APP_Storage.setValue(APP_Storage.facebookTokenKey(),response.accessToken,false,true); //store in case no call for activate
            if(successCallback){
                successCallback(response.accessToken , response, textStatus , jqXHR);
                //successCallback(token , response, textStatus , jqXHR)
            }
        },error : function (jqXHR, textStatus , errorThrown) {
            HideLoadingImage();
            console.log('fail');
            console.log(jqXHR);
            if(errorCallback){
                errorCallback(jqXHR, textStatus , errorThrown)
            }
        }
    });

    console.log('finish');
    //alert('finish')

    return longToken;

}
function LoginToFacebook(callback,params,permission,authType,noExchange){
    console.log('-----login-----')

    //not remove in re auth
    //APP_Storage.removeValues([APP_Storage.facebookTokenKey()])

    FB.login(function(response) {
        console.log(response)

        //StoreFbData(response)
        var fbUserId = response.authResponse ? response.authResponse.userID : 0;
        var storedId = APP_Storage.getValue(APP_Storage.facebookUserID(),0);
        if(fbUserId && storedId && fbUserId != storedId){
            APP_Storage.removeValues([APP_Storage.facebookUserName(),APP_Storage.facebookUserPic()]);//remove current fb user data as we get those from fb not server
            SetErrorMessage('This sprocket account is associated with another facebook account; please login with it to complete your action',APP_External_Network.Facebook);
            return;
        }
        if(!noExchange && response.authResponse && response.authResponse.accessToken){
            var newToken = ExchangeFbToken(response.authResponse.userID,response.authResponse.accessToken,function(longToken){
                console.log(('Login facebook callback with token'));

                GetFacebookUserName(); //just get it if not found ; this request may be interrupted by page refresh
                GetFacebookUserPic();  //just get it if not found ; this request may be interrupted by page refresh

                callback(response,params,longToken)
            },function(jqXHR){
                console.log('Login facebook no callback');
                SetErrorMessage(jqXHR,APP_External_Network.Facebook);
                //window.location='#';
            });
            console.log('sync long token >> ' + newToken )
        }else{
            console.log(('Login facebook callback no token'));
            callback(response,params)
        }

    },Em.$.extend({scope:permission},(authType?{auth_type:authType}:{})));
}
//use forceLogin here is better than use LoginToFacebook  directly because this method get non-cached login status by send true as second parameter
//but LoginToFacebook get cached status and work by it
function FacebookLoginStatus(forceLogin,callback,params,permission,authType){
    console.log('-----login status-----')

    //not remove in recheck
    //APP_Storage.removeValues([APP_Storage.facebookTokenKey()])
    var responseReceived = false;
    FB.getLoginStatus(function(response) {
        if(responseReceived){
            return;
        }
        responseReceived = true;
        console.log('native callback ** ',response);
        if (response.status === 'connected' && !forceLogin) {
            //StoreFbData(response)
            callback(response,params);
        }else{
            //force login , since it's popup we can call it directly from here we need user action
            Em.$('.fb_post_error span').off('click');
            Em.$('.fb_post_error.permission span').on('click',function(){
                Em.$('.fb_post_error').fadeOut(0)//so user feel new error if happens again
                LoginToFacebook(callback,params,permission,authType);
            });
            Em.$('.fb_post_error.permission').fadeIn('slow')
        }
    },true);//true not get cached response
    //getLoginStatus not always work this related to FB sdk problem so we have wait one second and check if call back done , if not force login manually
    //getLoginStatus some time doesn't work due to set `APP Domains` in fb app setting with value doesn't match the domain app is used on and there is other reasons
    //so we have to handle it anyway
    setTimeout(function(){
        if(responseReceived){
            return;
        }
        responseReceived = true;
        console.log('timeout callback');
        //force login , since it's popup we can call it directly from here we need user action
        Em.$('.fb_post_error span').off('click');
        Ember.$('.fb_post_error.permission span').on('click',function(){
            Ember.$('.fb_post_error').fadeOut(0)//so user feel new error if happens again
            LoginToFacebook(callback,params,permission,authType);
        });
        Ember.$('.fb_post_error.permission').fadeIn('slow')
    },1000)
}
var FbPostRetry=0;
var FbPostInProgress=false;
var fbFileId=0;
var fbFilesRaw=new Array();

function HandleFacebookPostResponse(response,params){
    //alert(response)
    console.log(response)
    var fbController = App.__container__.lookup("controller:facebook");
    Em.$('.fb_post_error').fadeOut(0)
    if(response.error){
        FbPostRetry++;
        Em.$('.fb_post_error span').off('click');
        var error=response.error;
        if(isInArray(error.code,Facebook_Error_Code.Temporary)){
            FbPostInProgress=false;//so he can press post again
            Em.$('.fb_post_error.temporary').fadeIn('slow')
        }else if(isInArray(error.code,Facebook_Error_Code.DuplicatedPost)){
            fbController.resetPostData();
            Em.$('.fb_post_error.duplicated').fadeIn('slow')
        }else if(isInArray(error.code,Facebook_Error_Code.MissingFile)){
            //fbController.resetPostData();
            FbPostInProgress=false;//so he can press post again
            Em.$('.fb_post_error.files').fadeIn('slow')
        }else if(isInArray(error.code,Facebook_Error_Code.Permission,true)){
            Em.$('.fb_post_error.permission span').on('click',function(){
                Em.$('.fb_post_error').fadeOut(0)//so user feel new error if happens again
                LoginToFacebook(PostToFacebook,params,Facebook_Scope_Publish,'rerequest')
            });
            Em.$('.fb_post_error.permission').fadeIn('slow')
        }else if(isInArray(error.code,Facebook_Error_Code.TokenExpire) || error.type=="OAuthException"){
            Em.$('.fb_post_error.permission span').on('click',function(){
                Em.$('.fb_post_error').fadeOut(0)//so user feel new error if happens again
                LoginToFacebook(PostToFacebook,params,Facebook_Scope_Read+','+Facebook_Scope_Publish)
            });
            Em.$('.fb_post_error.permission').fadeIn('slow')
        }
    }else{
        //success
        if(fbFileId <= 1){

            if(fbFilesRaw.length && fbFilesRaw[0].type.match(/video.*/)){
                Em.$('.fb_post_error.video').fadeIn('slow')
            }

            fbController.resetPostData();//controller.send('resetPostData'); || use when this method in actions

            Em.$('#fb_post_status').addClass('success_border_color')

            setTimeout(function(){
                Em.$('#fb_post_status').removeClass('success_border_color')
            },1000)
        }else{
            fbFileId--;
            Em.$('#fb_img_parent_'+fbFileId).remove();
            PostToFacebook(response,params)
        }

        /*$({alpha:1}).animate({alpha:0}, {
         duration: 10000,
         step: function(){
         Em.$('#fb_post_status').css('border-color','rgba(51,56,67,'+this.alpha+')');
         }
         });*/
    }
}
function PostToFacebook(reponse,params){
    console.log('-----post-----'+params.message)
    console.log(APP_Storage.getValue(APP_Storage.facebookUserID()) +'|'+  APP_Storage.getValue(APP_Storage.facebookTokenKey(),'not exist'))

    var fbController = App.__container__.lookup("controller:facebook");
    var postData= fbController.getPostData();//params are the same but user may modify while in callback to this fn

    if(FbPostRetry>=2 || APP_Storage.getValue(APP_Storage.facebookTokenKey())==null || (postData.message=="" && fbFilesRaw.length==0)){
        console.log('max reached || access token null || empty msg')
        fbController.resetPostData();
        return;
    }
    /*var endPoint = fbFilesRaw.length==0 ?
     ('/'+APP_Storage.getValue(APP_Storage.facebookUserID())+'/feed'):
     ('/'+APP_Storage.getValue(APP_Storage.facebookUserID())+'/photos')
     var attachment = fbFilesRaw.length==0 ? {} : {source : fbFilesRaw[0]}*/

    if(fbFilesRaw.length == 0){
        FB.api(('/'+APP_Storage.getValue(APP_Storage.facebookUserID())+'/feed'), 'post',
            {
                access_token:APP_Storage.getValue(APP_Storage.facebookTokenKey()),
                message: postData.message//'Hello, world!'+(new Date().getTime())
            },
            function(response){
                HandleFacebookPostResponse(response,params)
            }
        );
    }else{

        var isVideo=fbFilesRaw[0].type.match(/video.*/);
        //if (!file.type.match(/image.*/)) {
        // this file is not an image.
        //}

        //alert('create form')
        var fd = new FormData();

        //alert('append token')
        fd.append("access_token",APP_Storage.getValue(APP_Storage.facebookTokenKey()));

        //alert('append data')
        fd.append("source", fbFilesRaw[fbFileId-1]);

        if(postData.message!=""){
            fd.append(isVideo ? "description" : "message", postData.message);
        }

        var xhr = new XMLHttpRequest();

        xhr.onreadystatechange=function()
        {
            if (xhr.readyState==4)
            {
                //document.getElementById("myDiv").innerHTML=xmlhttp.responseText;
                HandleFacebookPostResponse(eval('('+xhr.responseText+')'),params)
            }
        }

        if(isVideo){
            xhr.open("POST", "https://graph-video.facebook.com/"+APP_Storage.getValue(APP_Storage.facebookUserID())+"/videos");
        }else{
            xhr.open("POST", "https://graph.facebook.com/"+APP_Storage.getValue(APP_Storage.facebookUserID())+"/photos");
        }

        //alert('send form')
        xhr.send(fd);
    }
    /*var files = document.getElementById('fb_post_upload').files
     var fd = new FormData();
     fd.append("source", files[0]);*/

    //send data using token
    //if not success
    //if .code == 1,2,4,17,341 try again later
    //if .code == 506 dup post
    //if .code == 10 || >=200,<=299 >> permission rerequest publish
    //if .code == 190 || .type == "OAuthException" >> invalid/expire token re-login include post permission
    //else
    //alert success
}

function clearFbFiles(){
    for(var i=0;i<fbFilesRaw.length;i++){
        Em.$('#fb_img_parent_'+i).remove();
    }
    fbFileId=0;
    fbFilesRaw=new Array();
}
function fbFileLoaded(fileid,reader){
    return function(){
        if(fbFilesRaw[fileid]){//array item not cleared during upload
            if(fbFilesRaw[fileid].type.match(/image.*/)){
                Em.$('#fb_preview_img_'+fileid).attr('src',reader.result);
            }else{
                Em.$('#fb_preview_img_'+fileid).attr('src','assets/images/video.png');
            }
        }
        //Em.$('.file_uploader img').attr('src',reader.result);
        /*
         var files = document.getElementById('fb_post_upload').files
         var fd = new FormData();
         fd.append("access_token",APP_Storage.getValue(APP_Storage.facebookTokenKey()));
         fd.append("source", files[0]);
         //fd.append("key", "××××××××××××");
         var xhr = new XMLHttpRequest();
         xhr.open("POST", "https://graph.facebook.com/10203720443191832/photos");
         xhr.send(fd);
         */
    }
}
function uploadFbPhotoVideo(event){
    var files=event.target.files;

    if(fbFilesRaw.length>0 && fbFilesRaw[0].type.match(/video.*/)){//try to upload new files while video file was uploaded
        alert('you can upload only one video file at a time');
        return;
    }

    for(var i=0;(files && i<files.length);i++){

        if((files[0].size/1048576) > 15){//ignore file > 15MB
            alert('file size is more than 15MB ')
            continue;
        }

        var type = files[i].type;
        console.log(type)

        var isVideo=type.match(/video.*/);

        if(!isVideo && !type.match(/image.*/)){//user still can select * files although accept
            console.log('invalid file '+i)
            continue;
        }

        if (isVideo) {
            if(fbFilesRaw.length>0 && files.length==1){//there was image files and this only one video file
                alert('you can upload only one video file;remaining files will be deleted');
            }
            clearFbFiles();
            if(files.length>1){//many files are upload beside video (either video/image files)
                alert('Please select only one video file at a time')
                break;
            }
        }

        fbFilesRaw[fbFileId]=(files[i]);

        var templateId='#fb_img_template';
        var template=Em.$(templateId).clone();
        var img = Em.$(Em.$(template.children('span')[0]).children('img')[0]);
        img.attr('src','assets/images/upload_progress.gif')
        img.attr('id','fb_preview_img_'+fbFileId)
        template.attr('id','fb_img_parent_'+fbFileId)
        template.css('display','table')
        template.insertBefore(templateId)

        var reader  = new FileReader();
        reader.readAsDataURL(files[i]);
        reader.onloadend = fbFileLoaded(fbFileId,reader);//to use current value of fbFileId not the final
        fbFileId++;
    }
}

function autoCompleteSendUser() {
    /*var messages = APP_Storage.getValue(APP_Storage.facebookMessage,[],true);
     var autoComplete=[];
     for(var i=0;i<messages.length;i++){
     autoComplete.push({label:messages[i].sender.displayName,value:messages[i].sender.contactId})
     }
     Em.$('#friends_name').autocomplete({
     source: autoComplete,
     change:autoCompleteReplace,
     focus:autoCompleteReplace,
     select:function(event,ui){
     autoCompleteReplace(event,ui)

     Em.$('#fb_message_data').val('');
     Em.$('#fb_message_data').attr('contact-id',ui.item.value)

     if(Em.$('#fb_contact_id_'+ui.item.value).length){
     Em.$('#fb_contact_id_'+ui.item.value).click();
     }else{
     Em.$('#hidden_message_send').click();
     }
     }
     });*/
}


function activatefacebook(token) { // long live token
    ShowLoadingImage()

    APP_Storage.removeValues([APP_Storage.facebookUserID(), APP_Storage.facebookTokenKey()]);

    Ember.$.ajax(API_Base_Url + 'users/' + getCookie(APP_Cookies.userID) + '/identities', {
        "type": 'POST', "dataType": 'JSON', headers: {"Content-Type": 'application/json'},
        "data": JSON.stringify(
            {
                "accessToken": token,
                externalNetworkId: APP_External_Network.Facebook,
                clientPlatformId: APP_Client_Platform.WEB
            }
        ),
        success: function (data, textStatus, jqXHR) {
            console.log('end point uid ' + data.identity.identifier);
            console.log('response');
            console.log(data);
            //
            APP_External_Network.setExpired(false,APP_External_Network.Facebook);
            //
            APP_Storage.setValue(APP_Storage.facebookUserID(), data.identity.identifier, false, true);
            APP_Storage.setValue(APP_Storage.facebookTokenKey(), token, false, true);

            APP_Storage.setValue(APP_Storage.facebookUserName(), data.displayName, false, true);//until i receive identity from api
            APP_Storage.setValue(APP_Storage.facebookUserPic(), data.imageUrl, false, true);//until i receive identity from api

            HideLoadingImage();
            setTimeout(function () {
                // redirect to sync tool-tip page
                App.utilities.redirectToUrl('/#/sync?network='+APP_External_Network.Facebook);
                //location.reload();
            }, 10);

            /*ExchangeFbToken( data.identifier , token ,
             function(longToken){
             },
             function(jqXHR2, textStatus2 , errorThrown2){
             HideLoadingImage();
             SetErrorMessage(jqXHR2,APP_External_Network.Facebook);
             window.location='#dashboard';
             });*/
        },
        error: function (jqXHR, textStatus, errorThrown) {
            HideLoadingImage();
            console.log(jqXHR);
            SetErrorMessage(jqXHR, APP_External_Network.Facebook);
            //window.location='#dashboard';
        }
    });
}
