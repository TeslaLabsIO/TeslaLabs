/**
 * Created by mahmoud on 26-Aug-14.
 */

App.ActivityView = Ember.View.extend({
        templateName:'shared/activity',
        loopId:(function(){
            return (this.get('_parentView.contentIndex'));
        }).property()
});