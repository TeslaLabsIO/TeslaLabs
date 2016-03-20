/**
 * Created by mahmoud on 7/13/14.
 */
App.FacebookRoute = Ember.Route.extend({
    queryParams: {
        skip: {
            replace: true
        }
    },
    beforeModel: function (args) {
        // run application beforeModel
        this._super(args);
        // redirect to tool-tip page if network sync is nor completed
        var constant = this.get('constant');
        var pollingManager = this.get('pollingManager');
        var networkActivated = App.OauthService.isNetworkActivated(constant.facebookId,true);
        if (!(args.queryParams && args.queryParams.skip && args.queryParams.skip == 'true')){
            if (networkActivated && !pollingManager.ifAnyEntitySyncCompleted(constant.facebookId))
                this.transitionTo('sync', {queryParams: {network: constant.facebookId}});
        }
    },
    model: function () {
        App.SynchronizeService.resetSyncService();
        var networkId = this.get('constant').facebookId;
        var networkActivated = App.OauthService.isNetworkActivated(networkId);
        var dataStorageKeys = App.CONSTANT.get('network.' + networkId).dataStorageKeys;
        var messages = !networkActivated ? [] : APP_Storage.getValue(dataStorageKeys.messages, [], true);
        var activities = !networkActivated ? [] : APP_Storage.getValue(dataStorageKeys.activities, [], true);
        var localActivities = !networkActivated ? [] : APP_Storage.getValue(dataStorageKeys.localActivities, [], true);
        return Ember.RSVP.hash({
            fBMessages: messages,
            fBPosts: activities,
            fBLocalPosts: localActivities,
            fBRecommendedPosts: []//APP_Storage.getValue(APP_Storage.facebookRecommendedPost,[],true)
        });
    }
});