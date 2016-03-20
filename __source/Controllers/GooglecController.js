function handleClientLoad() {
    // Step 2: Reference the API key
    gapi.client.setApiKey(Google_Api_Key);
    //window.setTimeout(checkAuth,1);
}

function checkAuth() {
    gapi.auth.authorize({client_id: Google_Client_ID, scope: Google_Plus_Scope, immediate: true}, handleAuthResult);
}

var lastDisplayedGoogleType = '';
var lastDisplayedGoogleID = -1;

var SyncGooglePlusMessageResult = [];
var GooglePlusMessageStatus = 0;

var SyncGooglePlusActivitiesResult = [];
var GooglePlusActivityStatus = 0;

var GoogleMessageLastScroll = 0;
var GooglePostLastScroll = 0;

function restoreGoogleScroll(index, accordionStatus) {
    if (accordionStatus == "visible") {
        setTimeout(function () {
            if (index == 0) {
                $("#google_msg_results").mCustomScrollbar("scrollTo", GoogleMessageLastScroll, {scrollInertia: 0})
            } else {
                $("#google_posts_results").mCustomScrollbar("scrollTo", GooglePostLastScroll, {scrollInertia: 0})
            }
        }, 100)
    }
}

function setGoogleSelected(index, accordionStatus) {
    APP_Storage.setValue(APP_Storage.googleLastSelected, index)
    restoreGoogleScroll(index, accordionStatus)
}
function selectGoogleTab() {
    var index = APP_Storage.getValue(APP_Storage.googleLastSelected, 0);
    var tabs = Em.$('#googleMessageNews .social_accordion_header');
    var accordionStatus = performAccordionSelection(tabs[index])
    restoreGoogleScroll(index, accordionStatus)
}

