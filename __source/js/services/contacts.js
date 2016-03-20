(function () {
    'use strict';
    //This service is responsible for getting contacts from sprocket api and update contacts in local storage
    App.ContactsService = App.ServiceObject.extend({
        //This function is called on user login to retrieve his contacts from sprocket api
        getContacts: function () {
            var contacts = APP_Storage.getValue(APP_Storage.contacts,[],true);
            var service = this;
            var error = App.ErrorClass.create({});

            //if we have no contact but we have last modified that mean all contacts are deleted so we will continue using synced contacts endpoint
            //but in case of both not exist we use global contacts endpoint
            if(!contacts.length && !APP_Storage.getValue(APP_Storage.contactsLastModified)){
                // make ajax
                Ember.$.ajax(service.get('baseUrl') + 'social/users/' + service.get('userId') + '/contacts', {
                    cache: false,//prevent caching
                    type: 'GET',
                    dataType: 'JSON'
                }).then(function (data) {
                    if(_.isObject(data) && _.isArray(data.contacts) && data.contacts.length > 0)
                        APP_Storage.setValue(APP_Storage.contacts,data.contacts,true);
                }, function (xhr) {
                    error.showServerError(xhr);
                });
            }
        },
        //This function sort contacts by 2 keys , mainKey which is now the "displayName" and "contactId" in case we have 2 contacts with same name
        sortContacts:function(contacts,mainKey){
            return contacts.sort(function(a,b){
                if(a[mainKey] == b[mainKey]){
                    return a.contactId - b.contactId;
                }else{
                    return a[mainKey] < b[mainKey] ? -1 : 1;
                }
            });
        },
        //This function retrieve contacts of specific network or all contacts categorized by network
        //@param networkId : int , if provided function will return contacts of this network only and if not it will return all contacts but categorized by network
        getNetworkContacts : function(networkId){
            var self = this;
            //get contacts from local storage
            var contacts = APP_Storage.getValue(APP_Storage.contacts, [], true);
            //get the sort key of contacts from constant object
            var sortKey = App.CONSTANT.entitySortKeys.contacts ? App.CONSTANT.entitySortKeys.contacts : "displayName";

            if(!_.isUndefined(networkId)) {
                //if networkId is provided return only the contacts of provided network after sort them
                var networkContacts = _.filter(contacts, function (contact) {
                    contact[sortKey]=App.utilities.capitalizeFirstLetter(contact[sortKey]);
                    return (contact.identity && contact.identity.externalNetworkId == networkId);
                });
                networkContacts = self.sortContacts(networkContacts,sortKey);
                return networkContacts;
            }else{
                var categorized = {};
                var network;
                //if network not provided group contacts per network
                _.each(contacts,function(contact){
                    if(contact.identity){
                        network = contact.identity.externalNetworkId;
                        if(!categorized[network]){
                            categorized[network] = [];
                        }
                        contact[sortKey]=App.utilities.capitalizeFirstLetter(contact[sortKey]);
                        categorized[network].push(contact);
                    }
                });
                //sort contacts after grouping them
                _.each(categorized,function(contacts,network){
                    categorized[network] = self.sortContacts(contacts,sortKey);
                });
                return categorized;
            }
        },
        //this function delete the contacts from local storage if their ids are provied from sprocket api as deleted
        //deleted : int array represent deleted contacts id provided from sprocket api
        deleteContacts : function(deleted){
            deleted = deleted ? deleted : [];
            var storage = APP_Storage.getValue(APP_Storage.contacts, [], true);
            //we don't want deletion of contact effect the original array to not break the loop so we take deep copy
            var result = $.extend(true,[],storage);
            var index = 0;
            //delete the deleted contact from local storage
            if (deleted.length) {
                _.each(storage, function (contact) {
                    //remove the current contact if its id in deleted Ids
                    if (deleted.indexOf(contact.contactId) != -1) {
                        result.splice(index,1);
                    }else{
                        index++;
                    }
                });
            }
            //update the storage by the first 3000 contacts which is max number of contacts the can be stored on local storage
            result = result.slice(0,App.CONSTANT.network["-2"].dataStorageMaxSize.contacts);//max is set at end of constant class
            APP_Storage.setValue(APP_Storage.contacts, result, true);
        }
    });
})();