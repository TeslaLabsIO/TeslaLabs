(function () {
    'use strict';
    App.SprocketDirector = Ember.Object.extend({});
    App.SprocketDirector.reopenClass({
        ShowLoadingImage: function ShowLoadingImage() {
            if (typeof(Em.$("#internalloading").attr('id')) == "undefined") {
                Ember.$('#loadingimg').fadeIn(0);
            } else {
                Em.$("#logourl").hide();
                Em.$("#internalloading").show();
            }
            Em.$('#redud').val(new Date().getTime());
        },
        HideLoadingImage: function HideLoadingImage() {
            if (typeof(Em.$("#page").attr('id')) != "undefined") {
                //alert('loaded')
                //if(typeof(Em.$("#internalloading").attr('id'))=="undefined"){
                Ember.$('#loadingimg').hide();
                //}else{
                Em.$("#internalloading").hide();
                Em.$("#logourl").show();
                //}
            } else {
                //alert('not loaded')
                console.log("model not loaded");
            }
        },
        toggleLoading: function (hide) {
            if (Ember.$('#internalloading').is(":visible") || hide)
                this.HideLoadingImage();
            else
                this.ShowLoadingImage();
        }
    });
})();