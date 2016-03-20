/**
 * Created by mahmoud on 7/13/14.
 */
App.FacebookPostController= Ember.ObjectController.extend({
    postImg:function(){
        if(this.get('img')){
            return this.get('img');
        }else{
            return this.get('img');
        }
    }.property('img'),
    isPhoto:function(){
        return (this.get('type')=='photo')
    }.property('type'),
    isVideo:function(){
        return (this.get('type')=='video'|| this.get('type')=='swf') //swf returned by fb graph api in case share video from youtube
    }.property('type'),
    isLink:function(){
        return (this.get('type')=='link')
    }.property('type'),
    isStatus:function(){
        return (this.get('type')=='status' || this.get('type')=='post')
    }.property('type'),
    isMedia:function(){
        return (this.get('isPhoto') || this.get('isVideo') || this.get('isLink'));
    }.property('isPhoto','isVideo','isLink'),
    isYoutube:function(){
        return this.get('video.url').indexOf('youtube.com')!=-1;
    }.property(),
    isIFrameVideo:function(){
        return this.get('video.url').indexOf('.mp4')==-1;//not mp4 (fb video)
    }.property(),
    //our site will be https so all iframe must be support https so we support sites with https allowed only
    isSecureIFrameVideo:function(){
        //www.metacafe.com not https and redirect page to open video , www.veoh.com not https
        return this.get('video.url').indexOf('youtube')!=-1 || this.get('video.url').indexOf('vimeo')!=-1;
    }.property(),
    videoUrl:function(){
        var url = this.get('video.url');

        if(this.get('isYoutube')){
            url = url.replace('youtube.com/v/','youtube.com/embed/')//for mobile compatibility
        }

        if(this.get('isSecureIFrameVideo')){
            if(this.get('video.url').indexOf('https')==-1){
                url = url.replace('http','https') //our site will be https so all iframe must be support https
            }
            url = url.replace('&autoplay=1','&autoplay=0')//for vimeo too
            url = url.replace('autoplay=1','autoplay=0')//for vimeo too
        }
        return url;
    }.property(),
    status:function(){
        if(this.get('isStatus') && this.get('body') && this.get('body').length){
            return this.get('body')
        }else{
            return this.get('title');
        }
    }.property(),
    caption:function(){
        if(this.get('isStatus')){
            return '';
        }else{
            return this.get('body');
        }
    }.property(),
    postLink:function(){
        if(this.get('type')=='link'){//this.get('link')){
            return ((this.get('caption')!='' && typeof(this.get('caption'))!="undefined") ?  '<br>':'')+'<a target="_blank" href="'+this.get('link')+'">'+this.get('link')+'</a>'
        }else{
            return '';
        }
    }.property(),
    activityVisibility:function(){
        if(!(this.get('photo') || this.get('video') || this.get('link') || this.get('title') || this.get('body'))){//empty post
            return 'display:none';
        }
        return '';
    }.property('photo','video','link','title','body'),
    postId:function(){
        //return '10203720443191832_10204216164184547';
        return this.get('externalIdentifier');
    }.property(),
    userComment:"",
    commentInProgress:false,
    postComments:function(){
        var _self=this;
        /*FB.api(
            {
                method: 'fql.multiquery',
                access_token: APP_Storage.getValue(APP_Storage.facebookTokenKey()),
                queries: {
                    //"10203720443191832_10204220773339773"
                    postComments : 'SELECT time,text,fromid FROM comment WHERE post_id = "' + this.get('postId') + '" order by time desc limit 25',
                    commentOwners : 'select uid,name,pic_square FROM user WHERE uid in (select fromid from #postComments)'
                }
            },
            function(data) {
                console.log(data);
                if(!data.error_code){
                    var postComments =  (data[0].name=="postComments") ? data[0].fql_result_set : data[1].fql_result_set;
                    var commentOwners =  (data[0].name=="commentOwners") ? data[0].fql_result_set : data[1].fql_result_set;
                    //console.log(postComments)
                    //console.log(commentOwners)
                    var i=0;
                    var owners=new Array()
                    for(i=0 ; i < commentOwners.length ; i++){
                        owners[commentOwners[i].uid]=[commentOwners[i].name,commentOwners[i].pic_square];
                    }
                    var comments=new Array()
                    for(i=(postComments.length-1) ; i >= 0 ; i--){
                        if(owners[postComments[i].fromid]){
                            comments.push({
                                created_time:(parseInt(postComments[i].time)*1000),
                                message:postComments[i].text,
                                from:{name: owners[postComments[i].fromid][0],pic:owners[postComments[i].fromid][1] }
                            })
                        }else{
                            console.log(postComments[i].fromid + ' not exist')
                        }

                    }
                    _self.set('postComments',comments);
                }
            }
        );*/
        /*FB.api(
            "/"+this.get('postId')+"/comments",'GET',
            {
                access_token:APP_Storage.getValue(APP_Storage.facebookTokenKey()),
                summary : 1
            },
            function (response) {
                console.log(response)
                if(response.data){
                    _self.set('postComments',response.data)
                }
            }
        );*/
        return [];
    }.property(),
    likeTitle:"Like",
    likeInProgress:false,
    likeCount:function(){
        var _self=this;
        /*FB.api(
            "/"+this.get('postId')+"/likes",'GET',
            {
                access_token:APP_Storage.getValue(APP_Storage.facebookTokenKey()),
                summary : 1
            },
            function (response) {
                console.log(response)

                if(response.summary){
                    _self.set('likeCount',response.summary.total_count)
                }
            }
        );
        console.log('++'+this.get('postId')+'++')
        FB.api(
            {
                method: 'fql.multiquery',
                access_token: APP_Storage.getValue(APP_Storage.facebookTokenKey()),
                queries: {
                    //"10203720443191832_10204220773339773"
                    postLike: 'SELECT user_id FROM like WHERE post_id = "' + this.get('postId') + '" and user_id="'+APP_Storage.getValue(APP_Storage.facebookUserID())+'"'
                }
            },
            function(data) {
                console.log(data);
                if(!data.error_code){
                    if(data.length>0 && data[0].fql_result_set.length>0 && data[0].fql_result_set[0].user_id==APP_Storage.getValue(APP_Storage.facebookUserID())){
                        _self.reverseLike()
                    }
                }
            }
        );*/
        return "";
    }.property(),
    reverseLike:function(){
        if(this.get('likeTitle')=='Unlike'){
            this.set('likeTitle','Like')
        }else{
            this.set('likeTitle','Unlike')
        }
    },
    actions:{
        //FB.api('/10203720443191832_10204216164184547/likes?summary=1&access_token='+(localStorage._facebook_token_3),function(r){console.log(r)})
        //FB.api('/10203720443191832_10204216164184547/comments?summary=1&access_token='+(localStorage._facebook_token_3),function(r){console.log(r)})
        CommentOnPost:function(parent){
            //indexed search not return post id
            if(!this.get('postId')){
                Em.$('.fb_post_error.commentinvalid').fadeIn(0)
                this.set('userComment','')
                return;
            }
            //commentInProgress
            if(this.get('commentInProgress') || this.get('userComment')==''){
                return;
            }
            Em.$('.fb_post_error.postpermission').fadeOut(0)
            ShowLoadingImage();
            var _self=this;

            _self.set('commentInProgress',true)

            FB.api(
                "/"+this.get('postId')+"/comments",
                "POST",
                {
                    access_token:APP_Storage.getValue(APP_Storage.facebookTokenKey()),//+(parent?'': "xx")("xx"),
                    message:_self.get('userComment')
                },
                function (response) {
                    console.log(response)

                    var error=response.error;

                    _self.set('commentInProgress',false)

                    //fb return temp error although the comment send on post so temp error are ignored here
                    if(APP_Storage.getValue(APP_Storage.facebookTokenKey())==null || (error && !isInArray(error.code,Facebook_Error_Code.Temporary) && error.code!=100 && error.code!=803 && (isInArray(error.code,Facebook_Error_Code.TokenExpire) || error.type=="OAuthException"))){
                        HideLoadingImage();//as use item controller after destroy cause error so we need it here
                        Em.$('.fb_post_error.postpermission span').off('click');
                        Em.$('.fb_post_error.postpermission span').on('click',function(){
                            Em.$('.fb_post_error.postpermission').fadeOut(0)//so user feel new error if happens again
                            LoginToFacebook(function(){
                                //var fbPostController = App.__container__.lookup("controller:FacebookPost");//this way return usercomment empty
                                _self.send('CommentOnPost','in')
                            },{},Facebook_Scope_Read+','+Facebook_Scope_Publish)
                        });
                        Em.$('.fb_post_error.postpermission').fadeIn(0)
                    }else{
                        if(error && (error.code==100 || error.code==803)){
                            HideLoadingImage();//as use item controller after destroy cause error so we need it here
                            Em.$('.fb_post_error.commentinvalid').fadeIn(0)
                            _self.set('userComment','')
                            return;
                        }
                        GetFacebookUserName(function(name){
                            GetFacebookUserPic(function(pic){
                                //alert(name)
                                //alert(pic)
                                HideLoadingImage();//as use item controller after destroy cause error so we need it here
                                _self.get('postComments').pushObject({
                                    created_time:new Date().getTime(),
                                    message:_self.get('userComment'),
                                    from:{name:name , pic:pic }
                                })
                                _self.set('userComment','')
                            })
                        })

                    }
                }
            );
        },
        LikePost:function(parent){
            //indexed search not return post id
            if(!this.get('postId')){
                Em.$('.fb_post_error.likeinvalid').fadeIn(0)
                //_self.reverseLike()
                return;
            }
            if(this.get('likeInProgress')){
                return;
            }
            Em.$('.fb_post_error.likepermission').fadeOut(0)
            ShowLoadingImage();
            var _self=this;

            _self.set('likeInProgress',true)
            _self.reverseLike()
            console.log(this.get('type'))
            console.log(this.get('postId'))
            FB.api(
                "/"+this.get('postId')+"/likes",
                (_self.get('likeTitle')=='Unlike' ? "POST" : "DELETE"),//because this check after revers call
                {
                    access_token:APP_Storage.getValue(APP_Storage.facebookTokenKey())//+(parent?'': "xx")
                },
                function (response) {
                    console.log(response)

                    var error=response.error;

                    HideLoadingImage();//as use item controller after destroy cause error so we need it here
                    _self.set('likeInProgress',false)

                    if(APP_Storage.getValue(APP_Storage.facebookTokenKey())==null || (error && !isInArray(error.code,Facebook_Error_Code.Temporary) && error.code!=100 && error.code!=803 && (isInArray(error.code,Facebook_Error_Code.TokenExpire) || error.type=="OAuthException"))){
                        Em.$('.fb_post_error.likepermission span').off('click');
                        Em.$('.fb_post_error.likepermission span').on('click',function(){
                            Em.$('.fb_post_error.likepermission').fadeOut(0)//so user feel new error if happens again
                            LoginToFacebook(function(){
                                //var fbPostController = App.__container__.lookup("controller:FacebookPost");//this way return usercomment empty
                                _self.send('LikePost','in')
                            },{},Facebook_Scope_Read+','+Facebook_Scope_Publish)
                        });
                        Em.$('.fb_post_error.likepermission').fadeIn(0)
                        _self.reverseLike()
                    }else{
                        if(error && (error.code==100 || error.code==803)){
                            Em.$('.fb_post_error.likeinvalid').fadeIn(0)
                            _self.reverseLike()
                            return;
                        }
                        if(_self.get('likeTitle')=='Unlike'){
                            _self.set('likeCount',_self.get('likeCount')==""?1:(_self.get('likeCount')+1))
                        }else{
                            _self.set('likeCount',_self.get('likeCount')==""?0:(_self.get('likeCount')-1))
                        }
                        //_self.reverseLike()
                    }
                }
            );
        }
    }
});