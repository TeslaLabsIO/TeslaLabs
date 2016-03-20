(function () {
    'use strict';
    App.AuthorizeController = Ember.ObjectController.extend({
        queryParams: ['network','oauth_token','oauth_verifier','state','code'],
        network: null,
        oauth_token: null,
        oauth_verifier: null,
        state: null,
        code: null,
        authorizationCallback:false,
        networkImage: '/images/network/login/tumblr.png',
        // functions
        reset: function () {
            //reset controller properties
        },
        isAccessAllowed : function(networkId,model){
            var constant = this.get('constant');
            var utilities = this.get('utilities');
            if(!constant.network[networkId]){ //if network not exist
                if(model){
                    model.transitionTo('/');
                }else{
                    utilities.redirectToUrl('/#/');
                }
            }else{
                //network that support oauth1 or oauth2
                var supportedNetworks = [constant.twitterId,constant.vimeoId,constant.tumblrId,constant.redditId];

                networkId = Number(networkId);//as we will use it in indexOf method which should match variable type in array

                var networkActivated = App.OauthService.isNetworkActivated(networkId,true);

                if(networkActivated || supportedNetworks.indexOf(networkId) == -1){
                    if(model){
                        model.transitionTo('/' + constant.network[networkId].name);
                    }else{
                        utilities.redirectToUrl('/#/' + constant.network[networkId].name);
                    }
                }else{
                    return true;
                }
            }
            return false;
        },
        saveContactInfo : function(networkOauth,response){
            APP_Storage.setValue(networkOauth.userId, response.identity.identifier, false, true);
            App.OauthService.saveContactInfo(response);
        },
        // observers
        networkChanged: function () {
            // references
            var networkId = this.get('network');

            if (!networkId) {//this is string value so it will pass '0'
                return;
            }
            if(this.isAccessAllowed(networkId)) {
                this.set('networkImage', '/images/network/login/' + this.get('constant.network')[this.get('network')].name + '.png');
                if (this.get('code') || this.get('state') || this.get('oauth_token') || this.get('oauth_verifier')) {
                    this.set('authorizationCallback', true);
                    this.send('onAuthorizationCallback', networkId);
                }

                App.SynchronizeService.resetSyncService();
                this.reset();
            }
        }.observes('network'),
        actions: {
            onLoginClick: function (networkId) {
                var oauthType = this.get('constant').authorization;
                var networkOauth = this.get('constant').network[networkId].authorization;
                var serviceParameters = networkOauth.serviceDefaultParameters;
                var serviceOptions = networkOauth.serviceDefaultOptions;

                if(networkOauth.oauth == oauthType.oauth1){
                    ShowLoadingImage();
                    serviceParameters = $.extend(true,{},serviceParameters,{
                        externalNetworkId : networkId
                    });
                    var serviceUrl;
                    if(networkOauth.serviceUrl){
                        serviceUrl = networkOauth.serviceUrl;
                    }

                    serviceOptions.redirectParams = serviceOptions.redirectParams ? serviceOptions.redirectParams : {};
                    if(serviceOptions.redirectParams.url){
                        serviceUrl = serviceOptions.redirectParams.url;
                    }else{
                        serviceOptions.redirectParams.url = serviceUrl;
                    }

                    serviceOptions.saveSecret = true;//force secret save

                    App.OauthService.oauth1.requestToken(serviceParameters,serviceOptions).then(
                        function(response){
                            //will not executed if {redirect} is set to true on options
                            if(!serviceOptions.redirect){
                                var redirectParameters = $.extend(true,{},serviceOptions.redirectParams,{
                                    oauth_token:response.oauthToken
                                });
                                App.OauthService.oauth1.redirectUser(serviceUrl , redirectParameters);
                            }
                        },function(response){
                            HideLoadingImage();
                            SetErrorMessage(response, networkId);
                        }
                    );
                }else if(networkOauth.oauth == oauthType.oauth2){
                    serviceOptions = $.extend(true,{},serviceOptions,{
                        externalNetworkId : networkId
                    });
                    App.OauthService.oauth2.redirectUser(networkOauth.serviceUrl,serviceParameters,serviceOptions);
                }
            },
            onAuthorizationCallback: function(networkId){
                var oauthType = this.get('constant').authorization;
                var networkOauth = this.get('constant').network[networkId].authorization;
                var networkName = this.get('constant').network[networkId].name;
                var authorizeParameters = networkOauth.authorizeDefaultParameters;
                var authorizeOptions = networkOauth.authorizeDefaultOptions;
                var controller = this;
                var callback = false;

                setTimeout(function(){
                    if(!callback){ // as after model in app.js hide loading image after it's show here
                        ShowLoadingImage();
                    }
                },100);

                if(networkOauth.oauth == oauthType.oauth1){
                    authorizeParameters = $.extend(true,{},authorizeParameters,{
                        externalNetworkId : networkId,
                        oauthToken: controller.get('oauth_token'),
                        code: controller.get('oauth_verifier')
                    });
                    App.OauthService.oauth1.authorize(authorizeParameters,authorizeOptions).then(
                        function (response) {
                            callback = true;
                            HideLoadingImage();

                            controller.saveContactInfo(networkOauth,response);

                            if(!authorizeOptions.redirectToSync){
                                App.utilities.redirectToUrl('/#/sync?network='+networkId);
                            }
                        },function(jqXHR){
                            callback = true;
                            HideLoadingImage();
                            SetErrorMessage(jqXHR, networkId);

                            setTimeout(function () {
                                App.utilities.redirectToUrl('/#/authorize?network='+networkId);//reload page without parameters
                            }, 2000)
                        }
                    );
                }else if(networkOauth.oauth == oauthType.oauth2){
                    authorizeParameters = $.extend(true,{},authorizeParameters,{
                        externalNetworkId : networkId,
                        code: controller.get('code')
                    });
                    authorizeOptions = $.extend(true,{},authorizeOptions,{
                        state: controller.get('state')
                    });

                    App.OauthService.oauth2.authorize(authorizeParameters,authorizeOptions).then(
                        function (response) {
                            callback = true;
                            HideLoadingImage();

                            controller.saveContactInfo(networkOauth,response);

                            if(!authorizeOptions.redirectToSync) {
                                App.utilities.redirectToUrl('/#/sync?network=' + networkId);
                            }
                        },function(response){
                            callback = true;
                            HideLoadingImage();
                            SetErrorMessage(response,networkId);

                            setTimeout(function () {
                                App.utilities.redirectToUrl('/#/authorize?network='+networkId);//reload page without parameters
                            }, 2000)
                        }
                    );
                }
            }
        }
    });
})();