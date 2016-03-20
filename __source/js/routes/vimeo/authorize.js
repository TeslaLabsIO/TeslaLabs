(function () {
    'use strict';
    App.VimeoAuthorizeRoute = Ember.Route.extend({
        redirect: function () {
            // get vimeo auth status from local storage
            var vimeoIsActive = APP_Storage.getValue(APP_Storage.vimeoUserID())!=null;//APP_Cookies.getCookie(APP_Cookies.vimeoIsActive)==='YES';
            // check user authorization status
            if (vimeoIsActive) {
                this.transitionTo('vimeo.index');  // redirect to authorization page
            } // if user is not authorization
        }
    });
})();