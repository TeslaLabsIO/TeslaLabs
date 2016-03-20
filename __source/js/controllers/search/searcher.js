(function () {
    'use strict';
    App.SearcherController = Ember.Controller.extend({
        // This code responsible for injecting the dependency for application and global search controllers in searcher controller
        // to allow accessing for any functions, properties or objects inside them
        needs: ['global-search', 'application'],
        // computed
        application: Ember.computed.alias('controllers.application'),
        globalSearch: Ember.computed.alias('controllers.global-search'),
        // data
        query: '', // this var hold search term
        showSearch: true,
        // The model object should have any data related to search according to network id
        // also it's used to determine if each network have live or indexed search and the type of entities under each type (e.g. activities or messages, etc.)
        model: {
            0: {
                private: {
                    messages: [],
                    activities: []
                },
                public: [],
                mostPopular: [],
                paging: 0
            }, // twitter
            1: {
                private: {
                    messages: [],
                    activities: []
                },
                public: [],
                mostPopular: [],
                paging: 0
            }, // facebook
            3: {
                private: {
                    activities: []
                }
            }, // linkedIn
            4: {
                private: {
                    messages: []
                }
            }, // gmail
            5: {
                private: {
                    videos: []
                },
                public: [],
                mostPopular: [],
                paging: 0
            }, // youtube
            6: {
                private: {
                    videos: []
                },
                public: [],
                mostPopular: [],
                paging: 0
            }, // vimeo
            8: {
                public: [],
                paging: 0
            }, // yelp
            9: {
                private: {
                    messages: [],
                    activities: []
                },
                public: [],
                mostPopular: [],
                paging: 0
            }, // tumblr
            10: {
                private: {
                    activities: []
                },
                public: [],
                mostPopular: [],
                paging: 0
            }, // reddit
            private: []
        },
        // properties
        // this property used to return all network Ids used in Sprocket
        networkIds: function () {
            return this.get('utilities').getNetworkIds();
        }.property('query'),
        // this property used to return all network Ids used in Sprocket and have live search
        publicNetworksIds: function () {
            var that = this;
            return _.filter(that.get('networkIds'), function (networkId) {
                return _.isArray(that.get('model.' + networkId + '.public'));
            });
        }.property('query'),
        // this property used to return all network Ids used in Sprocket and have indexed search
        privateNetworksIds: function () {
            var that = this;
            return _.filter(that.get('networkIds'), function (networkId) {
                return _.isObject(that.get('model.' + networkId + '.private'));
            });
        }.property('query'),
        // This property used to return network Id according to current route (current url) or -1 if the current url is not related to specific network
        networkId: function () {
            var networkIds = this.get('utilities').getNetworkIds(); // get network ids
            for (var n = 0; n < networkIds.length; n++)
                if (this.get('constant.network.' + networkIds[n] + '.route') == this.get('application.currentPath'))
                    return networkIds[n];
            return -1;
        }.property('globalSearch.query', 'application.currentPath'),
        // This property return true if the user tried to search from a specific network page
        // It depend on networkId property value to know if we going to make a network specific search or a global search
        isNetworkSearch: function () {
            return this.get('networkId') > -1;
        }.property('networkId', 'globalSearch.query', 'application.currentPath'),
        // This property return network name if the user making network search or "global Search" if the user is making global search
        networkName: function () {
            if (this.get('isNetworkSearch'))
                return this.get('constant.network.' + this.get('networkId') + '.name');
            else
                return 'Global Search';
        }.property('networkId'),
        // observers
        // This observer function fires when application route (URL) change
        // it's responsible for closing search popup if it's open and reset searcher and global search controllers models when current route change
        currentPathChanged: function () {
            $('.globalSearchModal').modal('hide');
            this.set('query', null);
            this.set('showSearch', true);
            this.resetSearcher();
            this.resetGlobalSearch();
        }.observes('application.currentPath'),
        // functions
        // this function responsible for reset searcher model
        resetSearcher: function () {
            this.set('model', {
                0: {
                    private: {
                        messages: [],
                        activities: []
                    },
                    public: [],
                    mostPopular: [],
                    paging: 0
                }, // twitter
                1: {
                    private: {
                        messages: [],
                        activities: []
                    },
                    public: [],
                    mostPopular: [],
                    paging: 0
                }, // facebook
                3: {
                    private: {
                        activities: []
                    }
                }, // linkedIn
                4: {
                    private: {
                        messages: []
                    }
                }, // gmail
                5: {
                    private: {
                        videos: []
                    },
                    public: [],
                    mostPopular: [],
                    paging: 0
                }, // youtube
                6: {
                    private: {
                        videos: []
                    },
                    public: [],
                    mostPopular: [],
                    paging: 0
                }, // vimeo
                8: {
                    public: [],
                    paging: 0
                }, // yelp
                9: {
                    private: {
                        messages: [],
                        activities: []
                    },
                    public: [],
                    mostPopular: [],
                    paging: 0
                }, // tumblr
                10: {
                    private: {
                        activities: []
                    },
                    public: [],
                    mostPopular: [],
                    paging: 0
                }, // reddit
                private: []
            });
        },
        // this function responsible for reset global search model
        resetGlobalSearch: function () {
            this.get('globalSearch').set('query', null);
            this.get('globalSearch').set('publicNetworkSelected', 1);
            this.get('globalSearch').set('privateNetworkSelected', 1);
            this.get('globalSearch').set('model', {
                0: {
                    type: 'activities',
                    private: {
                        messages: [],
                        activities: []
                    },
                    public: [],
                    loading: false,
                    empty: false,
                    pager: false,
                    hide: true
                }, // twitter
                1: {
                    type: 'activities',
                    private: {
                        messages: [],
                        activities: []
                    },
                    public: [],
                    loading: false,
                    empty: false,
                    pager: false,
                    hide: true
                }, // facebook
                3: {
                    type: 'activities',
                    private: {
                        activities: []
                    },
                    hide: true
                }, // linkedIn
                4: {
                    type: 'messages',
                    private: {
                        messages: []
                    },
                    hide: true
                }, // gmail
                5: {
                    type: 'videos',
                    private: {
                        videos: []
                    },
                    public: [],
                    loading: false,
                    empty: false,
                    pager: false,
                    hide: true
                }, // youtube
                6: {
                    type: 'videos',
                    private: {
                        videos: []
                    },
                    public: [],
                    loading: false,
                    empty: false,
                    pager: false,
                    hide: true
                }, // vimeo
                8: {
                    type: 'places',
                    public: [],
                    loading: false,
                    empty: false,
                    pager: false,
                    hide: true
                }, // yelp
                9: {
                    type: 'activities',
                    private: {
                        messages: [],
                        activities: []
                    },
                    public: [],
                    loading: false,
                    empty: false,
                    pager: false,
                    hide: true
                }, // tumblr
                10: {
                    type: 'activities',
                    private: {
                        activities: []
                    },
                    public: [],
                    loading: false,
                    empty: false,
                    pager: false,
                    hide: true
                }, // reddit
                indexedLoading: false,
                locationNotSet: false,
                locationNotSupported: false
            });
            // force observers for query & model
            this.get('globalSearch').notifyPropertyChange('query');
            this.get('globalSearch').notifyPropertyChange('publicNetworkSelected');
            this.get('globalSearch').notifyPropertyChange('privateNetworkSelected');
            this.get('globalSearch').notifyPropertyChange('model');
        },
        // this function responsible for hiding sprocket loafing if all live search requests are completed
        hideSprocketLoading: function (searcher) {
            searcher = searcher ? searcher : this;
            var globalSearch = searcher.get('globalSearch');
            var ui = App.SprocketDirector;
            Ember.run.later(function () {
                if (_.every(searcher.get('publicNetworksIds'), function (networkId) {
                        return !globalSearch.get('model.' + networkId).loading;
                    }))
                    ui.toggleLoading(true);   // hide sprocket loading
            }, 1000);
        },
        // This function is responsible for calling postLocation function in search service to post user location and handle the response for this call
        sendLocation: function (latitude, longitude, locator) {
            var searcher = this;
            var constant = this.get('constant');
            var globalSearch = this.get('globalSearch');
            var service = App.SearchService;
            service.postLocation(latitude, longitude).then(function (data, textStatus, xhr) {
                console.log('location 200');
                Ember.run.later(function () {
                    searcher.send('onNetworkPaging', constant.yelpId, latitude, longitude, locator);
                }, 10000);
                APP_Storage.setValue(APP_Storage.userLocationInfo(), latitude + "," + longitude, false, true);
                APP_Storage.setValue(APP_Storage.userLocatorInfo(), locator, false, true);
            }, function (xhr, textStatus, error) {
                if (xhr.status == 200) {
                    console.log('location empty 200');
                    Ember.run.later(function () {
                        searcher.send('onNetworkPaging', constant.yelpId, latitude, longitude, locator);
                    }, 10000);
                    APP_Storage.setValue(APP_Storage.userLocationInfo(), latitude + "," + longitude, false, true);
                    APP_Storage.setValue(APP_Storage.userLocatorInfo(), locator, false, true);
                } else if (xhr.status == 400
                    && xhr.responseText.length > 0
                    && JSON.parse(xhr.responseText)
                    && JSON.parse(xhr.responseText).messages
                    && _.isArray(JSON.parse(xhr.responseText).messages)
                    && (JSON.parse(xhr.responseText).messages[0] == "API unavailable in this location")
                ) {
                    console.log('*** yelp location not supported');
                    globalSearch.set('model.locationNotSupported', true);
                }
                if (xhr.status != 200) {
                    globalSearch.set('model.' + constant.yelpId + '.loading', false);
                    globalSearch.set('model.' + constant.yelpId + '.empty', true);
                    globalSearch.set('model.' + constant.yelpId + '.pager', false);
                    // force observers for model.flags
                    globalSearch.notifyPropertyChange('model');
                    // show server error
                    SetErrorMessage(xhr);
                    // Hide Sprocket Loading If Done
                    searcher.hideSprocketLoading(searcher);
                }
            });
        },
        //This function is responsible for asking user to allow accessing for his/her location details if it's not allowed from the browser
        // and send location detail to server by call in sendLocation function in success case and show an error in failure case
        requestLocation: function () {
            console.log('**** yelp no location')
            var searcher = this;
            App.growl.warning("Please provide your location to allow yelp search.");
            if (navigator.geolocation) {
                ShowLoadingImage();
                navigator.geolocation.getCurrentPosition(function (position) {
                    var locator;
                    var lat = position.coords.latitude;
                    var lng = position.coords.longitude;
                    //lat = 34.087400366676;
                    //lng = -118.204610470673;
                    var geoCoder = new google.maps.Geocoder();
                    geoCoder.geocode({'latLng': new google.maps.LatLng(lat, lng)}, function (results, status) {
                        if (status == google.maps.GeocoderStatus.OK && results.length && results[0]) {
                            locator = results[0].formatted_address;
                            searcher.sendLocation(lat, lng, locator);
                        } else {
                            App.growl.info("We failed to get your location ; please try again later");
                        }
                    });
                }, function (error) {
                    //alert(error.code)
                    console.log('** share location error ' + error.code);
                    switch (error.code) {
                        case error.PERMISSION_DENIED:
                            APP_Storage.setValue(APP_Storage.userLocationInfo(), APP_Location_Error.PermissionDenied, false, true);
                            App.growl.info("You has denied permission to get you location ; you won't able to get yelp search result");
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
                });
            }
        },
        // This function responsible for executing all live search server requests according to network id
        // and make returned data ready to display on global/network search screen and update search status during and after the request execution
        searchNetwork: function (networkId, callback, lat, lng, locator) {
            console.log('networkId:', networkId);
            // ref
            var searcher = this;
            var globalSearch = this.get('globalSearch');
            var constant = this.get('constant');
            var service = App.SearchService;
            var query = searcher.get('query');
            if (networkId == constant.yelpId
                && APP_Storage.getValue(APP_Storage.userLocatorInfo(), null) != null
                && APP_Storage.getValue(APP_Storage.userLocationInfo(), null) != null) {
                lat = APP_Storage.getValue(APP_Storage.userLocationInfo(), '').split(',')[0];
                lng = APP_Storage.getValue(APP_Storage.userLocationInfo(), '').split(',')[1];
                locator = APP_Storage.getValue(APP_Storage.userLocatorInfo())
            }
            if (_.isNumber(Number(networkId))) {
                // increment page number
                searcher.set('model.' + networkId + '.paging', (searcher.get('model.' + networkId + '.paging') + 1));
                // change public data status
                globalSearch.set('model.' + networkId + '.loading', true);
                globalSearch.set('model.' + networkId + '.empty', false);
                globalSearch.set('model.' + networkId + '.pager', false);
                // force observers for model.flags
                globalSearch.notifyPropertyChange('model');
                // call live search end point
                service.searchLive(query.trim(), networkId, searcher.get('model.' + networkId + '.paging'), lat, lng, locator).then(function (data) {
                    // validate data
                    if (data && _.isArray(data.documents)) {
                        // sort
                        data.documents = _.sortBy(data.documents, 'data.date').reverse();
                        // passing public search result after concatenate it to most popular to global search
                        var finalData = globalSearch.get('model.' + networkId + '.public');
                        var result = [];
                        _.each(data.documents, function (document) {
                            if (networkId == constant.facebookId
                                && !document.data.photo
                                && !document.data.video
                                && !document.data.link
                                && !document.data.title
                                && !document.data.body)
                                console.log('public fb item skipped : ', document.data);
                            else {
                                document.data.externalSearch = true;
                                document.data.searchResult = true;
                                document.data.document = $.extend(true, {}, document);
                                result.push(document.data);
                            }
                        });
                        result = _.sortBy(result, 'date');
                        var finalResult = finalData.concat(result.reverse());
                        globalSearch.set('model.' + networkId + '.public', finalResult);
                        // change public data status
                        globalSearch.set('model.' + networkId + '.loading', false);
                        globalSearch.set('model.' + networkId + '.empty', data.documents.length == 0);
                        globalSearch.set('model.' + networkId + '.pager', data.documents.length > 0);
                        // force observers for model.flags
                        globalSearch.notifyPropertyChange('model');
                        searcher.hideSprocketLoading();
                        // save data
                        searcher.set('model.' + networkId + '.public', searcher.get('model.' + networkId + '.public').concat(data.documents));
                        if (_.isFunction(callback)) callback(searcher, true);
                    }
                }, function (xhr) {
                    // change network public data status
                    globalSearch.set('model.' + networkId + '.loading', false);
                    globalSearch.set('model.' + networkId + '.empty', true);
                    globalSearch.set('model.' + networkId + '.pager', false);
                    // force observers for model.flags
                    globalSearch.notifyPropertyChange('model');
                    // show server error
                    SetErrorMessage(xhr);
                    // hide sprocket loading image
                    searcher.hideSprocketLoading();
                    if (_.isFunction(callback)) callback(searcher, false);
                });
            }
        },
        // actions
        actions: {
            // This event fires on search text-box key up and its responsible for show/hide clear and search buttons in different cases
            onSearchKeyUp: function (event) {
                console.log(event.keyCode);
                if (event.keyCode == 13) {
                    this.send('onSearchClick', this.get('query'));
                } else if (event.keyCode == 27) {
                    this.resetSearcher();
                } else {
                    var globalSearch = this.get('globalSearch');
                    if (globalSearch.get('query') != this.get('query')) {
                        this.set('showSearch', true);
                    }
                }
            },
            // This event fires on clear button click and it's responsible for clearing query text, show search button, reset searcher and reset global search
            onClearSearch: function () {
                this.set('query', null);
                this.set('showSearch', true);
                this.resetSearcher();
                this.resetGlobalSearch();
            },
            // onSearchClick is the start point for search allover Sprocket application
            // This event fires on search button click and it's responsible for initialize search functionality all over sprocket web application
            onSearchClick: function (query) {
                // ref
                var searcher = this;
                var globalSearch = this.get('globalSearch');
                var constant = this.get('constant');
                var service = App.SearchService;
                var ui = App.SprocketDirector;
                var firstShow = true;
                var isNetworkSearch = searcher.get('isNetworkSearch');
                var currentNetworkId = searcher.get('networkId');
                var messagesProp;
                var activitiesProp;
                var videosProp;
                var mostPopularProp;
                var publicProp;
                var locator = APP_Storage.getValue(APP_Storage.userLocatorInfo());
                var location = APP_Storage.getValue(APP_Storage.userLocationInfo(), null);
                var lat = APP_Storage.getValue(APP_Storage.userLocationInfo(), '').split(',')[0];
                var lng = APP_Storage.getValue(APP_Storage.userLocationInfo(), '').split(',')[1];
                // function
                //this function is internal used inside search event function to show search popup
                function showSearchPopup() {
                    if (firstShow) {
                        searcher.set('showSearch', false);
                        firstShow = false;
                        // open modal dialog
                        $('.globalSearchModal').attr('popup-hidden', 'false').modal('show');
                    } else if ($('.globalSearchModal').attr('popup-hidden') != 'true') {//user doesn't hide it after first time it showed
                        $('.globalSearchModal').modal('show');
                    }
                }
                // this function is internal used inside search event function to set global search controller model with search result after sorting it
                // according to network id and entity type (activities, videos or messages)
                function setPrivateDateByNetworkId(networkId) {
                    // skip if network is not activiated
                    if (!App.OauthService.isNetworkActivated(networkId)) return;

                    messagesProp = 'model.' + networkId + '.private.messages';
                    activitiesProp = 'model.' + networkId + '.private.activities';
                    videosProp = 'model.' + networkId + '.private.videos';
                    mostPopularProp = 'model.' + networkId + '.mostPopular';
                    publicProp = 'model.' + networkId + '.public';
                    // sort messages
                    if (_.isArray(searcher.get(messagesProp))) {
                        searcher.set(messagesProp, _.sortBy(searcher.get(messagesProp), 'date').reverse());
                        globalSearch.set(messagesProp, searcher.get(messagesProp));
                    }
                    // sort activities
                    if (_.isArray(searcher.get(activitiesProp))) {
                        searcher.set(activitiesProp, _.sortBy(searcher.get(activitiesProp), 'date').reverse());
                        globalSearch.set(activitiesProp, searcher.get(activitiesProp));
                    }
                    // set videos
                    if (_.isArray(searcher.get(videosProp))) {
                        globalSearch.set(videosProp, searcher.get(videosProp));
                    }
                    // sort most popular
                    if (_.isArray(searcher.get(mostPopularProp))) {
                        searcher.set(mostPopularProp, _.first(_.sortBy(searcher.get(mostPopularProp), 'rank'), 2));
                        globalSearch.set(publicProp, searcher.get(mostPopularProp).concat(globalSearch.get(publicProp)));
                    }
                }
                // reset data in searcher and global search for now
                this.resetSearcher();
                this.resetGlobalSearch();
                // if search text is valid
                if (_.isString(query) && query.trim().length > 1) {
                    // show sprocket loading
                    ui.ShowLoadingImage();
                    // show search loading/empty
                    // In this code block we show loading indicators for a specific network if the user is making network search
                    // or all activated networks if the user is making global search
                    if (isNetworkSearch) {
                        if (App.OauthService.isNetworkActivated(currentNetworkId)) {
                            globalSearch.set('model.' + currentNetworkId + '.loading', true);
                            globalSearch.set('model.' + currentNetworkId + '.hide', false);
                        } else {
                            globalSearch.set('model.' + currentNetworkId + '.empty', true);
                        }
                    }
                    else {
                        _.each(this.get('publicNetworksIds'), function (networkId) {
                            if (App.OauthService.isNetworkActivated(networkId)) {
                                globalSearch.set('model.' + networkId + '.loading', true);
                                globalSearch.set('model.' + networkId + '.hide', false);
                            } else {
                                globalSearch.set('model.' + networkId + '.empty', true);
                            }
                        });
                    }
                    // force observers for model.flags
                    globalSearch.notifyPropertyChange('model');
                    // call indexed search end point
                    // If user is making global search or network search and current network have private search indexed search call will be executed
                    // to fetch search result in user private data according to sent search term.
                    if (!isNetworkSearch || _.indexOf(this.get('privateNetworksIds'), currentNetworkId) > -1){
                        globalSearch.set('model.indexedLoading', true);
                        service.searchIndexed(query.trim()).then(function (data) {
                            // validate data
                            if (data && _.isArray(data.documents)) {
                                // Search result return from server will be filtered according to network id and document data type and will be saved in searcher model.
                                // sort data
                                data.documents = _.sortBy(data.documents, 'data.externalNetworkId');
                                // save data
                                searcher.set('model.private', data.documents);
                                // filter data
                                _.each(data.documents, function (document) {
                                    if (isNetworkSearch && document.data.externalNetworkId != currentNetworkId) return;
                                    // properties
                                    messagesProp = 'model.' + document.data.externalNetworkId + '.private.messages';
                                    activitiesProp = 'model.' + document.data.externalNetworkId + '.private.activities';
                                    videosProp = 'model.' + document.data.externalNetworkId + '.private.videos';
                                    mostPopularProp = 'model.' + document.data.externalNetworkId + '.mostPopular';
                                    document.data.searchResult = true;
                                    // set data according to document type
                                    if (document.data.externalNetworkId == constant.facebookId
                                        && document.dataType == 'Activity'
                                        && !document.data.photo
                                        && !document.data.video
                                        && !document.data.link
                                        && !document.data.title
                                        && !document.data.body)
                                        console.log('private skipped : ', document.data);
                                    else if (document.data.ownerId && document.dataType == 'Message') {         // private message
                                        var messages = searcher.get(messagesProp);
                                        messages.push(document.data);
                                        searcher.set(messagesProp, messages);
                                    }
                                    else if (document.data.ownerId && document.dataType == 'Activity') {         // private activity
                                        var activities = searcher.get(activitiesProp);
                                        activities.push(document.data);
                                        searcher.set(activitiesProp, activities);
                                    }
                                    else if (document.data.ownerId && document.dataType == 'VideoContent') {     // private video
                                        var videos = searcher.get(videosProp);
                                        videos.push(document.data);
                                        searcher.set(videosProp, videos);
                                    }
                                    else if (!document.data.ownerId) {                                           // most popular
                                        var populars = searcher.get(mostPopularProp);
                                        populars.push(document.data);
                                        searcher.set(mostPopularProp, populars);
                                    }
                                });
                                // sort networks private data and update global search with it
                                // Filtered data will be assigned to Global Search mode to be displayed.
                                // and All loading indicators for search in user data will hide and data or empty messages will display.
                                if (isNetworkSearch)
                                    setPrivateDateByNetworkId(currentNetworkId);
                                else
                                    _.each(searcher.get('privateNetworksIds'), function (networkId) {
                                        setPrivateDateByNetworkId(networkId);
                                    });
                                //set loading after we set data to model
                                globalSearch.set('model.indexedLoading', false);
                                // force observers for model
                                globalSearch.notifyPropertyChange('model');
                                // hide Sprocket loading
                                searcher.hideSprocketLoading();
                            }
                        }, function (xhr) {
                            //set loading after we set data to model
                            globalSearch.set('model.indexedLoading', false);
                            // force observers for model
                            globalSearch.notifyPropertyChange('model');
                            // hide Sprocket loading
                            searcher.hideSprocketLoading();
                            // show server error
                            SetErrorMessage(xhr);
                        });
                    }
                    // call live search
                    /* In network search case
                     if current network is Yelp and user location details is not available requestlocation function will be called to get this details and post it to the server and call searchNetwork function to make live search in current network.
                     if current network is Yelp and user location details is available searchNetwork function will be called with location details to make live search in current network.
                     if current network have public search searchNetwork function will be called to make live search. */
                    if (searcher.get('isNetworkSearch')) {
                        if (currentNetworkId == constant.yelpId) {  // if current network is yelp
                            if (locator == null || location == null || location.indexOf(',') == -1 || location == 'unavailable' || lat.trim().length == 0 || lng.trim().length == 0)
                                searcher.requestLocation();
                            else
                                this.searchNetwork(currentNetworkId, searcher.hideSprocketLoading, lat, lng, locator);
                        } else if (!isNetworkSearch || _.indexOf(this.get('publicNetworksIds'), currentNetworkId) > -1) { // if current network have public search
                            this.searchNetwork(currentNetworkId, searcher.hideSprocketLoading)
                        }
                    }
                    /*In global search case we loop over all network ids support live search and
                     if network is not Yelp and is activated for the current user searchNetwork function will be called to make live search.
                     if network is Yelp and user location details is not available requestlocation function will be called to get this details and post it to the server and call searchNetwork function to make live search in current network.
                     if network is Yelp and user location details is available searchNetwork function will be called with location details to make live search in current network. */
                    else {
                        _.each(searcher.get('publicNetworksIds'), function (networkId) {
                            if (networkId != constant.yelpId && App.OauthService.isNetworkActivated(networkId)) {
                                searcher.searchNetwork(networkId, searcher.hideSprocketLoading);
                            } else if (networkId == constant.yelpId) {
                                if (locator == null || location == null || location.indexOf(',') == -1 || location == 'unavailable' || lat.trim().length == 0 || lng.trim().length == 0)
                                    searcher.requestLocation();
                                else
                                    searcher.searchNetwork(networkId, searcher.hideSprocketLoading, lat, lng, locator);
                            }
                        });
                    }
                    // setting global search query value
                    globalSearch.set('query', query);
                    // open search popup
                    showSearchPopup();
                }
                else if (_.isString(query) && query.trim().length > 0 && query.trim().length < 3) {
                    App.growl.warning("Please provide valid search term with three characters at least.");
                }
            },
            // This event fire on network live search paging click
            onNetworkPaging: function (networkId) {
                console.log('networkId:', networkId);
                this.searchNetwork(networkId);
            }
        }
    });
})();
