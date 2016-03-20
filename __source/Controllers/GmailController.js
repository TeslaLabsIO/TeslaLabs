/**
 * Created by mahmoud on 5/18/14.
 */

var lastDisplayedGmailID = -1;
var GMailMessageStatus = 0;
App.GmailRoute = Ember.Route.extend({
    queryParams: {
        skip: {
            replace: true
        }
    },
    deactivate: function () {
        /*var controller = this.controllerFor('gmail');
         controller.send('ReloadModel', true);
         console.log('------------deactivate')*/
    },
    actions: {
        error: function (reason) {
            if (reason.status == 401) {
                //removeCookie(APP_Cookies.googleIsActive);
                //APP_Storage.removeValues([APP_Storage.googleUserID()])
                //location.reload();
            } else {
                //alert("Error >> "+reason.responseText)
                //setCookie(APP_Cookies.errorMessage,"Error >> "+reason.responseText+" <a href='#gmail'>try again</a>");
                SetErrorMessage(reason, APP_External_Network.Google);
                //this.transitionTo("dashboard");
            }
            //return true;
        }
    },
    beforeModel: function (args) {
        // run application beforeModel
        this._super(args);
        if (getCookie(APP_Cookies.userID) !== "") {//gmailId
            var networkId = this.get('constant').gmailId;
            var networkActivated = App.OauthService.isNetworkActivated(networkId, true);

            if (!networkActivated) {
                nextRoute = "gmail";
                this.transitionTo("google");
            } else {
                nextRoute = "";
                var pollingManager = this.get('pollingManager');
                // redirect to tool-tip page if network sync is nor completed
                if (!(args.queryParams && args.queryParams.skip && args.queryParams.skip == 'true')) {
                    if (!pollingManager.ifAnyEntitySyncCompleted(networkId))
                        this.transitionTo('sync', {queryParams: {network: networkId}});
                }
            }
        }
    },
    model: function () {
        console.log('\n \n reset sync service \n \n');
        App.SynchronizeService.resetSyncService();

        lastDisplayedGmailID = -1;
        GMailMessageStatus = 0;
        var networkActivated = App.OauthService.isNetworkActivated(APP_External_Network.Google);

        var dataStorageKeys = App.CONSTANT.get('network.' + APP_External_Network.Google).dataStorageKeys;
        var messages = !networkActivated ? [] : APP_Storage.getValue(dataStorageKeys.messages, [], true);

        return Ember.RSVP.hash({
            gmailMsgs: messages
        });
    }
});

