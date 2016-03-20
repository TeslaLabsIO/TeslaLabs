var customNotAuthHandled = ['login', 'register', 'reset', 'forgetpassword', 'authorize'];
App = Ember.Application.create({
    LOG_TRANSITIONS: true,
    ready: function () {
        // set global ApiKey header for all ajax requests
        if (APP_Cookies.getCookie(APP_Cookies.apiKey)) {
            App.utilities.setSprocketApiKey(App.CONSTANT.api.headerKey, 'Basic ' + APP_Cookies.getCookie(APP_Cookies.apiKey));
            //will save data only in sync
            if (location.protocol.indexOf('https') == -1) { //we need this data on http only
                //use direct sync instead of stack as this request will delay stack process request for another pages
                //as example when we open facebook page sync tooltip in facebook will wait neighbourhood request to completed
                //also stack is reset on every model start in app so if we add it to stack , this request may not fired specially on home page

                App.YelpService.getNeighbourhoods({saveData: true});
                App.YelpService.getInterests({saveData: true});
                App.ContactsService.create({}).getContacts();
            }
        }
        // global handling for Sprocket API error 401
        $(document).ajaxError(function (event, jqxhr) {
            if (jqxhr.status == 401) {

                var response = {};
                if (jqxhr.responseText) {
                    try {
                        response = JSON.parse(jqxhr.responseText);
                    } catch (e) {

                    }
                }

                var networkData = App.PollingManager.getNetworkIdName();
                var path = networkData.path;
                var network = networkData.name;//current opened network
                //alert(network + ' ' + response.providerName);
                var providerName = response.providerName ? response.providerName : network;//the network un auth error fired from (if provided)

                var reloadPage = true;
                //network == 'login' || network == 'register' || network == 'reset' || network == 'forgetpassword'
                if (customNotAuthHandled.indexOf(path) != -1) {// || (!network.length)) {
                    return;
                } else if (response.providerName && response.code == 1002) {//provider name is provide
                    //and in this case we have to compare network we are in with network we should remove its data
                    var name = response.providerName.toLowerCase().replace(/ /gi, '');//replace all space
                    //if we have id for this provide in constant so it's valid .. else that means name doesn't match our name for any reasons !!
                    var isValid = _.isNumber(App.PollingManager.getNetworkIdName(name).id);
                    //un auth error is related to another network that we are not on it now
                    if (isValid && name != network) {
                        network = name;//remove data of the correct network
                        reloadPage = false;//because we are on other one now
                    }
                    //alert(name + ' ' + isValid)
                }

                if (jqxhr.responseText != "") {
                    //if 401 is returned in live paging errors ignore it
                    if (response.messages && response.messages.length && response.messages[0] == 'Page limit reached') {
                        return;
                    }
                    //alert('xx')
                    if (response.code == 1002) {
                        var cleared = APP_Storage.removeByNetwork(network);
                        //
                        if (network == 'linkedin') {
                            APP_Cookies.removeCookie(APP_Cookies.linkedInUserID);
                        } else if (network == 'facebook') {
                            APP_Storage.removeValues([APP_Storage.facebookTokenKey()]);
                        }
                        //
                        console.log(cleared);
                        var removed = cleared.toLowerCase().indexOf(network + 'userid') != -1;
                        if (!removed && network.length) {
                            alert('user id for ' + network + ' not exist , please follow the naming convention for user id in local storage');//for developers
                        } else if (network.length) {
                            APP_External_Network.setExpired(true, App.PollingManager.getNetworkIdName(network).id);
                            var message = 'Your ' + network.toUpperCase() + ' session has expired , you will be redirected to ' + network.toUpperCase() + ' Login after few seconds';
                            if (response.messages && response.messages.length) {
                                // && response.messages[0] == 'This account is associated with another user') {
                                //message = 'Your '+ currentUrl.toUpperCase() +' account is associated with another Sprocket user';
                                message = response.messages[0];
                                response.messages.splice(0, 1);//i already displayed it here so remove it
                            }
                            if (response.messages && response.messages.length) {
                                _.each(response.messages, function (message) {
                                    App.growl.danger(providerName + " : " + message);
                                });
                            }
                            App.growl.danger(providerName + " : " + message)
                                .then(function () { // on growl closed
                                    if (reloadPage) {
                                        var newUrl = (location.href.split('#')[0].split('?')[0]) + location.hash;//to remove the parameters .. this will help in twitter
                                        //alert('xxx')
                                        //newUrl = newUrl.split('?')[]
                                        if (newUrl == location.href) {
                                            location.reload()
                                        } else {
                                            location.href = newUrl;
                                        }
                                    }
                                });
                        }
                    } else if (response.code = 1001) {
                        var message = 'Your session has expired , you will be redirected to SignIn after few seconds';
                        if (response.messages && response.messages.length) {
                            message = response.messages[0];
                        }
                        App.growl.danger(message)
                            .then(function () { // on growl closed
                                location.href = '#/logout';
                            });
                    }
                } else {
                    SetErrorMessage('can\'t parse the response')
                }
            }
        });
        // REGISTER OBJECTS
        App.register('main:service', App.ServiceObject);
        App.register('contacts:service', App.ContactsService);
        App.register('class:notify', App.NotifyClass);
        App.register('class:error', App.ErrorClass);
        App.register('class:utilities', App.UtilitiesClass);
        App.register('class:cookie', App.CookieClass);
        App.register('class:storage', App.StorageClass);
        App.register('class:block', App.BlockClass);
        // DEPENDENCY INJECTION FOR Error OBJECT
        App.inject('route', 'error', 'class:error');
        App.inject('controller', 'error', 'class:error');
        // DEPENDENCY INJECTION FOR Notify OBJECT
        App.inject('route', 'notify', 'class:notify');
        App.inject('controller', 'notify', 'class:notify');
        App.inject('class:error', 'notify', 'class:notify');
        // DEPENDENCY INJECTION FOR Utilities
        App.inject('route', 'utilities', 'class:utilities');
        App.inject('controller', 'utilities', 'class:utilities');
        App.inject('service', 'utilities', 'class:utilities');
        App.inject('main:session', 'utilities', 'class:utilities');
        // DEPENDENCY INJECTION FOR Cookie OBJECT
        App.inject('route', 'cookie', 'class:cookie');
        App.inject('controller', 'cookie', 'class:cookie');
        App.inject('service', 'cookie', 'class:cookie');
        App.inject('main:session', 'cookie', 'class:cookie');
        // DEPENDENCY INJECTION FOR Storage OBJECT
        App.inject('route', 'storage', 'class:storage');
        App.inject('controller', 'storage', 'class:storage');
        App.inject('main:session', 'storage', 'class:storage');
        // DEPENDENCY INJECTION FOR Block OBJECT
        App.inject('view', 'blocker', 'class:block');
        App.inject('controller', 'blocker', 'class:block');

        // DEPENDENCY INJECTION FOR CONSTANT OBJECT IN ROUTS AND CONTROLLERS
        var constant = App.CONSTANT;
        App.register('main:constant', constant, {instantiate: false});
        App.inject('route', 'constant', 'main:constant');
        App.inject('controller', 'constant', 'main:constant');
        App.inject('object', 'constant', 'main:constant');
        App.inject('main:service', 'constant', 'main:constant');
        // DEPENDENCY INJECTION FOR CONSTANT OBJECT IN ROUTS AND CONTROLLERS

        // DEPENDENCY INJECTION FOR PollingManager OBJECT IN ROUTS AND CONTROLLERS
        var pollingManager = App.PollingManager;
        App.register('pollingManager:main', pollingManager, {instantiate: false});
        App.inject('route', 'pollingManager', 'pollingManager:main');
        App.inject('controller', 'pollingManager', 'pollingManager:main');
        // DEPENDENCY INJECTION FOR PollingManager OBJECT IN ROUTS AND CONTROLLERS

        // DEPENDENCY INJECTION FOR PollingManager OBJECT IN ROUTS AND CONTROLLERS
        var utilities = App.utilities;
        App.register('utilities:main', utilities, {instantiate: false});
        App.inject('route', 'utilities', 'utilities:main');
        App.inject('controller', 'utilities', 'utilities:main');
        // DEPENDENCY INJECTION FOR PollingManager OBJECT IN ROUTS AND CONTROLLERS
    }
});


