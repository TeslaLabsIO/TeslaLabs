(function () {
    'use strict';

    App.Service = Ember.Object.extend({
       /* // data
        baseUrl: App.CONSTANT.get('api.baseUrl'),
        userId: APP_Cookies.getCookie(APP_Cookies.userID),
        contentNetworkId: null,
        clientPlatformId: App.CONSTANT.get('vimeo.clientPlatformId')  // clientPlatformId is 2 for web*/
    });

    App.Service.reopenClass({
        // data
        baseUrl: App.CONSTANT.get('api.baseUrl'),
        userId: APP_Cookies.getCookie(APP_Cookies.userID),
        clientPlatformId: App.CONSTANT.get('vimeo.clientPlatformId'),  // clientPlatformId is 2 for web
        contentNetworkId: null,
        // computed properties
        constant:App.CONSTANT,
        localstorage:App.localstorage,
        // functions
        test: function () {
            return Ember.$.getJSON(this.baseUrl + 'users/ping')
        }
    });

})();