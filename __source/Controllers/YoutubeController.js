var lastDisplayedVideoID = -1;
var YoutubeMessageStatus = 0;
App.YoutubeVideoController = Ember.ObjectController.extend({
    uploadedBy: function () {
        if (this.get('postedBy')) {
            return 'By ' + this.get('postedBy.displayName')
        } else {
            return this.get('description');
        }
    }.property('postedBy.displayName', 'description'),
    viewNo: function () {
        //return "5555 Views"
        if (this.get('views')) {
            return this.get('views') + ' Views'
        } else {
            return getPostDateString(this.get('date'))
        }
    }.property('views', 'date'),
    descStyle: function () {
        if (!(this.get('description') && this.get('description').length > 75)) {
            return 'display:none'
        }
        return '';
    }.property('description')
});

var YoutubeRecommendedLastScroll = 0;
App.YoutubeRoute = Ember.Route.extend({
    queryParams: {
        skip: {
            replace: true
        }
    },
    deactivate: function () {
        /*var controller = this.controllerFor('youtube')
         controller.send('ReloadModel', true);
         console.log('------------deactivate')*/
    },
    actions: {
        error: function (reason) {
            //alert('reason')
            //alert(reason)
            if (reason.status == 401) {//handled globally
                //removeCookie(APP_Cookies.googleIsActive);
                //APP_Storage.removeValues([APP_Storage.googleUserID()])
                //location.reload();
            } else {
                SetErrorMessage(reason, APP_External_Network.YouTube);
                //this.transitionTo("dashboard");
            }
            //return true;
        }
    },
    beforeModel: function (args) {
        // run application beforeModel
        this._super(args);
        if (getCookie(APP_Cookies.userID) !== "") {//youtubeId
            var networkId = this.get('constant').youtubeId;
            var networkActivated = App.OauthService.isNetworkActivated(networkId,true);

            if (!networkActivated) {
                nextRoute = "youtube";
                this.transitionTo("google");
            }else{
                nextRoute = "";
                var pollingManager = this.get('pollingManager');
                // redirect to tool-tip page if network sync is nor completed
                if (!(args.queryParams && args.queryParams.skip && args.queryParams.skip == 'true')){
                    if (!pollingManager.ifAnyEntitySyncCompleted(networkId))
                        this.transitionTo('sync', {queryParams: {network: networkId}});
                }
            }
        }
    },
    model: function () {
        console.log('\n \n reset sync service \n \n');
        App.SynchronizeService.resetSyncService();

        lastDisplayedVideoID = -1;
        YoutubeMessageStatus = 0;
        var networkActivated = App.OauthService.isNetworkActivated(APP_External_Network.YouTube);

        var dataStorageKeys = App.CONSTANT.get('network.' + APP_External_Network.YouTube).dataStorageKeys;
        var mostPopular = !networkActivated ? [] : APP_Storage.getValue(dataStorageKeys.videos[0], [], true);
        var subscription = !networkActivated ? [] : APP_Storage.getValue(dataStorageKeys.videos[1], [], true);
        var history = !networkActivated ? [] : APP_Storage.getValue(dataStorageKeys.videos[2], [], true);
        return Ember.RSVP.hash({
            mostPopular: mostPopular,
            subscription: subscription,
            history: history,
            recommended: []
        });

        // recommended suspended until it fixed on server
        /* var recommendedOptions = this.controllerFor('youtube').get('RecommendedSyncOptions');
         var recommendedStatus = 0;
         var recommendedVideos = [];
         APP_Sync.GetData(Em.$.extend({}, recommendedOptions, {
         successCallback: function (data, textStatus, jqXHR, isLast) {
         recommendedStatus = jqXHR.status;
         if (recommendedStatus == 200) {
         APP_Storage.setValue(APP_Storage.youtubeRecommendedVideo, data.videos, true);
         recommendedVideos = values[1].videos;
         } else if (recommendedStatus == 304 || recommendedStatus == 0) {
         recommendedVideos = APP_Storage.getValue(APP_Storage.youtubeRecommendedVideo, null, true);
         if (recommendedVideos == null) {
         recommendedVideos = [];
         APP_Timers.AddTimeOut(SyncYoutubeRecommendedVideos, APP_Sync.youtubeSyncTimeOut);
         }
         }
         // resolve route promise if all requests are competed
         resolveIfDone();
         },
         errorCallback: function (jqXHR, textStatus, errorThrown, isLast) {
         recommendedVideos = [];
         SetErrorMessage(jqXHR, APP_External_Network.YouTube);
         //App.growl.danger('Getting recommended videos failed.', true);
         // resolve route promise if all requests are competed
         resolveIfDone();
         }
         }));*/
    }
});

