(function () {
    'use strict';
    App.IndexRoute = Ember.Route.extend({
        beforeModel: function (transation) {
            if (location.protocol.indexOf('https') != -1) {
                location.protocol = 'http';
            } else {
                var service = App.RecommendedService;
                if (getCookie(APP_Cookies.userID) == "") {
                    this.transitionTo('login');
                } else if (service.userId == "") {
                    //this is specially happen when user login in another tab after reset password
                    //then back to forget password screen opened in another tab and click login
                    location.reload();
                }else{
                    this._super(transation)
                }
            }
        },
        model: function () {
            var error=[];
            var contacts = APP_External_Network.getIdentity(undefined,error);
            var networks = App.CONSTANT.network;
            var identityMap = {};
            var storageKey;
            if(!error.length) {
                console.log(contacts);
                _.each(contacts, function (contact) {
                    if (contact.identity) {
                        identityMap[contact.identity.externalNetworkId] = contact.identity.identifier;
                    }
                });
                _.each(networks, function (network, id) {
                    //yelp , app , contacts . those networks not have authorization
                    storageKey = network.authorization ? network.authorization.userId : null;
                    if (storageKey && id != 5) {//youtube not have contact so if we remove its torage it will effect on gmail
                        if (!identityMap[id]) {//if identity not exist that mean we should remove it
                            APP_Storage.removeValues(storageKey);
                            console.log('removed ', storageKey)
                        } else { //we may not have it so we should update the sorage
                            APP_Storage.setValue(storageKey, identityMap[id], false, true);
                            console.log('updated ', storageKey, ' -- ', identityMap[id])
                        }
                    }

                });
            }

            if (APP_Storage.getValue(APP_Storage.gMailUserID(),null)) {
                var gmailStorage = _.sortBy(APP_Storage.getValue(APP_Storage.gMailMessage, [], true), 'lastMessageDate').reverse();
                return {
                    gmailMessages: gmailStorage,
                    gmailMessagesCount: gmailStorage.length
                }
            }
            else{
                return {
                    gmailMessages: [],
                    gmailMessagesCount: 0
                }
            }
        }
    });
})();
