/**
 * Created by mahmoud on 7/16/14.
 */
App.FacebookMessageController= Ember.ObjectController.extend({
    testchange:function(){alert('x');}.property(),
    messagesOwner:function(){
        //next line for support new structure
        //first value for parent message
        //second value for inner message value , this need refactor to separate conversation from messages

        var network = (typeof(this.get('externalNetworkId'))!="undefined") ? this.get('externalNetworkId') : this.get('sender.identity.externalNetworkId') ;//sender.identity.externalNetworkId
        //alert(network)
        if(network == APP_External_Network.Facebook){
            return APP_Storage.getValue(APP_Storage.facebookUserID());
        }else if(network == APP_External_Network.Twitter){
            return APP_Storage.getValue(APP_Storage.twitterUserID());
        }else if(network == APP_External_Network.Google){
            return APP_Storage.getValue(APP_Storage.googleUserID());
        }else{
            alert('network not supported ; please check message item controller')
            //return 0;
        }
    }.property(),
    contactClass:function(){
        return this.get('messagesOwner') == this.get('sender.identity.identifier') ? 'contact_right':'';
    }.property(),
    allMessages:function(){
        //removed concat first & remaining to support new structure since conversation array become available

        //var firstMessage = jQuery.extend({},this.get('model'));
        //firstMessage.conversation=[];
        //var conversation = jQuery.extend([],this.get('conversation'));
        //var all = [firstMessage].concat(conversation)

        return this.get('conversation');//return all;
    }.property('conversation'),
    friendsImage:function(){
        var result = new Array();

        var receivers=this.get('receivers');
        var conversations=this.get('conversation');
        var currentUser=this.get('messagesOwner');

        if(receivers && receivers.length){
            for(var i=receivers.length-1 ; i>=0 && result.length<3 ; i--){//don't want more than 3 to display
                if(receivers[i].identity && receivers[i].identity.identifier != currentUser){
                    result.push({img:(receivers[i].imageUrl)})
                }
            }
        }
        //no data from receivers into result
        var conversationsReceivers=[];
        var identifier="";
        if(!result.length && conversations && conversations.length){
            for(var i=conversations.length-1 ; i>=0 && result.length<3 ; i--){
                identifier = conversations[i].sender.identity.identifier;
                if(identifier != currentUser && conversationsReceivers.indexOf(identifier)==-1){//not added before
                    conversationsReceivers.push(identifier);
                    result.push({img:(conversations[i].sender.imageUrl)});
                }
            }
        }
        if(result.length==1){
            result[0].class='';
        }else if(result.length==2){
            result[0].class='facebook_chat_two_parent_left';
            result[1].class='facebook_chat_two_parent_right';
        }else if(result.length==3){
            result[0].class='facebook_chat_three_left_parent';
            result[1].class='facebook_chat_three_right_top_parent';
            result[2].class='facebook_chat_three_right_bottom_parent';
        }else{
            console.log('-----------------')
            console.log(this.get('sender'))
            if(typeof(this.get('sender'))!="undefined"){
                result.push({img:this.get('sender').imageUrl,class:''})
            }else if(receivers.length){
                result.push({img:receivers[0].imageUrl,class:''})
            }else if(conversations.length){
                result.push({img:conversations[0].sender.imageUrl,class:''})
            }
            //result.push({img:this.get('sender').imageUrl,class:''})
        }
        return result;
    }.property('conversation','receivers'),
    lastFriend:function(){
        var receivers=this.get('receivers');
        var conversations=this.get('conversation');
        var currentUser=this.get('messagesOwner');

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

        //
        return receiversExist ? receivers[0] : (conversationsExist ? conversations[0].sender :  this.get('sender'))
    }.property('conversation','receivers'),//receivers add to support new structure
    lastMessageStatus:function(){
        var conversations=this.get('conversation');
        if(conversations && conversations.length && conversations[conversations.length-1].sender.identity.identifier == this.get('messagesOwner')){
            return 'replay'
        }
        return '';
    }.property('conversation'),//receivers add to support new structure
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
    }.property('lastFriend')
})