(function () {
    'use strict';
    App.ContactsView = Ember.View.extend({
        didInsertElement : function(){
            var self = this;
            var controller = self.container.lookup('controller:contacts');
            var searchQuery = controller.get('searchQuery');
            $('#user_contacts').mCustomScrollbar({
                callbacks: {
                    onScroll: function () {
                        controller.updateNetwork(false);
                    },
                    whileScrolling: function () {
                        if (this.mcs.topPct > 80) {
                            var contactNetwork = controller.get('contactNetwork');
                            var contactsPerPage = 18;//controller.get('contactPerPage');//for faster loading 18 is reasonable
                            var contactsPaged = controller.get('contactsPaged');
                            var contacts = controller.filterContacts();//controller.get('categorizedContacts.'+contactNetwork);
                            contacts = contacts ? contacts : [];
                            if(contacts.length > contactsPaged.length){
                                console.log('paging ',new Date().getTime());

                                var newPageStart = contactsPaged.length;
                                var newPageEnd = newPageStart + contactsPerPage;
                                //prevent multiple paging by prevent user from scroll while loading + show user that loading of contact in progress
                                //since loading block user actions
                                controller.get('blocker').block('user_contacts_parent',true,'transparent');
                                //
                                contactsPaged.replace(newPageStart,0,contacts.slice(newPageStart,newPageEnd));
                                controller.notifyPropertyChange('contactsPaged');
                            }
                        }
                    }
                }
            });
            $('.contactData').mCustomScrollbar({
                live : "on"
            });
        }
    })
})();