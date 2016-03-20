/**
 * Created by mahmoud on 04-Nov-14.
 */

App.PollingManager = Ember.Object.extend({});

App.PollingManager.reopenClass({
    // network id and callbacks
    clientConfiguration: null,
    getClientConfiguration: function () {
        var configuration = this.clientConfiguration;
        var self = this;
        if (!configuration) {
            Ember.$.ajax(API_Base_Url + 'clients/configuration', {
                async: false,
                type: 'GET',
                "dataType": 'JSON', headers: {"Content-Type": 'application/json'},
                success: function (data, textStatus, jqXHR) {
                    configuration = data;
                    self.clientConfiguration = configuration;
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    configuration = {}; //but don't set variable because it can be returned in next request
                }
            });
        }
        return configuration;
    },
    getNetworkSyncStatus: function (networkId,currentEntityName) {
        var networkData = App.CONSTANT.get('network')[networkId];
        var networkStatus = [];
        var storageKey;
        var syncCompleted;
        var networkSyncCompleted = true; // will be true if all network entities sync completed
        var anyEntitySyncCompleted = false; // will be true if any network entities sync completed
        if (_.isObject(networkData) && _.isArray(networkData.entities)) {
            _.each(networkData.entities, function (entityName) { // entity name & id
                storageKey = networkData.dataStorageKeys[entityName];
                storageKey = typeof(storageKey) == "string" ? storageKey : storageKey[0];
                syncCompleted = entityName=="contacts" ? (currentEntityName=="contacts") : (APP_Storage.getValue(storageKey) != null);
                if(entityName=="contacts"){
                    _.each(APP_Storage.getValue(storageKey,[],true),function(contact){
                        if(contact.identity && contact.identity.externalNetworkId == networkId){
                            syncCompleted = true;
                        }
                    })
                }
                networkStatus.push({
                    entityName: entityName,
                    syncCompleted: syncCompleted
                });
                // reset flag if any network entity sync completed
                anyEntitySyncCompleted = anyEntitySyncCompleted || syncCompleted;//APP_Storage.getValue(storageKey) != null ? true : anyEntitySyncCompleted;
                // reset flag if any network entity sync is not completed
                networkSyncCompleted = networkSyncCompleted && syncCompleted;//APP_Storage.getValue(storageKey) == null ? false : networkSyncCompleted;
            });
            return {
                networkSyncCompleted: networkSyncCompleted, // will be true if all network entities sync completed
                anyEntitySyncCompleted: anyEntitySyncCompleted, // will be true if any network entities sync completed
                entitiesSyncStatus: networkStatus // all network entities sync status
            };
        }
        return null;
    },
    isNetworkSyncCompleted: function (networkId,entityName) {
        var status = this.getNetworkSyncStatus(networkId,entityName);
        return !!(status && status.networkSyncCompleted);
    },
    ifAnyEntitySyncCompleted: function (networkId) {
        var status = this.getNetworkSyncStatus(networkId);
        return !!(status && status.anyEntitySyncCompleted);
    },
    isNetworkSyncHandled: function (networkId) {
        var networkOptions = App.CONSTANT.network[networkId];
        return !!_.isObject(networkOptions) && _.isArray(networkOptions.entities);
    },
    getNetworkOptions: function (networkId) {
        return App.CONSTANT.network[networkId];
    },
    getNetworkIdName : function(network){
        var path = network;
        if(!network) {
            var currentUrl = location.hash.substring(1);
            if (currentUrl[0] == '/') {
                currentUrl = currentUrl.substring(1);
                currentUrl = currentUrl.split('/')[0]
            }
            //
            network = (currentUrl).toLowerCase();
            network = network.split('?')[0];//get part before query param in lower case
            path = network;//as network value may change , we have to keep original value for #hash , if we need to use it
            //
            var alternativeSearch = currentUrl.split('?')[1];//get query parameter in hash
            if (alternativeSearch) {
                alternativeSearch = "?" + alternativeSearch;
            }
            //
            var networkId = getParameterByName('network', alternativeSearch) ? getParameterByName('network', alternativeSearch) : getParameterByName('networkId', alternativeSearch);
            if (networkId && App.CONSTANT && !_.isUndefined(App.CONSTANT.network[Number(networkId)])) {
                network = App.CONSTANT.network[Number(networkId)].name.toLowerCase();
            }
        }else{
            network = network.toLowerCase();
            path = network;
        }

        if (App.CONSTANT && _.isNumber(App.CONSTANT[network + 'Id'])) {
            return {
                name: network,
                path: path,
                id: App.CONSTANT[network + 'Id']
            };
        }

        return {
            name : network,
            path: path
        };
    },
    startNetworkSync: function (networkId, syncStepCompleted, syncError, syncStart) {
        var networkData = App.CONSTANT.get('network')[networkId];
        var self = this;
        var syncOptions = {};
        _.each(networkData.entities, function (entityName) { // entity name & id
            var entitySync = {
                networkId: networkId,
                lastModifiedKey: networkData.lastModifiedStorageKeys[entityName],
                syncTimeout: networkData.syncTimeout
            };
            if (networkData.syncExtraOptions && networkData.syncExtraOptions[entityName]) {
                entitySync = $.extend(entitySync, networkData.syncExtraOptions[entityName]);
            }
            //this entity have categories
            if (networkData.entityCategories && networkData.entityCategories[entityName]) {
                var entityCategories = networkData.entityCategories[entityName];
                var categoryStorage = networkData.dataStorageKeys[entityName];
                //
                if (entityCategories.length != categoryStorage.length) {
                    alert('# of categories should equal # of storage key for ' + entityName);
                    return;
                }
                //
                entitySync.category = [];
                _.each(networkData.entityCategories[entityName], function (categoryName, id) {
                    entitySync.category.push({name: categoryName, storageKey: categoryStorage[id]})
                })
            } else if (networkData.dataStorageKeys[entityName]) {
                entitySync.storageKey = networkData.dataStorageKeys[entityName];
            }
            syncOptions[entityName] = entitySync;
        });
        _.each(syncOptions, function (entitySyncOptions, entityName) { // entity sync option , entity name : value , key
            var capitalized = (entityName[0].toUpperCase()) + entityName.slice(1);
            var functionName = 'sync' + capitalized;
            var syncFunction = App.NetworkSyncService[functionName];
            if (syncFunction) {
                //add sync step completed to handle (save data + sync completed callback)
                //add sync error to call sync error callback
                entitySyncOptions.syncStepCompleted = function (isStored, newData, updatedIds, data, textStatus, jqXHR) {//false,activities,updatedIds,data, textStatus, jqXHR){
                    self.syncStepCompleted(entityName, entitySyncOptions, isStored, newData, updatedIds, data, textStatus, jqXHR);
                    if (syncStepCompleted) {
                        syncStepCompleted(entityName, entitySyncOptions, isStored, newData, updatedIds, data, textStatus, jqXHR);
                    }
                };
                entitySyncOptions.syncError = function (jqXHR, textStatus, errorThrown) {
                    self.syncError(entityName, entitySyncOptions, jqXHR, textStatus, errorThrown);
                    if (syncError) {
                        syncError(entityName, entitySyncOptions, jqXHR, textStatus, errorThrown);
                    }
                };
                entitySyncOptions.syncStart = function () {
                    if (syncStart) {
                        syncStart(entityName, entitySyncOptions);
                    }
                };
                App.NetworkSyncService[functionName](entitySyncOptions);
            } else {
                alert(functionName + ' not exist in network sync service');
                return;
            }
        });
    },
    saveNewDataToStorage: function (newData, storageKey, storageMaxSize, sortKey) {
        storageMaxSize = storageMaxSize ? storageMaxSize : 10;//default value
        var oldStorage = APP_Storage.getValue(storageKey, [], true);
        var newStorage = (newData).concat(oldStorage);
        if (sortKey) {
            newStorage = _.sortBy(newStorage, sortKey).reverse();
        }
        newStorage = newStorage.slice(0, storageMaxSize);
        APP_Storage.setValue(storageKey, newStorage, true);
    },
    syncStepCompleted: function (entityName, entitySyncOptions, isStored, newData, updatedIds, data, textStatus, jqXHR) {
        var self = this;
        if (!isStored) {
            var networkData = App.CONSTANT.get('network')[entitySyncOptions.networkId];
            var entitySortKey = App.CONSTANT.get('entitySortKeys')[entityName];
            //
            var storageMaxSize = networkData.dataStorageMaxSize[entityName];
            //
            if (entitySyncOptions.category) {
                _.each(entitySyncOptions.category, function (category, id) {
                    self.saveNewDataToStorage(newData[id], category.storageKey, storageMaxSize, entitySortKey)
                });
            } else if (entitySyncOptions.storageKey) {
                self.saveNewDataToStorage(newData[0], entitySyncOptions.storageKey, storageMaxSize, entitySortKey)
            }
        }
    },
    syncError: function (entityName, entitySyncOptions, jqXHR, textStatus, errorThrown) {
        //SetErrorMessage(jqXHR, entitySyncOptions.networkId); // it's already handled in synchronize service
    }
});