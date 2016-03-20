/**
 * Created by mahmoud on 7/27/14.
 */
var lastDisplayedTwitterType = '';
var lastDisplayedTwitterID = 0;
//----
var twitterNetwork = APP_External_Network.Twitter;
//----

App.TwitterRoute = Ember.Route.extend({
    queryParams: {
        skip: {
            replace: true
        }
    },
    beforeModel: function (args) {
        // run application beforeModel
        this._super(args);
        if (getCookie(APP_Cookies.userID) !== "") {//twitterId
            var networkId = this.get('constant').twitterId;
            var networkActivated = App.OauthService.isNetworkActivated(networkId,true);

            if (!networkActivated) {
                this.transitionTo("authorize", {
                    queryParams: {
                        network: networkId
                    }
                });
            }else{
                // redirect to tool-tip page if network sync is nor completed
                var pollingManager = this.get('pollingManager');
                if (!(args.queryParams && args.queryParams.skip && args.queryParams.skip == 'true')){
                    if (!pollingManager.ifAnyEntitySyncCompleted(networkId))
                        this.transitionTo('sync', {queryParams: {network: networkId}});
                }
            }
        }
    },
    model: function () {

        App.SynchronizeService.resetSyncService();

        lastDisplayedTwitterID = -1;
        lastDisplayedTwitterType = '';

        var networkId = this.get('constant').twitterId;
        var networkActivated = App.OauthService.isNetworkActivated(networkId);
        var dataStorageKeys = App.CONSTANT.get('network.' + networkId).dataStorageKeys;
        var messages = !networkActivated ? [] : APP_Storage.getValue(dataStorageKeys.messages, [], true);
        var activities = !networkActivated ? [] : APP_Storage.getValue(dataStorageKeys.activities[0], [], true);
        var myActivities = !networkActivated ? [] : APP_Storage.getValue(dataStorageKeys.activities[1], [], true);

        return Ember.RSVP.hash({
            twitterMessages: messages,
            twitterPosts: activities,
            twitterMyPosts: myActivities
        });
    }
});


