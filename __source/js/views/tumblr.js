(function () {
    'use strict';
    App.TumblrView = Ember.View.extend({
        didInsertElement: function () {
            $('.columnOne').mCustomScrollbar();
            $('.columnTwo').mCustomScrollbar();
            $('#accordion').on('show.bs.collapse', function () {
                $('#accordion .in').collapse('hide');
            });
        }
    });
})();