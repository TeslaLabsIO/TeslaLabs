/**
 * Created by mahmoud on 24-Aug-14.
 */
App.ResetRoute = Ember.Route.extend({
    beforeModel: function () {
        if (getCookie(APP_Cookies.userID) != "") {
            this.transitionTo("index");
        }else if(location.protocol=='https:'){
            location.protocol='http';
        }
    },
    model: function (params) {
        console.log(params)
        //alert(params)
        //this.controllerFor('reset').set('token',params.token);//params.queryParams.token
    }
});
App.ResetView = Ember.View.extend({
    didInsertElement: function () {
        Em.$('.loginform div input:first-child').focus()
    }
});

App.ResetController = Ember.ObjectController.extend({
    queryParams: ['token'],
    token:null,

    password: "",
    confirmPassword : "",

    actions: {
        ResetPassword : function() {
            var resultDiv = document.getElementById('registerResult');

            if (this.get('password').length < 6)//no trim user enter space so he want it
            {
                resultDiv.innerHTML = 'Your password must be more than 6 characters';
            }
            else if (this.get('password') != this.get('confirmPassword')) {
                resultDiv.innerHTML = 'Password does not match the Confirm password';
            }
            else {
                ShowLoadingImage();
                Ember.$.ajax(API_Base_Url + 'users/authenticated/reset/responses', {
                    "type": 'POST',
                    "dataType": 'JSON',
                    "data": JSON.stringify({
                        token : this.get('token') ,
                        password: this.get('password')
                    }),
                    headers: {
                        'Content-type': 'application/json'
                    },
                    "success": function (data, textStatus, jqXHR) {
                        HideLoadingImage();

                        resultDiv.className += ' success_result'
                        resultDiv.innerHTML = 'Your password has been reset successfully , you will be redirected to login in few seconds';

                        setTimeout(function () {
                            location.href = '#/login';
                        }, 3000)
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        HideLoadingImage();

                        if (jqXHR.status == 200) {
                            resultDiv.className += ' success_result'
                            resultDiv.innerHTML = 'Your password has been reset successfully , you will be redirected to login in few seconds';

                            setTimeout(function () {
                                location.href = '#/login';
                            }, 3000)
                        }else {
                            var messages = [];

                            try{
                                messages = JSON.parse(jqXHR.responseText).messages;
                            }catch(e){}

                            if (jqXHR.status == 400 && messages && messages.length &&
                                ['This token is expired','This token is already verified','Invalid token'].indexOf(messages[0]) != -1 ) {

                                SetErrorMessage('This link has expired , you will be redirected to get new reset link in few seconds');

                                setTimeout(function () {
                                    App.growl.closeAll();
                                    location.href = '#/forgetpassword';
                                }, 3000)

                            } else {
                                SetErrorMessage(jqXHR);
                            }
                        }
                    }
                })
            }
        }
    }
})