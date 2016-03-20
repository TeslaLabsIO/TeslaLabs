/**
 * Created by mahmoud on 31-Aug-14.
 */
App.FeedController = Ember.ArrayController.extend({//ObjectController
    //itemController:"feeditem",//comment
    i:function(){
        return new Date().getSeconds();
    }.property(),
    g:function(){
        console.log(this.get('model'))
        return {photo:{url:('photo'+this.get('i'))}};
    }.property(),
    observeg:function(){
        console.log(this.get('model'))
        alert('g change '+this.get('i'))
    }.observes('g'),
    //detailsx:'xxxx',
    actions:{
        PostFeed:function(){
            alert('post'+this.get('_view.contentIndex'))
        }
    }
    /*,
    modelChang:function(){
        alert('x')
    }.observes('model','content')*/
});
/*App.FeedRoute = Ember.Route.extend({
    model:function(){
        alert('x')
        return APP_Storage.getValue(APP_Storage.facebookPost,[],true);
        /*return {
            empty:'ddddddddd'
        }* /
    }
});*/