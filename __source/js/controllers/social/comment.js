/**
 * Created by mahmoud on 18-Nov-14.
 */
App.SocialCommentController = Ember.ObjectController.extend({
    externalBody:function(){
        if(this.get('body')) {
            var href = new RegExp('<a', 'gi');
            var body = this.get('body');
            body = body.replace(href, '<a target="_blank" ');
            if(this.get('networkId') == this.get('constant').redditId){
                href = new RegExp('href="/', 'gi');
                body = body.replace(href,'href="http://www.reddit.com/');
                href = new RegExp('href=\'/', 'gi');
                body = body.replace(href,'href=\'http://www.reddit.com/');
            }
            return body;
        }
        return this.get('body');
    }.property('body'),
    path : function(){
        //not depend on parentController.body because the post it self has body
        if(this.get('parentController.replies')){
            return this.get('parentController.path')+"_"+this.get('commentId')
        }else{
            return this.get('commentId')+""
        }
    }.property('commentId','replies'),
    level : function(){
        //not depend on parentController.body because the post it self has body
        if(this.get('parentController.replies')){
            return this.get('parentController.level')+1;
        }else{
            return 1;
        }
    }.property('replies'),
    networkId : function(){
        if(_.isUndefined(this.get('parentController.externalNetworkId'))){
            return this.get('parentController.networkId')
        }else{//direct comment for post , the post has external network id
            return this.get('parentController.externalNetworkId');
        }
    }.property('externalNetworkId'),
    commentStyle : function(){
        var levelMargin = (this.get('level')*15);
       return "width: calc(100% - "+(levelMargin+30)+"px);margin-left: "+levelMargin+"px";//30 is width of vote div
    }.property('level'),
    pointStyle : function(){
        var levelMargin = (this.get('level')*15);
        var expandWidth = 14;//14 is with of expand icon
        levelMargin = levelMargin+30+expandWidth;//30 is width of vote div
        return "width: calc(100% - "+(levelMargin)+"px);margin-left: "+(levelMargin)+"px";
    }.property('level'),
    voteUpSelected:function(){
        return this.get('ownerVote')==1;
    }.property('ownerVote'),
    voteDownSelected:function(){
        return this.get('ownerVote')==-1;
    }.property('ownerVote'),
    actions:{
        voteComment : function(direction,select){
            var ownerVote = !select ? 0 : direction;//if user undo his vote the vote will be 0 unless it click other direction
            var voteElement = direction==-1 ? 'voteDownSelected' : 'voteUpSelected';
            var otherElement = direction==1 ? 'voteDownSelected' : 'voteUpSelected';
            var newRate = 0;
            var self = this;
            if(select){
                if(this.get(otherElement)){
                    newRate = (this.get('rating.numRatings')+(2*direction));//other was selected so it's consider 2 votes not one (1 undo & other reverse)
                }else{
                    newRate = (this.get('rating.numRatings')+(direction));//it's increment/decrement to/from zero
                }
            }else{
                newRate = (this.get('rating.numRatings')+(-1*direction));//reverse selected direction to zero
            }

            this.send('sendVote',{
                parentId:this.get('externalIdentifier'),
                direction:ownerVote
            },function(error){
                if(!error){
                    self.set('rating.numRatings',newRate);
                    self.set('ownerVote',ownerVote);
                }
            });
            /*if(direction==-1){//vote down
                if(select){
                    this.set('voteDownSelected',true);
                    if(this.get('voteUpSelected')){
                        this.set('rating.numRatings',this.get('rating.numRatings')-2)
                    }else{
                        this.set('rating.numRatings',this.get('rating.numRatings')-1)
                    }
                }else{
                    this.set('voteDownSelected',false);
                    this.set('rating.numRatings',this.get('rating.numRatings')+1)
                }
                this.set('voteUpSelected',false);
            }else if(direction==1){//vote up

                if(select){
                    this.set('voteUpSelected',true);
                    if(this.get('voteDownSelected')){
                        this.set('rating.numRatings',this.get('rating.numRatings')+2)
                    }else{
                        this.set('rating.numRatings',this.get('rating.numRatings')+1)
                    }
                }else{
                    this.set('voteUpSelected',false);
                    this.set('rating.numRatings',this.get('rating.numRatings')-1)
                }
                this.set('voteDownSelected',false);
            }*/
        },
        expand : function(){
            //alert(this.get('_view.contentIndex'))
            console.log(this.get('parentController.body'));
            if(this.get('expanded')){
                this.set('expanded',false)
            }else{
                this.set('expanded',true)
            }
        },
        addReply:function(){
            var identifier = "" + (new Date().getTime());
            var displayName = "You";
            var externalNetwork = this.get('networkId');//comment not have external network id so we make new prop to handle that

            console.log(externalNetwork);

            var network = App.CONSTANT.network[externalNetwork];
            if(network && network.authorization){
                if(network.authorization.userId){
                    identifier = APP_Storage.getValue(network.authorization.userId,identifier);
                }
                if(network.authorization.contactStorageKeys && network.authorization.contactStorageKeys.displayName){
                    displayName = APP_Storage.getValue(network.authorization.contactStorageKeys.displayName,displayName);
                }
            }
            var self = this;
            var comment = {
                "body": this.get('text'),
                ownerComment : true,
                //--
                "commentId": new Date().getTime(),
                "creationDate": new Date().getTime(),
                "postedBy": {
                    "contactId": '',
                    "displayName": displayName,
                    "identity": {
                        "externalNetworkId": externalNetwork,
                        "identifier": identifier
                    }
                },
                "externalIdentifier": new Date().getTime(),
                "rating": {
                    "numRatings": 0
                },
                ownerVote:0,
                "replies": []
            };
            if(!this.get('replies')){
                this.set('replies' , []);
            }
            this.send('sendComment',{
                parentId:this.get('externalIdentifier'),
                body:this.get('text')
            },function(error){
                if(!error){
                    self.set('text','');
                    self.set('reply',false);
                    self.get('replies').pushObject(comment);
                    self.notifyPropertyChange('replies');
                    self.set('expanded',true);
                }
            });
        },
        replyComment : function(){
            if(this.get('reply')){
                if(this.get('text') && this.get('text').length){
                    this.send('addReply');
                }else{
                    this.set('reply',false);
                }
            }else{
                this.set('reply',true)
            }
        },
        replyKeyPress:function(event){
            if (event.keyCode == 27) {
                this.set('text','');
                this.set('reply',false);
            }
        }
    }
});