App.TwitterController = Ember.ObjectController.extend({
    lastDisplayedModel: null,

    queryParams: ['twitter_token', 'twitter_verifier'],
    twitter_token: null,
    twitter_verifier: null,

    lastMessageDateSorting: ['lastMessageDate:desc'],
    sortedMessages: Ember.computed.sort('twitterMessages', 'lastMessageDateSorting'),

    tweetInProgress: false,
    messageInProgress: false,
    tweetMessage: '',

    entityModelMap: {
        messages: 'twitterMessages',
        activities: ['twitterPosts', 'twitterMyPosts']
    },
    isModelUpdated: {
        messages: false,
        activities: [false, false]
    },
    scrollPosition: {
        messages: 0,
        activities: [0, 0]
    },

    isTweetsUpdated: function () {
        return this.get('isModelUpdated.activities.0');
    }.property('isModelUpdated.activities.0'),
    isMyTweetsUpdated: function () {
        return this.get('isModelUpdated.activities.1');
    }.property('isModelUpdated.activities.1'),

    modelLoaded: function () {
        if (APP_Storage.getValue(APP_Storage.twitterUserID()) != null) {
            var controller = this;
            App.PollingManager.startNetworkSync(
                APP_External_Network.Twitter,
                function (entityName, entitySyncOptions, isStored, newData, updatedIds, data, textStatus, jqXHR) {
                    console.log('*** Twitter *** ', entitySyncOptions, isStored, newData, updatedIds);

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

    twitterMessagesLoaded: function () {
        var controller = this;
        Ember.run.scheduleOnce('afterRender', this, function () {
            ConvertTextElementToHtml('.twitter_message_html', true);
            $("#twitter_msg_results").mCustomScrollbar({
                callbacks: {
                    onScroll: function () {
                        controller.set('scrollPosition.messages', this.mcs.top);
                        controller.set('isModelUpdated.messages', false);
                    }
                }
            });
        });
    }.observes('twitterMessages'),
    twitterPostsLoaded: function () {
        var controller = this;
        Ember.run.scheduleOnce('afterRender', this, function () {
            ConvertTextElementToHtml('.fb_post_html');//.twitter_post_html >> change due to use shared activity view
            $("#twitter_post_results").mCustomScrollbar({
                callbacks: {
                    onScroll: function () {
                        controller.set('scrollPosition.activities.0', this.mcs.top);
                        controller.set('isModelUpdated.activities.0', false);
                    }
                }
            });
        });
    }.observes('twitterPosts'),
    twitterMyPostsLoaded: function () {
        var controller = this;
        Ember.run.scheduleOnce('afterRender', this, function () {
            ConvertTextElementToHtml('.fb_post_html');
            $("#twitter_my_post_results").mCustomScrollbar({
                callbacks: {
                    onScroll: function () {
                        controller.set('scrollPosition.activities.1', this.mcs.top);
                        controller.set('isModelUpdated.activities.1', false);
                    }
                }
            });
        });
    }.observes('twitterMyPosts'),//so if we back from search mode , scroll is created again
    twitterMessageDetailsLoaded: function () {
        Ember.run.scheduleOnce('afterRender', this, function () {
            ConvertTextElementToHtml('.twitter_message_details_html', true);
            setTimeout(function () {
                $("#twitterContent").mCustomScrollbar("scrollTo", "bottom")
            }, 150)
        });
    }.observes('twitterMessageDetails'),
    twitterPostsDetailsLoaded: function () {
        Ember.run.scheduleOnce('afterRender', this, function () {
            ConvertTextElementToHtml('.twitter_post_details_html');
            setTimeout(function () {
                $("#twitterContent").mCustomScrollbar("scrollTo", "top")
            }, 150)
        });
    }.observes('twitterPostsDetails'),
    setTwitterNamePic: function () {
        //easy to get it from messages
        if (APP_Storage.getValue(APP_Storage.twitterUserName(), null) == null || APP_Storage.getValue(APP_Storage.twitterUserPic(), null) == null) {
            var messages = this.get('twitterMessages');
            var exist = false;
            var userId = APP_Storage.getValue(APP_Storage.twitterUserID());
            for (var i = 0; i < messages.length; i++) {
                /*if (messages[i].sender.identity.identifier == APP_Storage.getValue(APP_Storage.twitterUserID())) {
                 console.log('message id ' + i);
                 APP_Storage.setValue(APP_Storage.twitterUserName(), messages[i].sender.displayName, false, true);
                 APP_Storage.setValue(APP_Storage.twitterUserPic(), messages[i].sender.imageUrl, false, true);
                 exist = true;
                 break;
                 } else*/
                if (messages[i].receivers) {
                    var j = 0;
                    var receivers = messages[i].receivers;
                    for (j = 0; j < receivers.length; j++) {
                        if (receivers[j].identity.identifier == userId) {
                            console.log('message id ' + i + ' receiver id id ' + j, receivers[j]);
                            APP_Storage.setValue(APP_Storage.twitterUserName(), receivers[j].displayName, false, true);
                            APP_Storage.setValue(APP_Storage.twitterUserPic(), receivers[j].imageUrl, false, true);
                            exist = true;
                            break;
                        }
                    }
                }
                if (!exist && messages[i].conversation) {
                    var j = 0;
                    var msg = messages[i].conversation;
                    for (j = 0; j < msg.length; j++) {
                        if (msg[j].sender.identity.identifier == userId) {
                            console.log('message id ' + i + ' conversation id ' + j, msg[j].sender);
                            APP_Storage.setValue(APP_Storage.twitterUserName(), msg[j].sender.displayName, false, true);
                            APP_Storage.setValue(APP_Storage.twitterUserPic(), msg[j].sender.imageUrl, false, true);
                            exist = true;
                            break;
                        }
                    }
                    if (exist) {//loop break happens so data filled
                        break;
                    }
                }
            }
            if (!exist) {
                var tweets = this.get('twitterMyPosts');//twitterPosts
                for (i = 0; i < tweets.length; i++) {
                    if (tweets[i].postedBy.identity.identifier == userId) {
                        console.log('post id ' + i, tweets[i].postedBy)
                        APP_Storage.setValue(APP_Storage.twitterUserName(), tweets[i].postedBy.displayName, false, true);
                        APP_Storage.setValue(APP_Storage.twitterUserPic(), tweets[i].postedBy.imageUrl, false, true);
                        exist = true;
                        break;
                    }
                }
            }
        }
    },
    actions: {
        tweet: function () {
            if (this.get('tweetMessage') && this.get('tweetMessage').trim() != "") {
                if (this.get('tweetInProgress')) {
                    return;
                }
                var _self = this;
                this.set('tweetInProgress', true);
                ShowLoadingImage();
                Ember.$.ajax(API_Base_Url + "social/users/" + getCookie(APP_Cookies.userID) + "/providers/" + twitterNetwork + "/activities", {
                    "type": 'POST', "dataType": 'JSON', headers: {'Content-type': 'application/json'},
                    "data": JSON.stringify(
                        {
                            body: this.get('tweetMessage').trim().replace(/\?/g, '-').replace(/\*/g, '-'),
                            activityTypeId: 3
                        }
                    ),
                    success: function (data, textStatus, jqXHR) {
                        HideLoadingImage();
                        _self.set('tweetInProgress', false);
                        _self.set('tweetMessage', '');

                        Em.$('#tweet_status').addClass('success_border_color');
                        setTimeout(function () {
                            Em.$('#tweet_status').removeClass('success_border_color');
                        }, 1000)
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        HideLoadingImage();
                        _self.set('tweetInProgress', false);
                        if (jqXHR.status == 200) {
                            _self.set('tweetMessage', '');
                            Em.$('#tweet_status').addClass('success_border_color');
                            setTimeout(function () {
                                Em.$('#tweet_status').removeClass('success_border_color')
                            }, 1000)
                        } else {
                            Em.$('#post_error').html(JSON.parse(jqXHR.responseText).messages);
                            Em.$('#post_error').fadeIn('slow')
                        }
                    }
                })
            }
        },
        sendDirectMessage: function () {
            var _self = this;

            if (_self.get('messageInProgress') || Em.$('#twitter_message_data').val().trim() == '') {
                return;
            }
            if (Em.$('#twitter_message_data').attr('contact-id') == '') {
                Em.$('#message_error').html('This user is not in your contacts list');
                Em.$('#message_error').fadeIn('slow');
                return;
            }
            ShowLoadingImage();
            _self.set('messageInProgress', true);

            _self.setTwitterNamePic();//prepare photo and user name for display in message list

            Ember.$.ajax(API_Base_Url + "social/users/" + getCookie(APP_Cookies.userID) + "/providers/" + twitterNetwork + "/messages", {
                "type": 'POST', "dataType": 'JSON', headers: {'Content-type': 'application/json'},
                "data": JSON.stringify(
                    {
                        text: Em.$('#twitter_message_data').val().trim().replace(/\?/g, '-').replace(/\*/g, '-'),
                        receiverId: Em.$('#twitter_message_data').attr('contact-id'),
                        clientPlatformId: APP_Client_Platform.WEB,
                        externalNetworkId: twitterNetwork
                    }
                ),
                success: function (data, textStatus, jqXHR) {
                    HideLoadingImage();
                    _self.set('messageInProgress', false);

                    Em.$('#twitter_message_data').val('');
                    Em.$('#twitter_message_data').addClass('success_message_border_color');
                    setTimeout(function () {
                        Em.$('#twitter_message_data').removeClass('success_message_border_color')
                    }, 1000)
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    if (jqXHR.status == 200) {
                        var id = Em.$('#twitter_message_data').attr('message-id');
                        var model = _self.get('twitterMessages')[id];
                        var now = new Date().getTime();

                        Em.set(model, 'lastMessageDate', now);

                        model.conversation.pushObject({
                            body: Em.$('#twitter_message_data').val(),
                            date: now,
                            sender: {
                                contactId: '',
                                imageUrl: APP_Storage.getValue(APP_Storage.twitterUserPic(), 'assets/images/headericons/transparent.png'),
                                displayName: APP_Storage.getValue(APP_Storage.twitterUserName(), '--'),
                                identity: {
                                    externalNetworkId: twitterNetwork,
                                    identifier: APP_Storage.getValue(APP_Storage.twitterUserID())
                                }
                            },
                            externalNetworkId: twitterNetwork,
                            conversation: []
                        });
                        APP_Storage.setValue(APP_Storage.twitterMessage, _self.get('sortedMessages'), true);

                        lastDisplayedTwitterID = -1;
                        lastDisplayedTwitterType = '';
                        _self.send('displayData', 'Message', id, model, Em.$('#twitter_message_data').attr('contact-id'), true);

                        Em.$('#twitter_message_data').val('');
                        Em.$('#twitter_message_data').addClass('success_message_border_color');

                        _self.notifyPropertyChange('twitterMessageDetails');//scroll the
                        setTimeout(function () {
                            Em.$('#twitter_message_data').removeClass('success_message_border_color')
                        }, 1500);//after list render
                    } else {
                        Em.$('#message_error').html(JSON.parse(jqXHR.responseText).messages);
                        Em.$('#message_error').fadeIn('slow')
                    }
                    //at the end dure to large processing in 200
                    HideLoadingImage();
                    _self.set('messageInProgress', false)
                }
            })
        },
        displayData: function (dataType, id, model, contactId, keepui) {
            if (lastDisplayedTwitterID != id || lastDisplayedTwitterType != dataType || (model && model != this.get('lastDisplayedModel'))) {

                lastDisplayedTwitterID = id;
                lastDisplayedTwitterType = dataType;
                this.set('lastDisplayedModel', model);

                if (!keepui) {
                    Ember.$(".searchInnerContent").fadeOut(0);
                }
                if (dataType == 'Message') {
                    if (!keepui) {
                        Ember.$('#twitter_msg_details').fadeIn(0);
                    }
                    if (contactId && contactId != '') {
                        Em.$('#twitter_message_data').attr('contact-id', contactId ? contactId : '');
                        Em.$('#twitter_message_data').attr('message-id', id);
                        Em.$('#twitter_message_data').val('');
                        Em.$('.send_message_li').fadeIn(0);
                    } else {
                        Em.$('.send_message_li').fadeOut(0);
                    }

                    Em.$('#message_error').fadeOut(0);

                    this.set('isModelUpdated.messages', false);

                    var model = this.get('twitterMessages')[id];
                    this.set('twitterMessageDetails', model.conversation)

                } else if (dataType == 'Activity') {
                    var posts = this.get('twitterPosts');
                    var myPosts = this.get('twitterMyPosts');

                    var ignoreBookmark = false;
                    if (posts.length >= id && posts[id] == model) {
                        this.set('isModelUpdated.activities.0', false);
                    } else if (myPosts.length >= id && myPosts[id] == model) {
                        this.set('isModelUpdated.activities.1', false);
                    } else {
                        //recommended tab
                        ignoreBookmark = true;
                    }

                    Ember.$('#twitter_post_details').fadeIn(0);

                    //var model = this.get('twitterPosts')[id];
                    this.set('twitterPostsDetails', [model])
                    if (!ignoreBookmark) {
                        console.log(model)
                        Ember.$.ajax(API_Base_Url + "social/users/" + getCookie(APP_Cookies.userID) + "/activities/engaged", {
                            "type": 'POST', "dataType": 'JSON', headers: {'Content-type': 'application/json'},
                            "data": JSON.stringify(
                                {
                                    activities: SecureAjaxData([model])
                                }
                            ), "success": function (data, textStatus, jqXHR) {
                            }, "error": function (jqXHR, textStatus, errorThrown) {
                                if (jqXHR.status != 200) {
                                    SetErrorMessage(jqXHR, APP_External_Network.Twitter)
                                }
                            }
                        })
                    }
                }
                Ember.$('#twitterContent').css('borderWidth', '1px');
            }
        }
    }
});
function restoreTwitterScroll(index, accordionStatus) {
    var controller = App.__container__.lookup('controller:twitter');
    if (accordionStatus == "visible") {
        setTimeout(function () {
            if (index == 0) {
                $("#twitter_msg_results").mCustomScrollbar("scrollTo", controller.get('scrollPosition.messages'), {scrollInertia: 0});
            } else if (index == 1) {
                $("#twitter_my_post_results").mCustomScrollbar("scrollTo", controller.get('scrollPosition.activities.1'), {scrollInertia: 0});
            } else if (index == 2) {
                $("#twitter_post_results").mCustomScrollbar("scrollTo", controller.get('scrollPosition.activities.0'), {scrollInertia: 0});
            }
        }, 100)
    }
    $("#twitterData").mCustomScrollbar("scrollTo", 0, {scrollInertia: 0});
}
function setTwitterSelected(index, accordionStatus) {
    APP_Storage.setValue(APP_Storage.twitterLastSelected, index);
    restoreTwitterScroll(index, accordionStatus)
}
function selectTwitterTab() {
    var index = APP_Storage.getValue(APP_Storage.twitterLastSelected, 0);
    var tabs = Em.$('#twitterData .social_accordion_header');
    var accordionStatus = performAccordionSelection(tabs[index]);
    restoreTwitterScroll(index, accordionStatus)
}
App.TwitterView = Ember.View.extend({
    didInsertElement: function () {
        if (APP_Storage.getValue(APP_Storage.twitterUserID()) != null) {
            $("#twitterData").mCustomScrollbar();
            $("#twitterContent").mCustomScrollbar();
            selectTwitterTab();
        }
    }
});