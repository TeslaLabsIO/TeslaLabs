/**
 * Created by mahmoud on 29-Sep-14.
 */
Ember.RadioButton = Ember.Component.extend({
    tagName : "input",
    type : "radio",
    attributeBindings : ["name", "type", "value", "checked:checked:","change","default"],
    setSelectedVal:function(event){
        //console.log('** set val',this.$().val(),'|',event);
        this.set("selection", this.$().val());
        //console.log('** set val',this.get('selection'))
        return this.get('selection');
    },
    /*click : function() {
        this.setSelectedVal();
    },*/
    change : function(event) {
        var value = this.setSelectedVal(event);
        //console.log('** change',this.get('changeAction'),'|',this.sendAction);
        if(this.get('changeAction')){
            try{
                this.sendAction('changeAction',value,event);//new value is send because it's not set to 'selectionBinding' attr until the function execute
            }catch (e){
                //console.log('event exception','|',e)
            }
        }
    },
    checked : function() {
        //console.log('** checked',this.get('value'),'|',this.get("selection"));
        return this.get("value") == this.get("selection");
    }.property()
});
/*
 style="visibility:hidden;width:1px"
 id="fb_post_upload" type="file"
 accept="image/*,video/*"
 multiple="1"
 onchange=
* */
 Ember.FileUploader = Ember.Component.extend({
    tagName : "input",
    type : "file",
    attributeBindings : [
        //basic attr
        "id","name", "type", "defaultValue","value",
        //style related
        "style","class","disabled",
        //restrictions attr
        "accept","multiple",
        //other supported attr
        "required","form","files","autofocus",
        //events
        "change","click",
        //custom attr
        "accept-type-name","reset-type-name"
    ],
    change : function(event) {
        if(this.get('changeAction')){
            try{
                var customAttr = {
                    accept_type : this.$().attr('accept-type-name'),
                    reset_type : this.$().attr('reset-type-name')
                };
                //
                console.log(this.$(),event,customAttr);
                //
                this.sendAction('changeAction',event,customAttr);
            }catch (e){
                console.log('event exception','|',e)
            }
        }
    }
});