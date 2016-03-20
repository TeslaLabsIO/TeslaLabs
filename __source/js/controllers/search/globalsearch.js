(function () {
    'use strict';
    App.GlobalSearchController = Ember.Controller.extend({
        needs: ['searcher'], // inject searcher controller inside Global Search controller
        searcher: Ember.computed.alias('controllers.searcher'),
        //data
        query: null, // this var hold search term
        // The model object contains any data related to search and flags for different status according to network id
        model: { // loading, empty, pager are Boolean flags and they are repeated because they hold the value represent status for each network separately
            // 1- loading flag represent loading status for the network. by default it's false and it's value become true when live search request for this network executed and become false when the request is done (used to show/hide loading image).
            // 2- empty flag represent if there search result related to this network or not, it's false by default and it's value become true when live search request for this network is completed and no data return. (used to show/hide empty message).
            // 3- pager flag represent if this network allow pager or not. it's false by default and it's value become true when live search request for this network is completed and data return (used to show/hide paging button)
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
            indexedLoading: true,
            locationNotSet: false,
            locationNotSupported: false
        },
        publicNetworkSelected: 1, // this variable used to hold selected network in public search section
        privateNetworkSelected: 1, // this variable used to hold selected network in private search section
        // This following four properties hold the item user clicked to show it's details view according to item type
        activityDetails: [],
        messageDetails: [],
        videoDetails: [],
        placeDetails: [],

        // properties
        // This code block contains all properties used to specify different cases for search UI like global/network search and public/private search etc.
        publicFeedsType: function () {
            return this.get('model.' + this.get('publicNetworkSelected') + '.type');
        }.property('model', 'publicNetworkSelected', 'searcher.networkId'),
        isPublicActivity: function () {
            return this.get('publicFeedsType') === 'activities';
        }.property('publicFeedsType'),
        isPublicVideo: function () {
            return this.get('publicFeedsType') === 'videos';
        }.property('publicFeedsType'),
        isPublicPlace: function () {
            return this.get('publicFeedsType') === 'places';
        }.property('publicFeedsType'),
        hasPublic: function () {
            return _.isArray(this.get('model.' + this.get('publicNetworkSelected') + '.public'));
        }.property('publicNetworkSelected'),

        privateFeedsType: function () {
            return this.get('model.' + this.get('privateNetworkSelected') + '.type');
        }.property('model', 'privateNetworkSelected', 'searcher.networkId'),
        isPrivateActivity: function () {
            return this.get('privateFeedsType') === 'activities';
        }.property('privateFeedsType'),
        isPrivateVideo: function () {
            return this.get('privateFeedsType') === 'videos';
        }.property('privateFeedsType'),
        isPrivatePlace: function () {
            return this.get('privateFeedsType') === 'places';
        }.property('privateFeedsType'),
        hasPrivate: function () {
            return _.isObject(this.get('model.' + this.get('privateNetworkSelected') + '.private'));
        }.property('privateNetworkSelected'),
        hasPrivateMessages: function () {
            return _.isArray(this.get('model.' + this.get('privateNetworkSelected') + '.private.messages'));
        }.property('privateNetworkSelected'),
        hasPrivateFeeds: function () {
            return _.isArray(this.get('model.' + this.get('privateNetworkSelected') + '.private.activities'))
                || _.isArray(this.get('model.' + this.get('privateNetworkSelected') + '.private.videos'));
        }.property('privateNetworkSelected'),

        publicFeeds: function () {
            return this.get('model.' + this.get('publicNetworkSelected') + '.public');
        }.property('model', 'publicNetworkSelected', 'searcher.networkId'),
        privateMessages: function () {
            return this.get('model.' + this.get('privateNetworkSelected') + '.private.messages');
        }.property('model', 'privateNetworkSelected', 'searcher.networkId'),
        privateFeeds: function () {
            if (this.get('isPrivateActivity'))
                return this.get('model.' + this.get('privateNetworkSelected') + '.private.activities');
            else if (this.get('isPrivateVideo'))
                return this.get('model.' + this.get('privateNetworkSelected') + '.private.videos');
            else if (this.get('isPrivatePlace'))
                return this.get('model.' + this.get('privateNetworkSelected') + '.private.places');
            else
                return [];
        }.property('model', 'privateNetworkSelected', 'searcher.networkId'),

        publicLoading: function () {
            return this.get('model.' + this.get('publicNetworkSelected') + '.loading') || this.get('model.indexedLoading');//don't hide loading until the data from indexed,live returned
        }.property('model', 'publicNetworkSelected', 'model.indexedLoading'),
        publicPageEmpty: function () {
            return this.get('model.' + this.get('publicNetworkSelected') + '.empty') && !this.get('model.indexedLoading');//don't show message until the data from indexed returned
        }.property('model', 'publicNetworkSelected', 'model.indexedLoading'),
        publicPager: function () {
            var networkId = this.get('publicNetworkSelected');
            return this.get('model.' + this.get('publicNetworkSelected') + '.pager') && !this.get('model.indexedLoading');//don't show pager until the data from indexed returned
        }.property('model', 'publicNetworkSelected', 'model.indexedLoading'),

        publicNetworks: function () {
            var globalSearch = this;
            return _.map(this.get('searcher.publicNetworksIds'), function (networkId) {
                return {
                    id: networkId,
                    name: globalSearch.get('utilities').getNetworkNameById(networkId),
                    length: globalSearch.get('model.' + networkId + '.public').length,
                    active: (networkId == globalSearch.get('publicNetworkSelected') ? 'active' : '')
                };
            });
        }.property('model', 'searcher.publicNetworksIds'),
        privateNetworks: function () {
            var globalSearch = this;
            var length;
            return _.map(globalSearch.get('searcher.privateNetworksIds'), function (networkId) {
                length = 0;
                _.each(_.keys(globalSearch.get('model.' + networkId + '.private')), function (entity) {
                    length += globalSearch.get('model.' + networkId + '.private.' + entity).length;
                });
                return {
                    id: networkId,
                    name: globalSearch.get('utilities').getNetworkNameById(networkId),
                    length: length,
                    active: (networkId == globalSearch.get('privateNetworkSelected') ? 'active' : '')
                };
            });
        }.property('model', 'searcher.privateNetworksIds'),

        // observers
        networkChanged: function () {
            if (this.get('searcher.isNetworkSearch')) {
                console.log('set network');
                this.set('publicNetworkSelected', this.get('searcher.networkId'));
                this.set('privateNetworkSelected', this.get('searcher.networkId'));
            }
        }.observes('model', 'searcher.networkId', 'searcher.isNetworkSearch'),
        // This code block have two observers for public and private sections in Search popup and the are responsible for initialize scroll if it was hidden
        hasPublicChanged: function () {
            if (this.get('hasPublic')) {
                Ember.run.scheduleOnce('afterRender', this, function () {
                    $('.global-search-public-data').mCustomScrollbar({});
                });
            }
        }.observes('hasPublic'),
        hasPrivateChanged: function () {
            if (this.get('hasPrivate')) {
                Ember.run.scheduleOnce('afterRender', this, function () {
                    $('.global-search-private-data').mCustomScrollbar({});
                });
            }
        }.observes('hasPrivate'),
        // This code block have three observers for public feeds, private feeds and private messages sections in search popup
        // they are responsible for convert text to html and highlight search term in displayed list items
        publicFeedsLoaded: function () {
            if (this.get('hasPublic') && this.get('isPublicActivity'))
                Ember.run.scheduleOnce('afterRender', this, function () {
                    ConvertTextElementToHtml('.social_post_html');//better than {{{xx}}}
                    MarkSearchResult('.search_result_parent .search_post_content', this.get('query'));
                });
            else if (this.get('hasPublic') && this.get('isPublicVideo'))
                Ember.run.scheduleOnce('afterRender', this, function () {
                    ConvertTextElementToHtml('.social_video_description_html', true);
                    MarkSearchResult('.search_result_parent .search_video_content', this.get('query'));
                });
            else if (this.get('hasPublic') && this.get('isPublicPlace'))
                Ember.run.scheduleOnce('afterRender', this, function () {
                    ConvertTextElementToHtml('.social_place_html');//better than {{{xx}}}
                    MarkSearchResult('.search_result_parent .search_place_content', this.get('query'));
                });
        }.observes('publicFeeds'),
        privateMessagesLoaded: function () {
            Ember.run.scheduleOnce('afterRender', this, function () {
                ConvertTextElementToHtml('.social_message_html'); //better than {{{xx}}}
                MarkSearchResult('.search_result_parent .search_message_content', this.get('query'));
            });
        }.observes('privateMessages'),
        privateFeedsLoaded: function () {
            if (this.get('isPrivateActivity'))
                Ember.run.scheduleOnce('afterRender', this, function () {
                    ConvertTextElementToHtml('.social_post_html');//better than {{{xx}}}
                    MarkSearchResult('.search_result_parent .search_post_content', this.get('query'));
                });
            else if (this.get('isPrivateVideo'))
                Ember.run.scheduleOnce('afterRender', this, function () {
                    ConvertTextElementToHtml('.social_video_description_html', true);
                    MarkSearchResult('.search_result_parent .search_video_content', this.get('query'));
                });
        }.observes('privateFeeds'),
        // This code block have three observers for activities, messages, videos and places search details view
        // they are responsible for convert text to html and highlight search term in displayed details view
        activityDetailsLoaded: function () {
            var controller = this;
            Ember.run.scheduleOnce('afterRender', this, function () {
                ConvertTextElementToHtml('.social_post_details_html');
                MarkSearchResult('.search_result_parent .search_post_details_content', this.get('query'));
                //
                if (controller.get('activityDetails').length && (controller.get('activityDetails.0.video.embedCode') || controller.get('activityDetails.0.audio.embedCode'))) {
                    setEmbedIframeScript('embedCodeFrame', 'embedCodeFrame', $('#embedCode').text());
                }
                //
            });
        }.observes('activityDetails'),
        messageDetailsLoaded: function () {
            Ember.run.scheduleOnce('afterRender', this, function () {
                ConvertTextElementToHtml('.social_message_details_html');
                $('.social_message_details_html').find('.collapse').fadeIn(0);
                //don't highlight message body as this may change html structure of mail body in gmail as example
                MarkSearchResult('.search_result_parent .search_message_details_content', this.get('query'));
            });
        }.observes('messageDetails'),
        videoDetailsLoaded: function () {
            Ember.run.scheduleOnce('afterRender', this, function () {
                ConvertTextElementToHtml('.social_video_details_html', true);
                MarkSearchResult('.search_result_parent .search_video_details_content', this.get('query'));
            });
        }.observes('videoDetails'),
        placeDetailsLoaded: function () {
            Ember.run.scheduleOnce('afterRender', this, function () {
                ConvertTextElementToHtml('.social_place_details_html');
                MarkSearchResult('.search_result_parent .search_place_details_content', this.get('query'));
            });
        }.observes('placeDetails'),
        // This observer responsible for reset scroll postilion to top after selected public network change
        publicNetworkSelectedChanged: function () {
            Ember.run.scheduleOnce('afterRender', this, function () {
                $('.global-search-public-data').mCustomScrollbar("scrollTo", 0, {scrollInertia: 0});
            });
        }.observes('publicNetworkSelected'),
        // his observer responsible for reset scroll postilion to top after selected private network change
        // and hide/show feeds and messages accordion according to selected network
        privateNetworkSelectedChanged: function () {
            Ember.run.scheduleOnce('afterRender', this, function () {
                var privateActivities = $('#search-collapseTwo');
                var privateMessages = $('#search-collapseOne');
                if (this.get('hasPrivate') && this.get('hasPrivateMessages')) {
                    if (privateActivities.hasClass('in'))
                        privateActivities.collapse('hide');
                    if (!privateMessages.hasClass('in'))
                        privateMessages.collapse('show');
                }
                else if (this.get('hasPrivate') && this.get('hasPrivateFeeds')) {
                    if (privateMessages.hasClass('in'))
                        privateMessages.collapse('hide');
                    if (!privateActivities.hasClass('in'))
                        privateActivities.collapse('show');
                }
                $('.global-search-private-data').mCustomScrollbar("scrollTo", 0, {scrollInertia: 0});
            });
        }.observes('privateNetworkSelected'),
        actions: {
            // This event fires on item click and its responsible for bookmarking any selected item by the user
            bookmarkDocument: function (type, model, id) {
                console.log(model);
                if (type == 'place') return;
                if (model.externalSearch) {
                    App.SearchService.bookmark(this.get('query'), [model.document]).then(
                        function () {
                        },//success
                        function (jqXHR, textStatus, errorThrown) {
                            //alert('x')
                            if (jqXHR.status != 200) {
                                SetErrorMessage(jqXHR);
                            }
                        }
                    );
                }
            },
            // This event fires on item click and its responsible for display details view
            // for selected item by user for different types (activities - messages - places - videos )
            displayData: function (type, model, id) {
                var self = this;

                function displayModal() {
                    //resize not work correctly on this div due to use max-height
                    $('#searchDetailsContent').mCustomScrollbar("destroy");
                    $('#searchDetailsContent').mCustomScrollbar({});
                    $('#searchDetailsModal').modal('show');
                }

                console.log(type, id);
                this.set('activityDetails', []);
                this.set('messageDetails', []);
                this.set('videoDetails', []);
                this.set('placeDetails', []);
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
                            var map = new google.maps.Map(document.getElementById('g-map-canvas'), mapOptions);
                            var marker = new google.maps.Marker({
                                position: myLatlng,
                                map: map,
                                title: self.get('name')
                            });
                        } else if (address) {
                            var geoCoder = new google.maps.Geocoder();
                            geoCoder.geocode({'address': address}, function (results, status) {
                                if (status == google.maps.GeocoderStatus.OK) {
                                    lat = results[0].geometry.location.lat();
                                    long = results[0].geometry.location.lng();
                                    myLatlng = new google.maps.LatLng(lat, long);
                                    var mapOptions = {
                                        zoom: 18,
                                        center: myLatlng
                                    };
                                    var map = new google.maps.Map(document.getElementById('g-map-canvas'), mapOptions);
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
                this.send('bookmarkDocument', type, model, id);
            },
            // This event fires on paging click for public network search
            LoadMore: function () {
                var networkId = this.get('publicNetworkSelected');
                console.log('load more', networkId);
                this.get('searcher').send('onNetworkPaging', networkId);
            }
        }
    });
})();