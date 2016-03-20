(function () {
    'use strict';
    App.AuthorizeRoute = Ember.Route.extend({
        queryParams: {
            network: {
                //refreshModel: true,
                replace: true
            }
        },

        beforeModel: function (args) {
            // run application beforeModel
            this._super(args);
            if(location.protocol.indexOf('https') != -1){
                //all storage should be on http
                location.protocol = 'http';
            }else{
                App.SynchronizeService.resetSyncService();
                this.controllerFor('authorize').isAccessAllowed(args.queryParams.network,this)
            }
        },
        model: function (params) {
            console.log('model: ', params);
        },
        resetController: function (controller, isExiting, transition) { // run before exiting the route
            controller.set('network', null);
            controller.reset();
            App.SynchronizeService.resetSyncService();
            if (isExiting) {
                // isExiting would be false if only the route's model was changing
            }
        }
    });
})();