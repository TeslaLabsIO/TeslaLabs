(function () {
    'use strict';
    App.KeyUpTextField = Em.TextField.extend({
        keyUp:function(event){
            try {
                this.sendAction('keyUpAction', event);
            }catch(e){
                console.log('key up text exception ',e)
            }
        }
    });
})();