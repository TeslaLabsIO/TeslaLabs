/*This service is responsible for
* handle sending of sync request to api
* handle the frequency of sync requests sent to api
* */
App.SynchronizeService = App.Service.extend({});

App.SynchronizeService.reopenClass({
    syncInProgress:false,
    dataTimeOut:8,
    emptyDataTimeOut:4,
    stack:[],
    syncStartTime : 0,
    resetSyncService : function(){
        this.stack = [];
        this.syncStartTime =  new Date().getTime();
        //APP_Sync.StopAll();//stop all requests on progress to prevent save last modified header without fire callbacks
    },
    processNextRequest:function(){
        if(!this.syncInProgress && this.stack.length) {
            this.syncInProgress = true;
            //get first option
            var syncOptions = this.stack.splice(0, 1)[0];
            var self = this;
            if(syncOptions.requestTime < self.syncStartTime) {
                self.prepareNextRequest();
                return;
            }else{
                if(syncOptions.onSyncStart){
                    syncOptions.onSyncStart();
                }
            }
            var ajax = APP_Sync.GetData(Ember.$.extend(syncOptions,{
                successCallback: function (data, textStatus, jqXHR, isLast) {
                    if(syncOptions.requestTime >= self.syncStartTime) {
                        syncOptions.onSyncSuccess(data, textStatus, jqXHR);
                    }else{
                        APP_Storage.removeValues(syncOptions.lastModifiedKey);
                    }
                    self.prepareNextRequest();
                },
                errorCallback: function (jqXHR, textStatus, errorThrown, isLast) {
                    if(syncOptions.requestTime >= self.syncStartTime) { //not old sync request
                        SetErrorMessage(jqXHR);
                        syncOptions.onSyncError(jqXHR, textStatus, errorThrown);
                    }else{
                        APP_Storage.removeValues(syncOptions.lastModifiedKey);
                    }
                    self.prepareNextRequest();
                },
                oldTimerCallback:function(){
                    self.prepareNextRequest();
                }
            }));

            return ajax;
        }
    },
    prepareNextRequest:function(){
        var self = this;
        self.syncInProgress = false;//if there another request start from run later we don't want it to wait for timeout
        self.processNextRequest();
    },
    addNewRequest:function(syncOptions){
        this.stack.push(syncOptions);
    },
    addEmptyDataRequest:function(syncOptions){
        var self = this;
        syncOptions.requestTime = new Date().getTime();
        Ember.run.later(function () {
            self.addNewRequest(syncOptions);
            self.processNextRequest();
        }, self.emptyDataTimeOut*60000)//millisecond
    },
    addEmptyStorageRequest : function(syncOptions){
        var self = this;
        syncOptions.requestTime = new Date().getTime();
        Ember.run.later(function () {
            self.addNewRequest(syncOptions);
            self.processNextRequest();
        }, _.isNumber(syncOptions.syncTimeout) ? syncOptions.syncTimeout : 10000);//default is 10 second
    },
    handleEmptyDataRequest:function(syncOptions,oldData){
        var self = this;
        syncOptions.requestTime = new Date().getTime();
        if(oldData && oldData.length) {//if we have data already so delay request for sometime
            this.addEmptyDataRequest(syncOptions);//run after empty data timeout when Q empty
        }else{
            this.addEmptyStorageRequest(syncOptions);//run after syncTimeout timeout when Q empty
        }
    },
    addDataRequest:function(syncOptions){
        var self = this;
        syncOptions.requestTime = new Date().getTime();
        Ember.run.later(function () {
            self.addNewRequest(syncOptions);
            self.processNextRequest();
        }, self.dataTimeOut*60000)//millisecond
    }
});