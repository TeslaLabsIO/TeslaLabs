/**
 * Created by mahmoud on 7/6/14.
 */
var APP_Location_Error={
    NotSupported:"not_supported",
    PermissionDenied:"permission_denied",
    Unavailable:"unavailable",
    TimeOut:"timeout",
    Unknown:"unknown"
};
var APP_External_Network={
    ParamName:"externalNetworkId",
    Twitter:0,
    Facebook:1,
    Yahoo:2,
    LinkedIn:3,
    Google:4,
    YouTube:5,
    Vimeo:6,
    Netflix:7,
    Yelp:8,
    Tumblr:9,
    Reddit:10,
    setExpired:function(expired,networkId){
        networkId = _.isUndefined(networkId) ? App.PollingManager.getNetworkIdName().id : networkId;
        networkId = (networkId==this.YouTube ? this.Google : networkId);
        var tokenExpired = APP_Storage.getValue(APP_Storage.userTokenExpired,{},true);
        tokenExpired[networkId] = expired;
        APP_Storage.setValue(APP_Storage.userTokenExpired,tokenExpired,true);
        //
        if(networkId==this.LinkedIn){
            if(expired==true){
                APP_Cookies.setCookie(APP_Cookies.linkedInExpired,"true",365);
            }else{
                //this will called from ( https ) OR ( http in case value of cookie was = reset ... look at js/services/oauth )
                if(location.protocol.indexOf('https') != -1) { //on https
                    APP_Cookies.setCookie(APP_Cookies.linkedInExpired, "reset", 365);
                }else{ //on http we should clear the cookie to prevent condition on isNetworkActivated on js/service/oauth cuz it depends on val==reset
                    APP_Cookies.removeCookie(APP_Cookies.linkedInExpired);
                }
            }
        }
    },
    getIdentity:function(networkId,error){
        var identities = [];
        var tokenExpired = APP_Storage.getValue(APP_Storage.userTokenExpired,{},true);
        networkId = (networkId==this.YouTube ? this.Google : networkId);
        //token from http storage not expired and not linkedin >> get identity
        //token from this protocol storage not expired and is linkedin and not expired on other protocol

        //if(!tokenExpired[networkId] && (networkId!=this.LinkedIn || APP_Cookies.getCookie(APP_Cookies.linkedInExpired)=="")) {
        if(networkId!=this.LinkedIn || (!tokenExpired[networkId] && APP_Cookies.getCookie(APP_Cookies.linkedInExpired)=="")){
            Ember.$.ajax(API_Base_Url + 'users/' + getCookie(APP_Cookies.userID) + '/identities', {
                async: false, //prevent request return before get identites
                type: 'GET',
                "dataType": 'JSON', headers: {"Content-Type": 'application/json'},
                success: function (data, textStatus, jqXHR) {
                    //identities = data.identities ? data.identities : data;
                    identities = data.contacts ? data.contacts : data;
                    if (typeof(networkId) != "undefined") {
                        var result = [];
                        for (var i = 0; i < identities.length; i++) {
                            if (identities[i].identity.externalNetworkId == networkId) {
                                //{externalNwId,identifier} , {contact object}
                                result = [identities[i].identity,identities[i]];//this method should always return array
                                break;
                            }
                        }
                        identities = result;//this method should always return array
                    }
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    if(_.isArray(error)){
                        error[0]=true;
                    }
                }
            });
        }
        return identities;//this method should always return array
    }
};
var APP_Client_Platform={
    ParamName:"clientPlatformId",
    Android:0,
    IOS:1,
    WEB:2
};
jQuery.extend(APP_Client_Platform,
    {
        Current:(function() {
            SetAppType('constant')
            if(APP_Storage.getValue(APP_Storage.appTypeStorage)=="webviewIOS"){
                return APP_Client_Platform.IOS;
            }else if(APP_Storage.getValue(APP_Storage.appTypeStorage)=="webviewAndriod"){
                return APP_Client_Platform.Android;
            }else{
                return APP_Client_Platform.WEB;
            }
        })() //it will be called in first loading and will not change even type change without reload page
    }
);