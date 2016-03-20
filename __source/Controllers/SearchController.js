/*App.SearchView = Ember.View.extend({
    getTrakcer:function(){
        alert(Ember.$('input[vid=tracker]').last().val())
    },
    getDataType:function(){
        this.get('dataType')
    },
    isDesired :Ember.isEqual(dataType, 'desiredValue'),
    isVideoItem: function() {
         alert(this.get('dataType'))
         return this.get('dataType') === 'John';
    }.property('dataType')
});*/
/*Ember.Handlebars.registerBoundHelper('ifeq', function(val1,val2) {
    alert(val1)
    alert(val2)
    //alert(options)
    return true;//(this.get(val1) == val2);// ? options.fn(this) : '';
});*/
/*App.SearchController = Ember.ObjectController.extend({
    //dataType:"Videos",
    //dataTypeValue:function(){alert(this.get('dataType'))}.property('dataType'),

    isVideo: Em.isEqual(Ember.$('input[vid=tracker]').last().val(), 'Video')
    ,
    isCheckbox: Em.isEqual('dataTypeValue', 'checkbox')
    ,setDataType : function(va){
        //alert(unbound va);

    },
    checkD:function(val){
        //Ember.$('inpit')
        //alert(this.get(''))
    }
    isVideoItem: function() {
        alert(this.get('dataType'))
        return this.get('dataType') === 'John';
    }.property('dataType')
});*/
var ResultCategories = {};
var searchResult = {};
var lastDisplayedType='';
var lastDisplayedID=0;

App.SearchView = Ember.View.extend({
    didInsertElement: function() {
        //alert(Em.$('.search_wrapper_root').html())
        if(typeof(ResultCategories.Video)=="undefined" || ResultCategories.Video.length==0){
            Em.$('#search_video_results').fadeOut(0);
            Em.$('#search_video_no_result').fadeIn(0);
        }
        if(typeof(ResultCategories.Message)=="undefined" || ResultCategories.Message.length==0){
            Em.$('#search_fb_msg_results').fadeOut(0);
            Em.$('#search_fb_msg_no_result').fadeIn(0)
        }
        if(typeof(ResultCategories.Activity)=="undefined" || ResultCategories.Activity.length==0){
            Em.$('#search_fb_posts_results').fadeOut(0);
            Em.$('#search_fb_posts_no_result').fadeIn(0)
        }

    }
});
App.SearchController = Ember.ObjectController.extend({
    displayData:function(dataType,id){
        //alert(ResultCategories[dataType][id].rank)
        if(lastDisplayedID != id || lastDisplayedType != dataType){

            lastDisplayedID = id;
            lastDisplayedType = dataType;

            Ember.$('#searchContent').children(".searchInnerContent").fadeOut(0);
            Ember.$('#searchVideoDesc').fadeOut(0);

            if(dataType=='Video'){
                //var ids=['t0WbNh_SFEg','qK2WbFRja80','z1RZ8NFVFqA']
                Ember.$('#searchName').html(ResultCategories[dataType][id].data.title);
                Ember.$('#searchTitle').html('');

                Ember.$('#searchVideoDesc').fadeIn(0)
                Ember.$('#searchVideoDesc').html(typeof(ResultCategories[dataType][id].data.description)=="undefined"?"":replaceNewLines(ResultCategories[dataType][id].data.description));
                if(Modernizr.touch){
                    Ember.$('#searchVideoPlayerImage').attr('src',ResultCategories[dataType][id].data.thumb.url);
                    Ember.$('#searchVideoPlayerImage').fadeIn(0);
                    Ember.$('#searchVideoLink').attr('href','https://www.youtube.com/embed/'+ResultCategories[dataType][id].data.itemKey);
                    Ember.$('#searchVideoLink').fadeIn(0);
                }
                else{
                    if(typeof(Em.$('#searchVideoPlayer').attr('id'))=="undefined"){
                        var iFrame=Em.$('<iframe />')

                        iFrame.attr('id','searchVideoPlayer')
                        iFrame.attr('class','searchInnerContent')
                        iFrame.attr('width','478')
                        iFrame.attr('height','269')
                        iFrame.attr('frameborder','0')

                        Em.$('#searchTitle').after(iFrame);
                    }

                    Ember.$('#searchVideoPlayer').attr('src','https://www.youtube.com/embed/'+ResultCategories[dataType][id].data.itemKey);
                    Ember.$('#searchVideoPlayer').fadeIn('slow');
                }
            }else if(dataType=='Message'){
                Ember.$('#searchName').html(ResultCategories[dataType][id].data.sender.displayName);
                Ember.$('#searchTitle').html(typeof(ResultCategories[dataType][id].data.subject)=="undefined"?"":replaceNewLines(ResultCategories[dataType][id].data.subject));

                Ember.$('#searchFbMsgContent').html(typeof(ResultCategories[dataType][id].data.body)=="undefined"?"- -":replaceNewLines(ResultCategories[dataType][id].data.body));
                Ember.$('#searchFbMsgContent').fadeIn('slow');
            }else if(dataType=='Activity'){
                Ember.$('#searchName').html(ResultCategories[dataType][id].data.postedBy.displayName);
                Ember.$('#searchTitle').html(typeof(ResultCategories[dataType][id].data.title)=="undefined"?"":replaceNewLines(ResultCategories[dataType][id].data.title));

                Ember.$('#searchFbPostContent').html(typeof(ResultCategories[dataType][id].data.body)=="undefined"?"- -":replaceNewLines(ResultCategories[dataType][id].data.body));
                Ember.$('#searchFbPostContent').fadeIn('slow');
            }

            Ember.$('#searchTime').html(getPostDateString(ResultCategories[dataType][id].data.date));
            Ember.$('#searchContent').css('borderWidth','1px');
            Ember.$('#searchTitle').fadeIn(0);
        }
    }
});
App.SearchRoute =  Ember.Route.extend({
    actions: {
        error: function(reason) {
            //
            SetErrorMessage(reason,this.get('router.url'));
            //this.transitionTo("dashboard");
            //return true;
        }
    },
    model:function() {
        if(getParameterByName("q")!=""){
            /*return Ember.RSVP.hash({
             video: Ember.$.getJSON('http://localhost/sprocket-api-json/searchre')
            })*/
            return Ember.RSVP.Promise.all([
                    //Ember.$.getJSON('http://localhost/sprocket-api-json/searchre',function(data){
                    Ember.$.getJSON(API_Base_Url+'documents/users/'+getCookie(APP_Cookies.userID)+'/indexed?q='+encodeURIComponent(getParameterByName("q")),function(data){
                        searchResult=data.documents;
                        ResultCategories={};
                        lastDisplayedID=0;
                        lastDisplayedType='';
                        var elem={};
                        for(var i=0;i<searchResult.length;i++){
                            elem=searchResult[i];
                            if(typeof(ResultCategories[elem.dataType])=="undefined"){
                                ResultCategories[elem.dataType]=[];
                            }
                            ResultCategories[elem.dataType].push(elem);
                        }
                    })
                ]).then(function(values){
                    return {
                        searchvideos : typeof(ResultCategories.Video)=="undefined"?[]:ResultCategories.Video,
                        searchFBMsgs : typeof(ResultCategories.Message)=="undefined"?[]:ResultCategories.Message,
                        searchFBPosts : typeof(ResultCategories.Activity)=="undefined"?[]:ResultCategories.Activity
                    };
                });
        }else{

            return Ember.RSVP.hash({
                searchvideo:[],
                searchFBMsgs : [],
                searchFBPosts : []
            });
        }
    }
});