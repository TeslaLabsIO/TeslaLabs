(function () {
    'use strict';
    App.growl = Ember.Object.create({
        jGrowl: null,
        closeAll: function () {
            if (this.jGrowl) {
                this.jGrowl.data('jGrowl.instance').close()
            }
        },
        growl: function (message, args) {
            //console.log(message, args);
            message = message.replace(/<style/g,'<remove').replace(/style>/g,'remove>');
            message = message.replace(/<script/g,'<remove').replace(/script>/g,'remove>');
            return new Promise(function (resolve, reject) {
                args.close = function () {
                    resolve();
                };
                //args.closeDuration = 0;
                args.glue = 'before';
                args.pool = 6;
                if(args.sticky == true){
                    args.sticky = false;
                    args.life = 10000;
                }

                //console.log(args);
                console.log($.jGrowl,message,args);
                $.jGrowl(message, args); //this.jGrowl = $.jGrowl(message, args);
            });
        },
        success: function (message) {
            return this.growl(message, {});
        },
        info: function (message) {
            return this.growl(message, {});
        },
        warning: function (message) {
            return this.growl(message, {});
        },
        danger: function (message, sticky) {
            return this.growl(message, {theme: 'danger', sticky: sticky ? sticky : false});
        }
    });
})();