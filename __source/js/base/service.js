(function () {
    'use strict';
    App.ServiceObject = Ember.Object.extend({
        clientPlatformId: function () {
            return APP_Client_Platform.WEB;
        }.property('constant.clientPlatformId'),
        baseUrl:  function () {
            return API_Base_Url;
        }.property(),
        userId: function () {
            return APP_Cookies.getCookie(APP_Cookies.userID);
        }.property()
    });
})();
