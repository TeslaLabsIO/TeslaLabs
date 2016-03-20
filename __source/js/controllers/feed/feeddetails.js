/**
 * Created by mahmoud on 31-Aug-14.
 */
App.FeeddetailsController = Ember.ObjectController.extend({
    modelChange:function(){
        alert('model change')
        console.log('model')
        console.log(this.get('model'))
        console.log(this.get('model').photo.url)
        console.log('----------------')
    }.observes('model')
});