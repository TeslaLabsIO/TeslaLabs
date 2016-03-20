/**
 * Created by mahmoud on 24-Aug-14.
 */
App.ForgetpasswordRoute = Ember.Route.extend({
    beforeModel: function () {
        if (getCookie(APP_Cookies.userID) != "") {
            this.transitionTo("index");
        }else if(location.protocol=='https:'){
            //either user open it on https or redirection of logout was on https
            location.protocol='http';//as all wheel storage data include lastUserName , lastUserId are on http
        }
    },
    deactivate: function() {
        var controller = this.controllerFor('forgetpassword');
        controller.set('emailSent',false)
    }
});
App.ForgetpasswordView = Ember.View.extend({
    didInsertElement: function () {
        var element = Em.$('.loginform div input:first-child');
        var domElement = element[0];
        element.focus();
        if (typeof domElement.selectionStart == "number") {
            domElement.selectionStart = domElement.selectionEnd = element.val().length;
        }
    }
});
App.ForgetpasswordController = Ember.ObjectController.extend({
    username:APP_Storage.getValue(APP_Storage.lastUserName(),"",false),
    emailSent:false,
    actions: {
        Submit: function () {
            if(!isValidUserName(this.get('username').trim())){
                App.growl.info('Username must only contain letters,numbers,dashes,periods and underscores');
            }else {
                var _self = this;
                ShowLoadingImage();
                Ember.$.ajax(API_Base_Url + 'users/authenticated/reset/requests', {
                    "type": 'POST',
                    "dataType": 'JSON',
                    "data": JSON.stringify({
                        "username": this.get('username')
                    }),
                    headers: {
                        'Content-type': 'application/json'
                    },
                    "success": function (data, textStatus, jqXHR) {
                        HideLoadingImage();
                        _self.set('emailSent', true)
                    },
                    "error": function (jqXHR, textStatus, errorThrown) {
                        HideLoadingImage();
                        if (jqXHR.status == 200) {
                            _self.set('emailSent', true)
                        } else {
                            _self.set('emailSent', false)
                            SetErrorMessage(jqXHR);
                        }
                    }
                });
            }
        }
    }
});