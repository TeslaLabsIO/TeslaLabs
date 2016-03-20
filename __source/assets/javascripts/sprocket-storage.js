/**
 * Created by mahmoud on 6/17/14.
 */
//-------------------------------Apps storage keys and func----------------------------

var APP_Storage_Keys={
    testStorage:"test_ap_storage",

    //-------

    appTypeStorage:"app_type_storag",
    lastUserName:function(){
        return "_last_user_name";
    },
    lastUserId:function(){
        return "_last_user_id";
    },
    //-------
    userLocatorInfo:function(){
        return "_user_locator_info_"+APP_Cookies.getCookie(APP_Cookies.userID);
    },
    userLocationInfo:function(){
      return "_user_location_info_"+APP_Cookies.getCookie(APP_Cookies.userID);
    },
    userNeighbourhoodId : "user_neighbourhood_id",
    userTokenExpired : "user_token_expired",
    //-------
    facebookMessage:"facebook_msg_storage",
    facebookMessageLastModified:"facebook_msg_last_modify",

    facebookPost:"facebook_post_storage",
    facebookPostLastModified:"facebook_post_last_modify",

    facebookLocalPost:"facebook_local_post_storage",
    facebookLocalPostLastModified:"facebook_local_post_last_modify",

    facebookRecommendedPost:"facebook_recommended_post_storage",
    facebookRecommendedPostLastModified:"facebook_recommended_post_last_modify",

    facebookLastSelected:"facebook_last_selected",

    //relative to current user and not deleted until expire from api/client token expire
    facebookTokenKey:function(){
        return "_facebook_token_"+APP_Cookies.getCookie(APP_Cookies.userID)
    },
    facebookUserID:function(){
        return "_facebook_user_id_"+APP_Cookies.getCookie(APP_Cookies.userID)
    },
    facebookUserName:function(){
        return "_facebook_user_name_"+APP_Cookies.getCookie(APP_Cookies.userID)
    },
    facebookUserPic:function(){
        return "_facebook_user_pic_"+APP_Cookies.getCookie(APP_Cookies.userID)
    },

    //-------

    googlePlusMessage : "googl_pls_msg_storage",//avoid any conflict if exist in android
    googlePlusMessageLastModified:"googl_pls_msg_last_modified",

    googlePlusPost : "googl_pls_post_storage",//avoid any conflict if exist in android
    googlePlusPostLastModified:"googl_pls_post_last_modified",

    googleLastSelected : "google_last_selected",

    googleUserID:function(){
        return "_google_user_id_"+APP_Cookies.getCookie(APP_Cookies.userID)
    },
    googleUserName:function(){
        return "_google_user_name_"+APP_Cookies.getCookie(APP_Cookies.userID)
    },
    googleUserEmail:function(){
        return "_google_user_email_"+APP_Cookies.getCookie(APP_Cookies.userID)
    },
    googleUserPic:function(){
        return "_google_user_pic_"+APP_Cookies.getCookie(APP_Cookies.userID)
    },
    //-------

    gMailMessage:"googl_mail_msg_storage",//avoid any conflict if exist in android
    gMailMessageLastModified:"google_mail_last_modified",

    gMailLastSelected:"google_mail_last_selected",

    //-------

    youtubeVideos:"youtu_video_storage",
    youtubeLastModified:"youtu_last_modified",

    youtubeSubscriptionVideo:"youtube_subscription_video_storage",
    //youtubeSubscriptionVideoLastModified:"youtube_subscription_video_last_modified",

    youtubeHistoryVideo:"youtube_history_video_storage",
    //youtubeHistoryVideoLastModified:"youtube_history_video_last_modified",

    youtubeRecommendedVideo:"youtube_recommended_video_storage",
    youtubeRecommendedVideoLastModified:"youtube_recommended_video_last_modified",

    youtubeLastSelected:"youtube_last_selected",

    //-------

    linkedInMessage:"linked_in_msg_storage",
    linkedInMessageLastModified:"linked_in_msg_last_modify",

    linkedInPost:"linked_in_post_storage",
    linkedInPostLastModified:"linked_in_post_last_modify",

    linkedInLastSelected:"linked_in_last_selected",

    linkedInUserID:function(){
        return "_linked_in_user_id_"+APP_Cookies.getCookie(APP_Cookies.userID)
    },
    //-------

    twitterMessage:"twitter_msg_storage",
    twitterMessageLastModified:"twitter_msg_last_modify",

    twitterPost:"twitter_post_storage",
    twitterPostLastModified:"twitter_post_last_modify",

    twitterMyPost:"twitter_my_post_storage",
    //twitterMyPostLastModified:"twitter_my_post_last_modify",

    twitterLastSelected:"twitter_last_selected",

    twitterUserID:function(){
        return "_twitter_user_id_"+APP_Cookies.getCookie(APP_Cookies.userID)
    },
    twitterUserName:function(){
        return "_twitter_user_name_"+APP_Cookies.getCookie(APP_Cookies.userID)
    },
    twitterUserPic:function(){
        return "_twitter_user_pic_"+APP_Cookies.getCookie(APP_Cookies.userID)
    },
    //-------

    vimeoVideos:"vimeo_video_storage",
    vimeoLastModified:"vimeo_last_modified",
    vimeoSubscriptionVideo:"vimeo_subscription_video_storage",

    vimeoLastSelected:"vimeo_last_selected",

    vimeoUserID:function(){
        return "_vimeo_user_id_"+APP_Cookies.getCookie(APP_Cookies.userID)
    },
    vimeoUserName:function(){
        return "_vimeo_user_name_"+APP_Cookies.getCookie(APP_Cookies.userID)
    },
    vimeoUserPic:function(){
        return "_vimeo_user_pic_"+APP_Cookies.getCookie(APP_Cookies.userID)
    },
    //-------
    yelpPlaces : "yelp_places_storage",
    yelpPlacesGrouped : "yelp_places_grouped_storage",
    yelpPlacesLastModified : "yelp_places_last_modified" ,
    //last modified should be attached to last region because if user has chnaged region we should work without last modified
    yelpPlacesLastRegion : "yelp_places_last_region" ,
    //---
    yelpInterests : "yelp_interests_storage" ,
    yelpInterestsLastModified : "yelp_interests_last_modified" ,
    //---
    //the following used in display not in search
    yelpAllFavLastModified : "yelp_all_fav_last_modified",
    yelpAllFav : "yelp_all_fav",
    yelpMostPopularLastModified : "yelp_most_popular_last_modified",
    yelpMostPopular : "yelp_most_popular",
    //-------
    tumblrPost:"tumblr_post_storage",
    tumblrPostLastModified:"tumblr_post_last_modify",

    tumblrMessage:"tumblr_message_storage",
    tumblrMessageLastModified:"tumblr_message_last_modify",

    tumblrInterests :"tumblr_interests_storage",
    tumblrInterestsLastModified:"tumblr_interests_last_modify",

    tumblrLastSelected:"tumblr_last_selected",

    tumblrUserID:function(){
        return "_tumblr_user_id_"+APP_Cookies.getCookie(APP_Cookies.userID)
    },
    tumblrUserName:function(){
        return "_tumblr_user_name_"+APP_Cookies.getCookie(APP_Cookies.userID)
    },
    tumblrUserPic:function(){
        return "_tumblr_user_pic_"+APP_Cookies.getCookie(APP_Cookies.userID)
    },
    //-------
    redditPost:"reddit_post_storage",
    redditPostLastModified:"reddit_post_last_modify",

    redditInterests :"reddit_interests_storage",
    redditInterestsLastModified:"reddit_interests_last_modify",

    redditLastSelected:"reddit_last_selected",

    redditUserID:function(){
        return "_reddit_user_id_"+APP_Cookies.getCookie(APP_Cookies.userID)
    },
    redditUserName:function(){
        return "_reddit_user_name_"+APP_Cookies.getCookie(APP_Cookies.userID)
    },
    redditUserPic:function(){
        return "_reddit_user_pic_"+APP_Cookies.getCookie(APP_Cookies.userID)
    },
    //-------
    wheelItems:function(){
        return "_wheel_items_"+APP_Cookies.getCookie(APP_Cookies.userID)
    },
    wheelCategories:function(){
        return "_wheel_categories_"+APP_Cookies.getCookie(APP_Cookies.userID)
    },
    //-------
    contacts:'contacts_storage',
    contactsLastModified:'contacts_last_modify'
};

