App.RedditController = Ember.ObjectController.extend({
    // vars
    queryParams: ['state','code'],
    state:null,
    code: null,

    selectedSubreddits: null,
    selectedType:'link',//first tab
    lastDisplayedModel: null,
    selectedActivity: null,
    entityModelMap: {
        activities: 'activities'
    },
    isModelUpdated: {
        activities: false
    },
    scrollPosition: {
        activities: 0
    },
    getPostService:function(){
        var postService = this.get('postService');
        if(!postService) {
            postService = App.PostActivity.create({});
            postService.setConfiguration({
                //sizeLimit : 50,
                //sizeUnit : 'MB',
                supportedTypes: ['image', 'video', 'audio'],
                typesCount: {
                    image: 1,
                    video: 1,
                    audio: 1
                }
                //,maxCount : 3
                //,uploadUrl:'simpleapi/upload.php'
                //,typesUploadUrl
            });
            this.set('postService', postService);
        }
        return this.get('postService');
    },
    //observers
    modelLoaded: function () {
        if (APP_Storage.getValue(APP_Storage.redditUserID()) != null) {
            var controller = this;
            controller.set('lastDisplayedModel', null);
            App.PollingManager.startNetworkSync(
                controller.get('constant').redditId,
                function (entityName, entitySyncOptions, isStored, newData, updatedIds, data, textStatus, jqXHR) {
                    console.log('*** Reddit *** ', entitySyncOptions, isStored, newData, updatedIds);
                    if(entityName=='externalInterests'){
                        if(newData[0].length || (updatedIds.length && updatedIds[0].length)){
                            controller.set('subreddits', App.YelpService.getInterestsList(APP_Storage.redditInterests));
                        }
                    }else if (newData[0].length || (updatedIds.length && updatedIds[0].length)) {
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
    activitiesLoaded: function () {
        var controller = this;
        Ember.run.scheduleOnce('afterRender', this, function () {
            ConvertTextElementToHtml('.social_post_html');
            $("#social_posts_results").mCustomScrollbar({
                callbacks: {
                    onScroll: function () {
                        controller.set('scrollPosition.activities', this.mcs.top);
                        controller.set('isModelUpdated.activities', false);
                    }
                }
            });
        });
    }.observes('activities'),
    subredditsLoaded:function(){
        //alert('load ' + this.get('filteredInterests').length)
        Ember.run.scheduleOnce('afterRender', this, function() {
            var element = $('.subreddits ic-autocomplete-option')[0];
            var text = $(element).text();
            //we have to hide empty text in 2 case loading / normal because reddit interest not optional and we need it to be hidden to reset list selection
            if(text.trim()==''){
                $(element).css({'display': 'none'})
            }
        })
    }.observes('subreddits'),
    selectedActivityLoaded: function () {
        var controller = this;
        Ember.run.scheduleOnce('afterRender', this, function () {
            ConvertTextElementToHtml('.social_post_details_html');
            //
            if(controller.get('selectedActivity.video.embedCode') || controller.get('selectedActivity.audio.embedCode')) {
                setEmbedIframeScript('embedCodeFrame','embedCodeFrame',$('#embedCode').text());
            }
            //
            setTimeout(function () {
                $(".columnTwo").mCustomScrollbar("scrollTo", "top")
            }, 150)
        });
    }.observes('selectedActivity'),
    actions: {
        setSelectedType : function(type){
            this.set('selectedType',type);
        },
        getCaptcha:function(){
            var self = this;

            //if old captcha is displayed show loading image instead
            if(self.set('captchaImage')){
                self.set('captchaImage','assets/images/loading.gif');
            }
            self.set('captchaReply','');
            self.set('captchaId','');
            self.set('captchaAlt','');

            self.getPostService().getCaptchaImage(this.get('constant').redditId,
                function(img,id,xhr){
                    self.set('captchaImage',img);
                    self.set('captchaId',id);
                    self.set('captchaRequired',true);
                    //
                    HideLoadingImage();
                },function(xhr){
                    self.set('captchaImage','');
                    self.set('captchaAlt','Loading Error');
                    self.set('captchaRequired',true);//to reload it when click share next time instead send request for server
                    //
                    HideLoadingImage();
                    //when request made to get binary data .. responseText is not returned so can't use the default error handler
                    SetErrorMessage(xhr.statusText?xhr.statusText:"Error in loading Captcha",self.get('constant').redditId);
                    //SetErrorMessage(xhr,self.get('constant').redditId);
                }
            )
        },
        sharePost : function(){
            if(!this.get('selectedSubreddits') || this.get('selectedSubreddits')<0){
                App.growl.info('Please select a subreddit to share your post');
                return;
            }
            if(this.get('captchaRequired')){
                if(!this.get('captchaImage')){//image not loaded for any errors
                    this.send('getCaptcha');
                    return;
                }else if(!this.get('captchaId')){//if the id isn't set so image loading is in progress
                    App.growl.info('Please enter valid code');
                    return;
                }else if(!this.get('captchaReply')){//user not type code
                    App.growl.info('Please enter the code shown to share your post');
                    return;
                }
            }

            var postService = this.getPostService();
            var self = this;
            if(this.get('selectedType')) {
                var data = {};
                if (this.get('selectedType') == 'text') {
                    var title = this.get('textTitle');
                    var body = this.get('textComment');
                    if(!body || !title){
                        App.growl.info('Please provide Title and Comment to be able to Share your Text Post');
                        return;//body is required in text activity
                    }
                    data = {
                        'body' : body,
                        'title' : title,
                        'activityTypeId' : 3
                    };
                }else if(this.get('selectedType') == 'link'){
                    var title = this.get('linkTitle');
                    var link = this.get('linkUrl');
                    if(link && isValidUrl(link) && title){
                        data = {
                            'link' : link,
                            'title' : title,
                            'activityTypeId' : 2
                        };
                    }else{
                        App.growl.info('Please provide Valid Url and Title to be able to Share your Post');
                        return;//body is required in text activity
                    }

                }
                data ['pageId'] =  this.get('selectedSubreddits');
                if(this.get('captchaRequired')){
                    $.extend(data , {
                        captcha : self.get('captchaReply'),
                        captchaIden : self.get('captchaId')
                    });
                }
                ShowLoadingImage();
                postService.post(this.get('constant').redditId, data).
                    then(function (data, textStatus, jqXHR) {
                    }, function (jqXHR, textStatus, errorThrown) {
                        //captcha should be shown only in case of specific error and not with every post
                        if(!self.get('captchaRequired')){
                            self.send('getCaptcha');
                        }else{
                            if (jqXHR.status == 200) {
                                HideLoadingImage();
                                self.send('resetShareData');
                                //
                                $('.postBoxContainer').addClass('success_border_color');
                                setTimeout(function () {
                                    $('.postBoxContainer').removeClass('success_border_color');
                                }, 1000);
                                //
                            } else {
                                if(self.get('captchaRequired')){//change the old captcha
                                    self.send('getCaptcha');
                                }else{
                                    HideLoadingImage();
                                }
                                SetErrorMessage(jqXHR, self.get('constant').redditId)
                            }
                        }
                    }
                );
            }
        },
        cancelPost : function(){
            this.send('resetShareData');
        },
        resetShareData:function(){
            //captcha data
            this.set('captchaImage','');
            this.set('captchaReply','');
            this.set('captchaId','');
            this.set('captchaAlt','');
            this.set('captchaRequired',false);
            //link data
            this.set('linkTitle','');
            this.set('linkUrl','');
            //text data
            this.set('textTitle','');
            this.set('textComment','');
            //
            var interests = App.YelpService.getInterestsList(APP_Storage.redditInterests);
            this.set('subreddits',interests);
            //--
            //fix problem of rest auto complete when user already write keyword for filter list on
            if(this.get('subredditAutoCompleteArgs')){
                try {
                    this.get('subredditAutoCompleteArgs').set('selected', null);
                }catch(e){
                    console.log(e);
                }
            }
            //
            this.set('selectedSubreddits',null);//-1);
            var self = this;
            setTimeout(function(){
                self.set('selectedSubreddits',-1);
            },1);
            //--
        },
        displayData: function (type, model, id) {
            var self = this;
            var copy = $.extend(true, {}, model); // we have to take copy to prevent model from keep refresh value to be displayed again not only one time
            if (this.get('selectedActivity')) {
                this.set('selectedActivity.refresh', true);//to reset the old value and recompute variable with new values
            }
            if (type == 'activity') {
                this.set('isModelUpdated.activities', false);
                copy.detailsParentId = id;
                this.set('selectedActivity', copy);
                this.getPostService().engageActivity(model).
                    then(function (data, textStatus, jqXHR) {
                    }, function (jqXHR, textStatus, errorThrown) {
                        if(jqXHR.status != 200){
                            SetErrorMessage(jqXHR,self.get('constant').redditId)
                        }
                    }
                );
            }
        },
        voteCallback:function(obj){
            var parentId = obj.element.get('detailsParentId');
            var self = this;
            if(!_.isUndefined(parentId)){//this value is set in (displayData) Action
                //the action fired from details controller
                self.set('activities.'+parentId+'.ownerVote',obj.ownerVote);
                self.set('activities.'+parentId+'.rating.numRatings',obj.numRatings);
            }else if(self.get('selectedActivity') && self.get('selectedActivity.externalIdentifier') == obj.element.get('externalIdentifier')){
                //display object in details is the same one click on parent view
                self.set('selectedActivity.ownerVote',obj.ownerVote)
                self.set('selectedActivity.rating.numRatings',obj.numRatings)
            }
        },
        onFilterSubreddits: function (args,inputValue) {
            //
            this.set('subredditAutoCompleteArgs',args);
            //
            var interests = App.YelpService.getInterestsList(APP_Storage.redditInterests);
            if (interests.length>1 && interests[1].id != -2  && inputValue) {
                interests = interests.slice(1);//remove space element to not show
                inputValue = inputValue.toLowerCase();
                //console.log(interests);
                //console.log(inputValue);
                interests = _.filter(interests, function (interest) {
                    return _.string.startsWith(interest.name.toLowerCase(), inputValue);
                });
                //console.log(interests);

                this.set('subreddits', interests);
            }else{
                this.set('subreddits', interests);
                args.set('selected', null);
            }
        },
        onSelectSubreddits: function (args) {
            //
            this.set('subredditAutoCompleteArgs',args);
            //
            var value = args.value;
            console.log('select subreddit ' + value + ' || '+this.get('autoUpdate'));
            if(value==-2){
                $('.subreddits ic-autocomplete-toggle').click();
                args.set('selected', null);
                var self=this;
                setTimeout(function(){
                    self.set('autoUpdate',true)
                    self.set('selectedSubreddits',-1);
                },1)
            }else if(value == -1 && this.get('autoUpdate')){
                this.set('autoUpdate',false);
                $('.subreddits ic-autocomplete-toggle').click();
            }else if(value == -1){
                this.send('onFilterSubreddits',args)
            }
        }
        /*,
        sendVote:function(data,callback,obj){
            console.log(obj)
            var self = this;
            ShowLoadingImage();
            this.getPostService().vote(this.get('constant').redditId,data).
                then(function (data, textStatus, jqXHR) {
                }, function (jqXHR, textStatus, errorThrown) {
                    HideLoadingImage();
                    if(jqXHR.status != 200){
                        SetErrorMessage(jqXHR,self.get('constant').redditId)
                    }else if(obj){
                        var parentId = obj.element.get('detailsParentId');
                        if(!_.isUndefined(parentId)){//this value is set in (displayData) Action
                            //the action fired from details controller
                            self.set('activities.'+parentId+'.ownerVote',obj.ownerVote);
                            self.set('activities.'+parentId+'.rating.numRatings',obj.numRatings);
                        }else if(self.get('selectedActivity') && self.get('selectedActivity.externalIdentifier') == obj.element.get('externalIdentifier')){
                            //display object in details is the same one click on parent view
                            self.set('selectedActivity.ownerVote',obj.ownerVote)
                            self.set('selectedActivity.rating.numRatings',obj.numRatings)
                        }
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
            this.getPostService().comment(this.get('constant').redditId,data).
                then(function (data, textStatus, jqXHR) {
                }, function (jqXHR, textStatus, errorThrown) {
                    HideLoadingImage();
                    if(jqXHR.status != 200){
                        SetErrorMessage(jqXHR,self.get('constant').redditId)
                    }
                    if(callback){
                        callback(jqXHR.status != 200);
                    }
                }
            );
        }*/
    }
});
