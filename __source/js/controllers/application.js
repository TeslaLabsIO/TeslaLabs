(function () {
    'use strict';
    App.ApplicationController = Ember.Controller.extend({
        currentPath:'',
        isLoggedIn: function () {
            //return true;
            return APP_Cookies.getCookie(APP_Cookies.userID) != '';
        }.property('model'),
        isHome: function () {
            console.log('currentPath:', location.hash.substring(1) == '/' || location.hash.substring(1) == '');
            return location.hash.substring(1) == '/' || location.hash.substring(1) == '';
        }.property('currentPath'),

        // observe current route
        currentPathDidChange: function() {
            Ember.run.schedule('afterRender', this, function() {
                if(this.get('currentPath') == 'contacts'){
                    $('#searcher').hide();
                }else{
                    $('#searcher').show();
                }
                if(this.get('currentPath') == 'sync') {
                    $('#wheel').hide();
                }else {
                    $('#wheel').show();
                }
            });
        }.observes('currentPath')
    });
})();