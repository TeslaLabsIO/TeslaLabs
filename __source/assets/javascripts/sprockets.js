var postDateMonth = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

function padPostDate(value) {
    if (value < 10) {
        return "0" + value;
    }
    return "" + value;
}

function getPostDateString(ms) {
    return App.utilities.getPostDate(ms);
}

function replaceNewLines(str) {
    return str.trim().replace(/\n/g, '<br>');
}

var application_Cookies = {};

function setCookie(cookieName, cookieValue, exdays) {
    if (APP_Cookies.IsValueExist(cookieName)) {
        var exdate = new Date();
        exdate.setTime(exdate.getTime() + (exdays * 86400000));//better than day as day may be 01 when you want to remove cookie(-1 day) you will set to 30 in same month and it won't expire
        document.cookie = cookieName + "=" + escape(cookieValue) + ";expires=" + exdate.toUTCString() + "; path=/";//path =/ set it for this website
    }
}

function getCookie(c_name) {
    var i, x, y, ARRcookies = document.cookie.split(";");
    for (i = 0; i < ARRcookies.length; i++) {
        x = ARRcookies[i].substr(0, ARRcookies[i].indexOf("="));
        y = ARRcookies[i].substr(ARRcookies[i].indexOf("=") + 1);
        x = x.replace(/^\s+|\s+$/g, "");
        if (x == c_name) {
            return unescape(y);
        }
    }
    return "";
}

function removeCookie(c_name) {
    setCookie(c_name, "", -1);
}

function validateEmail(email) {
    var splitted = email.match("^(.+)@(.+)$");
    if (splitted == null) return false;
    if (splitted[1] != null) {
        var regexp_user = /^\"?[\w-_\.]*\"?$/;
        if (splitted[1].match(regexp_user) == null) return false;
    }
    if (splitted[2] != null) {
        var regexp_domain = /^[\w-\.]*\.[A-Za-z]{2,4}$/;
        if (splitted[2].match(regexp_domain) == null) {
            var regexp_ip = /^\[\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\]$/;
            if (splitted[2].match(regexp_ip) == null) return false;
        } // if
        return true;
    }
    return false;
}
function isValidUrl(url){
    var urlRegExp = /^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i;
    return urlRegExp.test(url);
}
function isValidUserName(name){
    return /^[a-zA-Z0-9_.-]+$/.test(name);
}
function documentReadyWrapper() {
    $(function () {
        (function (d) {
            var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
            if (d.getElementById(id)) {
                return;
            }
            js = d.createElement('script');
            js.id = id;
            js.async = true;
            js.src = "//connect.facebook.net/en_US/all.js";
            ref.parentNode.insertBefore(js, ref);
        }(document));

        //
        console.log(">> "+APP_Cookies.getCookie('linkedin_oauth_'+LinkedIn_Api_key)+' >> linkedin cookie');
        //cached cookies cause problem with linkedin for some account so we have to delete it
        APP_Cookies.removeCookie('linkedin_oauth_'+LinkedIn_Api_key);
        //
        console.log(">> "+APP_Cookies.getCookie('linkedin_oauth_'+LinkedIn_Api_key)+' >> linkedin cookie');
        //

        $.getScript("//platform.linkedin.com/in.js?async=true", function success() {
            IN.init({
                api_key: LinkedIn_Api_key,
                authorize: true,
                credentials_cookie: true,
                onLoad: "onLinkedInFrameLoad"
            });
        });

        //used to hijack touch events for mobile safari
        function touchHandler(event) {
            var touches = event.changedTouches,
                first = touches[0],
                type = "";
            switch (event.type) {
                case "touchstart":
                    type = "mousedown";
                    break;
                case "touchmove":
                    type = "mousemove";
                    break;
                case "touchend":
                    type = "mouseup";
                    break;
                default:
                    return;
            }

            //initMouseEvent(type, canBubble, cancelable, view, clickCount,
            //           screenX, screenY, clientX, clientY, ctrlKey,
            //           altKey, shiftKey, metaKey, button, relatedTarget);
            var simulatedEvent = document.createEvent("MouseEvent");
            simulatedEvent.initMouseEvent(type, true, true, window, 1, first.screenX, first.screenY, first.clientX, first.clientY, false, false, false, false, 0 /*left*/, null);

            first.target.dispatchEvent(simulatedEvent);
            event.preventDefault();
        }

        $('.status-settings .menu').bind('click', function (e) {
            if ($(this).siblings('.popup').is(':visible')) {
                $('.status-settings .popup').hide();
                $(this).siblings('.popup').hide();
            } else {
                $('.status-settings .popup').hide();
                $(this).siblings('.popup').show();
            }
        });

        $('.status-settings .popup').bind('mouseleave', function () {
            // $(this).hide();
        });
    })
}