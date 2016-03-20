/**
 * Created by mahmoud on 1-Sep-14.
 */

App.VideoView = Ember.View.extend({
    templateName:'shared/video',
    loopId:(function(){
        return (this.get('_parentView.contentIndex'));
    }).property()
});