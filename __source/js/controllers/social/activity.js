/**
 * Created by mahmoud on 29-Sep-14.
 */
App.SocialActivityController = Ember.ObjectController.extend({
    testembed:function(){
        //return this.get('isEmbedVideo') ? null : '<embed type="application/x-shockwave-flash" src="https://secure.assets.tumblr.com/swf/audio_player.swf?audio_file=http://sprocket-cdn.s3.amazonaws.com/2014-11-25+12:37:38++0000&color=FFFFFF" height="27" width="207" quality="best" wmode="opaque"></embed>';
        //return '<embed type="application/x-shockwave-flash" src="https://secure.assets.tumblr.com/swf/audio_player.swf?audio_file=http://sprocket-cdn.s3.amazonaws.com/2014-11-25+12:37:38++0000&color=FFFFFF" height="27" width="207" quality="best" wmode="opaque"></embed>';
        //return '<script type="text/javascript" src="https://d11t9srxhcnjhm.cloudfront.net/jwplayer.js"></script><div id="mediaplayer"></div><script type="text/javascript"> var firstTime = true;   jwplayer("mediaplayer").setup({      file: "http://sprocket-cdn.s3.amazonaws.com/sprocket_1417451149045.mp4",      width: "100%",   aspectratio: "16:9",    autostart: "true",   mute: "true"   });  jwplayer().onTime(function(event) {  if (event.position > 0 && firstTime == true) {    this.pause();    this.setMute(false);    firstTime = false;  } });</script>'
    }.property('refresh','isEmbedVideo'),
    embedBody:function(){
        var body = this.get('body');
        //limit width of iframe
        if(body){
            if(body.indexOf('class="')!=-1){
                body = body.replace('class="','class="external_embed_iframe sprocket_video_frame ');
            }else if(http.indexOf("class='")!=-1){
                body = body.replace("class='","class='external_embed_iframe sprocket_video_frame ");
            }
        }else if(this.get('link')){
            body = '<iframe allowfullscreen frameborder="0" scrolling="no" style="min-height:250px" class="external_embed_iframe sprocket_video_frame embedly-embed" src="'+this.get('link')+'"></iframe>';
        }
        return body;
    }.property('body','link','isEmbed','refresh'),
    isEmbed:function(){
        return (this.get('type') == 'embededhtml');//will be used in reddit to display iframe for album/video
    }.property('type','refresh'),
    isPhoto: function () {
        //to allow display photo in all case of each reddit post we have to set is photo : true in case type not equal video
        if((this.get('externalNetworkId') == this.get('constant').redditId) && (this.get('isStatus') || this.get('isLink'))){
            return true;
        }
        return (this.get('type') == 'photo')
    }.property('type','externalNetworkId','refresh'),
    isAudio: function () {
        //return true;
        return (this.get('type') == 'audio'); //swf returned by fb graph api in case share video from youtube
    }.property('type','refresh'),
    isVideo: function () {
        //return true;
        return (this.get('type') == 'video' || this.get('type') == 'swf'); //swf returned by fb graph api in case share video from youtube
    }.property('type','refresh'),
    isLink: function () {
        return (this.get('type') == 'link')
    }.property('type','refresh'),
    isStatus: function () {
        return (this.get('type') == 'status' || this.get('type') == 'post')
    }.property('type','refresh'),
    isMedia: function () {
        return (this.get('isPhoto') || this.get('isVideo') || this.get('isLink') || this.get('isEmbed'));
    }.property('isPhoto', 'isVideo', 'isLink','isEmbed','refresh'),
    isYoutube: function () {
        return this.get('video.url') && this.get('video.url').indexOf('youtube.com') != -1;
    }.property('video','refresh'),
    isEmbedVideo:function(){
        //return true;
        return (!_.isUndefined(this.get('video.embedCode')) && this.get('video.embedCode') != null && this.get('video.embedCode').length != 0);
    }.property('video','refresh'),
    isIFrameVideo: function () {
        return (this.get('video.url') && this.get('video.url').indexOf('.mp4') == -1);//not mp4 (fb video)
    }.property('video','refresh'),
    //our site will be https so all iframe must be support https so we support sites with https allowed only
    isSecureIFrameVideo: function () {
        //www.metacafe.com not https and redirect page to open video , www.veoh.com not https
        return this.get('video.url') && (this.get('video.url').indexOf('youtube') != -1 || this.get('video.url').indexOf('vimeo') != -1);
    }.property('video','refresh'),
    videoUrl: function () {
        var url = this.get('video.url');

        if (this.get('isYoutube')) {
            url = url.replace('youtube.com/v/', 'youtube.com/embed/');//for mobile compatibility
        }

        if (this.get('isSecureIFrameVideo')) {
            if (this.get('video.url').indexOf('https') == -1) {
                url = url.replace('http', 'https') //our site will be https so all iframe must be support https
            }
            url = url.replace('autoplay=1', 'autoplay=0')//for vimeo too
        }
        return url;
    }.property('video','isYoutube','isSecureIFrameVideo','refresh'),
    videoEmbedCode : function () {
        if(this.get('video.embedCode')) {
            return this.get('video.embedCode').replace('<video','<video controls ');
        }
        return this.get('video.embedCode');
    }.property('video','refresh'),
    status: function () {
        //if (this.get('isStatus') && this.get('body') && this.get('body').length && this.get('externalNetworkId') != this.get('constant').redditId) {return this.get('body')} else {return this.get('title');}
        return this.get('title');
    }.property('isStatus','body','title','refresh','externalNetworkId'),
    caption: function () {
        //if (this.get('isStatus') && this.get('externalNetworkId') != this.get('constant').redditId) {return '';} else {return this.get('body');}
        if(this.get('body')) {
            var href = new RegExp('<a', 'gi');
            var body = this.get('body');
            body = body.replace(href, '<a target="_blank" ');
            if(this.get('externalNetworkId') == this.get('constant').redditId){
                href = new RegExp('href="/', 'gi');
                body = body.replace(href,'href="http://www.reddit.com/');
                href = new RegExp('href=\'/', 'gi');
                body = body.replace(href,'href=\'http://www.reddit.com/');
            }
            return body;
        }
        return this.get('body');
    }.property('isStatus','body','refresh','externalNetworkId'),
    postLink: function () {
        if (this.get('type') == 'link') {//this.get('link')){
            return ((this.get('caption') != '' && typeof(this.get('caption')) != "undefined") ? '<br>' : '') + '<a target="_blank" href="' + this.get('link') + '">' + this.get('link') + '</a>'
        } else {
            return '';
        }
    }.property('type','caption','link','refresh'),
    activityVisibility: function () {
        if (!(this.get('photo') || this.get('video') || this.get('link') || this.get('title') || this.get('body'))) {//empty post
            //return 'display:none';
        }
        return '';
    }.property('photo', 'video', 'link', 'title', 'body','refresh'),
    //
    validInterests : function(){
        /*var network = App.CONSTANT.network[this.get('externalNetworkId')];
        if(network && network.dataStorageKeys && network.dataStorageKeys.externalInterests){
            var interests = this.get('interests');
            var validInterests = [];
            var storedIds = [];
            var stored = App.YelpService.getInterestsOneLevel(network.dataStorageKeys.externalInterests,storedIds);
            _.each(interests,function(interest){
                if(storedIds.indexOf(interest.id) != -1){
                    validInterests.push(interest);
                }
            });
        }
        return [];*/
        return this.get('interests') ? this.get('interests') : [];
    }.property('externalNetworkId','interests','refresh'),
    //
    commentsAllowed:function(){
        return this.get('externalNetworkId') == this.get('constant').redditId;
    }.property('externalNetworkId','refresh'),
    commentsExpanded : function(){
        var comments = this.get('comments');
        _.each(comments,function(comment){
            comment.expanded = true;
        });
        return comments;
    }.property('comments','refresh'),
    //
    votesAllowed:function(){
        return this.get('externalNetworkId') == this.get('constant').redditId;
    }.property('externalNetworkId','refresh'),
    //
    voteUpSelected:function(){
        return this.get('ownerVote')==1;
    }.property('ownerVote','refresh'),
    voteDownSelected:function(){
        return this.get('ownerVote')==-1;
    }.property('ownerVote','refresh'),
    kRate : function(){
        var rate = this.get('rating.numRatings');
        if(_.isUndefined(rate)){
            this.set('rating',{});
            this.set('rating.numRatings',0);
            rate = 0;
        }
        return  rate < 10000 ? rate : ((rate/1000).toFixed(1).replace('.0',''))+'K' ;
    }.property('rating.numRatings','refresh'),
    getActivePostService:function(){
        var postService = this.get('activePostService');
        if(!postService) {
            postService = App.PostActivity.create({});
            this.set('activePostService', postService);
        }
        return this.get('activePostService');
    },
    actions:{
        addComment : function(){
            var identifier = "" + (new Date().getTime());
            var displayName = "You";
            var network = App.CONSTANT.network[this.get('externalNetworkId')];
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
                        "externalNetworkId": self.get('externalNetworkId'),
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
            this.send('sendComment',{
                parentId:this.get('externalIdentifier'),
                body:this.get('text')
            },function(error){
                if(!error){
                    self.set('text','');
                    self.get('comments').pushObject(comment);
                    self.notifyPropertyChange('comments');
                }
            });
        },
        votePost : function(direction,select) {
            var ownerVote = !select ? 0 : direction;//if user undo his vote the vote will be 0 unless it click other direction
            var voteElement = direction == -1 ? 'voteDownSelected' : 'voteUpSelected';
            var otherElement = direction == 1 ? 'voteDownSelected' : 'voteUpSelected';
            var newRate = 0;
            var self = this;
            if (select) {
                if (this.get(otherElement)) {
                    newRate = (this.get('rating.numRatings') + (2 * direction));//other was selected so it's consider 2 votes not one (1 undo & other reverse)
                } else {
                    newRate = (this.get('rating.numRatings') + (direction));//it's increment/decrement to/from zero
                }
            } else {
                newRate = (this.get('rating.numRatings') + (-1 * direction));//reverse selected direction to zero
            }

            this.send('sendVote', {
                parentId: this.get('externalIdentifier'),
                direction: ownerVote
            }, function (error) {
                if (!error) {
                    self.set('rating.numRatings', newRate);
                    self.set('ownerVote', ownerVote);
                    try{
                        self.send('voteCallback',{
                            element : self,
                            numRatings : newRate,
                            ownerVote : ownerVote
                        })
                    }catch(e){

                    }
                }
            });
        },
        sendVote:function(data,callback){
            var self = this;
            ShowLoadingImage();
            this.getActivePostService().vote(this.get('externalNetworkId'),data).
                then(function (data, textStatus, jqXHR) {
                }, function (jqXHR, textStatus, errorThrown) {
                    HideLoadingImage();
                    if(jqXHR.status != 200){
                        SetErrorMessage(jqXHR,self.get('externalNetworkId'))
                    }
                    if(callback){
                        callback(jqXHR.status != 200);
                    }
                }
            );
        },
        sendComment:function(data,callback){
            ShowLoadingImage();
            var self = this;
            this.getActivePostService().comment(this.get('externalNetworkId'),data).
                then(function (data, textStatus, jqXHR) {
                }, function (jqXHR, textStatus, errorThrown) {
                    HideLoadingImage();
                    if(jqXHR.status != 200){
                        SetErrorMessage(jqXHR,self.get('externalNetworkId'))
                    }
                    if(callback){
                        callback(jqXHR.status != 200);
                    }
                }
            );
        }
    }
});
