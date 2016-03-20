(function () {
    'use strict';
    App.VimeoIndexView = Ember.View.extend({
        didInsertElement: function () {
            $("#vimeoData").mCustomScrollbar();
            $("#vimeoContent").mCustomScrollbar();
            App.__container__.lookup('controller:vimeoIndex').selectVimeoTab();
        }
    });
})();
