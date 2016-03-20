/**
 * Created by mahmoud on 02-Nov-14.
 */
App.NetworkSyncService = Ember.Object.extend({});//App.SynchronizeService.extend({});

App.NetworkSyncService.reopenClass({
    syncService : App.SynchronizeService,
    userId : App.Service.userId,
    baseUrl : App.Service.baseUrl,
    updateConversations : function(oldConversation,newConversation,identifierKey){
        if(oldConversation.conversation && newConversation.conversation){
            var isIdentifierFn = (typeof(identifierKey)=="function");
            //
            var oldMessages = $.extend([],oldConversation.conversation);
            //
            var newMessages = $.extend([],newConversation.conversation);
            var newMessagesIdentifiers = {};
            var dataIdentifier;
            //
            var result = [];

            _.each(newMessages , function(message,id){
                dataIdentifier = isIdentifierFn ? identifierKey(message) : message[identifierKey];
                newMessagesIdentifiers [dataIdentifier] = id;
                result.push(message);
            });
            _.each(oldMessages , function(message){
                dataIdentifier = isIdentifierFn ? identifierKey(message) : message[identifierKey];
                if(_.isUndefined(newMessagesIdentifiers[dataIdentifier])){//if this message not in new insert it
                    result.push(message);
                }
            });

            result = _.sortBy(result,'date');
            if(result.length > 25){
                result = result.slice(result.length-25,result.length);//get last 25 conversation
            }

            if(newConversation.lastMessageDate < _.last(result).date){
                newConversation.lastMessageDate = _.last(result).date;
            }

            newConversation.conversation = result;
        }
        return newConversation;
    },
    ignoreDuplicated: function (data, storageKey, identifierKey, updatedIds,sortKey,updateConversation) {//updatedIds is passed by reference so we don't replace
        //reset updateIds without re assign > to keep reference value
        if(!updatedIds){ // if not set we don't want to break next steps
            updatedIds = [];
        }
        updatedIds.splice(0,updatedIds.length);//reset it if it's not reset by default
        //
        var self = this;
        var storage = APP_Storage.getValue(storageKey, [], true);
        var storageIdentifier = {};
        //
        var newData = [];
        //
        var dataIdentifier ;
        var elementId;
        var isIdentifierFn = (typeof(identifierKey)=="function");
        //to save storage sorted
        if (sortKey) {
            storage = _.sortBy(storage, sortKey).reverse();
            data = _.sortBy(data, sortKey).reverse();
        }
        _.each(storage , function(element,id){
            dataIdentifier = isIdentifierFn ? identifierKey(element) : element[identifierKey];
            storageIdentifier [dataIdentifier] = {
                id : id,
                element : element
            };
        });
        _.each(data,function(element){
            dataIdentifier = isIdentifierFn ? identifierKey(element) : element[identifierKey];
            elementId = storageIdentifier[dataIdentifier] ? storageIdentifier[dataIdentifier].id : '';
            if(_.isNumber(elementId)){//was in storage but now updated
                if(updateConversation){
                    storage[elementId] = self.updateConversations(storageIdentifier[dataIdentifier].element , element , identifierKey);
                }else{
                    storage[elementId] = element;
                }
                updatedIds.push({
                    id:elementId, // id of this element in local storage
                    identifierValue:dataIdentifier, //identifier value
                    identifierKey:identifierKey //either key or function : if function use it on model to match identifier instead of duplicated method
                });
            }else{
                newData.push(element);
            }
        });

        if (sortKey) {//as update of local storage may change the order like in conversation (last message date)
            storage = _.sortBy(storage, sortKey).reverse();
        }
        APP_Storage.setValue(storageKey, storage, true);//save storage sorted by new updates
        return newData;
    },
    getNewData: function (oldDataStr, storageKey, identifierKey, sortKey) {
        var storage = APP_Storage.getValue(storageKey, [], true);
        //
        var oldData = JSON.parse(oldDataStr == "" ? "[]" : oldDataStr);
        var oldIdentifiers = {};
        //
        var newData = [];
        //
        var dataIdentifier ;
        var isIdentifierFn = (typeof(identifierKey)=="function");
        //get new Data sorted so when we slice , we slice old data not new one
        if (sortKey) {
            storage = _.sortBy(storage, sortKey).reverse();
            oldData = _.sortBy(oldData, sortKey).reverse();
        }
        _.each(oldData, function (element) {
            dataIdentifier = isIdentifierFn ? identifierKey(element) : element[identifierKey];
            oldIdentifiers [dataIdentifier] = true;
        });
        _.each(storage, function (element) {
            dataIdentifier = isIdentifierFn ? identifierKey(element) : element[identifierKey];
            if (!oldIdentifiers [dataIdentifier]) {
                newData.push(element);
            }
        });
        return newData;
    },
    categorizeData: function (data) {
        var categorized = {};
        var category = '';
        for (var i = 0; i < data.length; i++) {
            category = data[i].category;
            if (typeof(categorized[category]) == "undefined") {
                categorized[category] = [];
            }
            categorized[category].push(data[i])
        }

        return categorized;
    },
    getStoredDataString : function (options){
        var categories = options.category;
        var storage = [];
        if(categories && categories.length){
            _.each(categories,function(category){
                storage.push(APP_Storage.getValue(category.storageKey, ""));
            });
            storage = JSON.stringify(storage);
        }else if(options.storageKey){
            storage.push(APP_Storage.getValue(options.storageKey, ""));
            storage = JSON.stringify(storage);
        }else{
            alert('please provide correct sync parameters');
            storage = "[]";
        }
        return storage;
    },
    ignoreDuplicatedCategorized:function(data, options , identifierKey, updatedIds,sortKey){
        //(data, storageKey, identifierKey, updatedIds,sortKey)
        var categories = options.category;
        var self = this;
        var newData = [];
        if(categories && categories.length){
            var categorized = this.categorizeData(data);
            _.each(categories,function(category){
                var duplicatedIds = []; // passed by reference
                var categoryNewData = self.ignoreDuplicated(categorized[category.name] ? categorized[category.name] : [], category.storageKey, identifierKey,duplicatedIds,sortKey);
                newData.push(categoryNewData);
                updatedIds.push(duplicatedIds);
            });
        }else if(options.storageKey){
            var duplicatedIds = []; // passed by reference
            newData = [ self.ignoreDuplicated(data, options.storageKey, identifierKey,duplicatedIds,sortKey) ];
            updatedIds.push(duplicatedIds);
        }
        return newData;
    },
    getNewDataCategorized:function(storageString, options , identifierKey,sortKey){
        //(storageString, options.storageKey, 'externalIdentifier', 'date');
        var categories = options.category;
        var self = this;
        var newData = [];
        var categorized = JSON.parse(storageString);
        if(categories && categories.length){
            _.each(categories,function(category,id){
                var categoryNewData = self.getNewData(categorized[id], category.storageKey, identifierKey,sortKey);
                newData.push(categoryNewData);
            });
        }else if(options.storageKey){
            newData = [ self.getNewData(categorized[0], options.storageKey, identifierKey,sortKey) ];
        }
        return newData;
    },
    syncActivities : function(options){
        //options : url (optional), network id , last modified key , sync time out , storage key , category(array of {name,storageKey})
        //options.syncStepCompleted (isStored,data,updatedStorageIds,requestData, textStatus, jqXHR)
        //options.syncStepInProgress
        //options.syncError

        var storageString = this.getStoredDataString(options);
        var storageKey = options.storageKey ? options.storageKey : options.category[0].storageKey;
        var service = this.syncService;
        var self = this;
        var syncOptions = {
            header: (APP_Storage.getValue(options.lastModifiedKey) ? {delta: true} : {}),
            keepTimerData: true,
            url: options.url ? options.url : (this.baseUrl + "social/users/" + this.userId + "/providers/" +options.networkId + "/activities"),
            lastModifiedKey: options.lastModifiedKey,
            syncUntilData: false,
            syncForEver: false,
            syncTimeout: options.syncTimeOut,
            stopOnError: true,
            onSyncStart : function(){
                if(options.syncStart){
                    options.syncStart();
                }
            },
            onSyncSuccess: function (data, textStatus, jqXHR) {
                var lastModified = APP_Storage.getValue(this.lastModifiedKey);
                if (lastModified) {//if last modified exist add delta
                    this.header = {delta: true};
                } else {
                    this.header = {};
                }
                if (jqXHR.status == 200 && data.activities) {
                    var categorized = {};//pass by reference
                    var activities = _.sortBy(data.activities, 'date').reverse();
                    var updatedIds = []; // passed by reference
                    activities = self.ignoreDuplicatedCategorized(activities, options, 'externalIdentifier',updatedIds,'date');
                    if(options.syncStepCompleted){
                        options.syncStepCompleted(false,activities,updatedIds,data, textStatus, jqXHR);//it should update local storage by new data only , and will update model
                    }
                    storageString =  self.getStoredDataString(options);
                    service.addDataRequest(this);//call to parent
                }else if(jqXHR.status == 304 && self.getStoredDataString(options) != storageString){
                    var newData = self.getNewDataCategorized(storageString, options, 'externalIdentifier', 'date');
                    if(options.syncStepCompleted) {
                        options.syncStepCompleted(true, newData,[],data, textStatus, jqXHR);//will not update local storage because it's already update but will update model
                    }
                    storageString =  self.getStoredDataString(options);
                    service.addDataRequest(this);//call to parent
                }else {
                    service.handleEmptyDataRequest(this, APP_Storage.getValue(storageKey , [], true));
                }
            },
            onSyncError: function (jqXHR, textStatus, errorThrown) {
                if(options.syncError){
                    options.syncError(jqXHR, textStatus, errorThrown);
                }
                service.handleEmptyDataRequest(this, APP_Storage.getValue(storageKey , [], true));
            }
        };
        service.addEmptyStorageRequest(syncOptions);//initial with 10 second timer to get new data as fast as possible
    },
    syncLocalActivities : function(options){
        options.url = (this.baseUrl + "social/users/" + this.userId + "/providers/" +options.networkId + "/localfeed");
        this.syncActivities(options);
    },
    syncMessages: function(options){
        //options : url (optional), network id , last modified key , sync time out , storage key
        //options.syncStepCompleted (isStored,data,updatedStorageIds,requestData, textStatus, jqXHR)
        //options.syncStepInProgress
        //options.syncError
        var storageString = APP_Storage.getValue(options.storageKey, "");
        var service = this.syncService;
        var self = this;
        function identifier(element){
            var key="";
            var contactIdentifier;
            if(element.receivers && element.receivers.length && options.networkId != APP_External_Network.Google){ //identifier for message contain receivers
                var receivers =[];
                _.each(element.receivers,function(receiver){
                    if(receiver.identity && receiver.identity.identifier){
                        contactIdentifier = receiver.identity.identifier;
                    }else{
                        contactIdentifier = receiver.contactId;
                    }
                    receivers.push(contactIdentifier);
                });
                receivers = _.sortBy(receivers);//as receivers id not always returned ordered from server : so to keep track with data we have to order
                key = receivers.join('_');
            }else if(element.conversation && element.conversation.length){ //identifier for message contain conversation
                var subject = (element.conversation[0].subject ? element.conversation[0].subject : element.conversation[0].body);
                contactIdentifier = element.conversation[0].sender;
                if(contactIdentifier.identity && contactIdentifier.identity.identifier){
                    contactIdentifier = contactIdentifier.identity.identifier;
                }else{
                    contactIdentifier = contactIdentifier.contactId;
                }
                key = subject + "_" + contactIdentifier;
            }else if((element.subject || element.body) && element.sender){//identifier for each message inside conversation
                var subject = (element.subject ? element.subject : element.body);
                contactIdentifier = element.sender;
                if(contactIdentifier.identity && contactIdentifier.identity.identifier){
                    contactIdentifier = contactIdentifier.identity.identifier;
                }else{
                    contactIdentifier = contactIdentifier.contactId;
                }
                key = subject + "_" + contactIdentifier;
            }else{
                key = element.lastMessageDate || element.date;
            }
            return key;
        }

        var syncOptions = {
            header: (APP_Storage.getValue(options.lastModifiedKey) ? {delta: true} : {}),
            keepTimerData: true,
            url: options.url ? options.url : (this.baseUrl + "social/users/" + this.userId + "/providers/" +options.networkId + "/messages"),
            lastModifiedKey: options.lastModifiedKey,
            syncUntilData: false,
            syncForEver: false,
            syncTimeout: options.syncTimeOut,
            stopOnError: true,
            onSyncStart : function(){
                if(options.syncStart){
                    options.syncStart();
                }
            },
            onSyncSuccess: function (data, textStatus, jqXHR) {
                var lastModified = APP_Storage.getValue(this.lastModifiedKey);
                if (lastModified) {//if last modified exist add delta
                    this.header = {delta: true};
                } else {
                    this.header = {};
                }
                if (jqXHR.status == 200 && data.messages) {
                    var messages = _.sortBy(data.messages, 'lastMessageDate').reverse();
                    var updatedIds = []; // passed by reference
                    messages = self.ignoreDuplicated(messages, options.storageKey, identifier,updatedIds,'lastMessageDate',true);
                    if(options.syncStepCompleted){
                        options.syncStepCompleted(false,[messages],[updatedIds],data, textStatus, jqXHR);//it should update local storage by new data only , and will update model
                    }
                    storageString = APP_Storage.getValue(options.storageKey);
                    service.addDataRequest(this);//call to parent
                }else if(jqXHR.status == 304 && APP_Storage.getValue(options.storageKey, "") != storageString){
                    var newData = self.getNewData(storageString, options.storageKey, identifier, 'lastMessageDate');
                    if(options.syncStepCompleted) {
                        options.syncStepCompleted(true, [newData],[],data, textStatus, jqXHR);//will not update local storage because it's already update but will update model
                    }
                    storageString = APP_Storage.getValue(options.storageKey);
                    service.addDataRequest(this);//call to parent
                }else {
                    service.handleEmptyDataRequest(this, APP_Storage.getValue(options.storageKey, [], true));
                }
            },
            onSyncError: function (jqXHR, textStatus, errorThrown) {
                if(options.syncError){
                    options.syncError(jqXHR, textStatus, errorThrown);
                }
                service.handleEmptyDataRequest(this, APP_Storage.getValue(options.storageKey, [], true));
            }
        };
        service.addEmptyStorageRequest(syncOptions);//initial with 10 second timer to get new data as fast as possible
    },
    syncVideos : function(options){
        //options : url (optional), network id , last modified key , sync time out , storage key , category(array of {name,storageKey})
        //options.syncStepCompleted (isStored,data,updatedStorageIds,requestData, textStatus, jqXHR)
        //options.syncStepInProgress
        //options.syncError
        var storageString = this.getStoredDataString(options);
        var storageKey = options.storageKey ? options.storageKey : options.category[0].storageKey;
        var service = this.syncService;
        var self = this;
        var syncOptions = {
            header: (APP_Storage.getValue(options.lastModifiedKey) ? {delta: true} : {}),
            keepTimerData: true,
            url: options.url ? options.url : (this.baseUrl + "content/users/" + this.userId + "/providers/" +options.networkId + "/videos"),
            lastModifiedKey: options.lastModifiedKey,
            syncUntilData: false,
            syncForEver: false,
            syncTimeout: options.syncTimeOut,
            stopOnError: true,
            onSyncStart : function(){
                if(options.syncStart){
                    options.syncStart();
                }
            },
            onSyncSuccess: function (data, textStatus, jqXHR) {
                var lastModified = APP_Storage.getValue(this.lastModifiedKey);
                if (lastModified) {//if last modified exist add delta
                    this.header = {delta: true};
                } else {
                    this.header = {};
                }
                if (jqXHR.status == 200 && data.videos) {
                    var categorized = {};//pass by reference
                    var videos = data.videos;
                    var updatedIds = []; // passed by reference
                    videos = self.ignoreDuplicatedCategorized(videos, options, 'itemKey',updatedIds);
                    if(options.syncStepCompleted){
                        options.syncStepCompleted(false,videos,updatedIds,data, textStatus, jqXHR);//it should update local storage by new data only , and will update model
                    }
                    storageString =  self.getStoredDataString(options);
                    service.addDataRequest(this);//call to parent
                }else if(jqXHR.status == 304 && self.getStoredDataString(options) != storageString){
                    var newData = self.getNewDataCategorized(storageString, options, 'itemKey');
                    if(options.syncStepCompleted) {
                        options.syncStepCompleted(true, newData,[],data, textStatus, jqXHR);//will not update local storage because it's already update but will update model
                    }
                    storageString =  self.getStoredDataString(options);
                    service.addDataRequest(this);//call to parent
                }else {
                    service.handleEmptyDataRequest(this, APP_Storage.getValue(storageKey, [], true));
                }
            },
            onSyncError: function (jqXHR, textStatus, errorThrown) {
                if(options.syncError){
                    options.syncError(jqXHR, textStatus, errorThrown);
                }
                service.handleEmptyDataRequest(this, APP_Storage.getValue(storageKey, [], true));
            }
        };
        service.addEmptyStorageRequest(syncOptions);//initial with 10 second timer to get new data as fast as possible
    },

    syncNeighborhoods : function(options){
        var storageString = APP_Storage.getValue(options.storageKey, "");
        var service = this.syncService;
        var self = this;

        var region = options && options.region;
        region = region ? region : "us";

        var syncOptions = {
            header: (APP_Storage.getValue(options.lastModifiedKey) ? {delta: true} : {}),
            keepTimerData: true,
            url: options.url ? options.url : (this.baseUrl + "places/users/" + this.userId + "/regions/"+region+"/neighborhoods"),
            lastModifiedKey: options.lastModifiedKey,
            syncUntilData: false,
            syncForEver: false,
            syncTimeout: options.syncTimeOut,
            stopOnError: true,
            onSyncStart : function(){
                if(options.syncStart){
                    options.syncStart();
                }
            },
            onSyncSuccess: function (data, textStatus, jqXHR) {
                var lastModified = APP_Storage.getValue(this.lastModifiedKey);
                if (lastModified) {//if last modified exist add delta
                    this.header = {delta: true};
                } else {
                    this.header = {};
                }
                if (jqXHR.status == 200 && data.places) {
                    var places = _.sortBy(data.places, 'name').reverse();
                    var updatedIds = []; // passed by reference
                    places = self.ignoreDuplicated(places, options.storageKey, 'placeId',updatedIds,'name');
                    if(options.syncStepCompleted){
                        options.syncStepCompleted(false,[places],[updatedIds],data, textStatus, jqXHR);//it should update local storage by new data only , and will update model
                    }
                    storageString = APP_Storage.getValue(options.storageKey);
                    service.addDataRequest(this);//call to parent
                }else if(jqXHR.status == 304 && APP_Storage.getValue(options.storageKey, "") != storageString){
                    var newData = self.getNewData(storageString, options.storageKey, 'placeId', 'name');
                    if(options.syncStepCompleted) {
                        options.syncStepCompleted(true, [newData],[],data, textStatus, jqXHR);//will not update local storage because it's already update but will update model
                    }
                    storageString = APP_Storage.getValue(options.storageKey);
                    service.addDataRequest(this);//call to parent
                }else {
                    service.handleEmptyDataRequest(this, APP_Storage.getValue(options.storageKey, [], true));
                }
            },
            onSyncError: function (jqXHR, textStatus, errorThrown) {
                if(options.syncError){
                    options.syncError(jqXHR, textStatus, errorThrown);
                }
                service.handleEmptyDataRequest(this, APP_Storage.getValue(options.storageKey, [], true));
            }
        };
        service.addEmptyStorageRequest(syncOptions);//initial with 10 second timer to get new data as fast as possible
    },
    syncInterests : function(options){
        var storageString = APP_Storage.getValue(options.storageKey, "");
        var service = this.syncService;
        var self = this;
        var syncOptions = {
            header: (APP_Storage.getValue(options.lastModifiedKey) ? {delta: true} : {}),
            keepTimerData: true,
            url: options.url ? options.url : (this.baseUrl + "analytics/users/" + this.userId + "/interests"),
            lastModifiedKey: options.lastModifiedKey,
            syncUntilData: false,
            syncForEver: false,
            syncTimeout: options.syncTimeOut,
            stopOnError: true,
            onSyncStart : function(){
                if(options.syncStart){
                    options.syncStart();
                }
            },
            onSyncSuccess: function (data, textStatus, jqXHR) {
                var lastModified = APP_Storage.getValue(this.lastModifiedKey);
                if (lastModified) {//if last modified exist add delta
                    this.header = {delta: true};
                } else {
                    this.header = {};
                }
                if (jqXHR.status == 200 && data.interests) {
                    var interests = data.interests;
                    var updatedIds = []; // passed by reference
                    interests = self.ignoreDuplicated(interests, options.storageKey, 'id',updatedIds,'name');
                    if(options.syncStepCompleted){
                        options.syncStepCompleted(false,[interests],[updatedIds],data, textStatus, jqXHR);//it should update local storage by new data only , and will update model
                    }
                    storageString = APP_Storage.getValue(options.storageKey);
                    service.addDataRequest(this);//call to parent
                }else if(jqXHR.status == 304 && APP_Storage.getValue(options.storageKey, "") != storageString){
                    var newData = self.getNewData(storageString, options.storageKey, 'id','name');
                    if(options.syncStepCompleted) {
                        options.syncStepCompleted(true, [newData],[],data, textStatus, jqXHR);//will not update local storage because it's already update but will update model
                    }
                    storageString = APP_Storage.getValue(options.storageKey);
                    service.addDataRequest(this);//call to parent
                }else {
                    service.handleEmptyDataRequest(this, APP_Storage.getValue(options.storageKey, [], true));
                }
            },
            onSyncError: function (jqXHR, textStatus, errorThrown) {
                if(options.syncError){
                    options.syncError(jqXHR, textStatus, errorThrown);
                }
                service.handleEmptyDataRequest(this, APP_Storage.getValue(options.storageKey, [], true));
            }
        };
        service.addEmptyStorageRequest(syncOptions);//initial with 10 second timer to get new data as fast as possible
    },
    syncExternalInterests : function(options){
        //in current status 26/11 - this end point not support sync so here we handle it now and after fix too
        var lastModified = APP_Storage.getValue(options.lastModifiedKey);
        var storage = APP_Storage.getValue(options.storageKey, [],true);
        if(lastModified || (!lastModified && !storage.length)){
            options.url = (this.baseUrl + "analytics/users/" + this.userId + "/providers/" +options.networkId + "/interests");
            this.syncInterests(options);
        }
    },
    syncFavorites : function(options){
        var storageString = APP_Storage.getValue(options.storageKey, "");
        var service = this.syncService;
        var self = this;
        var syncOptions = {
            header: (APP_Storage.getValue(options.lastModifiedKey) ? {delta: true} : {}),
            keepTimerData: true,
            url: options.url ? options.url : (this.baseUrl + "places/users/" + this.userId + "/providers/"+options.networkId+"/favorites"),
            lastModifiedKey: options.lastModifiedKey,
            syncUntilData: false,
            syncForEver: false,
            syncTimeout: options.syncTimeOut,
            stopOnError: true,
            onSyncStart : function(){
                if(options.syncStart){
                    options.syncStart();
                }
            },
            onSyncSuccess: function (data, textStatus, jqXHR) {
                var lastModified = APP_Storage.getValue(this.lastModifiedKey);
                if (lastModified) {//if last modified exist add delta
                    this.header = {delta: true};
                } else {
                    this.header = {};
                }
                if (jqXHR.status == 200 && data.places) {
                    var places = _.sortBy(data.places, 'name').reverse();
                    var updatedIds = []; // passed by reference
                    places = self.ignoreDuplicated(places, options.storageKey, 'placeId',updatedIds,'name');
                    if(options.syncStepCompleted){
                        options.syncStepCompleted(false,[places],[updatedIds],data, textStatus, jqXHR);//it should update local storage by new data only , and will update model
                    }
                    storageString = APP_Storage.getValue(options.storageKey);
                    service.addDataRequest(this);//call to parent
                }else if(jqXHR.status == 304 && APP_Storage.getValue(options.storageKey, "") != storageString){
                    var newData = self.getNewData(storageString, options.storageKey, 'placeId', 'name');
                    if(options.syncStepCompleted) {
                        options.syncStepCompleted(true, [newData],[],data, textStatus, jqXHR);//will not update local storage because it's already update but will update model
                    }
                    storageString = APP_Storage.getValue(options.storageKey);
                    service.addDataRequest(this);//call to parent
                }else {
                    service.handleEmptyDataRequest(this, APP_Storage.getValue(options.storageKey, [], true));
                }
            },
            onSyncError: function (jqXHR, textStatus, errorThrown) {
                if(options.syncError){
                    options.syncError(jqXHR, textStatus, errorThrown);
                }
                service.handleEmptyDataRequest(this, APP_Storage.getValue(options.storageKey, [], true));
            }
        };
        service.addEmptyStorageRequest(syncOptions);//initial with 10 second timer to get new data as fast as possible
    },
    //This function is responsible for sync contacts with sprocket api
    //@options object contain sync option which include
    //                      - storage key for contacts array in local storage
    //                      - storage key of last modified value send from api
    //                      - network id that we sync contacts for (although we sync contacts for all network but this id necessary for some validation )
    //                      - syncStart : callback function which is called before sync request is end to api
    //                      - syncStepCompleted : callback function which is called when data is returned from api or storage is update from another request
    //                      - syncError : callback function which is called when sync request return error
    syncContacts : function(options){
        var storageString = APP_Storage.getValue(options.storageKey, "");
        var service = this.syncService;
        var self = this;
        var lastModified = APP_Storage.getValue(options.lastModifiedKey);

        //if we don't have last modified that mean that we don't make previous request to /synced endpoint
        if(!lastModified){
            //so we have to send last modified with small value to sync all contacts exist on api until this moment
            //we already handle duplication of contacts so there will be no problem if contacts are returned already exist in storage as we will use new values
            APP_Storage.setValue(options.lastModifiedKey,"1");
        }

        //private function used to get contacts of specific network which id is sent of sync options
        function getNetworkContacts(){
            var contacts = APP_Storage.getValue(options.storageKey, [], true);
            //if the sync request was fired from contacts page (which virtual network id=-2) return all contacts
            if(options.networkId==-2){
                return contacts;
            }else {
                //else filter contact by network
                var networkContacts = _.filter(contacts, function (contact) {
                    return (contact.identity && contact.identity.externalNetworkId == options.networkId);
                });
                return networkContacts;
            }
        }

        var syncOptions = {
            url: (options.url ? options.url : (self.baseUrl + "social/users/" + self.userId + "/contacts/synced")),
            header: {delta: true},
            keepTimerData: true,
            lastModifiedKey: options.lastModifiedKey,
            syncUntilData: false,
            syncForEver: false,
            syncTimeout: options.syncTimeOut,
            stopOnError: true,
            onSyncStart : function(){
                if(options.syncStart){
                    options.syncStart();
                }
            },
            onSyncSuccess: function (data, textStatus, jqXHR) {
                //if data is return from api
                if (jqXHR.status == 200 && Object.keys(data).length != 0) {
                    var added = data.added ? data.added : [];
                    //updated contacts sync from /sync endpoint and if this array not exist , set it with empty array
                    var updated = data.updated ? data.updated : [];
                    //merge both arrays
                    var notDeleted = added.concat(updated);
                    notDeleted = _.sortBy(notDeleted, 'displayName').reverse();

                    var updatedIds = []; // passed by reference
                    //function ignoreDuplicated (will be documented later) : this function compare the storage with data returned from api
                    //and if found contacts in storage with same id from api , it will update local storage of this contact
                    notDeleted = self.ignoreDuplicated(notDeleted, options.storageKey, 'contactId',updatedIds,'displayName');
                    if(options.syncStepCompleted){
                        options.syncStepCompleted(false,[notDeleted],[updatedIds],data, textStatus, jqXHR);//it should update local storage by new data only , and will update model
                    }
                    storageString = APP_Storage.getValue(options.storageKey);

                    //add the incoming request for sync to request Queue
                    service.addDataRequest(this);//call to parent
                }else if(jqXHR.status == 304 && APP_Storage.getValue(options.storageKey, "") != storageString){
                    //if 304 is returned from api but current value of local storage is not equal to value detects in last request
                    //that mean a update happened to storage from another sync request in another page
                    //so we use 'getNewData' function (will be documented later) to get the new data by comparing last value detect with current storage
                    var newData = self.getNewData(storageString, options.storageKey, 'contactId', 'displayName');//will get the new data only not deleted or updated
                    if(options.syncStepCompleted) {
                        options.syncStepCompleted(true, [newData],[],data, textStatus, jqXHR);//will not update local storage because it's already update but will update model
                    }
                    storageString = APP_Storage.getValue(options.storageKey);
                    //use network contacts in check instead of global contact storage because the sync
                    //happen on level of each network (except in contact page) so we want to check the storage per network to determine the timeout
                    if(getNetworkContacts().length){
                        //if there is contacts for this network in storage we will send another request after 8 min (configurable)
                        service.addDataRequest(this);//call to parent
                    }else{
                        //and if not we will send another request after 10 second (configurable) to keep user update ... this enhance tooltip sync status
                        service.addEmptyStorageRequest(this);
                    }
                }else {
                    //use network contacts in check instead of global contact storage because the sync
                    //happen on level of each network (except in contact page) so we want to check the storage per network to determine the timeout
                    service.handleEmptyDataRequest(this, getNetworkContacts());//APP_Storage.getValue(options.storageKey, [], true));
                }
            },
            onSyncError: function (jqXHR, textStatus, errorThrown) {
                if(options.syncError){
                    options.syncError(jqXHR, textStatus, errorThrown);
                }

                //use network contacts in check instead of global contact storage because the sync
                //happen on level of each network (except in contact page) so we want to check the storage per network to determine the timeout
                service.handleEmptyDataRequest(this, getNetworkContacts());//APP_Storage.getValue(options.storageKey, [], true));
            }
        };

        //fire first request after 10 second (configurable)
        service.addEmptyStorageRequest(syncOptions);//initial with 10 second timer to get new data as fast as possible
    }
});