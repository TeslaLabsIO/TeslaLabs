(function () {
    'use strict';
    App.SprocketWheelComponent = Ember.Component.extend({
        classNames: [],
        layoutName: 'components/sprocket-wheel',
        didInsertElement: function () {
            //called when the page finishes loading
            console.log($('#sprocket'));
            App.WheelDirector.initializeWheel();
            App.WheelDirector.attachActions();
        }
    });
})();