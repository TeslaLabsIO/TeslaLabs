(function () {
    'use strict';
    App.VimeoIndexRoute = Ember.Route.extend({
        queryParams: {
            skip: {
                replace: true
            }
        },
        beforeModel: function (args) {
            // run application beforeModel
            this._super(args);
            if (getCookie(APP_Cookies.userID) !== "") {
                var networkId = this.get('constant').vimeoId;
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
        model: function () {
            App.SynchronizeService.resetSyncService();

            var networkId = this.get('constant').vimeoId;
            var networkActivated = App.OauthService.isNetworkActivated(networkId);
            var dataStorageKeys = this.get('constant.network.' + networkId).dataStorageKeys;
            var subscription = !networkActivated ? [] : APP_Storage.getValue(dataStorageKeys.videos[1], [], true);
            var myfeed = !networkActivated ? [] : APP_Storage.getValue(dataStorageKeys.videos[0], [], true);

            return {
                subscription: subscription,
                myfeed: myfeed
            }
        }
    });
})();