App.GmailController = Ember.ObjectController.extend({

    //sortProperties: ['lastMessageDate'],
    lastMessageDateSorting: ['lastMessageDate:desc'],
    sortedMessages: Ember.computed.sort('gmailMsgs', 'lastMessageDateSorting'),

    entityModelMap: {
        messages: 'gmailMsgs'
    },
    isModelUpdated: {
        messages: false
    },
    scrollPosition: {
        messages: 0
    },

    modelLoaded: function () {
        //alert('x')
        if (APP_Storage.getValue(APP_Storage.googleUserID()) != null) {
            var controller = this;
            var contactService = controller.container.lookup('contacts:service');
            App.PollingManager.startNetworkSync(
                APP_External_Network.Google,
                function (entityName, entitySyncOptions, isStored, newData, updatedIds, data, textStatus, jqXHR) {
                    if(entityName == 'contacts'){
                        if(!isStored){
                            contactService.deleteContacts(data.deleted);
                        }
                    }else {
                        controller.set('lastDisplayedModel', null); // reset current selected details
                        if (newData[0].length || (updatedIds.length && updatedIds[0].length)) {
                            controller.set('isModelUpdated.' + entityName, true);
                            controller.set(controller.get('entityModelMap.' + entityName), APP_Storage.getValue(entitySyncOptions.storageKey, [], true));
                            //@TODO update current display element details :: what if element is removed on the new list ??
                        }
                    }
                },
                function (entityName, entitySyncOptions, jqXHR, textStatus, errorThrown) {//error function

                }
            )
        }
    }.observes('model'),

    gmailMsgsLoaded: function () {
        //we have the code related to sync and empty message inside after render as we need this div to be available
        //in fb as example we work with variable in model not divs so it was ok to set before load of divs
        var controller = this;
        Ember.run.scheduleOnce('afterRender', this, function () {
            $("#gmail_msg_results").mCustomScrollbar({
                callbacks: {
                    onScroll: function () {
                        controller.set('scrollPosition.messages', this.mcs.top);
                        controller.set('isModelUpdated.messages', false);
                    }
                }
            });
        });
    }.observes('gmailMsgs'),
    gmailMsgsDetailsLoaded: function () {
        var messages = this.get('gmailMsgsDetails');
        Ember.run.scheduleOnce('afterRender', this, function () {
            ConvertTextElementToHtml('.gmail_message_details_html');
            $('.gmail_message_details_html').find('.collapse').fadeIn(0);
            setTimeout(function () {
                console.log(messages)
                if (messages && messages.length) {
                    if (messages.length == 1) {
                        $("#gmailContent").mCustomScrollbar("scrollTo", "top")
                    } else {
                        $("#gmailContent").mCustomScrollbar("scrollTo", "bottom")
                    }
                }
            }, 500)
        });
    }.observes('gmailMsgsDetails'),
    setGmailUserDetails: function () {
        //easy to get it from messages
        if (APP_Storage.getValue(APP_Storage.googleUserName(), null) == null || APP_Storage.getValue(APP_Storage.googleUserPic(), null) == null) {
            var messages = this.get('gmailMsgs');
            var exist = false;
            var userId = APP_Storage.getValue(APP_Storage.gMailUserID());
            for (var i = 0; i < messages.length; i++) {
                if (messages[i].receivers) {
                    var j = 0;
                    var receivers = messages[i].receivers;
                    for (j = 0; j < receivers.length; j++) {
                        if (receivers[j].identity.identifier == userId) {
                            console.log('message id ' + i + ' receiver id id ' + j, receivers[j]);
                            APP_Storage.setValue(APP_Storage.googleUserName(), receivers[j].displayName, false, true);
                            APP_Storage.setValue(APP_Storage.googleUserEmail(), receivers[j].email, false, true);
                            APP_Storage.setValue(APP_Storage.googleUserPic(), receivers[j].imageUrl, false, true);
                            exist = true;
                            break;
                        }
                    }
                }
                if (!exist && messages[i].conversation) {
                    var j = 0;
                    var msg = messages[i].conversation;
                    for (j = 0; j < msg.length; j++) {
                        //console.log(userId,msg[j])
                        if (msg[j].sender.identity.identifier == userId) {
                            console.log('message id ' + i + ' conversation id ' + j, msg[j].sender);
                            APP_Storage.setValue(APP_Storage.googleUserName(), msg[j].sender.displayName, false, true);
                            APP_Storage.setValue(APP_Storage.googleUserEmail(), msg[j].sender.email, false, true);
                            APP_Storage.setValue(APP_Storage.googleUserPic(), msg[j].sender.imageUrl, false, true);
                            exist = true;
                            break;
                        }
                    }
                    if (exist) {//loop break happens so data filled
                        break;
                    }
                }
            }
        }
    },
    actions: {
        displayData: function (message, contactId, index) {
            var id = index;
            console.log(index);
            if (lastDisplayedGmailID != id) {
                lastDisplayedGmailID = id;
                this.set('isModelUpdated.messages', false);
                Em.$('#gmail_replay_message').attr('contact-id', contactId ? contactId : '');
                Em.$('#gmail_replay_message').attr('message-id', id);
                Em.$('#gmail_replay_message').val('');
                Em.$('#gmail_replay_parent').fadeOut(0);//will appear on reply click

                Ember.$('#gmail_msg_details').fadeIn(0);

                var conversation = message.conversation;
                if (conversation.length == 1) {
                    conversation[0].searchResult = message.searchResult ? true : false;
                }
                this.set('gmailMsgsDetails', conversation);

                Ember.$('#gmailContent').css('borderWidth', '1px');
                Ember.$('#gmailTitle').fadeIn(0);
            }
        },
        replayGmail: function () {
            var _self = this;

            if (_self.get('messageInProgress') || Em.$('#gmail_replay_message').val().trim() == '') {
                return;
            }
            if (Em.$('#gmail_replay_message').attr('contact-id') == '') {
                SetErrorMessage('This user is not in your contacts list', APP_External_Network.Google)
                return;
            }
            ShowLoadingImage();


            var messageId = $('#gmail_replay_message').attr('message-id');
            var message = _self.get('gmailMsgs')[messageId];
            var contactId = message.conversation[0].sender.contactId;
            var subject = message.conversation[0].subject;

            /*alert(Em.$('#gmail_replay_message').attr('contact-id'))
             alert(message.conversation[0].sender.contactId)
             alert(message.conversation[0].subject)
             alert(subject)*/

            _self.set('messageInProgress', true);

            _self.setGmailUserDetails();//in current status we work on user inbox so this function will be useful if you sent message to yourself

            Ember.$.ajax(API_Base_Url + "social/users/" + getCookie(APP_Cookies.userID) + "/providers/" + APP_External_Network.Google + "/messages", {
                "type": 'POST', "dataType": 'JSON', headers: {'Content-type': 'application/json'},
                "data": JSON.stringify(
                    {
                        text: Em.$('#gmail_replay_message').val().trim().replace(/\?/g, '-'),
                        subject: subject.replace(/\?/g, '-'),//jquery replace ? with jquery callback fn
                        receiverId: contactId,
                        clientPlatformId: APP_Client_Platform.WEB,
                        externalNetworkId: APP_External_Network.Google
                    }
                ),
                success: function (data, textStatus, jqXHR) {
                    HideLoadingImage()
                    _self.set('messageInProgress', false)

                    Em.$('#gmail_replay_message').val('')
                    Em.$('#gmail_replay_message').addClass('success_message_border_color')
                    setTimeout(function () {
                        Em.$('#gmail_replay_message').removeClass('success_message_border_color')
                        Em.$('#gmail_replay_parent').fadeOut(0)//will appear on reply click
                    }, 1500)
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    if (jqXHR.status == 200) {
                        var model = _self.get('gmailMsgs')[messageId];
                        var now = new Date().getTime();

                        Em.set(model, 'lastMessageDate', now)

                        model.conversation.pushObject({
                            subject: subject,
                            body: Em.$('#gmail_replay_message').val(),
                            date: now,
                            sender: {
                                contactId: '',
                                email: APP_Storage.getValue(APP_Storage.googleUserEmail(), "--"),
                                imageUrl: APP_Storage.getValue(APP_Storage.googleUserPic(), 'assets/images/headericons/transparent.png'),
                                displayName: APP_Storage.getValue(APP_Storage.googleUserName(), "--"),
                                identity: {
                                    externalNetworkId: APP_External_Network.Google,
                                    identifier: APP_Storage.getValue(APP_Storage.googleUserID())
                                }
                            },
                            externalNetworkId: APP_External_Network.Google,
                            conversation: []
                        });
                        APP_Storage.setValue(APP_Storage.gMailMessage, _self.get('sortedMessages'), true);

                        lastDisplayedGmailID = -1;

                        _self.send('displayData', message, contactId, messageId);

                        Em.$('#gmail_replay_message').val('')
                        Em.$('#gmail_replay_message').addClass('success_message_border_color')

                        _self.notifyPropertyChange('gmailMsgsDetails');//scroll the
                        setTimeout(function () {
                            Em.$('#gmail_replay_message').removeClass('success_message_border_color')
                            Em.$('#gmail_replay_parent').fadeOut(0)//will appear on reply click
                        }, 1500)//after list render
                    } else {
                        SetErrorMessage(jqXHR, APP_External_Network.Google)
                    }
                    //at the end dure to large processing in 200
                    HideLoadingImage()
                    _self.set('messageInProgress', false)
                }
            })
        }
    }
});

function restoreGmailScroll(index, accordionStatus) {
    var controller = App.__container__.lookup('controller:gmail');
    console.log(accordionStatus);
    console.log('msg' + controller.get('scrollPosition.messages'));
    if (accordionStatus == "visible") {
        setTimeout(function () {
            $("#gmail_msg_results").mCustomScrollbar("scrollTo", controller.get('scrollPosition.messages'), {scrollInertia: 0})
        }, 100)
    }
}

function setGmailSelected(index, accordionStatus) {
    APP_Storage.setValue(APP_Storage.gMailLastSelected, index)
    restoreGmailScroll(index, accordionStatus);
}
function selectGmailTab() {
    var index = APP_Storage.getValue(APP_Storage.gMailLastSelected, 0);
    var tabs = Em.$('#gmailMessageData .social_accordion_header');
    var accordionStatus = performAccordionSelection(tabs[index]);
    restoreGmailScroll(index, accordionStatus);
}
App.GmailView = Ember.View.extend({
    didInsertElement: function () {
        $("#gmailMessageData").mCustomScrollbar();
        $("#gmailContent").mCustomScrollbar();
        selectGmailTab();
    }
});