var APP_Storage_Methods={
    IsLocalStorageSupported:function(){
        try{
            if(localStorage){
                //not work if private browsing enabled on mobile
                localStorage.setItem(this.testStorage,"test")
                localStorage.removeItem(this.testStorage);
                return true;
            }else{
                return false;
            }

        }catch(error){
            return false;
        }
    },
    IsKeyExist:function(value,ignore){
        if(this.IsLocalStorageSupported()){
            if(ignore){
                return true;
            }
            for(var k in this){
                if(typeof(this[k])=="string" && this[k]==value){
                    return true;
                }
            }
            alert("please Add "+value+" to app storage constants;value won't be saved");
        }
        return false;
    },
    isValuesDefined:function(keys){
        if(this.IsLocalStorageSupported() && !_.isUndefined(keys)){
            if(typeof(keys)=="string"){
                return localStorage.getItem(keys) != null && localStorage.getItem(keys) != "null" && typeof(localStorage.getItem(keys))!="undefined";

            }else{
                for(var i=0;i<keys.length;i++){
                    if(localStorage.getItem(keys[i]) == null || localStorage.getItem(keys[i]) == "null" || typeof(localStorage.getItem(keys[i]))=="undefined"){
                        return false;
                    }
                }
                return true;
            }
        }else{
            return false;
        }
    },
    setValue:function(key,value,notString,ignore){
        if(typeof(value)=="undefined"){
            console.log('not stored')
            return;
        }
        if(this.IsKeyExist(key,ignore)){
            if(notString){
                localStorage.setItem(key, JSON.stringify(value));
            }else{
                localStorage.setItem(key,value);
            }
        }
    },
    getValue:function(key,defaultValue,notString){
        if(this.isValuesDefined(key)){
            if(notString){
                try {
                    return JSON.parse(localStorage.getItem(key));
                }catch (e){
                    //console.log(localStorage.getItem(key));
                    if(App && App.growl) {//growl not always loaded like on custom auth pages
                        App.growl.danger('Parse Error ' + key + ' ' + e, true)
                    }
                }
            }else{
                    return localStorage.getItem(key);
            }
        }
        return (typeof(defaultValue)=="undefined" ? null : defaultValue);
    },
    removeValues:function(keys){
        if(this.IsLocalStorageSupported()){
            if(typeof(keys)=="string"){
                localStorage.removeItem(keys);
            }else{
                for(var i=0;i<keys.length;i++){
                    localStorage.removeItem(keys[i]);
                }
            }
        }
    },
    removeAll:function(){
        //alert(this.IsLocalStorageSupported())
        //optimze storage for yelp large adta by remove all wheel data when new user is logged/register
        var privateStorage = ['twitterUserID','facebookUserID','linkedInUserID',
                              'googleUserID','vimeoUserID','tumblrUserID','redditUserID',
                              'userLocationInfo','wheelItems','wheelCategories'
        ];
        if(this.IsLocalStorageSupported()){
            for(var k in this){
                if(typeof(this[k])=="string"){
                    localStorage.removeItem(this[k]);
                }else if(privateStorage.indexOf(k)!=-1){
                    console.log('----------private local storage-----------'+k)
                    console.log(this[k]())
                    localStorage.removeItem(this[k]());
                }
                console.log(k)
            }
        }
        //alert(localStorage)
    },
    removeByNetwork:function(name){
        //this will clear storage that follow naming convention
        var clearKey = '';
        if(name.length && this.IsLocalStorageSupported()){
            for(var k in this){
                if((k.toLowerCase()).indexOf(name.toLowerCase())!=-1){
                    if(typeof(this[k])=="string"){
                        clearKey+=' string ' + k +'\n';
                        localStorage.removeItem(this[k]);
                    }else if(typeof(this[k])=="function"){
                        clearKey+=' function ' + k +'\n';
                        localStorage.removeItem(this[k]());
                    }
                }
            }
        }
        return clearKey;
    },
    GetAll:function(){
        if(this.IsLocalStorageSupported()){
            for(var k in this){
                if(typeof(this[k])=="string"){
                    //alert('x')
                    console.log(this[k]+":"+localStorage.getItem(this[k]));
                }
            }

        }
    }
};

var APP_Storage = jQuery.extend(true,APP_Storage_Methods,APP_Storage_Keys,{
    //add this keys so it can be handle in 401 & code=1002 handled in ajaxerror
    gMailUserID : APP_Storage_Keys.googleUserID,
    youtubeUserID : APP_Storage_Keys.googleUserID
});

if(!APP_Storage.IsLocalStorageSupported()){
    alert('The website may be slower because your browser in private mode');
}