(function () {
    'use strict';
    App.SyncRoute = Ember.Route.extend({
        // This configuration section force model run if "network" query parameter value changed
        queryParams: {
            network: {
                //refreshModel: true,
                replace: true
            }
        },
        beforeModel: function (args) {
            // run application beforeModel
            this._super(args);
            // In case user was redirected to tool-tip page after activating LinkedIn (which required HTTPS),
            // He will redirected to HTTP again in Sync page because HTPPS is not required any more
            if(location.protocol.indexOf('https') != -1){
                //all storage should be on http
                location.protocol = 'http';
            }else{
                console.log('Invalid network id: ', args.queryParams);

                // In this line we reset sync stack which is holding the list of requests need to be executed to fetch data from Sprocket API end points
                // as we only fetch data related to current page (if the user in home page) or current network (if user in sync or network page )
                // we reset this stack to remove remaining requests related to previous page
                // Mahmoud should provide further details about Synchronizations Service class in his code review
                App.SynchronizeService.resetSyncService();

                // Retrieve network id from query parameter
                var networkId = args.queryParams.network;
                // Keep reference polling manger service ( which was injected in all routes and controllers to have access to it using this.get )
                var pollingManager = this.get('pollingManager');
                // Retrieve network sync options from consent class.
                var networkOptions = pollingManager.getNetworkOptions(networkId);

                // Validate network Id and redirect to home if network id doesn't have sync options
                if (!pollingManager.isNetworkSyncHandled(networkId))
                    this.transitionTo('/');

                // Validate network sync complete status and network login status and redirect to network page in case sync was completed or network is not activated yet
                if (pollingManager.isNetworkSyncCompleted(networkId) || !App.OauthService.isNetworkActivated(networkId))
                    this.transitionTo('/' + networkOptions.name);
            }
        },
        model: function (params) {
            console.log('model: ', params);
        },
        resetController: function (controller, isExiting, transition) { // On route exiting (Which fire after any action force redirection to another URL)
            // Clear network query parameter.
            controller.set('network', null);
            // Reset all Sync variables.
            controller.reset();
            // Reset sync stack.
            App.SynchronizeService.resetSyncService();
            if (isExiting) {
                // isExiting would be false if only the route's model was changing
            }
        }
    });
})();