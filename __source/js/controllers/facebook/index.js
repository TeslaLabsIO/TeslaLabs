/**
 * Created by mahmoud on 7/13/14.
 */
/**/
window.fbAsyncInit = function() {
    FB.init({
        appId      : FB_Application_ID,
        version    : 'v2.0',
        status     : true, // check login status
        cookie     : true, // enable cookies to allow the server to access the session
        xfbml      : true  // parse XFBML
        //,fileUpload:true
        //,file_upload:true
    });
    /*FB.Event.subscribe('auth.authResponseChange', function(response) {
        alert('x')
         console.log(response);
        FB.getLoginStatus(function(response) {
          alert('d')
        })
         if (response.status === 'connected') {
            console.log('Connected to Facebook');
         }else{

         }
        /*else if (response.status === 'not_authorized') {
            FB.login();
        }* /
    });*/
};

App.FacebookController = Ember.ObjectController.extend({
    lastDisplayedModel : null,

    //testval:'7mdad',
    //fBMsgsDetails:function(){return [];}.property(),//make it in controller safe values over transition

    postMessage:'',
    entityModelMap : {
        messages:'fBMessages',
        activities : 'fBPosts',
        localActivities : 'fBLocalPosts',
        recommended : 'fBRecommendedPosts'
    },
    isModelUpdated : {
        messages : false,
        activities : false,
        localActivities : false,
        recommended : false
    },
    scrollPosition : {
        messages : 0,
        activities : 0,
        localActivities : 0,
        recommended : 0
    },
    modelLoaded : function(){
        //alert('x')
        if (APP_Storage.getValue(APP_Storage.facebookUserID()) != null) {
            var controller = this;
            var contactService = controller.container.lookup('contacts:service');
            App.PollingManager.startNetworkSync(
                APP_External_Network.Facebook,
                function (entityName, entitySyncOptions, isStored, newData, updatedIds, data, textStatus, jqXHR) {
                    if(entityName == 'contacts'){
                        if(!isStored){
                            contactService.deleteContacts(data.deleted);
                        }
                    }else {
                        controller.set('lastDisplayedModel', null); // reset current selected details
                        if (newData[0].length || (updatedIds.length && updatedIds[0].length)) {
                            controller.set('isModelUpdated.' + entityName, true);
                            controller.set(controller.get('entityModelMap.' + entityName), APP_Storage.getValue(entitySyncOptions.storageKey, [], true));
                            if (entityName == 'localActivities') {
                                $('#loctooltip').tooltip('hide');
                                App.__container__.lookup('view:facebook').initLocationTooltip('Press here to get local news feed according to your new location');
                            }
                            //@TODO update current display element details :: what if element is removed on the new list ??
                        }
                    }
                },
                function (entityName, entitySyncOptions, jqXHR, textStatus, errorThrown) {//error function

                }
            )
        }
    }.observes('model'),
    getPostData:function(){
        return {
            message:this.get('postMessage')
        }
    },
    resetPostData:function(){
        this.set('postMessage','')
        clearFbFiles();

        FbPostRetry=0;
        FbPostInProgress=false;
        HideLoadingImage();
        /*Em.$('#fb_upload_button').on('click',function(){
            Em.$('#fb_post_upload').click()
        });*/
    },
    fBMessagesLoaded : function() {
        var controller = this;
        Ember.run.scheduleOnce('afterRender', this, function() { //autoCompleteSendUser();//will run on insert element and synchronization update
            ConvertTextElementToHtml('.fb_message_html',true);
            $("#fb_msg_results").mCustomScrollbar({
                callbacks:{
                    onScroll:function(){
                        controller.set('scrollPosition.messages',this.mcs.top);
                        controller.set('isModelUpdated.messages',false);
                    }
                }
            });
        });
    }.observes('fBMessages'),
    fBPostsLoaded : function() {
        var controller = this;
        Ember.run.scheduleOnce('afterRender', this, function() {
            ConvertTextElementToHtml('.fb_post_html');
            $("#fb_posts_results").mCustomScrollbar({
                callbacks:{
                    onScroll:function(){
                        controller.set('scrollPosition.activities',this.mcs.top);
                        controller.set('isModelUpdated.activities',false);
                    }
                }
            });
        });
    }.observes('fBPosts'),

    localPostsLoaded:function(){
        var controller = this;
        if(APP_Storage.getValue(APP_Storage.facebookLocalPost,[],true).length == 0){//if(APP_Storage.getValue(APP_Storage.facebookLocalPost,null,true)==null){
            var locationInfo = APP_Storage.getValue(APP_Storage.userLocationInfo());
            if(locationInfo==null || locationInfo.split(",").length==1){
                this.set('localNotSync',false);
                this.set('localEmpty',true);
            }else{
                this.set('localNotSync',true);
                this.set('localEmpty',false);
            }
        //}else if(APP_Storage.getValue(APP_Storage.facebookLocalPost,[],true).length==0){this.set('localEmpty',false); //true);this.set('localNotSync',true);//false);
        }else{
            this.set('localNotSync',false);
            this.set('localEmpty',false);
        }

        Ember.run.scheduleOnce('afterRender', this, function() {
             ConvertTextElementToHtml('.fb_post_html');
            $("#fb_local_posts_results").mCustomScrollbar({
                callbacks: {
                    onScroll: function () {
                        controller.set('scrollPosition.localActivities',this.mcs.top);
                        controller.set('isModelUpdated.localActivities',false);
                    }
                }
            });
        });
    }.observes('fBLocalPosts'),//so if we back from search mode , scroll is created again

    recommendedPostsLoaded:function(){
        var controller = this;
        Ember.run.scheduleOnce('afterRender', this, function() {
            ConvertTextElementToHtml('.fb_post_html');
            $("#fb_recommended_posts_results").mCustomScrollbar({
                callbacks: {
                    onScroll: function () {
                        controller.set('scrollPosition.recommended',this.mcs.top);
                        controller.set('isModelUpdated.recommended',false);
                    }
                }
            });
        });
    }.observes('fBRecommendedPosts'),

    fBMessagesDetailsLoaded : function() {
        //alert('details')
        Ember.run.scheduleOnce('afterRender', this, function() {
            ConvertTextElementToHtml('.fb_message_details_html',true);
            setTimeout(function(){
                $("#fbContent").mCustomScrollbar("scrollTo","bottom")
            },150)
        });
    }.observes('content.fBMessagesDetails'),
    fBPostsDetailsLoaded : function() {
        Ember.run.scheduleOnce('afterRender', this, function() {
            ConvertTextElementToHtml('.fb_post_details_html');
            setTimeout(function(){
                $("#fbContent").mCustomScrollbar("scrollTo","top")
            },150)
        });
    }.observes('content.fBPostsDetails'),
    actions: {
        getLocation:function(){
            selectFbTab();//undo click event
            var confirmed = true;
            if(APP_Storage.getValue(APP_Storage.facebookLocalPost,[],true).length){
                 confirmed = confirm('Are you sure you want to reset your location?');
            }
            if(confirmed) {
                var _self = this;
                APP_Storage.setValue(APP_Storage.userLocationInfo(), "", false, true);//just set as requested
                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(function (position) {
                            ShowLoadingImage();
                            console.log('** share fb location accepted');
                            //the local storage should be empty array if activities endpoint returned data without location was provided for local news feed
                            //this should work properly when api implement periodic sync
                            //we use facebookPostLastModified now for local activities too
                            Ember.$.ajax(API_Base_Url + 'users/' + APP_Cookies.getCookie(APP_Cookies.userID) + '/location', {
                                "type": 'POST',
                                "dataType": 'JSON',
                                "headers": {
                                    "Content-Type": 'application/json'
                                },
                                "data": JSON.stringify({
                                    clientPlatformId: APP_Client_Platform.WEB,
                                    timestamp: new Date().getTime(),//parseInt(new Date().getTime()/1000),
                                    latitude: position.coords.latitude,//36.75,//
                                    longitude: position.coords.longitude//-119.77//
                                }),
                                "success": function (data, textStatus, jqXHR) {
                                    HideLoadingImage();
                                    console.log('location 200')
                                },
                                "error": function (jqXHR, textStatus, errorThrown) {
                                    HideLoadingImage();
                                    if (jqXHR.status == 200) {
                                        console.log('location empty 200');
                                        APP_Storage.setValue(APP_Storage.userLocationInfo(), position.coords.latitude + "," + position.coords.longitude, false, true);

                                        var geoCoder = new google.maps.Geocoder();
                                        geoCoder.geocode({'latLng': new google.maps.LatLng(position.coords.latitude , position.coords.longitude)}, function (results, status) {
                                            if (status == google.maps.GeocoderStatus.OK && results.length && results[0]) {
                                                APP_Storage.setValue(APP_Storage.userLocatorInfo(), results[0].formatted_address, false, true);
                                            }
                                            //error message not displayed here because it will not effect local feed request as it doesn't depend in locator
                                            //we may get locator later in yelp/search
                                        });

                                        $('#loctooltip').fadeOut(0);
                                        $('#loctooltip').tooltip('hide');
                                        //this may change later if we separate the both endpoint in this case we will remove top 2 values related to local post only
                                        APP_Storage.removeValues([APP_Storage.facebookLocalPost, APP_Storage.facebookLocalPostLastModified
                                            //,APP_Storage.facebookPost,APP_Storage.facebookPostLastModified
                                        ]);

                                        //to show sync message so user feel something has changed after provide his location
                                        _self.set('fBLocalPosts', []);
                                        _self.notifyPropertyChange('fBLocalPosts');

                                        //** now sync is happen automatically
                                        App.SynchronizeService.resetSyncService();
                                        _self.notifyPropertyChange('model');//start sync now

                                        //SyncFbActivities();//user push instead of replace but we have to notify observer as search
                                        //Ember.run.later(SyncFbLocalActivities, 3000);
                                        //SyncFbLocalActivities();
                                    } else {
                                        SetErrorMessage(jqXHR,APP_External_Network.Facebook)
                                    }
                                }
                            })
                        }, function (error) {
                            //alert(error.code)
                            console.log('** share fb location error ' + error.code);
                            switch (error.code) {
                                case error.PERMISSION_DENIED:
                                    APP_Storage.setValue(APP_Storage.userLocationInfo(), APP_Location_Error.PermissionDenied, false, true);
                                    $('#loctooltip').fadeOut(0);
                                    $('#loctooltip').tooltip('hide');
                                    App.growl.info("You has denied permission to get you location ; you won't able to get local news feed anymore");
                                    break;
                                case error.POSITION_UNAVAILABLE:
                                    APP_Storage.setValue(APP_Storage.userLocationInfo(), APP_Location_Error.Unavailable, false, true);
                                    App.growl.info("We failed to get your location ; please try again later");
                                    break;
                                case error.TIMEOUT:
                                    APP_Storage.setValue(APP_Storage.userLocationInfo(), APP_Location_Error.TimeOut, false, true);
                                    App.growl.info("Request to get your location has timed out ; please try again");
                                    break;
                                case error.UNKNOWN_ERROR:
                                    APP_Storage.setValue(APP_Storage.userLocationInfo(), APP_Location_Error.Unknown, false, true);
                                    App.growl.info("Unknown error while detecting you location ; please try again later");
                                    break;
                            }
                        },
                        //options
                        {
                            timeout: 30000
                        });
                } else {
                    APP_Storage.setValue(APP_Storage.userLocationInfo(), APP_Location_Error.NotSupported, false, true);
                    $('#loctooltip').fadeOut(0);
                    $('#loctooltip').tooltip('hide');
                    App.growl.info("Sorry,GeoLocation is not supported by this browser");
                }
            }
        },
        FacebookLogin:  function() {
            if(Modernizr.touch && (APP_Storage.getValue(APP_Storage.appTypeStorage)=="webviewIOS" || APP_Storage.getValue(APP_Storage.appTypeStorage)=="webviewAndriod")){
                location.href='customauth/facebook.html';
            }else{
                LoginToFacebook(function(response,params,longToken){
                    if (response.authResponse) {
                        if(!longToken){
                            console.log('no token')
                        }
                        console.log(longToken)
                        activatefacebook(longToken);//response.authResponse.accessToken);
                    }else{
                        console.log('User cancelled login or did not fully authorize.');
                    }
                },{},Facebook_Scope_Read)//,false,true)//not auth type , and not call exchange token
                /*FB.login(function(response) {
                 if (response.authResponse) {
                 console.log('Welcome!  Fetching your information.... ');
                 console.log(response.authResponse.accessToken);
                 var resultDiv = document.getElementById('facebookResult');
                 activatefacebook(response.authResponse.accessToken);
                 } else {
                 console.log('User cancelled login or did not fully authorize.');
                 }
                 },Facebook_Scope);*/
            }
        },
        displayData:function(dataType,id,model){
            //alert(typeof(id))
            //alert(model != this.get('lastDisplayedModel'))
            if(lastDisplayedFBID != id || lastDisplayedFBType != dataType || (model && model != this.get('lastDisplayedModel'))){

                lastDisplayedFBID = id;
                lastDisplayedFBType = dataType;

                this.set('lastDisplayedModel',model);

                Ember.$(".searchInnerContent").fadeOut(0);
                if(dataType=='Message'){

                    this.set('isModelUpdated.messages',false);

                    Ember.$('#fb_msg_details').fadeIn(0);
                    if(id==-1){
                        this.set('fBMessagesDetails',[])
                    }else{
                        Em.$('#fb_message_data').val('');
                        var model = this.get('fBMessages')[id];
                        this.set('fBMessagesDetails',model.conversation)
                    }
                    //console.log('message type : '+(this.get('fBMsgs')[id].externalSearch))
                }else if(dataType=='Activity'){
                    var posts = this.get('fBPosts');
                    var localPosts = this.get('fBLocalPosts');
                    var recommendPosts = this.get('fBRecommendedPosts');

                    var ignoreBookmark=false;
                    if(posts.length>=id && posts[id]==model){
                        this.set('isModelUpdated.activities',false);
                    }else if(localPosts.length>=id && localPosts[id]==model){
                        this.set('isModelUpdated.localActivities',false);
                    }else if(recommendPosts.length>=id && recommendPosts[id]==model){
                        ignoreBookmark=true;
                        this.set('isModelUpdated.recommended',false);
                    }

                    Ember.$('#fb_post_details').fadeIn(0);

                    this.set('fBPostsDetails',[model]);

                    if(!ignoreBookmark){
                        console.log(model)
                        Ember.$.ajax(API_Base_Url+"social/users/"+getCookie(APP_Cookies.userID)+"/activities/engaged", {
                            "type": 'POST', "dataType": 'JSON',headers: { 'Content-type': 'application/json' },
                            "data": JSON.stringify(
                                {
                                    activities:SecureAjaxData([model])
                                }
                            )
                            ,"success": function (data, textStatus, jqXHR) {}, "error": function (jqXHR, textStatus, errorThrown) {
                                if(jqXHR.status!=200) {
                                    SetErrorMessage(jqXHR,APP_External_Network.Facebook)
                                }
                            }
                        })
                    }
                    //console.log('message type : '+(this.get('fBPosts')[id].externalSearch))
                }
                Ember.$('#fbContent').css('borderWidth','1px');
                Ember.$('#searchFacebookTitle').fadeIn(0);
            }
        },
        CheckPostToken:function(){

            if(FbPostInProgress){
                console.log('in progress....')
                return;
            }

            Em.$('.fb_post_error').fadeOut(0)//so user feel new error if happens again
            //check all files processed
            if(fbFileId != fbFilesRaw.length){
                console.log('files in progress')
                return;
            }
            for(var i=0;i<fbFilesRaw.length;i++){
                if(typeof(fbFilesRaw[i])=="undefined"){
                    console.log('file id : '+i+' in progress')
                    return;
                }
            }

            //if FbAccessToken==null
                //FacebookLoginStatus()
                //if connected
                    //set token
                //else
                    //LoginToFacebook() >> include post permission
                    //set token
            //else
                //use token
            //

            FbPostRetry=0;

            //Em.$('#fb_upload_button').off('click').attr('onclick','');//remove onclick as it not add by on jquery so we have manual remove

            var _self=this;
            //only happen before first post in user life [key cleared in login()]
            // || storage cleared without user refresh
            ShowLoadingImage();

            //APP_Storage.removeValues([APP_Storage.facebookTokenKey()])

            if(APP_Storage.getValue(APP_Storage.facebookTokenKey())==null || APP_Storage.getValue(APP_Storage.facebookUserID(),0)==0){
                FacebookLoginStatus(
                    true,//force login even connected because we need the token here
                    function(response,callbackParam){
                        if (response.authResponse) {
                            FbPostInProgress=true;
                            PostToFacebook({},callbackParam)
                        }
                    },this.getPostData(),Facebook_Scope_Read+','+Facebook_Scope_Publish)
            }else{
                //alert(this.getPostData().toSource())
                FbPostInProgress=true;
                PostToFacebook({},this.getPostData());
            }
        }
    }
});