App.Router.map(function () {
    //this.resource('feed');
    this.resource('facebooktest');

    this.resource('cleardata');
    this.resource('logout');
    this.resource('search');
    this.resource('register');
    this.resource('login', function () {
        this.route("register", {path: "/register"});
    });

    this.resource('forgetpassword');
    this.resource('reset');

    this.resource('google');
    this.resource('gmail');
    this.resource('facebook');
    this.resource('twitter');
    this.resource('bestbuy');
    this.resource('cnet');
    this.resource('deadspin');
    this.resource('expedia');
    this.resource('flickr');
    this.resource('youtube');
    this.resource('flixster');
    this.resource('gawker');
    this.resource('gizmodo');
    this.resource('jezebel');
    this.resource('kotaku');
    this.resource('last_fm');
    this.resource('livingsocial');
    this.resource('netflix');
    this.resource('linkedin');
    this.resource('usa_today');
    this.resource('weatherbug');
    this.resource('wikimedia');
    this.resource('yelp');
    this.resource('vine');
    this.resource('espn');

    this.resource('vimeo', function () {
        // index route is auto generated
    });

    this.resource('sync');
    this.resource('tumblr');
    this.resource('reddit');
    this.resource('authorize');
    this.resource('_=_'); //this add to handle the hash in tumblr callback url

    this.resource('contacts');
});

