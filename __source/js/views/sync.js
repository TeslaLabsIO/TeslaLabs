/**
 * Created by mahmoud on 11-Nov-14.
 */
App.SyncView = Ember.View.extend({
    didInsertElement: function () {
        $('.tooltipContainer').mCustomScrollbar({});
    }
});