App.YoutubeController = Ember.ObjectController.extend({

    lastDisplayedModel: null,

    entityModelMap: {
        videos: ['mostPopular', 'subscription', 'history']
    },
    isModelUpdated: {
        videos: [false, false, false]
    },
    scrollPosition: {
        videos: [0, 0, 0]
    },

    isMostPopularUpdated: function () {
        return this.get('isModelUpdated.videos.0');
    }.property('isModelUpdated.videos.0'),
    isSubscriptionUpdated: function () {
        return this.get('isModelUpdated.videos.1');
    }.property('isModelUpdated.videos.1'),
    isHistoryUpdated: function () {
        return this.get('isModelUpdated.videos.2');
    }.property('isModelUpdated.videos.2'),

    modelLoaded: function () {
        //alert('x')
        if (APP_Storage.getValue(APP_Storage.youtubeUserID()) != null) {
            var controller = this;
            App.PollingManager.startNetworkSync(
                APP_External_Network.YouTube,
                function (entityName, entitySyncOptions, isStored, newData, updatedIds, data, textStatus, jqXHR) {
                    console.log('*** YouTube *** ', entitySyncOptions, isStored, newData, updatedIds);

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

    RecommendedSyncOptions: {
        url: (API_Base_Url + "analytics/users/" + APP_Cookies.getCookie(APP_Cookies.userID) + "/providers/" + APP_External_Network.YouTube + "/videos/recommended"),//videos/recommended
        lastModifiedKey: APP_Storage.youtubeRecommendedVideoLastModified,
        syncUntilData: false,//will be true in sync fn
        syncForEver: false,
        syncTimeout: APP_Sync.youtubeSyncTimeOut,
        stopOnError: true
    },
    youtubeVideosLoaded: function () {
        var controller = this;
        Ember.run.scheduleOnce('afterRender', this, function () {
            ConvertTextElementToHtml('.youtube_desc_html', true);
            FormatViewsNumber('.views_number');
            $("#youTube_video_results").mCustomScrollbar({
                callbacks: {
                    onScroll: function () {
                        controller.set('scrollPosition.videos.0', this.mcs.top);
                        controller.set('isModelUpdated.videos.0', false);
                    }
                }
            });
        });
    }.observes('mostPopular'),
    youtubeSubscriptionVideosLoaded: function () {
        var controller = this;
        Ember.run.scheduleOnce('afterRender', this, function () {
            ConvertTextElementToHtml('.youtube_desc_html', true);
            FormatViewsNumber('.views_number');
            $("#youtube_subscribe_results").mCustomScrollbar({
                callbacks: {
                    onScroll: function () {
                        controller.set('scrollPosition.videos.1', this.mcs.top);
                        controller.set('isModelUpdated.videos.1', false);
                    }
                }
            });
        });
    }.observes('subscription'),
    youtubeHistoryVideosLoaded: function () {
        var controller = this;
        Ember.run.scheduleOnce('afterRender', this, function () {
            ConvertTextElementToHtml('.youtube_desc_html', true);
            FormatViewsNumber('.views_number');
            $("#youtube_history_results").mCustomScrollbar({
                callbacks: {
                    onScroll: function () {
                        controller.set('scrollPosition.videos.2', this.mcs.top);
                        controller.set('isModelUpdated.videos.2', false);
                    }
                }
            });
        });
    }.observes('history'),
    youtubeRecommendedVideosLoaded: function () {
        Ember.run.scheduleOnce('afterRender', this, function () {
            ConvertTextElementToHtml('.youtube_desc_html', true);
            FormatViewsNumber('.views_number');
            $("#youtube_recommended_results").mCustomScrollbar({
                callbacks: {
                    onScroll: function () {
                        console.log('scroll rec');
                        YoutubeRecommendedLastScroll = this.mcs.top;
                    }
                }
            });
        });
    }.observes('recommended'),

    youtubeVideosDetailsLoaded: function () {
        Ember.run.scheduleOnce('afterRender', this, function () {
            ConvertTextElementToHtml('.youtube_video_details_html', true);
            setTimeout(function () {
                $("#youTubeContent").mCustomScrollbar("scrollTo", "top")
            }, 100)
        });
    }.observes('youtubeVideoDetails'),
    actions: {
        displayData: function (id, model) {
            //alert(ResultCategories[dataType][id].rank)
            // alert(id+' '+itemKey);
            if (lastDisplayedVideoID != id || (model && model != this.get('lastDisplayedModel'))) {

                lastDisplayedVideoID = id;

                this.set('lastDisplayedModel', model);

                Ember.$('#youtube_video_details').fadeIn(0);
                var ignoreBookmark = false;
                var mostPopular = this.get('mostPopular');
                var subscription = this.get('subscription');
                var history = this.get('history');

                if (mostPopular.length >= id && mostPopular[id] == model) {
                    this.set('isModelUpdated.videos.0', false);
                } else if (subscription.length >= id && subscription[id] == model) {
                    this.set('isModelUpdated.videos.1', false);
                } else if (history.length >= id && history[id] == model) {
                    this.set('isModelUpdated.videos.2', false);
                } else {
                    //recommended tab
                    ignoreBookmark = true;
                }

                //var model=this.get('model')[id];
                this.set('youtubeVideoDetails', [model])

                var recommended = this.get('recommended');

                if (recommended.length >= id && recommended[id] == model) {
                    ignoreBookmark = true;
                }

                if (!ignoreBookmark) {
                    Ember.$.ajax(API_Base_Url + "content/users/" + getCookie(APP_Cookies.userID) + "/videos/engaged", {
                        "type": 'POST', "dataType": 'JSON', headers: {'Content-type': 'application/json'},
                        "data": JSON.stringify(
                            {
                                videos: SecureAjaxData([model])
                            }
                        )//.replace(/_replace_question_mark_for_json_string_/g,'?')
                        , "success": function (data, textStatus, jqXHR) {
                        }, "error": function (jqXHR, textStatus, errorThrown) {
                            if (jqXHR.status != 200) {
                                SetErrorMessage(jqXHR, APP_External_Network.YouTube)
                            }
                        }
                    })
                    //send it to videos engaged endpoint
                }
                Ember.$('#youTubeContent').css('borderWidth', '1px');

            }
        }
    }
});


function restoreYoutubeScroll(index, accordionStatus) {
    var controller = App.__container__.lookup('controller:youtube');
    if (accordionStatus == "visible") {
        setTimeout(function () {
            if (index == 0) {
                $("#youTube_video_results").mCustomScrollbar("scrollTo", controller.get('scrollPosition.videos.0'), {scrollInertia: 0})
            } else if (index == 1) {
                $("#youtube_subscribe_results").mCustomScrollbar("scrollTo", controller.get('scrollPosition.videos.1'), {scrollInertia: 0})
            } else if (index == 2) {
                $("#youtube_history_results").mCustomScrollbar("scrollTo", controller.get('scrollPosition.videos.2'), {scrollInertia: 0})
            } else if (index == 3) {
                $("#youtube_recommended_results").mCustomScrollbar("scrollTo", YoutubeRecommendedLastScroll, {scrollInertia: 0})
            }
        }, 100)
    }
}

function setYoutubeSelected(index, accordionStatus) {
    APP_Storage.setValue(APP_Storage.youtubeLastSelected, index)
    restoreYoutubeScroll(index, accordionStatus)
}
function selectYoutubeTab() {
    var index = APP_Storage.getValue(APP_Storage.youtubeLastSelected, 0);
    var tabs = Em.$('#youtubeData .social_accordion_header');
    var accordionStatus = performAccordionSelection(tabs[index])
    restoreYoutubeScroll(index, accordionStatus)
}
App.YoutubeView = Ember.View.extend({
    didInsertElement: function () {
        $("#youtubeData").mCustomScrollbar();
        $("#youTubeContent").mCustomScrollbar();
        selectYoutubeTab();///////////////////////////
    }
});

var videos = "";