var userID = "";
var apiKey = "";
var googleAccessToken = "";
var nextRoute = "";
var documentReadyWrapperCalled = false;

function SetLoginUrl() {
    if (typeof(Ember.$("#loginurl").attr('id')) != "undefined") {
        var currentUrl = location.hash.substring(1);
        if (currentUrl[0] == '/') {
            currentUrl = currentUrl.substring(1);
        }
        if (currentUrl == "logout" || getCookie(APP_Cookies.userID) == "") {//user will open logout page or cookie expired
            Ember.$("#loginurl").attr('href', '#/login');
            Ember.$("#loginurl img").attr('src', 'assets/images/log_in.png');
        } else {
            Ember.$("#loginurl").attr('href', '#/logout');
            Ember.$("#loginurl img").attr('src', 'assets/images/log_out.png');
        }
    } else {
        console.log("undefined");
    }
}
function ShowLoadingImage() {
    if (typeof(Em.$("#internalloading").attr('id')) == "undefined") {
        Ember.$('#loadingimg').fadeIn(0);
    } else {
        Ember.$("#logourl").fadeOut(0);
        Ember.$("#internalloading").fadeIn(0);
    }
    Ember.$('#redud').val(new Date().getTime());
}
function HideLoadingImage() {
    if (typeof(Ember.$("#page").attr('id')) != "undefined") {
        Ember.$('#loadingimg').fadeOut(0);
        Ember.$("#internalloading").fadeOut(0);
        Ember.$("#logourl").fadeIn(0);
    } else {
        console.log("model not loaded");
    }
}

