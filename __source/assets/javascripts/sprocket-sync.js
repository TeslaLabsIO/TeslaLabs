/**
 * Created by mahmoud on 6/17/14.
 */
//-------------------------------Apps Sync keys and func----------------------------
var APP_Sync_Keys={
    facebookSyncTimeOut : 10000,
    googlePlusSyncTimeOut : 10000,
    youtubeSyncTimeOut : 10000,
    linkedInSyncTimeOut : 10000,
    twitterSyncTimeOut : 10000,
    vimeoSyncTimeOut : 10000,
    yelpSyncTimeOut : 10000,
    yelpPlacesSyncTimeOut : 10000,
    tumblrSyncTimeOut : 10000,
    redditSyncTimeOut : 10000
    /*,facebookMessageSync:null,
     facebookPostSync:null,*/
};
var APP_Sync_Methods={
    syncId:1,
    GetData:function(options){
        //options.syncForEver = true;
        //url,successCallback,errorCallback,lastModifiedKey,syncUntilData,syncForEver,StopOutOfPage,syncTimeout,stopOnError
        /*if(!object){
         object=setTimeout(callback,timeout)
         }*/
        var _self=this;
        if((!_self[options.lastModifiedKey+"_sync_in_progress"]) && getCookie(APP_Cookies.userID)!=""){
            //alert('x')
            console.log('*** request');
            _self[options.lastModifiedKey+"_sync_in_progress"]=true;

            var ifModifiedPost=APP_Storage.getValue(options.lastModifiedKey,0)==0 ? {} : {'If-Modified-Since':APP_Storage.getValue(options.lastModifiedKey)};

            var StartTimer = _self[options.lastModifiedKey+"_sync_timer"];

            //timer was stopped and will start now
            if(typeof(StartTimer)!="undefined" && StartTimer==null){
                _self[options.lastModifiedKey+"_sync_timer"]=-1;
                StartTimer = _self[options.lastModifiedKey+"_sync_timer"];
            }

            options.SyncId = options.SyncId ? options.SyncId : (this.syncId++);

            _self[options.lastModifiedKey+"_sync_id"] = options.SyncId;

            console.log(options.SyncId);
            //alert('Sync ID'+options.SyncId);

            //this.Stop(options.lastModifiedKey);

            return Ember.$.ajax(options.url, {

                cache:false,//prevent caching

                type: 'GET',
                dataType: 'JSON',
                headers: Em.$.extend({'Content-type': 'application/json' },ifModifiedPost , (options.header ? options.header : {})),
                success: function (data, textStatus, jqXHR) {
                    console.log('*** sync req success');
                    //alert(options.toSource())
                    //setTimeout(function(){

                    _self[options.lastModifiedKey+"_sync_in_progress"]=false;

                    //},1000);

                    var isLast=true;
                    var OldTimer=false;
                    //alert('Start:'+StartTimer);
                    var CurrentTimer = _self[options.lastModifiedKey+"_sync_timer"];
                    //alert('Curre:'+CurrentTimer);
                    options.prevTimer = options.prevTimer? options.prevTimer : CurrentTimer;
                    //alert('Prev:'+options.prevTimer);
                    //alert('Mod Prev:'+options.prevTimer)

                    if(jqXHR.status==200){
                        if(options.syncForEver){
                            isLast=false;
                        }
                    }else{ //if(jqXHR.status==304){
                        if(options.syncUntilData || options.syncForEver){
                            isLast=false;
                        }
                    }
                    //user logged out [OR] stop to timer happen while first req in progress [OR] stop happen in progress and new timer start
                    //[OR] another timer start while prev timer was wait for timeout interval
                    //------------------------------add condition on error too--------------------------------------
                    console.log('********** ',StartTimer,' **** ',CurrentTimer,' **** ',options.prevTimer);
                    if((getCookie(APP_Cookies.userID)=="") ||
                        (typeof(CurrentTimer)!="undefined" &&
                            ((CurrentTimer==null && typeof(StartTimer)=="undefined")||  StartTimer!=CurrentTimer || options.prevTimer!=CurrentTimer))
                        ){
                        isLast=true;
                        OldTimer=true;
                    }

                    if(!OldTimer && jqXHR.getResponseHeader('Last-Modified')){
                        APP_Storage.setValue(options.lastModifiedKey,jqXHR.getResponseHeader('Last-Modified'));
                    }
                    var forceStop=false;

                    if(!OldTimer && options.keepTimerData){
                        var resetTimer = setTimeout(function() {},1);
                        _self[options.lastModifiedKey + "_sync_timer"] = resetTimer;
                        options.prevTimer = resetTimer;
                    }

                    if(!OldTimer && options.successCallback){
                        var returned = options.successCallback(data, textStatus, jqXHR,isLast);//,false);//normal flow so delayed (last param) is set to false
                        if(typeof(returned)!="undefined" && returned){
                            forceStop=true;
                        }
                    }

                    if(OldTimer && options.oldTimerCallback){
                        options.oldTimerCallback(data, textStatus, jqXHR,isLast,'success');
                    }

                    if(!isLast && !forceStop){
                        _self[options.lastModifiedKey+"_sync_timer"] = setTimeout(function(){ _self.GetData(options); },options.syncTimeout);
                        //var x=new Date().getTime()
                        options.prevTimer = _self[options.lastModifiedKey+"_sync_timer"];//this will effect in call as it happen after seconds
                        //alert((new Date().getTime())-x)
                    }
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    console.log('*** sync req error');
                    //alert(options.toSource())
                    _self[options.lastModifiedKey+"_sync_in_progress"]=false;

                    var isLast=true;
                    var OldTimer=false;
                    var CurrentTimer = _self[options.lastModifiedKey+"_sync_timer"];

                    options.prevTimer = options.prevTimer? options.prevTimer : CurrentTimer;

                    if((options.syncUntilData || options.syncForEver) && !options.stopOnError){
                        isLast=false;
                    }

                    //user logged out [OR] stop to timer happen while first req in progress [OR] stop happen in progress and new timer start
                    //[OR] another timer start while prev timer was wait for timeout interval
                    //------------------------------add condition on success too--------------------------------------
                    if((getCookie(APP_Cookies.userID)=="") ||
                        (typeof(CurrentTimer)!="undefined" &&
                            ((CurrentTimer==null && typeof(StartTimer)=="undefined")||  StartTimer!=CurrentTimer || options.prevTimer!=CurrentTimer))
                        ){
                        isLast=true;
                        OldTimer=true;
                    }

                    if(!OldTimer && options.keepTimerData){
                        var resetTimer = setTimeout(function() {},1);
                        _self[options.lastModifiedKey + "_sync_timer"] = resetTimer;
                        options.prevTimer = resetTimer;
                    }

                    if(!OldTimer && options.errorCallback){
                        options.errorCallback(jqXHR, textStatus, errorThrown,isLast);
                    }

                    if(OldTimer && options.oldTimerCallback){
                        options.oldTimerCallback(errorThrown, textStatus, jqXHR,isLast,'error');
                    }

                    if(!isLast){
                        _self[options.lastModifiedKey+"_sync_timer"] = setTimeout(function(){ _self.GetData(options); },options.syncTimeout);
                        options.prevTimer = _self[options.lastModifiedKey+"_sync_timer"];//this will effect in call as it happen after seconds
                    }
                }
            });
        }else{
            console.log('*** empty');
            var _self = this;
            console.log(options.SyncId);
            if(getCookie(APP_Cookies.userID)!="") {
                var currentTimer = _self[options.lastModifiedKey + "_sync_timer"];
                var syncId = _self[options.lastModifiedKey + "_sync_id"];
                var newTimer = false;
                //there is old timer and [ this is not processed request (so it should be new) or this is newest request ]
                //prevTimer undefined this happen also in first model req so in this case newTimer will be true which will stop old and make callback
                //or this request id is larger than one is processed now
                //if this is the newest timer we have to stop old
                //if (currentTimer && (typeof(options.prevTimer) == "undefined" || options.prevTimer > currentTimer || options.SyncId >= syncId)) {
                if (syncId && (typeof(options.SyncId) == "undefined" || options.SyncId >= syncId)) {//the current req id >= last processed id
                    newTimer = true;
                    _self.Stop(options.lastModifiedKey);//stop old timer
                    //we have to use new timer id (fake) because if we just leave it null , old request will treated as valid request
                    //because timer doesn't change (it still -1 from start to end of request)
                    var resetTimer = setTimeout(function() {},1);
                    _self[options.lastModifiedKey + "_sync_timer"] = resetTimer;
                    options.prevTimer = resetTimer;
                    return _self.GetData(options);
                }
            }
            return new Ember.RSVP.Promise(function(resolve, reject) {
                if(options.oldTimerCallback){
                    options.oldTimerCallback(null, null, null,null,null);
                }
                //on success
                resolve(null);//response

                //on failure
                //reject(reason)
            });
           /* return new Em.RSVP.Promise(function(resolve, reject) {
                //if user still logged
                var response = {
                    data : null,
                    textStatus : null,
                    jqXHR : {status: 0},
                    isLast : null,
                    delayed : null
                };
                if(getCookie(APP_Cookies.userID)!="") {
                    var currentTimer = _self[options.lastModifiedKey + "_sync_timer"];
                    var syncId = _self[options.lastModifiedKey+"_sync_id"];
                    var newTimer = false;
                    //there is old timer and [ this is not processed request (so it should be new) or this is newest request ]
                    //prevTimer undefined this happen also in first model req so in this case newTimer will be true which will stop old and make callback
                    //or this request id is larger than one is processed now
                    //if this is the newest timer we have to stop old
                    //if (currentTimer && (typeof(options.prevTimer) == "undefined" || options.prevTimer > currentTimer || options.SyncId >= syncId)) {
                    if (syncId && (typeof(options.SyncId) == "undefined" || options.SyncId >= syncId)) {//the current req id >= last processed id
                        newTimer = true;
                        _self.Stop(options.lastModifiedKey);//stop old timer
                    }

                    var forceStop = false;
                    var recall = false;
                    if (newTimer && options.successCallback) {
                        //normal flow so delayed (last param) is set to true
                        response = {
                            data : [],
                            textStatus : "",
                            jqXHR : {status: 304},
                            isLast : false,
                            delayed : true
                        };
                        //init sync if it's handled to start again in 304
                        var returned = options.successCallback(response.data,response.textStatus,response.jqXHR,response.isLast,response.delayed);
                        if (returned === true) {
                            forceStop = true;
                        }
                        //if returned = undefined and sync until data = false , timer will not start again but the old one will stop
                        //if = false & sync until data = false , timer will start and old will stop
                        if (returned === false) {
                            recall = true; //override check on sync until data , if returned
                        }
                    }

                    //304 should make auto call what ever value of sync until data / forever
                    if ((options.syncUntilData || options.syncForEver || recall) && !forceStop && newTimer) {
                        _self[options.lastModifiedKey + "_sync_timer"] = setTimeout(function () {
                            _self.GetData(options);
                        }, options.syncTimeout);
                        options.prevTimer = _self[options.lastModifiedKey + "_sync_timer"];//this will effect in call as it happen after seconds
                    }
                }
                //on success
                resolve(null);//response

                //on failure
                //reject(reason)
            });*/
        }
    },
    StopAll:function(){
        var timerKey;
        for(var k in this){
            if(typeof(this[k])!="undefined" && typeof(this[k])!="function"){
                if(k.indexOf("_sync_timer")!=-1){
                    //this[k+"stopped_id"] = this[k];
                    clearTimeout(this[k]);
                    this[k]=null;
                }else if(k.indexOf("_sync_in_progress")!=-1){
                    this[k]=false;
                    timerKey = (k.split('_sync_in_progress')[0]);//get last modified key from K
                    timerKey += "_sync_timer";//append sync timer identifier
                    //if it's already exist so no problem it will be handled in the above if condition but if not we have to handle it
                    if(!this[timerKey]){
                        this[timerKey]=null;
                    }
                }
            }
        }
    },
    Stop:function(lastModifiedKey,stopAll){
        if(stopAll){
            this.StopAll();
        }
        //alert(lastModifiedKey)
        if(lastModifiedKey){
            if(typeof(lastModifiedKey)=="string"){
                console.log('*** start stop '+lastModifiedKey)
                this[lastModifiedKey+"_sync_in_progress"]=false;
                if(this[lastModifiedKey+"_sync_timer"]){
                    clearTimeout(this[lastModifiedKey+"_sync_timer"])
                }
                this[lastModifiedKey+"_sync_timer"]=null;
                console.log('*** finish stop '+lastModifiedKey)
            }else{
                var key="";
                for(var i=0;i<lastModifiedKey.length;i++){
                    key=lastModifiedKey[i];
                    this[key+"_sync_in_progress"]=false;
                    if(this[key+"_sync_timer"]){
                        clearTimeout(this[key+"_sync_timer"])
                    }
                    this[key+"_sync_timer"]=null;
                }
            }
        }
    }
}

var APP_Sync = jQuery.extend(true,APP_Sync_Methods,APP_Sync_Keys);