function SyncGooglePlusMessages() {
    var SyncMessagesOptions = {
        url: (API_Base_Url + "social/users/" + getCookie(APP_Cookies.userID) + "/providers/" + APP_External_Network.Google + "/messages"),
        lastModifiedKey: APP_Storage.googlePlusMessageLastModified,
        syncUntilData: true,//will be true in sync fn
        syncForEver: false,
        syncTimeout: APP_Sync.googlePlusSyncTimeOut,
        stopOnError: true
    };
    SyncGooglePlusMessageResult = [];
    GooglePlusMessageStatus = 0;
    APP_Sync.GetData(Em.$.extend({}, SyncMessagesOptions, {
        successCallback: function (data, textStatus, jqXHR, isLast) {
            GooglePlusMessageStatus = jqXHR.status;
            if (GooglePlusMessageStatus == 200 || APP_Storage.getValue(APP_Storage.googlePlusMessage, null, true) != null) {
                Ember.$('#google_loading_msg').fadeOut(0);

                var forceStop = false;

                if (GooglePlusMessageStatus == 200) {
                    SyncGooglePlusMessageResult = data.messages;
                    APP_Storage.setValue(APP_Storage.googlePlusMessage, SyncGooglePlusMessageResult, true);
                } else {
                    SyncGooglePlusMessageResult = APP_Storage.getValue(APP_Storage.googlePlusMessage, [], true)
                    forceStop = true;
                }

                if (SyncGooglePlusMessageResult.length == 0) {
                    Ember.$('#google_loading_msg').html('You have no messages on this account');
                    Ember.$('#google_loading_msg').fadeIn(0);
                }

                $('#updateGooglePlusMessages').click();

                $('#google_msg_count').fadeIn(0);

                return forceStop;

            } else if (GooglePlusMessageStatus != 304) {
                Ember.$('#google_loading_msg').fadeOut(0);
            }
        },
        errorCallback: function (jqXHR, textStatus, errorThrown, isLast) {
            Ember.$('#google_loading_msg').fadeOut(0);
        }
    }))
}
function SyncGooglePlusActivities() {
    var SyncActivitiesOptions = {
        url: (API_Base_Url + "social/users/" + getCookie(APP_Cookies.userID) + "/providers/" + APP_External_Network.Google + "/activities"),
        lastModifiedKey: APP_Storage.googlePlusPostLastModified,
        syncUntilData: true,//will be true in sync fn
        syncForEver: false,
        syncTimeout: APP_Sync.googlePlusSyncTimeOut,
        stopOnError: true
    };
    SyncGooglePlusActivitiesResult = [];
    GooglePlusActivityStatus = 0;
    APP_Sync.GetData(Em.$.extend({}, SyncActivitiesOptions, {
        successCallback: function (data, textStatus, jqXHR, isLast) {
            GooglePlusActivityStatus = jqXHR.status;
            if (GooglePlusActivityStatus == 200 || APP_Storage.getValue(APP_Storage.googlePlusPost, null, true) != null) {
                Ember.$('#google_loading_post').fadeOut(0);

                var forceStop = false;

                if (GooglePlusActivityStatus == 200) {
                    SyncGooglePlusActivitiesResult = data.activities;
                    APP_Storage.setValue(APP_Storage.googlePlusPost, SyncGooglePlusActivitiesResult, true);
                } else {
                    SyncGooglePlusActivitiesResult = APP_Storage.getValue(APP_Storage.googlePlusPost, [], true)
                    forceStop = true;
                }

                if (SyncGooglePlusActivitiesResult.length == 0) {
                    Ember.$('#google_loading_post').html('You have no activities on this account');
                    Ember.$('#google_loading_post').fadeIn(0);
                }

                $('#updateGooglePlusPosts').click();

                $('#google_post_new').fadeIn(0);

                return forceStop;

            } else if (GooglePlusActivityStatus != 304) {
                Ember.$('#google_loading_post').fadeOut(0);
            }
        },
        errorCallback: function (jqXHR, textStatus, errorThrown, isLast) {
            Ember.$('#google_loading_post').fadeOut(0);
        }
    }))
}
App.GoogleRoute = Ember.Route.extend({
    actions: {
        error: function (reason) {
            if (reason.status == 401) {//handled globally
                //APP_Storage.removeValues([APP_Storage.googleUserID()])
            } else {
                SetErrorMessage(reason, APP_External_Network.Google);
            }
        }
    },
    model: function () {
        //
        App.SynchronizeService.resetSyncService();
        //
        lastDisplayedGoogleType = '';
        lastDisplayedGoogleID = -1;
        GooglePlusMessageStatus = 0
        GooglePlusActivityStatus = 0

        var SyncMessagesOptions = {
            url: (API_Base_Url + "social/users/" + getCookie(APP_Cookies.userID) + "/providers/" + APP_External_Network.Google + "/messages"),
            lastModifiedKey: APP_Storage.googlePlusMessageLastModified,
            syncUntilData: false,//will be true in sync fn
            syncForEver: false,
            syncTimeout: APP_Sync.googlePlusSyncTimeOut,
            stopOnError: true
        };
        var SyncActivitiesOptions = {
            url: (API_Base_Url + "social/users/" + getCookie(APP_Cookies.userID) + "/providers/" + APP_External_Network.Google + "/activities"),
            lastModifiedKey: APP_Storage.googlePlusPostLastModified,
            syncUntilData: false,//will be true in sync fn
            syncForEver: false,
            syncTimeout: APP_Sync.googlePlusSyncTimeOut,
            stopOnError: true
        };
        if (APP_Storage.getValue(APP_Storage.googleUserID()) != null) {//getCookie(APP_Cookies.googleIsActive)=="YES"){
            return Ember.RSVP.Promise.all([

                APP_Sync.GetData(Em.$.extend({}, SyncMessagesOptions, {
                    successCallback: function (data, textStatus, jqXHR, isLast) {
                        GooglePlusMessageStatus = jqXHR.status;
                    },
                    errorCallback: function (jqXHR, textStatus, errorThrown, isLast) {

                    }
                })),
                APP_Sync.GetData(Em.$.extend({}, SyncActivitiesOptions, {
                    successCallback: function (data, textStatus, jqXHR, isLast) {
                        GooglePlusActivityStatus = jqXHR.status;
                    },
                    errorCallback: function (jqXHR, textStatus, errorThrown, isLast) {

                    }
                }))
            ]).then(function (values) {
                var messages = [];
                var activities = [];
                if (GooglePlusMessageStatus == 200) {
                    APP_Storage.setValue(APP_Storage.googlePlusMessage, values[0].messages, true);
                    messages = values[0].messages;
                } else if (GooglePlusMessageStatus == 304 || GooglePlusMessageStatus == 0) {
                    //alert('msg 304')
                    messages = APP_Storage.getValue(APP_Storage.googlePlusMessage, null, true);
                    if (messages == null) {
                        messages = [];
                        //keep track of timers so it's deleted when user sign out
                        //APP_Timers.AddTimeOut(SyncGooglePlusMessages,APP_Sync.googlePlusSyncTimeOut);
                        //setTimeout(SyncGooglePlusMessages,APP_Sync.googlePlusSyncTimeOut);
                    }
                }
                if (GooglePlusActivityStatus == 200) {
                    APP_Storage.setValue(APP_Storage.googlePlusPost, values[1].activities, true)
                    activities = values[1].activities;
                } else if (GooglePlusActivityStatus == 304 || GooglePlusActivityStatus == 0) {
                    activities = APP_Storage.getValue(APP_Storage.googlePlusPost, null, true)
                    if (activities == null) {
                        activities = [];
                        //keep track of timers so it's deleted when user sign out
                        //APP_Timers.AddTimeOut(SyncGooglePlusActivities,APP_Sync.googlePlusSyncTimeOut);
                        //setTimeout(SyncGooglePlusActivities,APP_Sync.googlePlusSyncTimeOut)
                    }
                }
                return {
                    googleMsgs: [],//messages,
                    googlePosts: []//activities
                };
            });
        } else {
            return Ember.RSVP.hash({
                googleMsgs: [],//APP_Storage.getValue(APP_Storage.googlePlusMessage,[],true),
                googlePosts: []//APP_Storage.getValue(APP_Storage.googlePlusPost,[],true)
            });
        }
    }
});

