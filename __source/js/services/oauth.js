/**
 * Created by mahmoud on 16-Nov-14.
 */
    App.OauthService = App.Service.extend({});

    App.OauthService.reopenClass({
        saveContactInfo:function(contact){
            var networkId = -1;
            if(contact.identity){
                networkId = contact.identity.externalNetworkId;
            }
            var oauthOption = App.CONSTANT.network[networkId].authorization;
            if(oauthOption && oauthOption.contactStorageKeys) {
                _.each(oauthOption.contactStorageKeys, function (storageKey, property) {
                    if (contact[property]) {
                        APP_Storage.setValue(storageKey, contact[property], false, true);
                    }
                })
            }
        },
        isNetworkActivated : function(networkId,forceCheck){
            if(APP_Cookies.getCookie(APP_Cookies.userID,null)) {
                var oauthOption = App.CONSTANT.network[networkId].authorization;
                if (oauthOption && oauthOption.userId) {
                    var dataMissing = false;
                    //use the following conditions for http only as https storage not properly cleared sometimes
                    if(location.protocol.indexOf('https') == -1 && !forceCheck) {
                        if (APP_Storage.getValue(oauthOption.userId) && (networkId != App.CONSTANT.linkedinId || APP_Cookies.getCookie(APP_Cookies.linkedInExpired) == "")) {
                            if (oauthOption.contactStorageKeys) {
                                _.each(oauthOption.contactStorageKeys, function (storageKey, property) {
                                    if (!APP_Storage.getValue(storageKey)) {
                                        dataMissing = true;
                                    }
                                })
                            }
                            if (!dataMissing) {
                                return true;
                            }
                        } else if (networkId == App.CONSTANT.linkedinId) {
                            //clear of cookie should only happen from call on http collection cuz it should happen when we clear expire of linkedin from https storage
                            var tokenExpired = APP_Storage.getValue(APP_Storage.userTokenExpired, {}, true);
                            if (APP_Cookies.getCookie(APP_Cookies.linkedInExpired) == "reset") {
                                APP_External_Network.setExpired(false, networkId);
                            } else if (tokenExpired[networkId]) {
                                APP_External_Network.setExpired(true, networkId);//set the cookie again , if it was reset
                            }
                        }
                    }else{
                        APP_Storage.removeValues(oauthOption.userId)
                    }
                    var userInfo = APP_External_Network.getIdentity(networkId);
                    if (userInfo.length) {
                        APP_Storage.setValue(oauthOption.userId, userInfo[0].identifier, false, true);
                        if(networkId != App.CONSTANT.linkedinId) {
                            APP_External_Network.setExpired(false, networkId);
                        }
                        if (oauthOption.contactStorageKeys && userInfo[1]) {
                            this.saveContactInfo(userInfo[1]);
                        }
                        return true;
                    }else{
                        APP_Storage.removeByNetwork(App.CONSTANT.network[networkId].name);
                    }
                } else if (networkId == APP_External_Network.Yelp) {
                    return true;
                }
            }
            return false;
        },
        oauth1:{
            requestToken : function(param,options){
                //params : externalNetworkId , clientPlatformId , redirectUrl , code
                //options : [saveSecret,secretCookieKey,redirect,redirectParams]

                var oauthService = App.OauthService;//can;t use this here because it will reference to oauth1 object no the service itself

                if(_.isUndefined(param.externalNetworkId) || param.externalNetworkId < 0){
                    alert('invalid oauth1 request network id not provided');//developer error alert
                    return;
                }
                param.clientPlatformId = _.isUndefined(param.clientPlatformId) ? APP_Client_Platform.WEB : param.clientPlatformId;
                param.redirectUrl = _.isUndefined(param.redirectUrl) ? (location.href.split('#')[0].split('?')[0]) : param.redirectUrl;
                param.code = _.isUndefined(param.code) ? "code" : param.code;

                return Ember.$.ajax(oauthService.baseUrl + 'users/' + oauthService.userId + '/requesttoken', {
                    "type": 'POST',
                    "dataType": 'JSON',
                    "headers": {
                        "Content-Type": 'application/json'
                    },
                    "data": JSON.stringify(param),
                    "success": function (data, textStatus, jqXHR) {
                        var networkName = App.CONSTANT.get('network')[param.externalNetworkId].name;
                        var cookieKey = (options && options.secretCookieKey) ? options.secretCookieKey : (networkName+'_secret');
                        if(options && options.saveSecret && data.oauthTokenSecret){
                            APP_Cookies.setCookie(cookieKey, data.oauthTokenSecret, 1,true);
                        }
                        console.log(data);
                        if(options && options.redirect && options.redirectParams && options.redirectParams.url){
                            options.redirectParams = $.extend(options.redirectParams,{
                                oauth_token:data.oauthToken
                            });

                            oauthService.oauth1.redirectUser(options.redirectParams.url , options.redirectParams);
                        }
                    },
                    "error": function (jqXHR, textStatus, errorThrown) {
                        console.log(jqXHR);
                    }
                });
            },
            redirectUser : function(url,param){
                //location.href = 'https://api.twitter.com/oauth/authorize?oauth_token=' + code;
                if(_.isUndefined(url)){return;}
                if(!_.isUndefined(param)){
                    var parameters= [];
                    _.each(param,function(value,name){
                        if(name != 'url'){
                            parameters.push(name+'='+value);
                        }
                    });
                    url = url + (parameters.length ? '?' : '') + parameters.join('&');
                }
                console.log(url);
                location.href = url;
            },
            authorize : function(param,options){
                //params : externalNetworkId , clientPlatformId , redirectUrl , code , oauthToken , oauthTokenSecret ,
                //options : [redirectToSync,secretCookieKey]

                var oauthService = App.OauthService;//can;t use this here because it will reference to oauth1 object no the service itself

                // oauthToken = oauth_token param in redirect and code = oauth_verifier in redirect
                if(_.isUndefined(param.oauthToken) || _.isUndefined(param.code) || _.isUndefined(param.externalNetworkId) || param.externalNetworkId < 0){
                    alert('invalid oauth1 authorize parameters');//developer error alert
                    return;
                }
                var networkName = App.CONSTANT.get('network')[param.externalNetworkId].name;
                var cookieKey = (options && options.secretCookieKey) ? options.secretCookieKey : (networkName+'_secret');
                if(!param.oauthTokenSecret && APP_Cookies.getCookie(cookieKey)==""){
                    alert('invalid oauth1 authorize parameters.');//developer error alert
                    return;
                }

                param.clientPlatformId = _.isUndefined(param.clientPlatformId) ? APP_Client_Platform.WEB : param.clientPlatformId;
                param.oauthTokenSecret = _.isUndefined(param.oauthTokenSecret) ? APP_Cookies.getCookie(cookieKey) : param.oauthTokenSecret;

                return Ember.$.ajax(oauthService.baseUrl + 'users/' + oauthService.userId + '/authorized', {
                    "type": 'POST',
                    "dataType": 'JSON',
                    "headers": {
                        "Content-Type": 'application/json'
                    },
                    "data": JSON.stringify(param),
                    "success": function (data, textStatus, jqXHR) {
                        APP_Cookies.removeCookie(cookieKey);
                        APP_External_Network.setExpired(false,param.externalNetworkId);
                        if(options && options.redirectToSync) {
                            setTimeout(function () {
                                App.utilities.redirectToUrl('/#/sync?network=' + param.externalNetworkId);
                            }, 10);
                        }
                        console.log(data);
                    },
                    "error": function (jqXHR, textStatus, errorThrown) {
                        APP_Cookies.removeCookie(cookieKey);
                        console.log(jqXHR);
                    }
                })
            }
        },
        oauth2:{
            redirectUser : function(url,param,options){
                //param : client_id,redirect_uri,response_type,[state]
                //options : (externalNetworkId || stateCookieKey)
                if(_.isUndefined(param.client_id) || _.isUndefined(url)){
                    alert('invalid oauth2 redirection parameters');//developer error alert
                    return;
                }
                param.redirect_uri = _.isUndefined(param.redirect_uri) ? (location.href.split('#')[0].split('?')[0]) : param.redirect_uri;
                param.response_type = _.isUndefined(param.response_type) ? "code" : param.response_type;
                param.state = _.isUndefined(param.state) ? (new Date().getTime()) : param.state;

                var cookieKey;

                if(options && options.stateCookieKey){
                    cookieKey = options.stateCookieKey;
                }else if(options && !_.isUndefined(options.externalNetworkId) && options.externalNetworkId >= 0){
                    var networkName = App.CONSTANT.get('network')[options.externalNetworkId].name;
                    cookieKey = networkName+'_state';
                }
                if(cookieKey){
                    APP_Cookies.setCookie(cookieKey, param.state, 1,true);
                }

                var parameters= [];
                _.each(param,function(value,name){
                    parameters.push(name+'='+value);
                });
                url = url + '?' + parameters.join('&');
                console.log(url);

                location.href = url;
            },
            authorize : function(param,options){
                //params : externalNetworkId , clientPlatformId , redirectUrl , code
                //options:[redirectToSync,stateCookieKey,state]

                var oauthService = App.OauthService;//can;t use this here because it will reference to oauth2 object no the service itself

                if(_.isUndefined(param.code) || _.isUndefined(param.externalNetworkId) || param.externalNetworkId < 0){
                    alert('invalid oauth2 authorize parameters');//developer error alert
                    return;
                }
                var networkName = App.CONSTANT.get('network')[param.externalNetworkId].name;
                var cookieKey = (options && options.stateCookieKey) ? options.stateCookieKey : (networkName+'_state');
                if(options && options.state && APP_Cookies.getCookie(cookieKey)!="" && (APP_Cookies.getCookie(cookieKey) != options.state)){
                    alert('invalid oauth2 token');//user/developer error alert
                    return;
                }

                param.clientPlatformId = _.isUndefined(param.clientPlatformId) ? APP_Client_Platform.WEB : param.clientPlatformId;
                param.redirectUrl = _.isUndefined(param.redirectUrl) ? (location.href.split('#')[0].split('?')[0]) : param.redirectUrl;

                return Ember.$.ajax(oauthService.baseUrl + 'users/' + oauthService.userId + '/authorized', {
                    "type": 'POST',
                    "dataType": 'JSON',
                    "headers": {
                        "Content-Type": 'application/json'
                    },
                    "data": JSON.stringify(param),
                    "success": function (data, textStatus, jqXHR) {

                        APP_Cookies.removeCookie(cookieKey);
                        APP_External_Network.setExpired(false,param.externalNetworkId);
                        if(options && options.redirectToSync) {
                            setTimeout(function () {
                                App.utilities.redirectToUrl('/#/sync?network=' + param.externalNetworkId);
                            }, 10);
                        }
                        console.log(data);
                    },
                    "error": function (jqXHR, textStatus, errorThrown) {

                        APP_Cookies.removeCookie(cookieKey);
                        console.log(jqXHR);
                    }
                })
            }
        }
    });