Ember.Route.reopen({
    beforeModel: function (transition) {
        if (App.growl) {//first page load growl will be undefined as it's create after ember App object created in this file
            App.growl.closeAll();//close error messages
        }
        var redirect = false;

        ShowLoadingImage();

        //var defer = Ember.Deferred.create({});
        var _self = this;

        var url = location.hash.substring(1);//_self.get('router.url').toLowerCase();
        if (url[0] == '/') {
            url = url.substring(1);
        }
        //alert(url)
        if ((url == "linkedin" || url == "cleardata") && getCookie(APP_Cookies.userID) != "") {
            //redirection of linkedin will be handled inside linkedin it self
            moveWheelToStorage(function (changed) {
                console.log(changed);
                if (changed) {
                    App.WheelDirector.resetWheel();
                }
            });
            SetAppType("before");
            nextRoute = "";
        } else if (location.protocol.indexOf('https') != -1) {
            location.protocol = 'http';
        } else {
            moveWheelToStorage(function (changed) {
                console.log(changed);
                if (changed) {
                    App.WheelDirector.resetWheel();
                }
            });
            SetAppType("before");
            //forgetpassword reset
            //ensure that token of reset exist in query also we can't use url!='reset' here as in case of params sent in url like that (i.e after hash)
            //the router.url include parameter in its value
            if (url != 'login' && url != 'register' && url != 'forgetpassword' && url.indexOf('reset?token=') == -1 && getCookie(APP_Cookies.userID) == "") {
                nextRoute = "";

                console.log(url,transition,transition?typeof(transition.abort):null)

                if(transition && typeof(transition.abort) == "function"){
                    transition.abort();
                }
                HideLoadingImage();
                window.location = '#/login';
            }
            //else if ((url == 'youtube' || url == 'gmail') && APP_Storage.getValue(APP_Storage.googleUserID()) == null) {var result = APP_External_Network.getIdentity(APP_External_Network.Google);if(result.length){console.log(result[0].identifier);nextRoute = "";}else{nextRoute = url;_self.transitionTo("google");}} else if (url != "google") {nextRoute = "";}
            else if (url != 'youtube' && url != 'gmail') {
                nextRoute = "";
            }

            if (getCookie(APP_Cookies.userID) != "" && getParameterByName('nw') != "") {
                //we have to change parameter name to not block user in twitter page if they don't want to continue
                var networkIdKey = getParameterByName('nw') + 'Id';
                if (getParameterByName('oauth_token') != "" && getParameterByName('oauth_verifier') != "") {
                    //this.transitionTo("twitter",{queryParams: {twitter_token : getParameterByName('oauth_token'),twitter_verifier : getParameterByName('oauth_verifier')}});
                    this.transitionTo("authorize", {
                        queryParams: {
                            network: this.get('constant')[networkIdKey],
                            oauth_token: getParameterByName('oauth_token'),
                            oauth_verifier: getParameterByName('oauth_verifier')
                        }
                    });
                } else if (getParameterByName('code') != "" || getParameterByName('state') != "") {//not all oauth2 send state for callback url
                    this.transitionTo("authorize", {
                        queryParams: {
                            network: this.get('constant')[networkIdKey],
                            code: getParameterByName('code'),
                            state: getParameterByName('state')
                        }
                    });
                }
            }
        }
    },
    afterModel: function () {
        SetLoginUrl();
        HideLoadingImage();
        SetAppType("after");
        APP_Icons.SetPageIcon("after");
        this.controllerFor('application').set('currentPath', location.hash.substring(1));
    }
});
App.ApplicationView = Ember.View.extend({
    didInsertElement: function () {
        if (!documentReadyWrapperCalled) {
            documentReadyWrapperCalled = true;
            documentReadyWrapper();
        }
        SetLoginUrl();
        HideLoadingImage();
        SetAppType("insert");
        APP_Icons.SetPageIcon("insert");
    }
});
function SetErrorMessage(errorResponse, externalNetwork) {
    //external network id should match the id provider name , if the error fired while user in network no on home page or any other page
    //so here we don't user provider in check
    var networkInfo = App.PollingManager.getNetworkIdName();
    var path = networkInfo.path;
    var network = networkInfo.name;
    var networkId = networkInfo.id;//we should make the next compare according to network i'm in now not network provide in error message
    //
    if (_.isNumber(externalNetwork) && _.isNumber(networkId) && externalNetwork != networkId) {
        console.log('error not related , ' + networkId + ' , ' + externalNetwork);
        //alert('not related')
        return;
    }
    //alert(network+'   '+networkId)
    //
    if (_.isString(errorResponse.responseText)) {
        console.log(errorResponse);
        //
        var response = {};
        if (errorResponse.responseText) {
            try {
                response = JSON.parse(errorResponse.responseText);//response in some case not always json like in 503 case
            } catch (e) {

            }
        }

        var providerName = response.providerName ? response.providerName : network;
        console.log(network, networkId, response, response.providerName)
        //network == 'login' || network == 'register'  || network == 'reset' || network == 'forgetpassword'
        if (errorResponse.status != 401 || customNotAuthHandled.indexOf(path) != -1) {//we handled 401 globally with string messages except for login/register to not reload
            if (_.isObject(errorResponse) && _.isArray(errorResponse.messages)) {
                _.each(errorResponse.messages, function (message) {
                    App.growl.danger(providerName + " : " + (message ? message : "null"));//when msg is null , it appears empty growl
                });
            }
            else if (_.isObject(errorResponse)) {
                var messages = [];
                try {
                    messages = JSON.parse(errorResponse.responseText)
                } catch (e) {
                    App.growl.danger(providerName + " : " + errorResponse.responseText, true);
                    return;
                }
                messages = messages.messages ? messages.messages : messages;
                if (messages) {
                    _.each(messages, function (message) {
                        App.growl.danger(providerName + " : " + (message ? message : "null"));//when msg is null , it appears empty growl
                    });
                } else {
                    App.growl.danger(providerName + " : " + errorResponse.responseText, true);
                }
            }
            else {
                App.growl.danger(providerName + " : " + errorResponse, true);
            }
        }
    } else if (_.isString(errorResponse)) {
        App.growl.danger(errorResponse, true);
    } else {
        console.log('empty error')
    }
}
