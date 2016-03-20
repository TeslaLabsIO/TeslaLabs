
var registered={
    "userId":1,
    "apiKey":"928fcd7c831wA6WybfiZCbX7egrX2t45hC6yyr8ZCSd0wJKjJeOkwePdyMehEbjkZD"
};
App.RegisterRoute =  Ember.Route.extend({
    beforeModel: function() {
        if(getCookie(APP_Cookies.userID)!=""){
            this.transitionTo("index");
        }else if(location.protocol=='https:'){
            //either user open it on https or redirection of logout was on https
            location.protocol='http';//as all wheel storage data include lastUserName , lastUserId are on http
        }
    }
});
App.RegisterView = Ember.View.extend({
    didInsertElement: function () {
        Em.$('.loginform div input:first-child').focus()
    }
});
App.RegisterController = Ember.ObjectController.extend({
    firstName : "",
    lastName : "",

    displayName:function(){
        return this.get('firstName')+' '+this.get('lastName')//if last name='' it will be trimmed when send data to server
    }.property('firstName','lastName'),

    username: "",
    email: "",

    password: "",
    confirmPassword : "",

    actions : {
        SetLoginData:function(data){
            console.log(data)
            //alert('data')
            var _self = this;
            App.utilities.setSprocketApiKey(App.CONSTANT.api.headerKey,'Basic ' + data.apiKey);

            setCookie(APP_Cookies.userID, data.userId, 15);
            setCookie(APP_Cookies.apiKey, data.apiKey, 15);

            APP_Storage.setValue(APP_Storage.lastUserName(),_self.get('username'),false,true)
            APP_Storage.setValue(APP_Storage.lastUserId(),data.userId,false,true)

            HideLoadingImage();

            $('#rememberSignUpForm').submit();

            //want home page to page http always
            location.href = location.origin.replace('https', 'http');
            /*if (location.protocol == 'http:') {
                location.reload();//so chrome offer save password
            } else {
                location.protocol = 'http';//so chrome offer save password
            }*/
        },
        Register: function () {
            var _self = this;
            AutoCompleteSprocketLoginForm();
            var resultDiv = document.getElementById('registerResult');
            var userName = this.get('username').trim();

            /*if (this.get('displayName').trim().length < 2) {
                resultDiv.innerHTML = 'Your name must be more than 2 characters';
            }
            else*/
            if (this.get('email').trim() == '' || !validateEmail(this.get('email').trim())) {
                resultDiv.innerHTML = 'Please enter valid email';
            }
            else if (userName.length < 3 || !isValidUserName(userName)) {
                resultDiv.innerHTML = 'Your Username must be more than 3 characters and only contain letters,numbers,dashes,periods and underscores';
            }
            else if (this.get('password').length < 6)//no trim user enter space so he want it
            {
                resultDiv.innerHTML = 'Your password must be more than 6 characters';
            }
            else if (this.get('password') != this.get('confirmPassword')) {
                resultDiv.innerHTML = 'Password does not match the Confirm password';
            }
            else {
                ShowLoadingImage();

                Ember.$.ajax(API_Base_Url + 'users/registered', {
                    "type": 'POST',
                    "dataType": 'JSON',
                    "data": JSON.stringify({
                        clientPlatformId: APP_Client_Platform.WEB,
                        //"displayName": this.get('displayName').trim(),
                        "username": this.get('username').trim(),
                        "email": this.get('email').trim(),
                        "password": this.get('password')
                    }),
                    headers: {
                        'Content-type': 'application/json'
                    },
                    "success": function (data, textStatus, jqXHR) {
                        window.console.log(data);
                        //alert(data.apiKey)

                        var lastUserId = APP_Storage.getValue(APP_Storage.lastUserId(),"",false);

                        //always the id will be diffrent for last one as this is new user
                        if(lastUserId != ""){
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