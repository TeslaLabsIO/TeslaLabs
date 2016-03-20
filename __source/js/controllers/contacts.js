(function () {
    'use strict';
    //This controller is responsible for data displayed on contacts page and user interaction with this data
    App.ContactsController = Ember.ObjectController.extend({
        //contact object represent the selected contact
        lastSelectedContact:null,
        //contact object contain the new contact details (add contact functionality not implemented yet in sprocket)
        newContact : null,
        //integer represent the current selected network (tab)
        contactNetwork:1,
        //object contains contacts categorized by network id
        categorizedContacts:[],
        //bool determine whether to display the search icon or cancel icon beside the contact's search box
        showSearchGlass:true,
        //
        //properties
        //
        //this property calculate number of contacts should be displayed on page according to height of user screen
        //the paging is added to enhance performance in displaying large number of contacts as ember has issue with that
        contactPerPage:function(){
            var screenHeight = screen.availHeight;
            var contentHeight = screenHeight - 200;             //title bar+tabs+search box = 200px
            var rowsNumber = Math.ceil(contentHeight/100);      //height of contact cell = 100px
                                                                //the commented values below was used when we have 3 element per row
            var contactsPerPage = rowsNumber * 2;               //3;
                                                                //var remaining = contactsPerPage % 6;//make contacts multiple of set to be compatible with 2 contact or 3 contact per row
            contactsPerPage = contactsPerPage + 4;              //contactsPerPage - remaining +12;//add another 2 rows
            return contactsPerPage;
        }.property(),
        //this property is used to determine if user has activated the current selected network (tab) or not
        isNetworkActivated : function(){
            var networks  = this.get('constant.network');
            var contactNetwork = this.get('contactNetwork');
            var userIdKey = networks[contactNetwork].authorization.userId;
            //check that selected network identity is in storage
            return userIdKey && APP_Storage.getValue(userIdKey,null)!=null;
        }.property('contactNetwork'),
        //this property used to get info about network name,url which are used mainly to display 'login required' message when user is not logged on selected network
        selectedNetworkInfo : function(){
            var networks  = this.get('constant.network');
            var contactNetwork = this.get('contactNetwork');
            return {
                name : App.utilities.capitalizeFirstLetter(networks[contactNetwork].name),
                url : '/#/'+networks[contactNetwork].name
            };
        }.property('contactNetwork'),
        //this property return array of networks the supported contacts according to data stored in constant object.
        //that will help us if we want to add contacts' support to another network , we just need to modify in constant object and that will reflect on whole page functionality
        networks:function(){
            var controller = this;
            //get supported networks by sprocket from constant object
            var networks  = this.get('constant.network');

            var categorizedContacts =  this.get('categorizedContacts');

            var contacts;
            var networksData= [];

            _.each(networks,function(data,id){
                //ignore network with id=-2 as it's only added to constant object to make "contacts" follow the same sync structure used for other networks
                //&& check that "contacts" is one of entities that this network support
                if(id!=-2 && data.entities && data.entities.indexOf('contacts')!=-1) {
                    //get the contacts of this network
                    contacts = categorizedContacts[id];
                    contacts = contacts ? contacts : [];

                    //if this network is current selected (tab) , filter the contacts according to search term if exist.
                    //this is used to display number of contacts for current selected network based on filtering contacts by search term
                    if(controller.get('contactNetwork') == id){
                        contacts = controller.filterContacts(contacts);
                    }

                    //return data will be displayed on tabs
                    networksData.push({id: id, name: data.name, count:contacts.length});
                }
            });
            return networksData;
        }.property('categorizedContacts'),
        //the property was used when we have either to display 3 contacts or 2 per row but now we only display 2
        isDetailsDisplayed: function(){
            return true;
            /*if(this.get('lastSelectedContact') || this.get('newContact')){return true;}return false;*/
        }.property('lastSelectedContact','newContact'),
        //
        //observers
        //
        //This is where the sync process start in this page
        modelLoaded: function () {
            var controller = this;
            var contactService = controller.container.lookup('contacts:service');
            App.PollingManager.startNetworkSync(
                -2, //this is id of (virtual) network contain sync options for contacts as we want sync follow the same structure overall the app
                function (entityName, entitySyncOptions, isStored, newData, updatedIds, data, textStatus, jqXHR) {
                    //can't reset here because the update in the model will remove the lastselected controller so the update
                    //should happen on another way take a look at observer of 'contactsPaged' (contactsChange function)
                    //
                    //controller.set('lastSelectedContact', null); // reset current selected details
                    //
                    if(entityName == 'contacts'){
                        //since sync process only handle insert and update of data we make function in contact service to handle deletion of contacts
                        if(!isStored){
                            contactService.deleteContacts(data.deleted);
                        }
                        //get the current contacts of selected network after filtering them if search term exist
                        var current = controller.filterContacts();

                        //update the 'categorizedContacts' property with the updated contacts from local storage
                        controller.set('categorizedContacts',contactService.getNetworkContacts());

                        //update the contacts displayed in page view
                        controller.updateModel(current);
                    }
                },
                function (entityName, entitySyncOptions, jqXHR, textStatus, errorThrown) {//error handling function
                    //display of error message is already handled on sync service so we don't have more code here
                }
            );
        }.observes('model'),
        //This function handle any functionality should be applied when user select another tab in contacts page
        contactNetworkChange : function(){
            //reset scroll bar to top here is better than reset it in contactsPaged after render of  because in after render it may fire paging
            $('#user_contacts').mCustomScrollbar("scrollTo", "top", {scrollInertia: 0});
            //
            var controller = this;
            var contactNetwork = controller.get('contactNetwork');

            var lastSelectedContact = this.get('lastSelectedContact');
            if(lastSelectedContact) {
                lastSelectedContact.send('hideContactDetails');
            }

            //remove search term if it was provided and apply another functionality on 'resetSearch' function
            controller.send('resetSearch',true);//true mean not to filter update the data because we will do that later

            var contacts = controller.filterContacts();

            //scrolling to top not work properly on chrome so we have to delay change in the dom structure until scroll top completed
            setTimeout(function(){
                console.log('tab (100 subtracted of timeout) ',new Date().getTime() - 100);

                //display first page of contacts of the new selected network
                controller.set('contactsPaged',contacts.slice(0,controller.get('contactPerPage')));
            },100);
        }.observes('contactNetwork'),
        //the function is called when changes happen on the contacts displayed in the page
        contactsChange:function(){
            Ember.run.scheduleOnce('afterRender', this, function () {
                console.log('end ',new Date().getTime(),' length',this.get('contactsPaged').length);
                this.get('blocker').unblock('user_contacts_parent');

                //because after the updated of contactsPaged , the lastSelectedContact controller become not exist
                //and is replaced by new one so we have to work with new one
                var lastSelectedContact = this.get('lastSelectedContact');
                if(lastSelectedContact) {
                    var updatedContactDiv = $('#'+lastSelectedContact.model.contactId);
                    console.log(updatedContactDiv,'---',lastSelectedContact);
                    //
                    lastSelectedContact.send('hideContactDetails');
                    //.nextAll is better than .next because it ignore the <script> tags ember put between the divs
                    if(updatedContactDiv.nextAll('.contact').length){
                        //that will execute the selectContact action and will replace the old with new model
                        updatedContactDiv.nextAll('.contact')[0].click();
                    }
                }
            })
        }.observes('contactsPaged'),
        //function
        //the function show or hide the 'new' word which appears on the tab of current selected network when new data is return from sync
        updateNetwork:function(show){
            if(!show){
                //reload the content of the tabs  (which are generated by "networks" property) , this reload will remove the 'new' word
                this.notifyPropertyChange('networks');
            }else{
                var controller = this;
                var contactNetwork = this.get('contactNetwork');
                var networksData = this.get('networks');
                //loop over that tabs (which are generated by "networks" property) and display 'new' on the selected tab
                _.each(networksData,function(network,i){
                    if(network.id==contactNetwork){
                        controller.set('networks.'+i+'.count','new');
                    }
                })
            }
        },
        //this function update contacts in page if new data is returned from sync
        // @param current : array of contacts represent the contacts currently displayed in page
        updateModel:function(current){
            var contactNetwork = this.get('contactNetwork');
            //get the contacts updated after sync and filtering them by search term if exist
            var updated = this.filterContacts();
            updated = updated ? updated : [];
            current = current ? current : [];
            var isUpdated = updated.length != current.length;

            if(!isUpdated){
                _.each(current,function(contact,id){
                    if(contact.contactId != updated[id].contactId || contact.email != updated[id].email || contact.displayName != updated[id].displayName){
                        isUpdated = true;
                    }
                })
            }
            if(isUpdated){
                //get number of contacts displayed in current view
                var currentCount = this.get('contactsPaged').length;
                //get number of contacts should be displayed per page
                var countPerPage =  this.get('contactPerPage');

                if(currentCount < countPerPage){
                    currentCount = countPerPage;
                }
                //
                console.log('current ',current);console.log('update  ',updated);

                //call the 'updateNetwork' which will show 'new' word on current selected tab
                this.updateNetwork(true);
                //update the view
                this.set('contactsPaged',updated.slice(0,currentCount));
            }
        },
        //this function filter the contacts by search term if exist
        //@param array : is array of contacts will be filtered (optional)
        filterContacts : function(array){
            var query = this.get('searchQuery');
            var contactNetwork = this.get('contactNetwork');
            //get the contacts of current selected network
            var data = this.get('categorizedContacts')[contactNetwork];
            //if the array is not provided , use the contacts from selected network
            data = array ? array : (data ? data : []);

            if(query && _.isString(query)) {
                query = query.toLowerCase();
                //get contacts that contain query in their displayName
                return _.filter(data, function (contact) {
                    return contact.displayName && contact.displayName.toLowerCase().indexOf(query)!==-1;
                });
            }

            return data;
        },
        //actions
        actions : {
            //this function is executed while use writing the search term
            onSearchKeyUp:function(event){
                //if use is not logged on current selected network ,the search functionality will be disabled
                if(this.get('isNetworkActivated')) {
                    //if user press Enter key
                    if (event.keyCode == 13) {
                        //if search term is provided start search (call 'searchContacts' function) but if he press enter after clear the search term this wll reset the search
                        if (this.get('query')) {
                            this.send('searchContacts');
                        } else {
                            this.send('resetSearch');
                        }
                    } else if (event.keyCode == 27) {
                        //if user press ESC , call 'resetSearch' function
                        this.send('resetSearch');
                    } else if (this.get('searchQuery') != this.get('query')) {
                        //if user enter search term that is different from term used in last search process , show the 'search glass icon' so user can click on it instead of press Enter
                        this.set('showSearchGlass', true);
                    }else if (this.get('searchQuery') && this.get('searchQuery') == this.get('query')) {
                        //if it's the same search term , hide the 'search glass icon' and show 'cancel icon' so user can click on it to cancel search instead of press ESC
                        this.set('showSearchGlass', false);
                    }
                }
            },
            /*this function responsible for reset search operation and make related change in contacts page
              @param preserveData : bool . if = true, the data displayed in contacts page (which was filtered by the search term) will not be updated
                                    this functionality is needed when we want to reset search but we will make update of contacts page
                                    based on different criteria or after make some functionality
            */
            resetSearch : function(preserveData){
                //reset scroll bar to top here is better than reset it in contactsPaged after render of  because in after render it may fire paging
                $('#user_contacts').mCustomScrollbar("scrollTo", "top", {scrollInertia: 0});
                //
                this.set('query','');
                this.set('searchQuery','');
                //
                this.set('searchInProgress',false);
                this.set('showSearchGlass',true);
                //
                var controller = this;
                if(!preserveData) {
                    //in this case we don't have search term so all contacts of current selected network are returned
                    var contacts = controller.filterContacts();

                    //scrolling to top not work properly on chrome so we have to delay change in the dom structure until scroll top completed
                    setTimeout(function() {
                        //display the first page of contacts in selected network
                        controller.set('contactsPaged', contacts.slice(0, controller.get('contactPerPage')));
                        //display the number of contacts after we cleared the search term
                        controller.notifyPropertyChange('networks');
                    },100);
                }else{
                    //display the number of contacts after we cleared the search term
                    this.notifyPropertyChange('networks');
                }

            },
            searchContacts : function(){
                //if use is not logged on current selected network ,the search functionality will be disabled
                if(this.get('isNetworkActivated')) {
                    //reset scroll bar to top here is better than reset it in contactsPaged after render of  because in after render it may fire paging
                    $('#user_contacts').mCustomScrollbar("scrollTo", "top", {scrollInertia: 0});

                    //show blocking overlay to indicate that search in progress
                    this.get('blocker').block('user_contacts_parent', true, 'transparent');

                    //copy the query value in another variable so if user write another query in the search box without click "search"
                    // , we don't use the new one on filtering contact function but use the query submitted for search
                    this.set('searchQuery', this.get('query'));
                    //
                    this.set('searchInProgress', true);
                    this.set('showSearchGlass', false);
                    //
                    var controller = this;
                    //filter the contacts according to search term
                    var contacts = controller.filterContacts();

                    //scrolling to top not work properly on chrome so we have to delay change in the dom structure until scroll top completed
                    setTimeout(function () {
                        //display first page of filtered contacts
                        controller.set('contactsPaged', contacts.slice(0, controller.get('contactPerPage')));
                        //update the count displayed on the tab to represent number of contacts from search result
                        controller.notifyPropertyChange('networks');
                    }, 100);
                }
            },
            showContactDetails : function(){
                this.set('newContact',null);
                this.updateNetwork(false);
            },
            addContact : function(){
                var lastSelectedContact = this.get('lastSelectedContact');
                if(lastSelectedContact){
                    lastSelectedContact.send('hideContactDetails');
                }
                this.set('newContact',{});
            },
            cancelAddContact : function(){
                this.set('newContact',null);
            }
            /*hideContactDetails : function(){
                var contact = this.get('lastSelectedContact');
                if(contact){
                    contact.set('isSelected',false);
                    this.set('lastSelectedContact',null);
                }
            }*/
        }
    })
})();