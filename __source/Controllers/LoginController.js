var authenticated = {
    "userId": 1,
    "apiKey": "4fe5732e-22dd-420e-ab41-f45ab1d4089d",
    "identities": [
        {
            "identityProviderId": 4,
            "identifier": "108567375845288715832"
        },
        {
            "identityProviderId": 3,
            "identifier": "1BMsFKU0g_"
        }
    ]
};
App.LoginRoute = Ember.Route.extend({
    beforeModel: function () {
        if (getCookie(APP_Cookies.userID) != "") {
            this.transitionTo("index");
        }else if(location.protocol=='https:'){
            //either user open it on https or redirection of logout was on https
            location.protocol='http';//as all wheel storage data include lastUserName , lastUserId are on http
        }
    }
});
App.LoginView = Ember.View.extend({
    didInsertElement: function () {
        if(APP_Storage.getValue(APP_Storage.lastUserName(),"",false)!=""){
            Em.$('#user_name').attr('disabled','disabled')
            Em.$('#user_name').addClass('disabled_input')
            Em.$('#user_pass').focus()
            setTimeout(function(){
                Em.$('#user_pass').val('')
            },250)
        }else{
            Em.$('#user_name').focus()
        }
    }
});
App.LoginController = Ember.ObjectController.extend({
    username: APP_Storage.getValue(APP_Storage.lastUserName(),"",false),
    password: "",
    actions:{
        LoginDifferent : function(){
            APP_Storage.removeValues(APP_Storage.lastUserName())
            this.set('username','')
            this.set('password','')
            Em.$('#user_name').removeAttr('disabled')
            Em.$('#user_name').removeClass('disabled_input')
            Em.$('#user_name').focus()
        },
        SavePassword : function(){
            //alert('save password')
            HideLoadingImage();
            $('#rememberLoginForm').submit();
            //want home page to page http always
            location.href = location.origin.replace('https', 'http');
            /*if (location.protocol == 'http:') {
                location.reload();//so chrome offer save password
            } else {
                location.protocol = 'http';//so chrome offer save password
            }*/
        },
        SetLoginData:function(data){
            console.log(data);
            //alert('data');
            var _self = this;
            App.utilities.setSprocketApiKey(App.CONSTANT.api.headerKey,'Basic ' + data.apiKey);

            setCookie(APP_Cookies.userID, data.userId, 15);
            setCookie(APP_Cookies.apiKey, data.apiKey, 15);

            APP_Storage.setValue(APP_Storage.lastUserName(),_self.get('username'),false,true);
            APP_Storage.setValue(APP_Storage.lastUserId(),data.userId,false,true);

            var identities = data.identities;
            var savePassword = true;
            if(identities && identities.length){
                var map=[];//map identites to array
                for(var i=0;i<identities.length;i++){
                    map[identities[i].externalNetworkId]=identities[i].identifier;
                }
                console.log(map);
                var externalNetwork = {};//change key to lower case
                for(var k in APP_External_Network){
                    externalNetwork[k.toLowerCase()] = APP_External_Network[k];
                }
                console.log(externalNetwork);
                var network = '';
                var networkId = 0;
                //override value even user doesn't click not you link
                for(var k in APP_Storage){
                    if(k.toLowerCase().indexOf('userid')!=-1 && typeof(APP_Storage[k])=="function"){
                        network = k.toLowerCase().split('userid')[0];
                        networkId = externalNetwork[network];

                        if(typeof(networkId)!="undefined" && map.length>networkId && map[networkId]){//check length of array and check network identifier is returned from server
                            APP_Storage.setValue(APP_Storage[k](),map[networkId],false,true); console.log(network,'--',networkId,'--',map[networkId]);
                        }else if(typeof(networkId)!="undefined"){
                            APP_Storage.removeValues(APP_Storage[k]()); console.log(network,'--',networkId);
                        }
                    }
                }

                if(APP_Storage.getValue(APP_Storage.linkedInUserID(),"")!=""){//if stored in http , it should be moved to https
                    savePassword=false;
                    jQuery('body').append(
                        jQuery('<iframe>').attr('src','customauth/linkedin.html').load(
                            function(){
                                _self.send('SavePassword');
                            }
                        )
                    )
                }
            }
            if(savePassword) {
                _self.send('SavePassword');
            }
        },
        Login: function () {
            var _self = this;
            AutoCompleteSprocketLoginForm();
            var resultDiv = document.getElementById('loginResult');
            var userName = this.get('username').trim();
            if (userName.length < 3 || !isValidUserName(userName)) {
                resultDiv.innerHTML = 'Please enter correct Username; Username must only contain letters,numbers,dashes,periods and underscores';
            } else if (this.get('password').length < 6) {
                resultDiv.innerHTML = 'Please enter correct password';
            } else {
                ShowLoadingImage();

                Ember.$.ajax(API_Base_Url + 'users/authenticated', {
                    "type": 'POST',
                    "dataType": 'JSON',
                    "data": JSON.stringify({
                        clientPlatformId: APP_Client_Platform.WEB,
                        "username": this.get('username'),
                        "password": this.get('password')
                    }),
                    "success": function (data, textStatus, jqXHR) {
                        window.console.log(data);
                        //alert(data.apiKey)

                        var lastUserId = APP_Storage.getValue(APP_Storage.lastUserId(),"",false);
                        //new user is logged in so delete temp data of old user
                        if(lastUserId != "" && lastUserId != data.userId){
                            APP_Storage.removeValues(APP_Storage.lastUserId())//as it will not deleted with remove all of local storage it's Function
                            APP_Cookies.setCookie(APP_Cookies.userID,lastUserId,1)

                            //execute logout js code remotely
                            jQuery('body').append(
                                jQuery('<iframe>').attr('src','customauth/logout.html').load(
                                    function(){
                                        _self.send('SetLoginData',data)
                                    }
                                )
                            )
                        }else{
                            _self.send('SetLoginData',data)
                        }
                    },
                    "error": function (jqXHR, textStatus, errorThrown) {
                        HideLoadingImage();
                        SetErrorMessage(jqXHR);
                    }
                });
            }
        }
    }

});