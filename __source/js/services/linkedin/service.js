/**
 * Created by mahmoud on 8/10/14.
 */
App.LinkedinService = Ember.Object.extend({});

//add static method applied to instance

App.LinkedinService.reopenClass({
    authenticate : function(){
        if(IN.User.isAuthorized()){//APP_Storage.getValue(APP_Storage.linkedInUserID())==null&&
            ShowLoadingImage();
            jQuery.ajax(API_Base_Url+'users/'+getCookie(APP_Cookies.userID)+'/authenticatedlinkedin',{
                "type": 'GET',
                "dataType": 'JSON',
                "headers":{
                    "Content-Type":'application/json'
                },
                "success":function(data, textStatus, jqXHR){
                    APP_External_Network.setExpired(false,APP_External_Network.LinkedIn);
                    APP_Storage.setValue(APP_Storage.linkedInUserID(),data.identity.identifier,false,true);

                    HideLoadingImage();
                    setTimeout(function(){
                        //location.reload();
                        // redirect to sync tool-tip page

                        //App.utilities.redirectToUrl('/#/sync?network='+APP_External_Network.LinkedIn);
                        //redirect to sync on http
                        location.href = location.href.replace(location.hash,'#/sync?network='+APP_External_Network.LinkedIn).replace('https','http');

                        //location.protocol='http';
                    },10);
                },
                "error":function(jqXHR, textStatus, errorThrown){
                    HideLoadingImage();
                    window.console.log(jqXHR,APP_External_Network.LinkedIn);

                    SetErrorMessage(jqXHR,location.hash.substring(1));
                    //window.location='#dashboard';
                }
            })
        }
    }
});