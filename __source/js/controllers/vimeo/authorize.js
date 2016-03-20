(function () {
    'use strict';
    App.VimeoAuthorizeController = Ember.Controller.extend({
        queryParams: ['state','code'],
        // dependencies
        needs: [], // allow access to parent "VimeoController" !!can take array ore string item!!
        service: App.VimeoService,
        // data
        state:null,
        code: null,
        redirectUrl: Vimeo_Callback_Url,
        // computed properties
        authorizeUrl: function () {
            // set vimeo auth requires state parameter to unique value
            var state = new Date().getTime();
            // save vimeo state value to vimeoAuthState cookie
            APP_Cookies.setCookie(APP_Cookies.vimeoAuthState, state, 1);
            // return vimeo auth url
            return 'https://api.vimeo.com/oauth/authorize'
                + '?response_type=code'
                + '&client_id=' + Vimeo_Api_Key
                + '&scope=private interact public'
                + '&state=' + state
                + '&redirect_uri=' + this.get('redirectUrl');

        }.property('redirectUrl'),
        isAuthorized: function () {
            var state, code, vimeoAuthState, isAuthorized;
            state = this.get('state');
            code = this.get('code');
            vimeoAuthState = APP_Cookies.getCookie(APP_Cookies.vimeoAuthState);
            // check authorization status
            if (code && state && state == vimeoAuthState) { // user is authorized and user code should sent to server
                // send vimeo auth code to server to exchange it with user access token
                this.authorize(code);
                // user is authorized
                isAuthorized = true;
            }
            else {  // user is not authorized and login button should display
                isAuthorized = false;  // user is not authorized
            }
            // clear state cookie
            APP_Cookies.removeCookie(APP_Cookies.vimeoAuthState);
            // return authorization status
            return isAuthorized;
        }.property('code', 'state'),
        // functions
        authorize: function () {
            var controller = this;
            // send vimeo auth code to server to exchange it with user access token
            App.OauthService.oauth2.authorize(
                {
                    code: this.get('code'),
                    redirectUrl: this.get('redirectUrl'),
                    externalNetworkId: APP_External_Network.Vimeo
                },{
                    state: this.get('state'),
                    stateCookieKey: APP_Cookies.vimeoAuthState
                }
            ).then(function (response) {
                // set vimeoUserID for long activation
                APP_Storage.setValue(APP_Storage.vimeoUserID(),response.identity.identifier,false,true);//until i receive identity from api
                APP_Storage.setValue(APP_Storage.vimeoUserName(),response.displayName,false,true);
                APP_Storage.setValue(APP_Storage.vimeoUserPic(),response.imageUrl,false,true);

                // redirect to sync tool-tip page
                App.utilities.redirectToUrl('/#/sync?network='+APP_External_Network.Vimeo);
            },function(response){
                SetErrorMessage(response,APP_External_Network.Vimeo);
                // reset auth state and code
                controller.setProperties({
                    state: null,
                    code: null
                });
            });
        },
        // actions
        actions: {
            onVimeoLoginClick: function () {
                // redirect user to vimeo auth page to provide required permissions
                App.OauthService.oauth2.redirectUser('https://api.vimeo.com/oauth/authorize',
                    {
                        client_id: Vimeo_Api_Key,
                        scope: 'private interact public',
                        redirect_uri : this.get('redirectUrl')
                    },{
                        stateCookieKey : APP_Cookies.vimeoAuthState
                    }
                );
            }
        }
    });
})();