App.GoogleView = Ember.View.extend({
    didInsertElement: function () {
        if (APP_Storage.getValue(APP_Storage.googleUserID()) == null) {//getCookie(APP_Cookies.googleIsActive)!="YES"){
            Ember.$('#googleLogin').fadeIn(0);
        } else {
            Ember.$('#googledata').fadeIn(0);
            if (APP_Storage.IsLocalStorageSupported()) {
                Ember.$('#google_loading_msg').html('Google+ Messages not supported on this version');
                if (APP_Storage.getValue(APP_Storage.googlePlusMessage, null, true) == null) {
                    Ember.$('#google_loading_msg').fadeIn(0);
                } else if (APP_Storage.getValue(APP_Storage.googlePlusMessage, [], true).length == 0) {
                    //Ember.$('#google_loading_msg').html('You have no messages on this account');
                    Ember.$('#google_loading_msg').fadeIn(0);
                } else {
                    Ember.$('#google_loading_msg').fadeIn(0);
                    $('#google_msg_count').fadeIn(0);
                }

                Ember.$('#google_loading_post').html('Google+ Activities not supported on this version');
                if (APP_Storage.getValue(APP_Storage.googlePlusPost, null, true) == null) {
                    //Ember.$('#google_loading_post').html('You currently have no activities on Google+');
                    Ember.$('#google_loading_post').fadeIn(0);
                } else if (APP_Storage.getValue(APP_Storage.googlePlusPost, [], true).length == 0) {
                    //Ember.$('#google_loading_post').html('You currently have no activities on Google+');
                    Ember.$('#google_loading_post').fadeIn(0);
                }

                $("#google_msg_results").mCustomScrollbar({
                    callbacks: {
                        onScroll: function () {
                            GoogleMessageLastScroll = this.mcs.top;
                        }
                    }
                });

                $("#google_posts_results").mCustomScrollbar({
                    callbacks: {
                        onScroll: function () {
                            GooglePostLastScroll = this.mcs.top;
                            $('#google_post_new').fadeOut(0);
                        }
                    }
                });

                $("#googleMessageNews").mCustomScrollbar();
                $("#googleContent").mCustomScrollbar();
                selectGoogleTab();///////////////////////////

            }
        }
    }
});


