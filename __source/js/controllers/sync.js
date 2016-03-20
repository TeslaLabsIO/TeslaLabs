(function () {
    'use strict';
    App.SyncController = Ember.ObjectController.extend({
        // Sync controller variables
        queryParams: ['network'],
        network: null,
        steps: null,
        networkClass: null,
        networkPercent: 0,
        syncStatus: 'Sync Started',
        interval: null,
        target: null,
        //delayTime: 120000,
        delayInterval: null,
        allowSkip: false,
        // functions
        reset: function () { // reset function for Sync controller variables
            clearInterval(this.get('delayInterval'));
            this.set('delayInterval', null);
            this.set('allowSkip', false);
            this.set('steps', null);
            this.set('networkPercent', 1);
            this.set('syncStatus', 'Sync Started');
            clearInterval(this.get('interval'));
            this.set('interval', null);
            this.set('target', null);
        },
        createSyncSteps: function () { // Create Sync steps function is responsible for creating 5 steps for each network
            // reset steps
            this.set('steps', null);
            // references
            var networkId = this.get('network');
            var pollingManager = this.get('pollingManager');
            // getting all required information about network sync (is it completed/ is any entity inside this network completed/ sync status for each entity)
            var status = this.get('pollingManager').getNetworkSyncStatus(networkId);

            // create steps
            if (_.isObject(status) && _.isArray(status.entitiesSyncStatus) && status.entitiesSyncStatus.length > 0) {
                // add initial step
                // Start sync step.
                var steps = [{title: "start", completed: true}];
                var networkPercent = 19;

                // add real steps
                // Step for each network entity (for ex. Facebook network have three entities messages, activities, local activities )
                _.each(status.entitiesSyncStatus, function (entity) {
                    steps.push({title: entity.entityName, completed: entity.syncCompleted});
                    if (entity.syncCompleted) networkPercent += 20;
                });

                // add remaining steps
                // if the steps created in 1 & 2 count is lees than 5. I create fake steps until i have 5 steps.
                var remaining = 5 - steps.length;
                for (var s = 0; s < remaining; s++)
                    steps.push({title: 'step' + s, completed: false});

                // update controller
                this.set('steps', steps);
                this.incrementNetworkPercent(this, networkPercent);
            }
        },
        // increment network sync complete percentage from 1 to 100% and apply an interval update to percent variable for better visualization
        incrementNetworkPercent: function (controller, percent) {
            if (this.get('interval')) {
                clearInterval(controller.get('interval'));
                controller.set('interval', null);
                controller.set('networkPercent', controller.get('target'));
            }
            controller.set('target', controller.get('networkPercent') + percent);
            controller.set('interval', setInterval(function () {
                controller.set('networkPercent', controller.get('networkPercent') + 1);
                if (controller.get('networkPercent') > 99 || controller.get('networkPercent') == controller.get('target')) {
                    clearInterval(controller.get('interval'));
                    controller.set('interval', null);
                }
            }, 50));
        },
        // properties
        // As we have 5 static steps we have five properties for each step which observes "networkPercent" (which is a variable responsible for holding current sync complete percent )
        // the value for each propriety will change to true when sync complete percent meet required percent with each step
        // these properties control show/hide complete status image in UI for all steps
        stepOneCompleted: function () {
            return this.get('networkPercent') > 19
        }.property('networkPercent'),
        stepTwoCompleted: function () {
            return this.get('networkPercent') > 39
        }.property('networkPercent'),
        stepThreeCompleted: function () {
            return this.get('networkPercent') > 59
        }.property('networkPercent'),
        stepFourCompleted: function () {
            return this.get('networkPercent') > 79
        }.property('networkPercent'),
        stepFiveCompleted: function () {
            return this.get('networkPercent') > 99
        }.property('networkPercent'),
        // this property return current network id
        currentNetwork: function () {
            console.log('controller: ', this.get('network'));
            return this.get('network');
        }.property('network', 'model'),
        skipUrl: function () {
            var networkId = this.get('network');
            var pollingManager = this.get('pollingManager');
            var networkOptions = pollingManager.getNetworkOptions(networkId);
            return networkOptions.route;
        }.property('network', 'model'),
        // observers
        // network changed is an observer which fire when network query parameter value change and this observer hold the main functionality for Sync UI
        networkChanged: function () {
            // references
            var controller = this;
            var utilities = this.get('utilities');
            var networkId = this.get('network');
            var pollingManager = this.get('pollingManager');
            var networkOptions = pollingManager.getNetworkOptions(networkId);
            var delayTime = 120000;// 2 min
            if (!networkId) return;

            // redirect to home if network is not handled
            // Validate network Id and redirect to home if network id doesn't have sync options
            // this functionality already handled in tool-tip route before model function but I had to add it here in case user change network id in the URL which will not fire route before model function
            if (!pollingManager.isNetworkSyncHandled(networkId)) {
                utilities.redirectToUrl('/#/');
                //this.transitionToRoute('index');
                return;
            }

            // redirect to network page if network sync completed already or if network is not logged in
            // Validate network sync complete status and network login status and redirect to network page in case sync was completed or network is not activated yet
           if (pollingManager.isNetworkSyncCompleted(networkId) || !App.OauthService.isNetworkActivated(networkId)) {
                utilities.redirectToUrl('/#/' + networkOptions.name);
                //this.transitionToRoute(networkOptions.name);
                return;
            }

            // reset sync stack
            App.SynchronizeService.resetSyncService();

            // set network background class
            // In this line I set "networkClass" variable with the css class name according to network id which set the background image for each network.
            this.set('networkClass', this.get('constant.network')[this.get('network')].name + ' tooltipContent');

            // Reset controller variables
            this.reset();

            // reset syncSteps ( Create sync steps for the current network Id )
            this.createSyncSteps();

            // create sync callbacks
            // Sync started function is the callback function which fires when polling manager start executing a request to Sprocket API to fetch data related to any network entity in current network
            // for ex. in case current network is Facebook this callback function will be fired when messages or activities or local activities Ajax request execute
            var syncStarted = function (entityName) {
                var controller = this;
                // Sync status label change to indicate that network entity sync is in progress.
                controller.set('syncStatus', 'Syncing ' + entityName + '...');
                // Start delay interval for 2 min in case this interval is not already set and skip button is not shown.
                if (!controller.get('delayInterval') && !controller.get('allowSkip')) {
                    controller.set("delayInterval", setInterval(function () {
                        // if skip button already shown clear delay interval
                        if (controller.get('allowSkip')) {
                            clearInterval(controller.get('delayInterval'));
                            controller.set('delayInterval', null);
                        } else {
                            //  show notification for the user in case tool-tip sync take 2 min and sync didn't complete.
                            // this notification alert user that "Sync process is taking more time than usual" and show skip button.
                            App.growl.danger('Sync process is taking more time than usual.', true);
                            controller.set('allowSkip', true);
                            clearInterval(controller.get('delayInterval'));
                            controller.set('delayInterval', null);
                        }
                    }, delayTime));
                }
            };
            // Sync completed function is the callback function which fires when polling manager complete executing a request to Sprocket API related to any network entity in current network and this request return status 200
            // for ex. in case current network is Facebook this callback function will be fired when messages or activities or local activities Ajax request complete and this request return status 200
            var syncCompleted = function (entityName) {
                var that = this;

                // get steps list
                var steps = that.get('steps');

                // update completed step
                _.each(steps, function (step) {
                    // Set completed as true for the step related to completed network entity.
                    if (step.title == entityName) step.completed = true;
                });

                // update controller
                that.set('steps', steps);
                // increase sync complete percentage with 20%.
                that.incrementNetworkPercent(controller, 20);
                that.notifyPropertyChange('steps');
                console.log('network ' + networkId + ' sync completed : ' + pollingManager.isNetworkSyncCompleted(networkId));
                // complete sync if all network entities sync completed
                // check if all entities in the current network is synced and if all network entities synced successfully we complete fake steps
                if (pollingManager.isNetworkSyncCompleted(networkId,entityName)) {
                    that.set('allowSkip', false);
                    _.each(steps, function (step, index) {
                        if (step.completed == false) {
                            Ember.run.later(function () {
                                step.completed = true;
                                that.set('steps', steps);
                                that.incrementNetworkPercent(controller, 20);
                                that.notifyPropertyChange('steps');
                            }, 300 * index);
                        }
                    });
                }
            };
            // Sync error function is the callback function which fires when polling manager Ajax request to Sprocket API related to any network entity in current network and this request fail for any reason and return an error
            // for ex. in case current network is Facebook this callback function will be fired when messages or activities or local activities Ajax request fail for any reason and return an error
            var syncError = function (entityName) {
                var that = this;
                // If skip button is already shown the rest of functionality will be skipped
                if (that.get('allowSkip')) return;
                console.log("Error: " + entityName);
                //  If skip button is hidden user will have error message ""transmission error"
                App.growl.danger('Transmission failed', true);
                // show skip button
                that.set('allowSkip', true);
                // clear delay interval because skip button is already shown and no need for it any more.
                clearInterval(that.get('delayInterval'));
                that.set('delayInterval', null);
            };

            // initialize network sync
            // this line executes polling manager network sync start based on current network id which start network entity sync
            pollingManager.startNetworkSync(networkId, syncCompleted.bind(this), syncError.bind(this), syncStarted.bind(this));

        }.observes('network'),
        // sync completed function is an observer which execute when networkPercent value change
        syncCompleted: function () {
            //  if networkPercent value equal 100
            if (this.get('networkPercent') == 100) {
                //  Sync status label will show Sync completed.
                this.set('syncStatus', 'Sync completed');
                var networkId = this.get('network');
                var pollingManager = this.get('pollingManager');
                var networkOptions = pollingManager.getNetworkOptions(networkId);
                Ember.run.later(function () {
                    // user will be redirected to network page after one second.
                    App.utilities.redirectToUrl('/#/' + networkOptions.name);
                }, 1000);
            }
        }.observes('networkPercent')
    });
})();