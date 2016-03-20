/**
 * Created by mahmoud on 28-Sep-14.
 */
App.SocialMessageController= Ember.ObjectController.extend({
    userIdentity: function () {
        //next line for support new structure
        //first value for parent message
        //second value for inner message value , this need refactor to separate conversation from messages
        //sender.identity.externalNetworkId

        var network = (typeof(this.get('externalNetworkId')) != "undefined") ? this.get('externalNetworkId') : this.get('sender.identity.externalNetworkId');
        console.log(network)
        if (network == APP_External_Network.Facebook) {
            return APP_Storage.getValue(APP_Storage.facebookUserID());
        } else if (network == APP_External_Network.Twitter) {
            return APP_Storage.getValue(APP_Storage.twitterUserID());
        } else if (network == APP_External_Network.Google) {
            return APP_Storage.getValue(APP_Storage.googleUserID());
        }else if (network == APP_External_Network.Tumblr) {
            return APP_Storage.getValue(APP_Storage.tumblrUserID());
        } else {
            alert('network not supported ; please check message item controller');
        }
    }.property('externalNetworkId'),
    contactClass:function(){
        return this.get('userIdentity') == this.get('sender.identity.identifier') ? 'contact_right':'';
    }.property(),
    lastMessage: function () {
        //console.log('last message')
        //console.log(_.last(this.get('conversation')));
        return _.last(this.get('conversation'));
    }.property('conversation'), // last message
    lastMessageSummary: function(){
        var lastMessage = this.get('lastMessage');
        if(lastMessage){
            if(lastMessage.subject && lastMessage.subject!=""){
                return lastMessage.subject;
            }else{
                return lastMessage.body;
            }
        }
        return "";
    }.property('lastMessage'),
    lastMessageStatus: function () {
        var lastMessage = this.get('lastMessage');
        return (this.get('conversation').length>1 && lastMessage && lastMessage.sender.identity.identifier == this.get('userIdentity')) ? 'replay' : '';
    }.property('userIdentity'),
    lastFriend: function () {
        var receivers=this.get('receivers');
        var conversations=this.get('conversation');
        var currentUser=this.get('userIdentity');

        var receiversExist=false;
        var conversationsExist=false;

        //next if is add to support new structure
        //if receivers > 1 => last one of them may not be the one who sent last message >> this case in facebook group chat
        if(receivers && receivers.length) {
            if(receivers.length==1 && receivers[0].identity && receivers[0].identity.identifier != currentUser) {
                return receivers[0];
            }
            //set it to true and try to get last friend from conversation
            receiversExist = true;//true when array length>1
        }

        if(conversations && conversations.length){
            for(var i=conversations.length-1 ; i>=0 ; i--){
                if(conversations[i].sender.identity.identifier != currentUser){
                    return conversations[i].sender;
                }
            }
            conversationsExist = true;
        }

        if(receiversExist){
            //that will return last friend but he may not be who sent the last conversation
            for(var i=receivers.length-1 ; i>=0 ; i--){
                if(receivers[i].identity.identifier != currentUser){
                    return receivers[i];
                }
            }
        }

        return receiversExist ? receivers[0] : (conversationsExist ? conversations[0].sender :  this.get('sender'))
    }.property('conversation', 'receivers'),//receivers add to support new structure
    lastFriendName:function(){
        var lastFriend = this.get('lastFriend');
        if(lastFriend){
            if(lastFriend.displayName){
                return lastFriend.displayName;
            }else{
                return lastFriend.email;
            }
        }
        return '';
    }.property('lastFriend'),
    clean:function cleanHTML(input) {
        // 1. remove line breaks / Mso classes
        var stringStripper = /(\n|\r| class=(")?Mso[a-zA-Z]+(")?)/g;
        var output = input.replace(stringStripper, ' ');
        // 2. strip Word generated HTML comments
        var commentSripper = new RegExp('<!--(.*?)-->','g');
        var output = output.replace(commentSripper, '');
        var tagStripper = new RegExp('<(/)*(meta|link|span|\\?xml:|st1:|o:|font)(.*?)>','gi');
        // 3. remove tags leave content if any
        output = output.replace(tagStripper, '');
        // 4. Remove everything in between and including tags '<style(.)style(.)>'
        var badTags = ['style', 'script','applet','embed','noframes','noscript'];

        for (var i=0; i< badTags.length; i++) {
            tagStripper = new RegExp('<'+badTags[i]+'.*?'+badTags[i]+'(.*?)>', 'gi');
            output = output.replace(tagStripper, '');
        }
        // 5. remove attributes ' style="..."'
        var badAttributes = ['style', 'start'];
        for (var i=0; i< badAttributes.length; i++) {
            var attributeStripper = new RegExp(' ' + badAttributes[i] + '="(.*?)"','gi');
            output = output.replace(attributeStripper, '');
        }
        return output;
    },
    stripBody: function () {
        var exist = $('#gmail_message_text_value').length;
        if(exist) {
            $('#gmail_message_text_value').remove();
        }
        $('body').append($('<div id="gmail_message_text_value" style="display: none">'));

        $('#gmail_message_text_value').html(this.get('lastMessage.body'));
        ConvertHtmlToText('#gmail_message_text_value');
        return $('#gmail_message_text_value').text().trim();
        /*var tmp = document.createElement("DIV");
        tmp.innerHTML = this.get('lastMessage.body');
        console.log(tmp.textContent || tmp.innerText || "");
        //return this.clean(tmp.textContent || tmp.innerText || "");
        return tmp.textContent || tmp.innerText || "";*/
    }.property('lastMessage.body')
});