App.GoogleController = Ember.ObjectController.extend({
    googlePostsLoaded: function () {
        Ember.run.scheduleOnce('afterRender', this, function () {
            ConvertTextElementToHtml('.google_post_html');
        });
    }.observes('googlePosts'),
    updateGooglePlusMessages: function () {
        this.set('googleMsgs', SyncGooglePlusMessageResult);
        SyncGooglePlusMessageResult = [];
    },
    updateGooglePlusPosts: function () {
        this.set('googlePosts', SyncGooglePlusActivitiesResult);
        SyncGooglePlusActivitiesResult = [];
    },
    googleMsgsDetailsLoaded: function () {
        Ember.run.scheduleOnce('afterRender', this, function () {
            ConvertTextElementToHtml('.google_message_details_html');
            setTimeout(function () {
                $("#googleContent").mCustomScrollbar("scrollTo", "top")
            }, 100)
        });
    }.observes('googleMsgsDetails'),
    googlePostsDetailsLoaded: function () {
        Ember.run.scheduleOnce('afterRender', this, function () {
            ConvertTextElementToHtml('.google_post_details_html');
            setTimeout(function () {
                $("#googleContent").mCustomScrollbar("scrollTo", "top")
            }, 100)
        });
    }.observes('googlePostsDetails'),
    actions: {
        displayData: function (dataType, id) {
            if (lastDisplayedGoogleID != id || lastDisplayedGoogleType != dataType) {

                lastDisplayedGoogleID = id;
                lastDisplayedGoogleType = dataType;

                Ember.$(".searchInnerContent").fadeOut(0);
                if (dataType == 'Message') {
                    Ember.$('#google_msg_details').fadeIn(0);
                    this.set('googleMsgsDetails', [this.get('googleMsgs')[id]])
                } else if (dataType == 'Activity') {
                    Ember.$('#google_post_details').fadeIn(0);
                    this.set('googlePostsDetails', [this.get('googlePosts')[id]])
                }

                Ember.$('#googleContent').css('borderWidth', '1px');
                Ember.$('#googleMsgTitle').fadeIn(0);
            }
        },
        LoginToGoogle: function () {
            gapi.auth.signIn({
                scope: Google_Plus_Scope.join(' ')
                , clientid: Google_Client_ID
                , redirecturi: "postmessage"
                , accesstype: "offline"
                , cookiepolicy: "single_host_origin"
                , callback: 'handleAuthResult'
                , approvalprompt: 'force'
            })
        }
    }

});


function handleAuthResult(authResult) {
    var authorizeButton = document.getElementById('authorize-button');
    console.log(authResult)
    if (authResult && !authResult.error) {
        if (authResult.access_token && authResult.code) {
            activateGoogle(authResult.access_token, authResult.code);
        } else {
            SetErrorMessage('missing parameter ' + authResult.access_token + ' ||| ' + authResult.code, APP_External_Network.Google)
        }
    } else {
        authorizeButton.style.visibility = '';
        //authorizeButton.onclick = handleAuthClick2;
    }
}

function activateGoogle(token, code) {
    ShowLoadingImage();
    Ember.$.ajax(API_Base_Url + 'users/' + getCookie(APP_Cookies.userID) + '/authorized', {
        "type": 'POST', // HTTP method
        "dataType": 'JSON', // type of data expected from the API response
        "data":  // Begin data payload
            JSON.stringify(
                {
                    code: code,
                    externalNetworkId: APP_External_Network.Google,
                    clientPlatformId: APP_Client_Platform.Current
                }
            )
        ,
        "headers": {
            "Content-Type": 'application/json'
        },// End data payload
        "success": function (data, textStatus, jqXHR) {
            console.log(data);
            //
            APP_External_Network.setExpired(false,APP_External_Network.Google);
            APP_External_Network.setExpired(false,APP_External_Network.YouTube);
            //
            APP_Storage.setValue(APP_Storage.googleUserID(), data.identity.identifier, false, true);//until i receive identity from api
            APP_Storage.setValue(APP_Storage.googleUserName(), data.displayName, false, true);
            APP_Storage.setValue(APP_Storage.googleUserEmail(), data.email, false, true);
            APP_Storage.setValue(APP_Storage.googleUserPic(), data.imageUrl, false, true);

            HideLoadingImage();

            var next = nextRoute;
            nextRoute = "";
            if (next == "google") {//if (next == "" || next == "google") {
                setTimeout(function () {
                    location.reload();
                }, 10);
            } else {
                // redirect to sync tool-tip page
                App.utilities.redirectToUrl(('/#/sync?network=' + (next == 'youtube' ? APP_External_Network.YouTube : APP_External_Network.Google)));
                //window.location="#/"+next;
            }
        },
        "error": function (jqXHR, textStatus, errorThrown) {
            HideLoadingImage()
            console.log(jqXHR);
            SetErrorMessage(jqXHR, APP_External_Network.Google);
        }
    });
}