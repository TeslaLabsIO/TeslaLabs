(function () {
    'use strict';
    App.SocialContactController = Ember.ObjectController.extend({
        /*contactNetworks : function(){
            var networksData = this.get('constant.network');
            var networks = this.get('networks');
            networks = networks ? networks : [];
            if(networks.length==0){
                var contactNetwork = this.get('identity.externalNetworkId');
                networks = [{name:networksData[contactNetwork].name,externalNetworkId:contactNetwork,active:true}];
            }else {
                _.each(networks, function (network) {
                    network.name = networksData[network.externalNetworkId].name;
                });
            }
            //console.log(networks);
            return networks;
        }.property('networks','identity.externalNetworkId'),*/
        networkImage:function(){
            var networksData = this.get('constant.network');
            var contactNetwork = this.get('identity.externalNetworkId');
            return networksData[contactNetwork].name;
            //return "assets/images/headericons/"+networksData[contactNetwork].name+".png";
        }.property('identity.externalNetworkId'),
        contactClass : function(){
            if(this.get('isSelected')){
                return 'contact selected'
            }else{
                return 'contact';
            }
        }.property('isSelected'),
        actions : {
            selectContact : function(){
                var parent = this.get('parentController');
                var lastSelected = null;
                //console.log(this);console.log(parent);
                if(parent && parent.get && parent.set){
                    lastSelected = parent.get('lastSelectedContact');
                    if(lastSelected && lastSelected.set){
                        lastSelected.set('isSelected',false)
                    }
                    if(!_.isUndefined(lastSelected)){ //ember throw ember if variable not exist in parent controller
                        parent.set('lastSelectedContact',this);
                    }
                }
                this.set('isSelected',true);
                if(lastSelected != this){
                    if(parent && parent.send) {
                        try {
                            parent.send('showContactDetails'); console.log('send action');
                        } catch (e) {
                            console.log(e);
                        }
                    }
                }else{
                    console.log('already selected');
                }
            },
            hideContactDetails : function(){
                var parent = this.get('parentController');
                var lastSelected = null;
                if(parent && parent.get && parent.set){
                    lastSelected = parent.get('lastSelectedContact');
                    if(!_.isUndefined(lastSelected)){ //ember throw ember if variable not exist in parent controller
                        parent.set('lastSelectedContact',null);
                    }
                }
                this.set('isSelected',false);
            },
            inviteContact : function(){
                console.log('invite',this.get('contactNetworks'),this.get('parentController'));//,this.get('parentController').get('lastSelectedContact'))
            },
            saveContact : function(){
                console.log('save',this.get('contactNetworks'),this.get('parentController'));//,this.get('parentController').get('lastSelectedContact'))
            },
            deleteContact : function(){
                console.log('delete',this.get('contactNetworks'),this.get('parentController'));//,this.get('parentController').get('lastSelectedContact'))
            },
            addContact: function(){
                console.log('add',this,this.get('contactNetworks'),this.get('parentController'));//,this.get('parentController').get('lastSelectedContact'))
            },
            cancelAdd: function(){
                var parent = this.get('parentController');
                if(parent && parent.send) {
                    try {
                        parent.send('cancelAddContact'); console.log('send cancel action');
                    } catch (e) {
                        console.log(e);
                    }
                }
            }
        }
    })
})();