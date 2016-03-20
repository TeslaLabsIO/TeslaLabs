/**
 * Created by mahmoud on 31-Aug-14.
 */
App.FacebooktestController = Ember.ObjectController.extend({
    //needs:['feed','feeddetails']
});
/*App.FacebooktestController = Ember.ArrayController.extend({
  k:1
});*/
App.FacebooktestRoute = Ember.Route.extend({
    model:function(){
        return {
            news : //{
                //feeds :
        APP_Storage.getValue(APP_Storage.facebookPost,[],true).slice(0,5)//,
        //        details : {}
    //        }
    ,
            local :// {
        //        feeds:
        APP_Storage.getValue(APP_Storage.facebookPost, [], true).slice(6, 11)//,
          //      details : {}
           // }
            ,
            recommended :// {
        //        feeds:
        APP_Storage.getValue(APP_Storage.facebookPost, [], true).slice(12, 17)//,
              //  details : {}
            //}
        }
    }
});