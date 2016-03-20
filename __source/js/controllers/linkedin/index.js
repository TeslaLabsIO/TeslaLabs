/**
 * Created by mahmoud on 8/10/14.
 */
function getLinkedInProfile(){
    console.log('fetch profile')
    IN.API.Profile("me")
        .method("GET")
        .fields("id", "first-name", "last-name", "headline")
        .result( function(r) {
            console.log(r);
            var user = r.values[0];
            var msg = user.firstName + " " + user.lastName + " is " + user.headline + ".";
            console.log(msg);
        }
    );
}
//called when linkedin script finish loading
function onLinkedInFrameLoad(){
    console.log(IN.User.isAuthorized()?'authorized':'not auth');
    IN.Event.on(IN, 'auth', function(){
        console.log('auth event fired')
        if(IN.User.isAuthorized()){//called after auth ,aslo when user is already auth when open linkedin page
            getLinkedInProfile();
        }
    })
}
App.LinkedinController = Ember.ObjectController.extend({
    lastDisplayedLinkedInID : -1,//will be reset in deactivate route

    postStatusInProgress : false,
    linkedinStatus : '',

    entityModelMap : {
        activities : 'linkedInPosts'
    },
    isModelUpdated : {
        activities : false
    },
    scrollPosition : {
        activities : 0
    },
    modelLoaded : function(){
        //alert('x')
        if (APP_Storage.getValue(APP_Storage.linkedInUserID()) != null && location.protocol.indexOf('https') == -1) {
            var controller = this;
            var contactService = controller.container.lookup('contacts:service');
            App.PollingManager.startNetworkSync(
                APP_External_Network.LinkedIn,
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
                            //@TODO update current display element details :: what if element is removed on the new list ??
                        }
                    }
                },
                function (entityName, entitySyncOptions, jqXHR, textStatus, errorThrown) {//error function

                }
            )
        }
    }.observes('model'),

    linkedInPostsLoaded : function() {
        var controller = this;
        Ember.run.scheduleOnce('afterRender', this, function() {
            ConvertTextElementToHtml('.linkedin_post_html');
            $("#linkedin_post_results").mCustomScrollbar({
                callbacks:{
                    onScroll:function(){
                        controller.set('scrollPosition.activities',this.mcs.top);
                        controller.set('isModelUpdated.activities',false);
                    }
                }
            });
        });
    }.observes('linkedInPosts'),
    linkedinPostsDetailsLoaded : function() {
        Ember.run.scheduleOnce('afterRender', this, function() {
            ConvertTextElementToHtml('.linkedin_post_details_html');
            setTimeout(function(){
                $("#linkedContent").mCustomScrollbar("scrollTo","top")
            },100)
        });
    }.observes('linkedinPostsDetails'),
    actions:{
        postStatus:function(){
            //postStatusInProgress
            //linkedinStatus
            if(this.get('linkedinStatus') && this.get('linkedinStatus').trim()!=""){
                if(this.get('postStatusInProgress')){
                    return;
                }
                var _self = this;
                this.set('postStatusInProgress',true)
                ShowLoadingImage()
                Ember.$.ajax(API_Base_Url+"social/users/"+getCookie(APP_Cookies.userID)+"/providers/"+APP_External_Network.LinkedIn+"/activities", {
                    "type": 'POST', "dataType": 'JSON',headers: { 'Content-type': 'application/json' },
                    "data": JSON.stringify(
                        {
                            body:this.get('linkedinStatus'),
                            activityTypeId:3
                        }
                    ),
                    success: function (data, textStatus, jqXHR) {
                        HideLoadingImage()
                        _self.set('postStatusInProgress',false)
                        _self.set('linkedinStatus','')

                        Em.$('#linkedin_status').addClass('success_border_color')
                        setTimeout(function(){
                            Em.$('#linkedin_status').removeClass('success_border_color')
                        },1000)
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        HideLoadingImage()
                        _self.set('postStatusInProgress',false)
                        if(jqXHR.status==200){
                            _self.set('linkedinStatus','')
                            Em.$('#linkedin_status').addClass('success_border_color')
                            setTimeout(function(){
                                Em.$('#linkedin_status').removeClass('success_border_color')
                            },1000)
                        }else{
                            SetErrorMessage(jqXHR,APP_External_Network.LinkedIn)
                        }
                    }
                })
            }
        },
        displayData:function(dataType,id){
            if(this.get('lastDisplayedLinkedInID') != id){
                this.set('lastDisplayedLinkedInID',id);

                Ember.$(".searchInnerContent").fadeOut(0);

                var model = this.get('linkedInPosts')[id];

                Ember.$('#linkedin_post_details').fadeIn(0);
                this.set('linkedinPostsDetails',[model]);
                this.set('isModelUpdated.activities',false);

                console.log(model);
                Ember.$.ajax(API_Base_Url+"social/users/"+getCookie(APP_Cookies.userID)+"/activities/engaged", {
                        "type": 'POST', "dataType": 'JSON',headers: { 'Content-type': 'application/json' },
                        "data": JSON.stringify(
                            {
                                activities:[model]
                            }
                        )
                        ,"success": function (data, textStatus, jqXHR) {}, "error": function (jqXHR, textStatus, errorThrown) {
                            if(jqXHR.status!=200) {
                                SetErrorMessage(jqXHR,APP_External_Network.LinkedIn)
                            }
                        }
                    })

                Ember.$('#linkedContent').css('borderWidth','1px');
            }
        },
        LinkedInLogin:  function() {
            IN.User.authorize(function(){
                App.LinkedinService.authenticate()
            });
        }
    }
});