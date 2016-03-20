(function () {
    'use strict';
    App.TumblrRoute = Ember.Route.extend({
        queryParams: {
            skip: {
                replace: true
            }
        },
        beforeModel: function (args) {
            // run application beforeModel
            this._super(args);
            if (getCookie(APP_Cookies.userID) !== "") {
                var networkId = this.get('constant').tumblrId;
                var networkActivated = App.OauthService.isNetworkActivated(networkId,true);

                if (!networkActivated) {
                    this.transitionTo("authorize", {
                        queryParams: {
                            network: networkId
                        }
                    });
                }else{
                    // redirect to tool-tip page if network sync is nor completed
                    var pollingManager = this.get('pollingManager');
                    if (!(args.queryParams && args.queryParams.skip && args.queryParams.skip == 'true')){
                        if (!pollingManager.ifAnyEntitySyncCompleted(networkId))
                            this.transitionTo('sync', {queryParams: {network: networkId}});
                    }
                }
            }
        },
        model: function (params) {
            App.SynchronizeService.resetSyncService();

            var networkId = this.get('constant').tumblrId;
            var networkActivated = App.OauthService.isNetworkActivated(networkId);
            var dataStorageKeys = this.get('constant.network.' + networkId).dataStorageKeys;
            var activities = !networkActivated ? [] : APP_Storage.getValue(dataStorageKeys.activities, [], true);
            var messages = !networkActivated ? [] : APP_Storage.getValue(dataStorageKeys.messages, [], true);

            return Ember.RSVP.hash({
                activities: activities,
                messages: messages
            });
        },
        resetController: function (controller, isExiting, transition) { // run before exiting the route
            controller.set('selectedActivity', null);
            controller.set('selectedMessage', null);
            if (isExiting) {/* isExiting would be false if only the route's model was changing*/
            }
        }
    });
})();