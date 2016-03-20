/**
 * Created by mahmoud on 31-Aug-14.
 */
App.FeeditemController = Ember.ObjectController.extend({
    //needs:['feeddetails','Feed'],
    needs:['Feed','feeddetails'],
    actions:{
        displayData:function(index,feedItem){
            //console.log(this.get('controllers.feed'))
            console.log(index)
            //console.log('----------------------------------')
            //console.log(feedItem)
            //console.log('----------------------------------')
            console.log('parent')
            console.log(this.get('parentController'))
            console.log('needs')
            console.log(this.get('controllers.Feed'))

            this.set('controllers.feeddetails.model',feedItem)

            /*console.log(this.get('parentController.model'))
            console.log(this.get('parentController.g'))
            console.log(this.get('controllers.feed.model'))*/
            //this.set('controllers.feed.g',feedItem)
            //this.set('controllers.feeddetails.model',feedItem)
            this.set('parentController.g',feedItem)
            //console.log(this.get('controllers.feeddetails'))
            //console.log(this.get('controllers.feed'))
            //console.log(this.get('controllers.feeddetails.model'))
            console.log('----------------------------------')
        }
    }
});