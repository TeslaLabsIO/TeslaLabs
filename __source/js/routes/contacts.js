(function () {
    'use strict';
    App.ContactsRoute = Ember.Route.extend({
        model: function (params) {
            // reset sync stack
            App.SynchronizeService.resetSyncService();
            var controller = this.controllerFor('contacts');
            var selectedNetwork = controller.get('contactNetwork');
            var contactService = controller.container.lookup('contacts:service');
            var contacts,contactsPerPage;
            controller.set('categorizedContacts',contactService.getNetworkContacts());
            contacts = controller.get('categorizedContacts')[selectedNetwork];
            contacts = contacts ? contacts : [];
            contactsPerPage = controller.get('contactPerPage');
            return {
                contactsPaged : contacts.slice(0,contactsPerPage)
            }
        },
        resetController: function (controller, isExiting, transition) { // run before exiting the route
            controller.set('showSearchGlass', true);
            var lastSelectedContact = controller.get('lastSelectedContact');
            if(lastSelectedContact) {
                lastSelectedContact.send('hideContactDetails');
            }
        }
    })
})();