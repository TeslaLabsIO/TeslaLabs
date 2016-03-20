(function () {
    'use strict';

    App.VimeoIndexController = Ember.ObjectController.extend({

        // dependencies
        needs: [], // allow access to parent "VimeoController" !!can take array!!
        service: App.VimeoService,
        // data
        lastDisplayedVideoID: null,
        lastDisplayedVideo: null,

        entityModelMap: {
            videos: ['myfeed', 'subscription']
        },
        isModelUpdated: {
            videos: [false, false]
        },
        scrollPosition: {
            videos: [0, 0]
        },

        isSubscriptionUpdated: function () {
            return this.get('isModelUpdated.videos.1');
        }.property('isModelUpdated.videos.1'),
        isMyFeedUpdated: function () {
            return this.get('isModelUpdated.videos.0');
        }.property('isModelUpdated.videos.0'),

        modelLoaded: function () {
            //alert('x')
            if (APP_Storage.getValue(APP_Storage.vimeoUserID()) != null) {
                var controller = this;
                App.PollingManager.startNetworkSync(
                    APP_External_Network.Vimeo,
                    function (entityName, entitySyncOptions, isStored, newData, updatedIds, data, textStatus, jqXHR) {
                        console.log('*** Vimeo *** ', entitySyncOptions, isStored, newData, updatedIds);

                        controller.set('lastDisplayedModel', null); // reset current selected details
                        if (entitySyncOptions.category) {
                            _.each(entitySyncOptions.category, function (category, id) {
                                if (newData[id].length || (updatedIds.length && updatedIds[id].length)) {
                                    controller.set('isModelUpdated.' + entityName + '.' + id, true);
                                    controller.set(controller.get('entityModelMap.' + entityName + '.' + id), APP_Storage.getValue(category.storageKey, [], true));
                                    //@TODO update current display element details :: what if element is removed on the new list ??
                                }
                            });
                        } else if (newData[0].length || (updatedIds.length && updatedIds[0].length)) {
                            controller.set('isModelUpdated.' + entityName, true);
                            controller.set(controller.get('entityModelMap.' + entityName), APP_Storage.getValue(entitySyncOptions.storageKey, [], true));
                            //@TODO update current display element details :: what if element is removed on the new list ??
                        }
                    },
                    function (entityName, entitySyncOptions, jqXHR, textStatus, errorThrown) {//error function

                    }
                )
            }
        }.observes('model'),

        // computed properties
        myFeedLoaded: function () {
            var controller = this;
            Ember.run.scheduleOnce('afterRender', this, function () {
                $("#vimeo_video_results").mCustomScrollbar({
                    callbacks: {
                        onScroll: function () {
                            controller.set('scrollPosition.videos.0', this.mcs.top);
                            controller.set('isModelUpdated.videos.0', false);
                        }
                    }
                });
            });
        }.observes('myfeed'),
        subscriptionLoaded: function () {
            var controller = this;
            Ember.run.scheduleOnce('afterRender', this, function () {
                $("#vimeo_subscription_video_results").mCustomScrollbar({
                    callbacks: {
                        onScroll: function () {
                            controller.set('scrollPosition.videos.1', this.mcs.top);
                            controller.set('isModelUpdated.videos.1', false);
                        }
                    }
                });
            });
        }.observes('subscription'),
        vimeoVideoDetailsLoaded: function () {
            Ember.run.scheduleOnce('afterRender', this, function () {
                ConvertTextElementToHtml('.youtube_video_details_html', true);
            });
        }.observes('vimeoVideoDetails'),
        //methods
        restoreVimeoScroll: function (index, accordionStatus) {
            var controller = this;
            if (accordionStatus == "visible") {
                setTimeout(function () {
                    if (index == 0) {
                        $("#vimeo_video_results").mCustomScrollbar("scrollTo", controller.get('scrollPosition.videos.0'), {scrollInertia: 0})
                    } else if (index == 1) {
                        $("#vimeo_subscription_video_results").mCustomScrollbar("scrollTo", controller.get('scrollPosition.videos.1'), {scrollInertia: 0})
                    }
                }, 100)
            }
        },
        setVimeoSelected: function (index, accordionStatus) {
            APP_Storage.setValue(APP_Storage.vimeoLastSelected, index);
            this.restoreVimeoScroll(index, accordionStatus)
        },
        selectVimeoTab: function () {
            var index = APP_Storage.getValue(APP_Storage.vimeoLastSelected, 0);
            var tabs = Em.$('#vimeoData .social_accordion_header');
            var accordionStatus = performAccordionSelection(tabs[index]);
            this.restoreVimeoScroll(index, accordionStatus);
        },
        // actions
        actions: {
            displayData: function (id, model) {
                if (this.get('lastDisplayedVideoID') != id || (model && model != this.get('lastDisplayedVideo'))) {
                    this.set('lastDisplayedVideoID', id);
                    this.set('lastDisplayedVideo', model);

                    var subscription = this.get('subscription');
                    var myFeed = this.get('myfeed');

                    var ignoreBookmark = false;
                    if (subscription.length >= id && subscription[id] == model) {
                        this.set('isModelUpdated.videos.1', false);
                    } else if (myFeed.length >= id && myFeed[id] == model) {
                        this.set('isModelUpdated.videos.0', false);
                    } else {
                        //recommended tab
                        ignoreBookmark = true;
                    }

                    Ember.$('#vimeo_video_details').fadeIn(0);

                    Ember.$('#vimeoContent').css('borderWidth', '1px');

                    this.set('vimeoVideoDetails', [model]);

                    if (!ignoreBookmark) {
                        Ember.$.ajax(API_Base_Url + "content/users/" + getCookie(APP_Cookies.userID) + "/videos/engaged", {
                            "type": 'POST', "dataType": 'JSON', headers: {'Content-type': 'application/json'},
                            "data": JSON.stringify(
                                {
                                    videos: SecureAjaxData([model])
                                }
                            )
                            , "success": function (data, textStatus, jqXHR) {
                            }, "error": function (jqXHR, textStatus, errorThrown) {
                                if (jqXHR.status != 200) {
                                    SetErrorMessage(jqXHR, APP_External_Network.Vimeo)
                                }
                            }
                        });
                    }

                }
            }
        }
    });
})();