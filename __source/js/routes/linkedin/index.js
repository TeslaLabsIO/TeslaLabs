App.LinkedinRoute = Ember.Route.extend({
    queryParams: {
        skip: {
            replace: true
        }
    },
    deactivate: function () {
        var controller = this.controllerFor('linkedin')
        //controller.send('ReloadModel', true);
        controller.set('lastDisplayedLinkedInID', -1);
        //console.log('------------deactivate linkedin')
    },
    actions: {
        error: function (reason) {
            if (reason.status == 401) {//handled globally
                //APP_Storage.removeValues([APP_Storage.linkedInUserID()])
                //location.reload();
            } else {
                SetErrorMessage(reason, APP_External_Network.LinkedIn);
            }
        }
    },
    beforeModel: function (transition) {
        // run application beforeModel
        this._super(transition);
        // redirect to tool-tip page if network sync is nor completed
        var constant = this.get('constant');
        var pollingManager = this.get('pollingManager');
        var networkActivated = App.OauthService.isNetworkActivated(constant.linkedinId,true);
        if (!(transition.queryParams && transition.queryParams.skip && transition.queryParams.skip == 'true') && location.protocol.indexOf('https') == -1 && APP_Cookies.getCookie(APP_Cookies.userID) != "") {
            if (networkActivated && !pollingManager.ifAnyEntitySyncCompleted(constant.linkedinId))
                this.transitionTo('sync', {queryParams: {network: constant.linkedinId}});
        }
    },
    model: function () {
        console.log('\n \n ** linkedin reset sync service \n \n');

        App.SynchronizeService.resetSyncService();

        console.log('\n \n ** linkedin reset sync service \n \n');

        //if (APP_Storage.getValue(APP_Storage.linkedInUserID()) == null) {
        var networkActivated = App.OauthService.isNetworkActivated(APP_External_Network.LinkedIn);
        var redirect = false;
        //alert(location.href)
        if(APP_Cookies.getCookie(APP_Cookies.userID) != "") {
            if (networkActivated) {
                //APP_Storage.setValue(APP_Storage.linkedInUserID(),result[0].identifier,false,true);//save on http or [on https to hide login button in the view]
                if (location.protocol.indexOf('https') != -1) {
                    redirect = true;
                    //location.protocol = 'http';
                    location.href = location.href.replace(location.hash, '#/linkedin').replace('https', 'http');//this fix access for sync?network=3 while linkedin is logged
                }
            } else {
                APP_Storage.removeValues(APP_Storage.linkedInUserID());//if this value exist on LS >> it's invalid value so we have to remove it
                if (location.protocol.indexOf('https') == -1) { // on http and user not logged yet
                    redirect = true;
                    //location.protocol = 'https';
                    location.href = location.href.replace(location.hash, '#/linkedin').replace('http', 'https');//this fix access for sync?network=3 while linkedin not logged
                }
            }
        }
        //}

        if (APP_Cookies.getCookie(APP_Cookies.userID) != "" && APP_Storage.getValue(APP_Storage.linkedInUserID()) != null && !redirect) {
            var dataStorageKeys = App.CONSTANT.get('network.' + APP_External_Network.LinkedIn).dataStorageKeys;
            return Ember.RSVP.hash({
                linkedInPosts: APP_Storage.getValue(dataStorageKeys.activities, [], true)
            });
        } else {
            return Ember.RSVP.hash({
                linkedInPosts: []//APP_Storage.getValue(APP_Storage.linkedInPost,[],true)
            });
        }

    }
});