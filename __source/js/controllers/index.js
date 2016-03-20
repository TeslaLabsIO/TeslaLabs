(function () {
    'use strict';
    App.IndexController = Ember.ObjectController.extend({
        needs:['global-feed'],
        globalFeed: Ember.computed.alias('controllers.global-feed'),
        // observers
        modelLoaded : function(){
            //alert('model loaded')
            //initialize requests after modeled load so we can update into existing variable not `null`s

            var syncService = App.SynchronizeService;
            syncService.resetSyncService();

            this.initializeSyncRequest();
            //alert('not')
            this.get('globalFeed').reset();
            this.get('globalFeed').initializeSyncRequest();
            this.get('globalFeed').set('feedNetwork',1);
        }.observes('model'),
        gmailMessagesLoaded:function(){
            //because we have html by using {{{}}} , that function will convert it to text
            //alert('message loaded')
           /* Ember.run.scheduleOnce('afterRender', this, function() {
                ConvertTextElementToHtml('.gmail_message_text_body');
                ConvertHtmlToText('.gmail_message_text_body');
            });*/
        }.observes('gmailMessages'),
        // properties
        gmailMessage: function () {
            return 'This may take a few minutes while we synchronize your Emails';
        }.property('gmailMessages'),
        gmailLoginStatus: function(){
            //alert('xx')
            if(APP_Storage.getValue(APP_Storage.googleUserID())){
                return true;
            }else{
                var networkActivated = App.OauthService.isNetworkActivated(APP_External_Network.Google);
                if(networkActivated){
                    this.initializeSyncRequest(APP_Storage.googleUserID());
                    console.log('*** ',this.get('globalFeed'));
                    if(this.get('globalFeed')){
                        this.get('globalFeed').initializeSyncRequest(APP_Storage.googleUserID());
                        console.log('*** init global feed sync from index')
                    }
                    return true;
                }else{
                    return false;
                }
            }
            return false;
        }.property('gmailMessages'),//just to update when re enter the page : ember problem with controller property
        yelpMessage: function () {
            return 'This may take a few minutes while we synchronize your favorite places.';
        }.property('yelpPlaces'),

        activityDetails: [],
        activityDetailsLoaded: function () {
            var controller = this;
            Ember.run.scheduleOnce('afterRender', this, function () {
                ConvertTextElementToHtml('.social_post_details_html');
                //
                if(controller.get('activityDetails').length && (controller.get('activityDetails.0.video.embedCode') || controller.get('activityDetails.0.audio.embedCode'))) {
                    setEmbedIframeScript('embedCodeFrame','embedCodeFrame',$('#embedCode').text());
                }
                //
            });
        }.observes('activityDetails'),
        messageDetails: [],
        messageDetailsLoaded: function () {
            Ember.run.scheduleOnce('afterRender', this, function () {
                ConvertTextElementToHtml('.social_message_details_html');
                $('.social_message_details_html').find('.collapse').fadeIn(0);
            });
        }.observes('messageDetails'),
        videoDetails: [],
        videoDetailsLoaded: function () {
            Ember.run.scheduleOnce('afterRender', this, function () {
                ConvertTextElementToHtml('.social_video_details_html', true);
            });
        }.observes('videoDetails'),
        placeDetails: [],
        placeDetailsLoaded: function () {
            Ember.run.scheduleOnce('afterRender', this, function () {
                ConvertTextElementToHtml('.social_place_details_html');
            });
        }.observes('placeDetails'),

        noLocation : false,
        //function
        ignoreDuplicatedMessages : function(data,storageKey){//identifierKey
            var storage = APP_Storage.getValue(storageKey,[],true);
            var identifiers = {};
            var filtered = [];
            var identifierKey;
            _.each(storage,function(element){
                if(element.conversation && element.conversation[0]){
                    identifierKey = element.conversation[0].date +'|'+ element.conversation[0].subject;
                    identifiers [identifierKey] = true;
                }
            });
            _.each(data,function(element){
                if(element.conversation && element.conversation[0]) {
                    identifierKey = element.conversation[0].date +'|'+ element.conversation[0].subject;
                    if (!identifiers [identifierKey]) {
                        filtered.push(element);
                    } else {
                        console.log('duplicated *** ', storageKey, ' *** ', element);
                        //alert(element);
                    }
                }
            });
            return filtered;
        },
        getNewMessagesData : function(oldDataStr,storageKey,sortKey){//identifierKey
            var storage = APP_Storage.getValue(storageKey,[],true);
            var oldData = JSON.parse(oldDataStr=="" ? "[]" : oldDataStr);
            if(sortKey){
                storage = _.sortBy(storage,sortKey).reverse();
                oldData = _.sortBy(oldData,sortKey).reverse();
            }
            var oldIdentifiers = {};
            var newData = [];
            var identifierKey;
            _.each(oldData,function(element){
                if(element.conversation && element.conversation[0]) {
                    identifierKey = element.conversation[0].date +'|'+ element.conversation[0].subject;
                    oldIdentifiers [identifierKey] = true;
                }
            });
            _.each(storage,function(element){
                if(element.conversation && element.conversation[0]) {
                    identifierKey = element.conversation[0].date + '|' + element.conversation[0].subject;
                    if (!oldIdentifiers [identifierKey]) {
                        newData.push(element);
                    } else {
                        console.log('old data *** ', storageKey, ' *** ', element);
                        //alert(element);
                    }
                }
            });
            return newData;
        },
        initializeSyncRequest:function(userStorageKey){
            var controller = this;
            var syncService = App.SynchronizeService;
            var storageString = APP_Storage.getValue(APP_Storage.gMailMessage,"");
            // gmail

            if(APP_Storage.getValue(APP_Storage.googleUserID()) || (userStorageKey && userStorageKey == APP_Storage.googleUserID())) {
                var gmailSyncOptions = {
                    header: (APP_Storage.getValue(APP_Storage.gMailMessageLastModified) ? {delta: true} : {}),
                    keepTimerData: true,
                    url: (API_Base_Url + "social/users/" + getCookie(APP_Cookies.userID) + "/providers/" + APP_External_Network.Google + "/messages"),
                    lastModifiedKey: APP_Storage.gMailMessageLastModified,
                    syncUntilData: false,
                    syncForEver: false,
                    syncTimeout: APP_Sync.googlePlusSyncTimeOut,
                    stopOnError: true,
                    onSyncSuccess: function (data, textStatus, jqXHR) {
                        if (APP_Storage.getValue(APP_Storage.gMailMessageLastModified)) {//if last modified exist add delta
                            this.header = {delta: true};
                        } else {
                            this.header = {};
                        }
                        var maxStorageSize = 20;
                        if (jqXHR.status == 200 && data.messages) {// && data.messages.length){
                            if (data.messages.length) {
                                //remove last [data.messages.length] from local storage and append new to top of local storage
                                //update model
                                var storage = _.sortBy(APP_Storage.getValue(APP_Storage.gMailMessage, [], true), 'lastMessageDate').reverse();
                                var messages = _.sortBy(data.messages, 'lastMessageDate').reverse();
                                messages = controller.ignoreDuplicatedMessages(messages, APP_Storage.gMailMessage) ;

                                storage = messages.concat(storage);
                                storage = _.sortBy(storage, 'lastMessageDate').reverse();
                                if (storage.length > maxStorageSize) {
                                    storage = storage.slice(0, maxStorageSize);
                                }
                                APP_Storage.setValue(APP_Storage.gMailMessage, storage, true);
                                storageString = APP_Storage.getValue(APP_Storage.gMailMessage);
                                //controller.get('gmailMessages').unshiftObjects(messages);
                                //controller.notifyPropertyChange('gmailMessages');
                                controller.set('gmailMessages', storage); //display last four
                                //in case of use delta and it works correct that should display right value but if not
                                //that will appended count of data that has been replaced not added
                                controller.set('gmailMessagesCount', controller.get('gmailMessagesCount') + messages.length);
                            }
                            syncService.addDataRequest(this);//run after empty data timeout when Q empty
                        } else if(jqXHR.status == 304 && APP_Storage.getValue(APP_Storage.gMailMessage,"") != storageString ){ //storage update in other page
                            var newData = controller.getNewMessagesData(storageString,APP_Storage.gMailMessage,'lastMessageDate');
                            storageString = APP_Storage.getValue(APP_Storage.gMailMessage);
                            if(newData.length){
                                var oldModel = controller.get('gmailMessages');
                                var newModel = newData.concat(oldModel).slice(0, maxStorageSize);
                                newModel = _.sortBy(newModel, 'lastMessageDate').reverse();
                                controller.set('gmailMessages', newModel); //display last four
                                controller.set('gmailMessagesCount', controller.get('gmailMessagesCount') + newData.length);
                            }
                            //alert('message storage not equal ' + newData.length);
                            syncService.addDataRequest(this);//run after empty data timeout when Q empty
                        } else {
                            syncService.handleEmptyDataRequest(this, APP_Storage.getValue(APP_Storage.gMailMessage, [], true));
                        }
                    },
                    onSyncError: function (jqXHR, textStatus, errorThrown) {
                        syncService.handleEmptyDataRequest(this, APP_Storage.getValue(APP_Storage.gMailMessage, [], true));
                    }
                };
                //no extend for option to keep track of timer
                APP_Sync.GetData(gmailSyncOptions).then(
                    function (data, textStatus, jqXHR) {
                        gmailSyncOptions.onSyncSuccess(data, textStatus, jqXHR);
                    },
                    function (jqXHR, textStatus, errorThrown) {
                        gmailSyncOptions.onSyncError(jqXHR, textStatus, errorThrown);
                    }
                );
            }
        },

        actions:{
            displayData: function (type, model, id) {
                var self = this;
                function displayModal() {
                    //resize not work correctly on this div due to use max-height
                    $('#homeDetailsContent').mCustomScrollbar("destroy");
                    $('#homeDetailsContent').mCustomScrollbar({});
                    $('#homeDetailsModal').modal('show');
                }

                console.log(type, id);
                this.set('activityDetails', []);
                this.set('messageDetails', []);
                this.set('videoDetails', []);
                this.set('placeDetails', []);
                if(type=='activity' || type=='video'){
                    var engageUrl = API_Base_Url + "social/users/" + getCookie(APP_Cookies.userID) + "/activities/engaged";
                    var engageModel = {activities:[model]};
                    if(type=='video'){
                        engageUrl = API_Base_Url + "content/users/" + getCookie(APP_Cookies.userID) + "/videos/engaged";
                        engageModel = {videos:[model]};
                    }
                     Ember.$.ajax(engageUrl, {
                        type: 'POST',
                        dataType: 'JSON',
                        contentType: "application/json; charset=utf-8",//fix problem of sending `?` question mark in data
                        headers: {
                            'Content-type': 'application/json'
                        },
                        "data": JSON.stringify(engageModel)
                        ,"success": function (data, textStatus, jqXHR) {}, "error": function (jqXHR, textStatus, errorThrown) {}
                    });
                }
                if (type == 'activity') {
                    this.set('activityDetails', [model]);
                } else if (type == 'message') {
                    this.set('messageDetails', model.conversation);
                } else if (type == 'video') {
                    this.set('videoDetails', [model]);
                } else if (type == 'place') {
                    this.set('placeDetails', [model]);
                    console.log(this.get('placeDetails'));

                    displayModal();
                    Ember.run.later(function () {
                        var address = "";

                        if (model.addressdto && model.addressdto.streetName)
                            address += model.addressdto.streetName + ' St';
                        if (model.addressdto && model.addressdto.city)
                            address += ' ' + model.addressdto.city + ',';
                        if (model.addressdto && model.addressdto.stateOrRegion)
                            address += ' ' + model.addressdto.stateOrRegion;
                        if (model.addressdto && model.addressdto.postalCode)
                            address += ' ' + model.addressdto.postalCode;

                        console.log('address:', address);

                        var lat = self.get('boundingBox.center.latitude');
                        var long = self.get('boundingBox.center.longitude');
                        var myLatlng;
                        if (_.isNumber(long) && _.isNumber(lat)) {
                            myLatlng = new google.maps.LatLng(lat, long);
                            var mapOptions = {
                                zoom: 18,
                                center: myLatlng
                            };
                            var map = new google.maps.Map(document.getElementById('h-map-canvas'), mapOptions);
                            var marker = new google.maps.Marker({
                                position: myLatlng,
                                map: map,
                                title: self.get('name')
                            });
                        } else if (address) {
                            var geoCoder = new google.maps.Geocoder();
                            geoCoder.geocode({ 'address': address }, function (results, status) {
                                if (status == google.maps.GeocoderStatus.OK) {
                                    lat = results[0].geometry.location.lat();
                                    long = results[0].geometry.location.lng();
                                    myLatlng = new google.maps.LatLng(lat, long);
                                    var mapOptions = {
                                        zoom: 18,
                                        center: myLatlng
                                    };
                                    var map = new google.maps.Map(document.getElementById('h-map-canvas'), mapOptions);
                                    var marker = new google.maps.Marker({
                                        position: myLatlng,
                                        map: map,
                                        title: self.get('name'),
                                        icon: 'assets/images/yelpMapIcon.png'
                                    });
                                } else {
                                    App.growl.danger("geocode was not successful for the following reason: " + status);
                                }
                            });
                        }
                    }, 250);

                }
                if (type != 'place') {
                    displayModal();
                }
                //this.send('bookmarkDocument', type, model, id);
            }
        }
    });
})();