/**
 * Created by mahmoud on 6/17/14.
 */

//-------------------------------Apps Cookie keys and func----------------------------
var APP_Cookies_Keys={
    userID:"userID",
    apiKey:"apiKey",
    vimeoAuthState:"vimeoAuthState",
    twitter_secret:"twitter_secret",
    linkedInUserID : "linked_in_user_id",
    linkedInExpired: "linkedin_expired",
    wheelItems:function(){
        return "_wheel_items_"+APP_Cookies.getCookie(APP_Cookies.userID)
    },
    wheelCategories:function(){
        return "_wheel_categories_"+APP_Cookies.getCookie(APP_Cookies.userID)
    },
    wheelVersion:"wheelVersion"
};
var APP_Cookies_Methods={
    IsValueExist:function(value){
        for(var k in this){
            //alert(k+","+typeof (this[k]));
            if(typeof(this[k])=="string" && this[k]==value){
                return true;
            }
        }
        alert("please Add "+value+" to app cookies constants;value of this cookie won't be saved");
        return false;
    },
    ClearAllCookies:function(){
        for(var k in this){
            if(typeof(this[k])=="string"){
                removeCookie(this[k]);
            }
        }
    },
    GetAllCookies:function(){
        for(var k in this){
            if(typeof(this[k])=="string"){
                console.log(this[k]+":"+getCookie(this[k]));
            }
        }
    }
    ,
    setCookie : function (cookieName, cookieValue, exdays,ignore) {
        if(ignore || this.IsValueExist(cookieName)){
            var exdate = new Date();
            exdate.setTime(exdate.getTime() + (exdays * 86400000));//better than day as day may be 01 when you want to remove cookie(-1 day) you will set to 30 in same month and it won't expire
            document.cookie = cookieName + "=" + escape(cookieValue) + ";expires=" + exdate.toUTCString() + "; path=/";//path =/ set it for this website
        }
    },
    getCookie : function (c_name,defaultValue) {
        var i, x, y, ARRcookies = document.cookie.split(";");
        for (i = 0; i < ARRcookies.length; i++) {
            x = ARRcookies[i].substr(0, ARRcookies[i].indexOf("="));
            y = ARRcookies[i].substr(ARRcookies[i].indexOf("=") + 1);
            x = x.replace(/^\s+|\s+$/g, "");
            if (x == c_name) {
                /*if(escapes){
                 return y;//escape(y);
                 }else{*/
                return unescape(y);
                //}
            }
        }
        return (typeof(defaultValue)=="undefined" ? "" : defaultValue);
    },
    removeCookie : function (c_name) {
        this.setCookie(c_name, "", -1,true);
    }
};

var APP_Cookies = jQuery.extend(true,APP_Cookies_Methods,APP_Cookies_Keys);

/*var exist = typeof(localStorage.testkey)!="undefined"
 if(!exist){
 localStorage.testkey="a";
 }
 alert(localStorage.testkey)
 if(exist){
 localStorage.removeItem("testkey");
 }
 alert(localStorage.testkey)*/
