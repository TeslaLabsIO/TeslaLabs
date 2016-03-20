
App.YelpService = App.Service.extend({});

App.YelpService.reopenClass({
    provider : APP_External_Network.Yelp ,
    getDistanceBetweenPoints : function (p1Lat,p1Lng, p2Lat,p2Lng) {
        var R = 6371; // Radius of the Earth in km
        var dLat = (p2Lat - p1Lat) * Math.PI / 180;
        var dLon = (p2Lng - p1Lng) * Math.PI / 180;
        var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(p1Lat * Math.PI / 180) * Math.cos(p2Lat * Math.PI / 180) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        var d = R * c;
        return d;//Math.abs(d);
    },
    updateNeighbourhoodsStorage : function(){
        var userLocation = APP_Storage.getValue(APP_Storage.userLocationInfo(),'').split(',');
        var userLocationExist = userLocation.length==2;
        userLocation = userLocationExist ? {latitude:Number(userLocation[0]),longitude:Number(userLocation[1])} : {};
        var minDistance = 1000000;
        var distance;
        var neighborhoodPlaceId=-1;
        var neighborhoodId;
        var grouped = {};

        var storage = APP_Storage.getValue(APP_Storage.yelpPlaces,[],true);
        storage = _.sortBy(storage,'name');
        APP_Storage.setValue(APP_Storage.yelpPlaces, storage, true);

        var self = this;
        _.each(storage,function(place,index){
            if(_.isUndefined(grouped[place.name[0]])){
                grouped[place.name[0]] = index;
            }
            //if(userLocationExist && place.parent && place.parent.boundingBox && place.parent.boundingBox.center){
            if(userLocationExist && place.boundingBox && place.boundingBox.center){
                distance = self.getDistanceBetweenPoints(userLocation.latitude,userLocation.longitude,
                    place.boundingBox.center.latitude,place.boundingBox.center.longitude);
                //place.parent.boundingBox.center.latitude,place.parent.boundingBox.center.longitude);
                if(distance<minDistance){
                    minDistance=distance;
                    neighborhoodPlaceId = place.placeId;//place.parent.placeId
                    neighborhoodId=index;
                }
            }
        });
        if(neighborhoodPlaceId != -1){
            APP_Storage.setValue(APP_Storage.userNeighbourhoodId,neighborhoodPlaceId);
        }
        console.log('user nh --------------- '+neighborhoodPlaceId + ','+ neighborhoodId);
        console.log('******* ' , grouped);
        APP_Storage.setValue(APP_Storage.yelpPlacesGrouped,grouped,true);
    } ,
    getInterestsOneLevel:function(storageKey,ids){
        storageKey = storageKey ? storageKey : APP_Storage.yelpInterests;
        var storage = APP_Storage.getValue(storageKey,[],true);
        storage = _.sortBy(storage,'name'); // sort parent
        APP_Storage.setValue(storageKey, storage, true);

        var keys={};
        var filtered=[];
        ids = ids ? ids : [];
        _.each(storage,function(element){
            if(!keys[element.name]){
                filtered.push({id:element.id , name:element.name});
                keys[element.name]=true;
                ids.push(element.id);
            }
            _.each(element.children,function(child){
                if(!keys[child.name]){
                    filtered.push({id:child.id , name:child.name});
                    keys[child.name]=true;
                    ids.push(child.id);
                }
                _.each(child.children,function(secondChild){
                    if(!keys[secondChild.name]){
                        filtered.push({id:secondChild.id , name:secondChild.name});
                        keys[secondChild.name]=true;
                        ids.push(secondChild.id);
                    }
                })
            })
        });
        return filtered;
    },
    getInterestsList : function(storageKey,ids){
        var filtered= this.getInterestsOneLevel(storageKey,ids);
        //if selection of interest is required we will add field with `space` to be able to reset selection of list when needed (in this case the field will be hidden)
        //if it's not required we will display item with empty string for user so he can reset selection him self or we use to reset too
        filtered = filtered.length ? [{id:-1,name:''}].concat(filtered) : [{id:-1,name:' '},{id:-2,name:'Loading...'}];
        return filtered;
    },
    getUserNeighbourhoodFavourite : function(){
        var userNeighbourhoodId = APP_Storage.getValue(APP_Storage.userNeighbourhoodId);

        var favourites = APP_Storage.getValue(APP_Storage.yelpAllFav, [], true);
        favourites = _.sortBy(favourites,'name');
        APP_Storage.setValue(APP_Storage.yelpAllFav, favourites, true);

        var filtered = [];
        if(userNeighbourhoodId){
            _.each(favourites, function (fav) {
                if (fav.parent && fav.parent.placeId == userNeighbourhoodId) {
                    filtered.push(fav);
                }
            });
        }
        return filtered;
    },
    getNeighbourhoods : function(options,syncOpt){ //last modified will be saved what ever value of save data
        //get places list used in find functionality
        var saveData = options && options.saveData;
        var region = options && options.region;
        region = region ? region : "us";

        var lastRegion = APP_Storage.getValue(APP_Storage.yelpPlacesLastRegion);
        if(lastRegion && lastRegion != region){
            APP_Storage.removeValues([APP_Storage.yelpPlacesLastModified,APP_Storage.yelpPlaces,APP_Storage.yelpPlacesGrouped]);//to get all data for new region
        }

        var syncOptions = {
            url : this.baseUrl + "places/users/" + this.userId + "/regions/" + region + "/neighborhoods",
            lastModifiedKey: APP_Storage.yelpPlacesLastModified,
            syncUntilData: false,//will be true in sync fn
            syncForEver: false,
            syncTimeout: APP_Sync.yelpPlacesSyncTimeOut,
            stopOnError: true
        };

        syncOpt = syncOpt ? syncOpt : {};

        var lastModified = APP_Storage.getValue(APP_Storage.yelpPlacesLastModified);

        if(lastModified != null){
            $.extend(syncOptions,{
                header:{
                    'delta' : true
                }
            });
        }
        var self = this;
        var time = new Date().getTime();
        console.log('place request time ' + time);
        return APP_Sync.GetData($.extend({}, syncOptions , syncOpt , {
            successCallback: function (data, textStatus, jqXHR, isLast) {
                console.log('place success callback ' + time);
                //if(delayed){ //status will be 304 //user then in this case will valid the promise but request will continue and data will be saved
                //    return false;//create new timer and start new call
                //}

                APP_Storage.setValue(APP_Storage.yelpPlacesLastRegion , region);

                if(saveData && jqXHR.status == 200) {
                    var storage =[];
                    if(lastModified){
                        //if end point support last modified and we have old data >> append data
                        storage = APP_Storage.getValue(APP_Storage.yelpPlaces,[],true);
                    }
                    storage = (data.places).concat(storage);
                    storage = _.sortBy(storage,'name');
                    APP_Storage.setValue(APP_Storage.yelpPlaces, storage, true);
                    self.updateNeighbourhoodsStorage();
                }else if(options.updateNeighbourhood){
                    self.updateNeighbourhoodsStorage();
                }
                if(syncOpt && syncOpt.successCallback){
                    syncOpt.successCallback(data, textStatus, jqXHR, isLast)
                }
            },
            oldTimerCallback: function (dataError, textStatus, jqXHR,isLast,type) {
                //type===null >> resolve promise
                //type==='success' >> old timer from success request , first param will be data
                //type==='error >> old timer from error request , first param will be error
                console.log('place '+type+' old timer callback'+time);
                if(syncOpt && syncOpt.oldTimerCallback){
                    syncOpt.oldTimerCallback(dataError, textStatus, jqXHR,isLast,type)
                }
            },
            errorCallback: function (jqXHR, textStatus, errorThrown,isLast) {
                SetErrorMessage(jqXHR);
                if(syncOpt && syncOpt.errorCallback){
                    syncOpt.errorCallback(jqXHR, textStatus, errorThrown,isLast)
                }
            }
        }));
    },
    getInterests : function(options,syncOpt){ //last modified will be saved what ever value of save data
        //get interests list used in find functionality
        var saveData = options && options.saveData;
        var syncOptions = {
            url : this.baseUrl + "analytics/users/" + this.userId + "/interests",
            lastModifiedKey: APP_Storage.yelpInterestsLastModified,
            syncUntilData: false,//will be true in sync fn
            syncForEver: false,
            syncTimeout: APP_Sync.yelpPlacesSyncTimeOut,
            stopOnError: true
        };

        syncOpt = syncOpt ? syncOpt : {};

        var lastModified = APP_Storage.getValue(APP_Storage.yelpInterestsLastModified);
        if(lastModified != null){
            $.extend(syncOptions,{
                header:{
                    'delta' : true
                }
            });
        }
        var time = new Date().getTime();
        console.log('interest request time ' + time);
        return APP_Sync.GetData($.extend({}, syncOptions , syncOpt , {
            successCallback: function (data, textStatus, jqXHR, isLast) {
                console.log('interests success callback '+time);
                //if(delayed){ //status will be 304 //user then in this case will valid the promise but request will continue and data will be saved
                //    return false;//create new timer and start new call
                //}

                if(saveData && jqXHR.status == 200) {
                    var storage =[];
                    if(lastModified){
                        //if end point support last modified and we have old data >> append data
                        storage = APP_Storage.getValue(APP_Storage.yelpInterests,[],true);
                    }
                    storage = (data.interests).concat(storage);//new data added first like on polling manager
                    APP_Storage.setValue(APP_Storage.yelpInterests, storage, true);
                }
                if(syncOpt && syncOpt.successCallback){
                    syncOpt.successCallback(data, textStatus, jqXHR, isLast)
                }
            },
            oldTimerCallback: function (dataError, textStatus, jqXHR,isLast,type) {
                //type===null >> resolve promise
                //type==='success' >> old timer from success request , first param will be data
                //type==='error >> old timer from error request , first param will be error
                console.log('interest '+type+' old timer callback'+time);
                if(syncOpt && syncOpt.oldTimerCallback){
                    syncOpt.oldTimerCallback(dataError, textStatus, jqXHR,isLast,type)
                }
            },
            errorCallback: function (jqXHR, textStatus, errorThrown,isLast) {
                SetErrorMessage(jqXHR);
                if(syncOpt && syncOpt.errorCallback){
                    syncOpt.errorCallback(jqXHR, textStatus, errorThrown,isLast)
                }
            }
        }));
    },
    getAllFavourites : function(options,syncOpt){ //last modified will be saved what ever value of save data
        var all = options && options.all;
        var saveData = options && options.saveData;
        if(all){
            APP_Storage.removeValues(APP_Storage.yelpAllFavLastModified)
        }

        var syncOptions = {
            url : this.baseUrl + "places/users/" + this.userId + "/providers/" + this.provider + "/favorites",
            lastModifiedKey: APP_Storage.yelpAllFavLastModified,
            syncUntilData: false,//will be true in sync fn
            syncForEver: false,
            syncTimeout: APP_Sync.yelpSyncTimeOut,
            stopOnError: true
        };

        syncOpt = syncOpt ? syncOpt : {};

        var lastModified = APP_Storage.getValue(APP_Storage.yelpAllFavLastModified);

        if(lastModified != null && !all){
            $.extend(syncOptions,{
                header:{
                    'delta' : true
                }
            });
        }
        var time = new Date().getTime();
        console.log('all fav request time ' + time);
        return APP_Sync.GetData($.extend({}, syncOptions , syncOpt , {
            successCallback: function (data, textStatus, jqXHR, isLast) {
                console.log('all fav success callback '+time);
                //if i returned the promise i don't want request to continue because we use then after this function
                /*if(delayed){ //status will be 304
                    return false;//create new timer and start new call
                }*/

                if(saveData && jqXHR.status == 200) {
                    var storage =[];
                    if(lastModified && !all){
                        //if end point support last modified and we have old data >> append data
                        storage = APP_Storage.getValue(APP_Storage.yelpAllFav,[],true);
                    }
                    if(all){
                        APP_Storage.removeValues(APP_Storage.yelpAllFavLastModified);//because we get all data and will not append them so remove header for next request
                    }
                    //storage = storage.concat(data.places);
                    storage = (data.places.reverse()).concat(storage);//last updated first this is useful in yelp feed sorting instead of use name for sorting;
                    APP_Storage.setValue(APP_Storage.yelpAllFav, storage, true);
                }
                if(syncOpt && syncOpt.successCallback){
                    syncOpt.successCallback(data, textStatus, jqXHR, isLast)
                }
            },
            oldTimerCallback: function (dataError, textStatus, jqXHR,isLast,type) {
                //type===null >> resolve promise
                //type==='success' >> old timer from success request , first param will be data
                //type==='error >> old timer from error request , first param will be error
                console.log('all fav '+type+' old timer callback'+time);
                if(syncOpt && syncOpt.oldTimerCallback){
                    syncOpt.oldTimerCallback(dataError, textStatus, jqXHR,isLast,type)
                }
            },
            errorCallback: function (jqXHR, textStatus, errorThrown,isLast) {
                if(syncOpt && syncOpt.errorCallback){
                    syncOpt.errorCallback(jqXHR, textStatus, errorThrown,isLast)
                }
            }
        }));
    },
    getFavourites : function(placeId){
        //get fav list for display / find : placeId optional
        //when user has not location error message is : {"messages":["User location is not available"],"code":1001} , status : 400
        var endpoint = '';
        if(typeof(placeId) == "undefined" || placeId==null){
            endpoint = this.baseUrl + "places/users/" + this.userId + "/providers/" + this.provider + "/favorites/places/current";
        }else{
            endpoint = this.baseUrl + "places/users/" + this.userId + "/providers/" + this.provider + "/favorites/places/" + placeId;
        }
        return Ember.$.ajax({
                url: endpoint,
                type: 'GET',
                dataType: 'JSON',
                headers: {
                    'Content-type': 'application/json'
                }
            }
        );
    },
    getMostPopular : function(interestId,placeId){
        //get most popular for display / find : placeId optional
        //when user has not location error message is : {"messages":["User location is not available"],"code":1001} , status : 400
        var endpoint = '';
        if(typeof(placeId) == "undefined" || placeId==null){
            endpoint = this.baseUrl + "places/users/" + this.userId + "/providers/" + this.provider + "/places/current";
        }else{
            endpoint = this.baseUrl + "places/users/" + this.userId + "/providers/" + this.provider + "/places/" + placeId;
        }
        endpoint +=  (interestId ? ("?interestId=" + interestId) : "");
        return Ember.$.ajax({
                url: endpoint,
                type: 'GET',
                dataType: 'JSON',
                headers: {
                    'Content-type': 'application/json'
                }
            }
        );
    },
    postFavourite : function(item){
        return Ember.$.ajax(this.baseUrl + "places/users/" + this.userId + "/favorites", {
            type: 'POST',
            dataType: 'JSON',
            headers: {
                'Content-type': 'application/json'
            },
            data: JSON.stringify(item)
        });
    },
    postPlaceLocation : function(placeId,lat,lng){
        return Ember.$.ajax(this.baseUrl + "places/"+placeId+"/users/" + this.userId + "/location", {
            type: 'POST',
            dataType: 'JSON',
            headers: {
                'Content-type': 'application/json'
            },
            data: JSON.stringify({
                center:{
                    latitude:lat,
                    longitude:lng
                },upperRight:{latitude:0,longitude:0},upperLeft:{latitude:0,longitude:0},lowerRight:{latitude:0,longitude:0},lowerLeft:{latitude:0,longitude:0}
            })
        });
    }
});