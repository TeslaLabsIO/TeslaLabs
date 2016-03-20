(function () {
    'use strict';
    App.GlobalFeedController = Ember.Controller.extend({
        needs: ['index'],
        model: {
            0: {
                type: 'activities',
                feeds: [],
                count: 0,
                notLoggedIn: false
            }, // twitter
            1: {
                type: 'activities',
                feeds: [],
                count: 0,
                notLoggedIn: false
            }, // facebook
            3: {
                type: 'activities',
                feeds: [],
                count: 0,
                notLoggedIn: false
            }, // linkedIn
            5: {
                type: 'videos',
                feeds: [],
                count: 0,
                notLoggedIn: false
            }, // youtube
            6: {
                type: 'videos',
                feeds: [],
                count: 0,
                notLoggedIn: false
            }, // vimeo
            8: {
                type: 'places',
                feeds: [],
                count: 0
            }, // yelp
            9: {
                type: 'activities',
                feeds: [],
                count: 0,
                notLoggedIn: false
            }, // tumblr
            10: {
                type: 'activities',
                feeds: [],
                count: 0,
                notLoggedIn: false
            } // reddit
        },
        locationPosted: false,
        feedNetwork: 1,
        // properties
        feeds: function () {
            return this.get('model.' + this.get('feedNetwork') + '.feeds');
        }.property('model', 'feedNetwork'),
        feedsType: function () {
            return this.get('model.' + this.get('feedNetwork') + '.type');
        }.property('model','feedNetwork'),
        isActivity: function () {
            return this.get('feedsType') === 'activities';
        }.property('feedsType'),
        isVideo: function () {
            return this.get('feedsType') === 'videos';
        }.property('feedsType'),
        isPlace: function () {
            return this.get('feedsType') === 'places';
        }.property('feedsType'),
        networkName: function () {
            var networkOptions = this.get('pollingManager').getNetworkOptions(this.get('feedNetwork'));
            return networkOptions.name;
        }.property('feedNetwork'),
        networkUrl: function () {
            var networkId = this.get('feedNetwork');
            var pollingManager = this.get('pollingManager');
            var networkOptions = pollingManager.getNetworkOptions(networkId);
            return '/#' + networkOptions.name;
        }.property('feedNetwork'),
        isLoggedIn: function () {
            //alert('login status')
            var feedNetwork = this.get('feedNetwork');
            var loginModelName = 'model.' + feedNetwork + '.notLoggedIn';
            var userStorageKey = this.get('constant.network.' + feedNetwork + '.authorization.userId');

            //the storage is update in route of index controller according to identity
            //endpoint so we can safely depend on storage to determine status
            if(_.isString(userStorageKey)){
                if (APP_Storage.getValue(userStorageKey) && this.get(loginModelName)) {
                    this.set(loginModelName, false);//marked it as logged
                    this.initializeSyncRequest(userStorageKey);
                    if (feedNetwork == APP_External_Network.YouTube)
                        if (this.get('controllers.index')) {
                            this.get('controllers.index').initializeSyncRequest(APP_Storage.googleUserID());
                        }
                }
                return APP_Storage.getValue(userStorageKey,null)!=null;
            }
            return false;


            /*if (_.isString(userStorageKey) && userStorageKey.trim().length > 0) {
                if (APP_Storage.getValue(userStorageKey)) {
                    if (this.get(loginModelName)) {//it was marked as not logged before
                        this.set(loginModelName, false);//marked it as logged
                        this.initializeSyncRequest(userStorageKey);
                        if (feedNetwork == APP_External_Network.YouTube)
                            if (this.get('controllers.index'))
                                this.get('controllers.index').initializeSyncRequest(APP_Storage.googleUserID());
                    }
                    return true;
                } else if (this.get(loginModelName)) {//request to identity endpoint happened before and returned empty
                    return false;
                } else {
                    var networkActivated = App.OauthService.isNetworkActivated(feedNetwork);
                    if (networkActivated) {
                        this.initializeSyncRequest(userStorageKey);
                        if (feedNetwork == APP_External_Network.YouTube) {
                            console.log(this.get('controllers.index'));
                            if (this.get('controllers.index'))
                                this.get('controllers.index').initializeSyncRequest(APP_Storage.googleUserID());
                        }
                        return true;
                    } else {
                        this.set(loginModelName, true);
                        return false;
                    }
                }
            }
            return false;*/
        }.property('feedNetwork'),
        // functions
        reset:function(){
            var model = this.get('model');
            var controller = this;
            var userStorageKey;
            _.each(model,function(network,networkId){
                controller.set('model.'+networkId+'.feeds',[]);
                controller.set('model.'+networkId+'.count',0);
                userStorageKey = controller.get('constant.network.' + networkId + '.authorization.userId');
                if(userStorageKey) {
                    controller.set('model.' + networkId + '.notLoggedIn', APP_Storage.getValue(userStorageKey, null) == null);
                }
            });
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
            console.log(categorized);
            //alert('');
            return categorized;
        },
        ignoreDuplicated: function (data, storageKey, identifierKey) {
            var storage = APP_Storage.getValue(storageKey, [], true);
            var identifiers = {};
            var filtered = [];
            _.each(storage, function (element) {
                identifiers [element[identifierKey]] = true;
            });
            _.each(data, function (element) {
                if (!identifiers [element[identifierKey]]) {
                    filtered.push(element);
                } else {
                    //console.log('duplicated *** ', storageKey, ' *** ', element);
                    //alert(element);
                }
            });
            return filtered;
        },
        getNewData: function (oldDataStr, storageKey, identifierKey, sortKey) {
            var storage = APP_Storage.getValue(storageKey, [], true);
            var oldData = JSON.parse(oldDataStr == "" ? "[]" : oldDataStr);
            //get new Data sorted so when we slice , we slice old data not new one
            if (sortKey) {
                storage = _.sortBy(storage, sortKey).reverse();
                oldData = _.sortBy(oldData, sortKey).reverse();
            }
            var oldIdentifiers = {};
            var newData = [];
            _.each(oldData, function (element) {
                oldIdentifiers [element[identifierKey]] = true;
            });
            _.each(storage, function (element) {
                if (!oldIdentifiers [element[identifierKey]]) {
                    newData.push(element);
                    console.log('new data *** ', storageKey, ' *** ', element);
                } else {
                    console.log('old data *** ', storageKey, ' *** ', element);
                    //alert(element);
                }
            });
            return newData;
        },
        initializeNetworkSyncRequest: function (networkId, type, userStorageKey, dataStorageKey, LastModifiedKey, syncTimeOutKey, orderBy, reverse, maxStorage, extractDate) {
            var self = this;
            var pollingManager = this.get('pollingManager');
            var networkOptions = pollingManager.getNetworkOptions(networkId);
            var userIdKey = networkOptions.authorization.userId;
            if ((!userStorageKey && userIdKey && APP_Storage.getValue(userIdKey)) || (userStorageKey && userStorageKey == userIdKey)) {
                var feeds = [];

                if (orderBy && reverse)
                    feeds = _.sortBy(APP_Storage.getValue(dataStorageKey, [], true), orderBy).reverse();
                else if (orderBy)
                    feeds = _.sortBy(APP_Storage.getValue(dataStorageKey, [], true), orderBy);
                else
                    feeds = APP_Storage.getValue(dataStorageKey, [], true);

                this.set('model.' + networkId + '.feeds', feeds);
                this.set('model.' + networkId + '.count', feeds.length);
                this.notifyPropertyChange('model');
                if (type == 'activities')
                    this.initializeActivitySyncRequest(networkId, LastModifiedKey, syncTimeOutKey, dataStorageKey, (maxStorage ? maxStorage : undefined), (extractDate ? extractDate : undefined));
                else if (type == 'videos')
                    this.initializeVideoSyncRequest(networkId, LastModifiedKey, syncTimeOutKey, dataStorageKey, (extractDate ? extractDate : undefined));
                else if (type == 'places')
                    this.initializePlaceRequest();
            }
        },
        initializeSyncRequest: function (userStorageKey) {
            var self = this;
            // start facebook sync
            this.initializeNetworkSyncRequest(this.get('constant.facebookId'),
                this.get('model.' + this.get('constant.facebookId') + '.type'),
                userStorageKey,
                APP_Storage.facebookPost,
                APP_Storage.facebookPostLastModified,
                APP_Sync.facebookSyncTimeOut,
                'date',
                true
            );
            // start twitter sync
            this.initializeNetworkSyncRequest(this.get('constant.twitterId'),
                this.get('model.' + this.get('constant.twitterId') + '.type'),
                userStorageKey,
                APP_Storage.twitterPost,
                APP_Storage.twitterPostLastModified,
                APP_Sync.twitterSyncTimeOut,
                'date',
                true,
                50,
                function (tweets) {
                    var categorized = self.categorizeData(tweets);
                    var maxStorage = 50;

                    var twitterPost = APP_Storage.getValue(APP_Storage.twitterMyPost, [], true);
                    var myTweets = categorized['My Tweets'] ? categorized['My Tweets'] : [];
                    myTweets = self.ignoreDuplicated(myTweets, APP_Storage.twitterMyPost, 'externalIdentifier');
                    twitterPost = myTweets.concat(twitterPost).slice(0, maxStorage);

                    APP_Storage.setValue(APP_Storage.twitterMyPost, twitterPost, true);

                    return (categorized['Tweets'] ? categorized['Tweets'] : []);
                }
            );
            // start linkedIn sync
            this.initializeNetworkSyncRequest(this.get('constant.linkedinId'),
                this.get('model.' + this.get('constant.linkedinId') + '.type'),
                userStorageKey,
                APP_Storage.linkedInPost,
                APP_Storage.linkedInPostLastModified,
                APP_Sync.linkedInSyncTimeOut,
                'date',
                true
            );
            // start youtube sync
            this.initializeNetworkSyncRequest(this.get('constant.youtubeId'),
                this.get('model.' + this.get('constant.youtubeId') + '.type'),
                userStorageKey,
                APP_Storage.youtubeVideos,
                APP_Storage.youtubeLastModified,
                APP_Sync.youtubeSyncTimeOut,
                null,
                null,
                null,
                function (videos) {
                    var categorized = self.categorizeData(videos);
                    var maxStorage = 10;

                    var subscriptionStorage = APP_Storage.getValue(APP_Storage.youtubeSubscriptionVideo, [], true);
                    var subscription = categorized['Latest Subscription Videos'] ? categorized['Latest Subscription Videos'] : [];
                    subscription = self.ignoreDuplicated(subscription, APP_Storage.youtubeSubscriptionVideo, 'itemKey');
                    subscriptionStorage = subscription.concat(subscriptionStorage).slice(0, maxStorage);

                    var historyStorage = APP_Storage.getValue(APP_Storage.youtubeHistoryVideo, [], true);
                    var history = categorized['My History'] ? categorized['My History'] : [];
                    history = self.ignoreDuplicated(history, APP_Storage.youtubeHistoryVideo, 'itemKey');
                    historyStorage = history.concat(historyStorage).slice(0, maxStorage);

                    APP_Storage.setValue(APP_Storage.youtubeSubscriptionVideo, subscriptionStorage, true);
                    APP_Storage.setValue(APP_Storage.youtubeHistoryVideo, historyStorage, true);

                    return (categorized['Most Popular'] ? categorized['Most Popular'] : []);
                }
            );
            // start vimeo sync
            this.initializeNetworkSyncRequest(this.get('constant.vimeoId'),
                this.get('model.' + this.get('constant.vimeoId') + '.type'),
                userStorageKey,
                APP_Storage.vimeoVideos,
                APP_Storage.vimeoLastModified,
                APP_Sync.vimeoSyncTimeOut,
                null,
                null,
                null,
                function (videos) {
                    var categorized = self.categorizeData(videos);
                    var maxStorage = 10;

                    var subscriptionStorage = APP_Storage.getValue(APP_Storage.vimeoSubscriptionVideo, [], true);
                    var subscription = categorized['Latest Subscription Videos'] ? categorized['Latest Subscription Videos'] : [];
                    subscription = self.ignoreDuplicated(subscription, APP_Storage.vimeoSubscriptionVideo, 'itemKey');
                    subscriptionStorage = subscription.concat(subscriptionStorage).slice(0, maxStorage);

                    APP_Storage.setValue(APP_Storage.vimeoSubscriptionVideo, subscriptionStorage, true);

                    return (categorized['My Feeds'] ? categorized['My Feeds'] : []);
                }
            );
            // start tumblr sync
            this.initializeNetworkSyncRequest(this.get('constant.tumblrId'),
                this.get('model.' + this.get('constant.tumblrId') + '.type'),
                userStorageKey,
                APP_Storage.tumblrPost,
                APP_Storage.tumblrPostLastModified,
                APP_Sync.tumblrSyncTimeOut,
                'date',
                true
            );
            // start reddit sync
            this.initializeNetworkSyncRequest(this.get('constant.redditId'),
                this.get('model.' + this.get('constant.redditId') + '.type'),
                userStorageKey,
                APP_Storage.redditPost,
                APP_Storage.redditPostLastModified,
                APP_Sync.redditSyncTimeOut,
                'date',
                true
            );
            // make yelp request
            this.initializePlaceRequest();
        },
        initializeActivitySyncRequest: function (networkId, lastModifiedKey, syncTimeOut, storageKey, maxStorage, extractData) {
            var controller = this;
            var syncService = App.SynchronizeService;
            var modelName = 'model.' + networkId + '.feeds';
            var modelCountName = 'model.' + networkId + '.count';
            var storageString = APP_Storage.getValue(storageKey, "");
            var syncOptions = {
                header: (APP_Storage.getValue(lastModifiedKey) ? {delta: true} : {}),
                keepTimerData: true,
                url: (API_Base_Url + "social/users/" + getCookie(APP_Cookies.userID) + "/providers/" + networkId + "/activities"),
                lastModifiedKey: lastModifiedKey,
                syncUntilData: false,
                syncForEver: false,
                syncTimeout: syncTimeOut,
                stopOnError: true,
                onSyncSuccess: function (data, textStatus, jqXHR) {
                    if (APP_Storage.getValue(lastModifiedKey)) {//if last modified exist add delta
                        this.header = {delta: true};
                    } else {
                        this.header = {};
                    }
                    var maxStorageSize = maxStorage ? maxStorage : 25;
                    if (jqXHR.status == 200 && data.activities) {
                        if (data.activities.length) {
                            //remove last [data.activities.length] from local storage and append new to top of local storage
                            //update model
                            var storage = _.sortBy(APP_Storage.getValue(storageKey, [], true), 'date').reverse();
                            // var activities = _.sortBy(data.activities, 'date').reverse();
                            var activities = extractData ? extractData(data.activities) : data.activities;//_.sortBy(data.videos, 'date').reverse();
                            activities = _.sortBy(activities, 'date').reverse();
                            activities = controller.ignoreDuplicated(activities, storageKey, 'externalIdentifier');

                            storage = activities.concat(storage);
                            storage = _.sortBy(storage, 'date').reverse();
                            if (storage.length > maxStorageSize && maxStorageSize != -1) {
                                storage = storage.slice(0, maxStorageSize);
                            }
                            APP_Storage.setValue(storageKey, storage, true);
                            storageString = APP_Storage.getValue(storageKey);
                            controller.set(modelName, storage); //display last four
                            //in case of use delta and it works correct that should display right value but if not
                            //that will appended count of data that has been replaced not added
                            controller.set(modelCountName, controller.get(modelCountName) + activities.length);
                            controller.notifyPropertyChange('model');
                        }
                        syncService.addDataRequest(this);//run after empty data timeout when Q empty
                    } else if (jqXHR.status == 304 && APP_Storage.getValue(storageKey, "") != storageString) { //storage update in other page
                        var newData = controller.getNewData(storageString, storageKey, 'externalIdentifier', 'date');
                        storageString = APP_Storage.getValue(storageKey);
                        if (newData.length) {
                            var oldModel = controller.get(modelName);
                            var newModel = newData.concat(oldModel).slice(0, maxStorageSize);//_.sortBy(newData , 'date').reverse();
                            newModel = _.sortBy(newModel, 'date').reverse();
                            controller.set(modelName, newModel); //display last four
                            controller.set(modelCountName, controller.get(modelCountName) + newData.length);
                        }
                        //alert('activity storage not equal ' + newData.length);
                        syncService.addDataRequest(this);//run after empty data timeout when Q empty
                    } else {
                        syncService.handleEmptyDataRequest(this, APP_Storage.getValue(storageKey, [], true));
                    }
                },
                onSyncError: function (jqXHR, textStatus, errorThrown) {
                    syncService.handleEmptyDataRequest(this, APP_Storage.getValue(storageKey, [], true));
                }
            };
            //no extend for option to keep track of timer id
            APP_Sync.GetData(syncOptions).then(
                function (data, textStatus, jqXHR) {
                    syncOptions.onSyncSuccess(data, textStatus, jqXHR);
                },
                function (jqXHR, textStatus, errorThrown) {
                    syncOptions.onSyncError(jqXHR, textStatus, errorThrown);
                }
            );
        },
        initializeVideoSyncRequest: function (networkId, lastModifiedKey, syncTimeOut, storageKey, extractData) {
            var controller = this;
            var syncService = App.SynchronizeService;
            var modelName = 'model.' + networkId + '.feeds';
            var modelCountName = 'model.' + networkId + '.count';
            var storageString = APP_Storage.getValue(storageKey, "");
            var syncOptions = {
                header: (APP_Storage.getValue(lastModifiedKey) ? {delta: true} : {}),
                keepTimerData: true,
                url: (API_Base_Url + "content/users/" + getCookie(APP_Cookies.userID) + "/providers/" + networkId + "/videos"),
                lastModifiedKey: lastModifiedKey,
                syncUntilData: false,
                syncForEver: false,
                syncTimeout: syncTimeOut,
                stopOnError: true,
                onSyncSuccess: function (data, textStatus, jqXHR) {
                    if (APP_Storage.getValue(lastModifiedKey)) {//if last modified exist add delta
                        this.header = {delta: true};
                    } else {
                        this.header = {};
                    }
                    var maxStorageSize = 10;
                    if (jqXHR.status == 200 && data.videos) {
                        if (data.videos.length) {
                            //remove last [data.videos.length] from local storage and append new to top of local storage
                            //update model
                            var storage = APP_Storage.getValue(storageKey, [], true);
                            var videos = extractData ? extractData(data.videos) : data.videos;//_.sortBy(data.videos, 'date').reverse();
                            videos = videos ? videos : [];
                            videos = controller.ignoreDuplicated(videos, storageKey, 'itemKey');

                            storage = videos.concat(storage);
                            if (storage.length > maxStorageSize) {
                                storage = storage.slice(0, maxStorageSize);
                            }
                            APP_Storage.setValue(storageKey, storage, true);
                            storageString = APP_Storage.getValue(storageKey);
                            //controller.get(modelName).unshiftObjects(videos);
                            //controller.notifyPropertyChange(modelName);
                            controller.set(modelName, storage); //display last four
                            //in case of use delta and it works correct that should display right value but if not
                            //that will appended count of data that has been replaced not added
                            controller.set(modelCountName, controller.get(modelCountName) + videos.length);
                            controller.notifyPropertyChange('model');
                        }
                        syncService.addDataRequest(this);//run after empty data timeout when Q empty
                    } else if (jqXHR.status == 304 && APP_Storage.getValue(storageKey, "") != storageString) { //storage update in other page
                        var newData = controller.getNewData(storageString, storageKey, 'itemKey');
                        storageString = APP_Storage.getValue(storageKey);
                        if (newData.length) {
                            var oldModel = controller.get(modelName);
                            var newModel = newData.concat(oldModel).slice(0, maxStorageSize);
                            controller.set(modelName, newModel); //display last four
                            controller.set(modelCountName, controller.get(modelCountName) + newData.length);
                        }
                        //alert('video storage not equal ' + newData.length);
                        syncService.addDataRequest(this);//run after empty data timeout when Q empty
                    } else {
                        syncService.handleEmptyDataRequest(this, APP_Storage.getValue(storageKey, [], true));
                    }
                },
                onSyncError: function (jqXHR, textStatus, errorThrown) {
                    syncService.handleEmptyDataRequest(this, APP_Storage.getValue(storageKey, [], true));
                }
            };
            //no extend for option to keep track of timer id
            APP_Sync.GetData(syncOptions).then(
                function (data, textStatus, jqXHR) {
                    syncOptions.onSyncSuccess(data, textStatus, jqXHR);
                },
                function (jqXHR, textStatus, errorThrown) {
                    syncOptions.onSyncError(jqXHR, textStatus, errorThrown);
                }
            );
        },
        initializePlaceRequest: function () {
            var controller = this;
            var modelName = 'model.8.feeds';
            var modelCountName = 'model.8.count';
            App.YelpService.getMostPopular(null, null).then(function (data, textStatus, jqXHR) {
                if (jqXHR.status == 200) {
                    //update model
                    var places = _.sortBy(data.places, 'name');
                    controller.set(modelName, places.slice(0,25)); //max 25 because of performance issue
                    controller.set(modelCountName, places.length);
                    controller.notifyPropertyChange('model')
                }else if(jqXHR.status == 304){
                    controller.set('locationPosted', true);
                }
            }, function (response) {
                var data = {};
                try{
                    data = JSON.parse(response.responseText);
                }catch(e){
                }

                if (response.status == 400 && _.isArray(data.messages) && data.messages.length > 0 && data.messages[0] == "User location is not available") {
                    controller.set('locationPosted', false);
                } else {
                    SetErrorMessage(response);
                }
            });
        },
        //observers
        feedsLoaded: function () {
            if (this.get('isActivity'))
                Ember.run.scheduleOnce('afterRender', this, function () {
                    ConvertTextElementToHtml('.social_post_html');
                });
            else if (this.get('isVideo'))
                Ember.run.scheduleOnce('afterRender', this, function () {
                    ConvertTextElementToHtml('.social_video_description_html', true);
                });
            else if (this.get('isPlace'))
                Ember.run.scheduleOnce('afterRender', this, function () {
                    ConvertTextElementToHtml('.social_post_html');
                });
        }.observes('feeds'),
        feedNetworkChanged: function () {
            Ember.run.scheduleOnce('afterRender', this, function () {
                $('#global_feed').mCustomScrollbar("scrollTo", 0, {scrollInertia: 0});
            });
        }.observes('feedNetwork'),
        actions: {
            getLocation: function () {
                var controller = this;
                APP_Storage.setValue(APP_Storage.userLocationInfo(), "", false, true);//just set as requested
                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(function (position) {
                            ShowLoadingImage();
                            console.log('** share fb location accepted');
                            //the local storage should be empty array if activities endpoint returned data without location was provided for local news feed
                            //this should work properly when api implement periodic sync
                            //we use facebookPostLastModified now for local activities too
                            Ember.$.ajax(API_Base_Url + 'users/' + APP_Cookies.getCookie(APP_Cookies.userID) + '/location', {
                                "type": 'POST',
                                "dataType": 'JSON',
                                "headers": {
                                    "Content-Type": 'application/json'
                                },
                                "data": JSON.stringify({
                                    clientPlatformId: APP_Client_Platform.WEB,
                                    timestamp: new Date().getTime(),//parseInt(new Date().getTime()/1000),
                                    latitude: position.coords.latitude,//36.75,//
                                    longitude: position.coords.longitude//-119.77//
                                }),
                                "success": function (data, textStatus, jqXHR) {
                                    HideLoadingImage();
                                    console.log('location 200');
                                    controller.set('locationPosted', true);
                                    Ember.run.later(function () {
                                        controller.initializePlaceRequest();
                                    }, 10000);
                                },
                                "error": function (jqXHR, textStatus, errorThrown) {
                                    HideLoadingImage();
                                    if (jqXHR.status == 200) {
                                        console.log('location empty 200');
                                        APP_Storage.setValue(APP_Storage.userLocationInfo(), position.coords.latitude + "," + position.coords.longitude, false, true);

                                        var geoCoder = new google.maps.Geocoder();
                                        geoCoder.geocode({'latLng': new google.maps.LatLng(position.coords.latitude , position.coords.longitude)}, function (results, status) {
                                            if (status == google.maps.GeocoderStatus.OK && results.length && results[0]) {
                                                APP_Storage.setValue(APP_Storage.userLocatorInfo(), results[0].formatted_address, false, true);
                                            }
                                            //error message not displayed here because it will not effect local feed request as it doesn't depend in locator
                                            //we may get locator later in yelp/search
                                        });

                                        controller.set('locationPosted', true);
                                        Ember.run.later(function () {
                                            controller.initializePlaceRequest();
                                        }, 10000);
                                    } else {
                                        SetErrorMessage(jqXHR)
                                    }
                                }
                            })
                        }, function (error) {
                            //alert(error.code)
                            console.log('** share fb location error ' + error.code);
                            switch (error.code) {
                                case error.PERMISSION_DENIED:
                                    APP_Storage.setValue(APP_Storage.userLocationInfo(), APP_Location_Error.PermissionDenied, false, true);
                                    controller.set('locationPosted', true);
                                    App.growl.info("You has denied permission to get you location ; you won't able to get local news feed anymore");
                                    break;
                                case error.POSITION_UNAVAILABLE:
                                    APP_Storage.setValue(APP_Storage.userLocationInfo(), APP_Location_Error.Unavailable, false, true);
                                    App.growl.info("We failed to get your location ; please try again later");
                                    break;
                                case error.TIMEOUT:
                                    APP_Storage.setValue(APP_Storage.userLocationInfo(), APP_Location_Error.TimeOut, false, true);
                                    App.growl.info("Request to get your location has timed out ; please try again");
                                    break;
                                case error.UNKNOWN_ERROR:
                                    APP_Storage.setValue(APP_Storage.userLocationInfo(), APP_Location_Error.Unknown, false, true);
                                    App.growl.info("Unknown error while detecting you location ; please try again later");
                                    break;
                            }
                        },
                        //options
                        {
                            timeout: 30000
                        });
                } else {
                    APP_Storage.setValue(APP_Storage.userLocationInfo(), APP_Location_Error.NotSupported, false, true);

                    App.growl.info("Sorry,GeoLocation is not supported by this browser");
                }

            }
        }
    });
})();