(function () {
    'use strict';
    App.YelpController = Ember.ObjectController.extend({
        // data
        searchMode: false,
        searchFavMode:false,
        selectedInterest: null,

        placesParentId: [],

        selectedPlace: -1,
        selectedFilter:-1,
        filterStatus:'default',
        lastExpandId:null,
        expandedItem:null,
        modelLoaded : function(){
            var controller = this;
            App.PollingManager.startNetworkSync(
                APP_External_Network.Yelp,
                function (entityName, entitySyncOptions, isStored, newData, updatedIds, data, textStatus, jqXHR) {
                    if(entityName=='neighborhoods'){
                        //alert(entitySyncOptions.region);
                        APP_Storage.setValue(APP_Storage.yelpPlacesLastRegion , entitySyncOptions.region ? entitySyncOptions.region : 'us');
                        App.YelpService.updateNeighbourhoodsStorage();
                        if(newData[0].length || (updatedIds.length && updatedIds[0].length)){
                            controller.set('selectedFilter', -1);
                            controller.set('filterStatus', 'default');
                            controller.set('filteredPlaces', controller.getPlaces());
                        }
                    }else if(entityName == 'interests'){
                        if(newData[0].length || (updatedIds.length && updatedIds[0].length)){
                            controller.set('filteredInterests', App.YelpService.getInterestsList());
                        }
                    }else if(entityName == 'favorites'){
                        if(newData[0].length || (updatedIds.length && updatedIds[0].length)){
                            var favourites = App.YelpService.getUserNeighbourhoodFavourite();
                            if(favourites.length) {
                                controller.set('currentFavourites', favourites);
                                if(!controller.get('searchFavMode')){//not update on search mode
                                    var favouriteIds = {};
                                    _.each(favourites, function (fav) {
                                        favouriteIds[fav.placeId] = true;
                                    });
                                    controller.set('favouriteIds', favouriteIds);
                                }
                            }
                            var selectedPlace = controller.get('selectedPlace');
                            console.log(controller.get('searchFavMode') , selectedPlace);
                            if(controller.get('searchFavMode') && _.isNumber(selectedPlace) && selectedPlace !=-1 && selectedPlace !=-2){
                                var filtered = [];
                                _.each(newData[0], function (fav) {
                                    if (fav.parent && fav.parent.placeId == selectedPlace) {
                                        filtered.push(fav);
                                    }
                                });
                                //if (filtered.length) {
                                controller.send('removeDuplicated',filtered);
                            }
                        }
                    }
                },
                function (entityName, entitySyncOptions, jqXHR, textStatus, errorThrown) {//error function

                },
                function (entityName,entitySyncOptions){ // sync started
                    console.log(entityName,entitySyncOptions);
                    if(entityName=='neighborhoods'){
                        var lastRegion = APP_Storage.getValue(APP_Storage.yelpPlacesLastRegion);
                        //alert(lastRegion);alert(entitySyncOptions.region);
                        if(lastRegion && entitySyncOptions.region && lastRegion != entitySyncOptions.region){
                            APP_Storage.removeValues([APP_Storage.yelpPlacesLastModified,APP_Storage.yelpPlaces,APP_Storage.yelpPlacesGrouped]);//to get all data for new region
                        }
                    }
                }
            )
        }.observes('model'),
        getPlaces:function(update){

            this.set('expandedItem',null)

            console.log(new Date().getTime())
            var firstPlaces = [{placeId:-1,name:''}];
            var filterStatus=this.get('filterStatus');

            var selected = this.get('selectedFilter');//selectedFilter');
            console.log('*********** '+ selected);
            //alert(selected)
            var expandId= -1;
            var id=1;
            var firstIds = APP_Storage.getValue(APP_Storage.yelpPlacesGrouped,null,true);
            var allPlaces = APP_Storage.getValue(APP_Storage.yelpPlaces,[],true);
            var itemId=0;
            var expandedItem=0;
            if(firstIds && allPlaces.length){
                firstPlaces[0].name = '(Current Location)';
                var lastId=1;
                var currentId=0;
                var expandValue='';
                var collapseValue= '';
                var element;
                for(var char in firstIds){
                    currentId = firstIds[char];
                    if((currentId-1)>=(lastId+1)){
                        expandValue = 'expand,'+(lastId+1)+','+(currentId-1);
                        collapseValue = 'collapse,'+(lastId+1)+','+(currentId-1);

                        if(selected==expandValue && filterStatus=='expand'){
                            firstPlaces.push({placeId:collapseValue,name:'▼'});//more arrow
                            expandId=id;
                            expandedItem = itemId-1;
                            id++;
                        }else if(selected==collapseValue && filterStatus=='collapse'){
                            firstPlaces.push({placeId:expandValue,name:'►'});//more arrow
                            expandId=id;
                            id++;
                        }else{// filterStatus=='default'){
                            firstPlaces.push({placeId:expandValue,name:'►'});//more arrow
                            id++;
                        }
                    }
                    element = allPlaces[currentId];
                    firstPlaces.push({placeId:element.placeId,name:element.name});
                    //firstPlaces.push(allPlaces[currentId])
                    lastId = currentId;
                    id++;
                    itemId++;
                }
                currentId = allPlaces.length-1;
                if((currentId-1)>=(lastId+1)){
                    expandValue = 'expand,'+(lastId+1)+','+(currentId-1);
                    collapseValue = 'collapse,'+(lastId+1)+','+(currentId-1);

                    if(selected==expandValue && filterStatus=='expand') {
                        firstPlaces.push({placeId: collapseValue, name: '▼'});//more arrow
                        expandId = id;
                        expandedItem = itemId-1;
                    }else if(selected==collapseValue && filterStatus=='collapse'){
                        firstPlaces.push({placeId:expandValue,name:'►'});//more arrow
                        expandId=id;
                    }else{// if((selected==collapseValue && filterStatus=='collapse') || filterStatus=='default'){
                        firstPlaces.push({placeId:expandValue,name:'►'});//more arrow
                    }
                }
                //if(filterStatus=='default' || filterStatus=='collapse')
                console.log('***********  '+expandId)
                //console.log(firstPlaces)
                console.log(new Date().getTime())

                var lastExpandId = this.get('lastExpandId');
                this.set('lastExpandId',null);
                //alert(lastExpandId)

                if(filterStatus=='expand'){
                    var value = firstPlaces[expandId].placeId.split(',');
                    var start = Number(value[1]);
                    var end = Number(value[2]);
                    var element={};
                    var arr = this.get('filteredPlaces');
                    //var x={placeId:allPlaces[end].placeId,name:allPlaces[end].name}
                    var newData=[];
                    if(update && lastExpandId){
                        console.log(lastExpandId,firstPlaces[lastExpandId])
                        //alert(firstPlaces[lastExpandId])
                        var lastValue = firstPlaces[lastExpandId].placeId.split(',');
                        var lastLen = Number(lastValue[2]) - Number(lastValue[1]) + 2;
                        arr.replace(lastExpandId,lastLen,[firstPlaces[lastExpandId]]);
                    }
                    for(var i=end ; i>=start;i--){
                        element = allPlaces[i];
                        firstPlaces.splice((expandId+1),0,{placeId:element.placeId,name:'  '+element.name})//allPlaces[i]);
                        newData.push({placeId:element.placeId,name:'  '+element.name});
                        //arr.insertAt(expandId+1,{placeId:element.placeId,name:element.name})
                    }
                    console.log('**| before notify ' + new Date().getTime())
                    if(update){
                        //Em.set(c.get('filteredPlaces')[3],'name',5)
                        //arr[expandId]=firstPlaces[expandId];
                        //arr.replace(expandId+1,0,newData);
                        this.set('lastExpandId',expandId)
                        newData = [firstPlaces[expandId]].concat(newData.reverse());
                        arr.replace(expandId,1,newData);
                        this.notifyPropertyChange('filteredPlaces')
                    }else{
                        //this.set('filteredPlaces',firstPlaces);
                    }
                    this.set('expandedItem',expandedItem);

                }else if(filterStatus=='collapse' && update){
                    var value = firstPlaces[expandId].placeId.split(',');
                    var len = Number(value[2]) - Number(value[1]) + 2;
                    var arr = this.get('filteredPlaces');
                    arr.replace(expandId,len,[firstPlaces[expandId]]);
                    this.notifyPropertyChange('filteredPlaces')
                }
                console.log(new Date().getTime())
                //firstPlaces.push({placeId:lastId+','+(allPlaces.length-1),name:''});//more arrow
            }else{
                firstPlaces.push({placeId:-2,name:'Loading...'});
            }

            //console.log(firstPlaces)
            return firstPlaces;
        },
        //filteredPlaces: [],//[],// APP_Storage.getValue(APP_Storage.yelpPlaces, [], true),
        filteredPlacesLoaded : function(){
            console.log('*********** loaded '+new Date().getTime())
            var i=0;
            var self=this;
            Ember.run.scheduleOnce('afterRender', this, function() {
                console.log('*********** rendered')
                //$('.yelp-search-box ic-autocomplete-option:nth-child(2n)').addClass('yelp-search-expand')
                var text='';
                //self.set('selectedPlace',-1);
                console.log('--- ' +new Date().getTime())
                $('.yelp-search-box .city ic-autocomplete-option').each(function(){
                    //console.log($(this).text().trim(),'**',$(this).text().trim()=='►');

                    text = $(this).text().trim();
                    if(i==0 && text==''){
                        $(this).css({'display':'none'})
                    }
                    if(text=='►'){
                        $(this).addClass('yelp-search-expand yelp-right')
                    }else if(text=='▼') {
                        $(this).addClass('yelp-search-expand yelp-down')
                    }else{
                        $(this).attr('title',$(this).text().trim())
                    }
                    i++;
                })
                if(self.get('expandedItem')!=null){
                    setTimeout(function(){
                        $('.yelp-search-box .city ic-autocomplete-list').mCustomScrollbar("scrollTo", (self.get('expandedItem')+1)*40);
                    },100)
                }
                console.log('--- ' +new Date().getTime())
            })
        }.observes('filteredPlaces'),
        //filteredInterests: [],
        filteredInterestsLoaded:function(){
            //alert('load ' + this.get('filteredInterests').length)
            Ember.run.scheduleOnce('afterRender', this, function() {
                //alert('rend ' + this.get('filteredInterests').length);
                var element = $('.yelp-search-box .interest ic-autocomplete-option')[0];
                var text = $(element).text();//.trim();
                //alert(text)
                if(text==' '){
                    $(element).css({'display': 'none'})
                }
            })
        }.observes('filteredInterests'),
        favouriteIds: {},
        favouriteCount: function () {
            if (this.get('searchFavMode')) {
                return this.get('model.placeFavourites') ? this.get('model.placeFavourites').length : 0;
            } else {
                return this.get('model.currentFavourites') ? this.get('model.currentFavourites').length : 0;
            }
        }.property('searchFavMode', 'model.currentFavourites', 'model.placeFavourites'),

        mostPopularCount: function () {
            if (this.get('searchMode')) {
                return this.get('model.placeMostPopular') ? this.get('model.placeMostPopular').length : 0;
            } else {
                return this.get('model.currentMostPopular') ? this.get('model.currentMostPopular').length : 0;
            }
        }.property('searchMode', 'model.currentMostPopular', 'model.placeMostPopular'),
        currentFavouritesIsNull:function(){
            this.get('model.currentFavourites') ? false : true
        }.property('model.currentFavourites'),
        currentMostPopularIsNull:function(){
            this.get('model.currentMostPopular') ? false : true
        }.property('model.currentMostPopular'),
        //observers
        drawMap : function(place,lat,lng){
            var center = new google.maps.LatLng(lat ? lat : place.boundingBox.center.latitude, lng ? lng : place.boundingBox.center.longitude);
            var mapOptions = {
                zoom: 19,
                center: center
            };
            console.log('set opt');
            console.log(document.getElementById('map-canvas'));
            var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
            console.log('create map');
            var marker = new google.maps.Marker({
                position: center,
                map: map,
                title: place.name,
                icon: 'assets/images/yelpMapIcon.png'
            });
        },
        detailsLoaded: function () {
            Ember.run.scheduleOnce('afterRender', this, function () {
                var places = this.get('model.placeDetails');
                if (places && places.length) {
                    var place = places[0];
                    console.log(place,'--',place.locator,'--',place.address)
                    if(place.boundingBox && place.boundingBox.center){
                        this.drawMap(place)
                    }else{
                        var self = this;
                        var geoCoder = new google.maps.Geocoder();
                        geoCoder.geocode({ 'address': place.locator ? place.locator : place.address }, function (results, status) {
                            if (status == google.maps.GeocoderStatus.OK) {
                                var lat = results[0].geometry.location.lat();
                                var long = results[0].geometry.location.lng();
                                App.YelpService.postPlaceLocation(place.placeId,lat,long)
                                self.drawMap(place,lat,long)
                            }else{
                                App.growl.danger("geocode was not successful for the following reason: " + status);
                            }
                        })
                    }
                    //map.fitBounds(new google.maps.LatLngBounds(sw,ne));
                }
            });
        }.observes('model.placeDetails'),
        x:function(){
            console.log('placeFavourites load '+(new Date().getTime()));
            Ember.run.scheduleOnce('afterRender', this, function () {
                console.log('placeFavourites rendered '+(new Date().getTime()));
            })
        }.observes('placeFavourites'),
        y:function(){
            console.log('placeMostPopular load '+(new Date().getTime()));
            Ember.run.scheduleOnce('afterRender', this, function () {
                console.log('placeMostPopular rendered '+(new Date().getTime()));
            })
        }.observes('placeMostPopular'),
        //actions
        searchInProgress:false,
        searchFavInProgress:false,
        setToolTipHtml:function(title){
            $('#loctooltip').tooltip('destroy');
            $('#loctooltip').tooltip({
                title: title ? title : 'To get the most popular location around your location;click here',
                placement:'left',
                template:'<div class="tooltip" role="tooltip">'+
                    '<div class="tooltip-arrow loc_left_arrow"></div>'+
                    '<div class="tooltip-inner loc_left_title"></div>'+
                    '</div>'
                /*,viewport:{ "selector": "#loctooltip" //,"padding": 0}*/
                //,container:'#local'
            });
        },
        initLocationTooltip : function(title){
            //you to set style for container of tooltip 'position:relative' so tooltip can go with it up and down
            //in this case the container is #local
            this.setToolTipHtml(title);
            if(APP_Storage.getValue(APP_Storage.userLocationInfo(),null)==null || APP_Storage.getValue(APP_Storage.userNeighbourhoodId,null)==null){
                //it's not request before but if he get local feed from another device just show icon
                $('#loctooltip').fadeIn(0);
                var data = (this.get('currentFavourites') && this.get('currentFavourites').length) ? this.get('currentFavourites') : this.get('currentMostPopular');
                if(!data || !data.length){//local feed return [] in first req we can't use ==null here
                    $('#loctooltip').tooltip('show')
                }else{
                    //To get local news feed you have to provide us with your location;so press here to send it
                    this.setToolTipHtml('To get the most popular location around your new location;click here');
                }
            }else{
                //request but user know this feature is found so don't show tooltip
                var locationInfo = APP_Storage.getValue(APP_Storage.userLocationInfo()).split(",")
                //hide only in not supported a user can allow permission from browser after he denied it
                if(locationInfo.length==1 && locationInfo[0] != APP_Location_Error.NotSupported){// && locationInfo[0] != APP_Location_Error.PermissionDenied) {
                    $('#loctooltip').fadeIn(0);//not in all case
                }
            }
        },
        actions: {
            searchPlaces: function () {
                //
                if(!(APP_Storage.getValue(APP_Storage.yelpPlaces,null) && APP_Storage.getValue(APP_Storage.yelpInterests,null))){
                    return;
                }
                if(this.get('searchInProgress')){
                    App.growl.info('Please wait for previous search to complete');
                    return;
                }
                ShowLoadingImage();

                var self = this;
                self.set('searchMode', true);
                self.set('searchInProgress',true);
                //self.set('model.placeFavourites', []);
                self.set('model.placeMostPopular', []);
                self.set('model.placeMostPopularPaged', []);

                var userNeighbourhoodId = APP_Storage.getValue(APP_Storage.userNeighbourhoodId);
                var allFavs = APP_Storage.getValue(APP_Storage.yelpAllFav, [], true);

                var placeId = this.get('selectedPlace') ? this.get('selectedPlace') : userNeighbourhoodId;
                var interestId = this.get('selectedInterest') ? this.get('selectedInterest') : null;
                placeId = (placeId && placeId<0) ? userNeighbourhoodId : placeId;//select loading item and press find
                interestId = (interestId && interestId<0) ? null : interestId;//select loading item and press find
                var controller = this;
                //controller.set('favouriteIds', {});
                //var favouriteIds = controller.get('favouriteIds');

                var requests=0;
                function finalizeSearch(){
                    requests++;
                    if(requests==1){//2) {
                        HideLoadingImage();
                        self.set('searchInProgress', false);
                    }
                }

                App.YelpService.getMostPopular(interestId, placeId).then(
                    function (data, textStatus, jqXHR) {
                        var places = _.sortBy(data.places,'name');
                        self.set('model.placeMostPopular', jqXHR.status==200 ? places : []);//.slice(8, 15)
                        //self.notifyPropertyChange('favouriteIds')
                        self.set('model.placeMostPopularPaged', jqXHR.status==200 ? places.slice(0,50) : []);
                        finalizeSearch();
                    },
                    function (jqXHR, textStatus, error) {
                        self.set('model.placeMostPopular', [])
                        finalizeSearch();
                        if(jqXHR.status!=400){
                            SetErrorMessage(jqXHR,APP_External_Network.Yelp)
                        }
                    }
                );
            },
            cancelSearch: function () {
                //alert('x')
                var self = this;
                self.set('model.placeFavourites', null);
                self.set('model.placeMostPopular', null);
                self.set('model.placeMostPopularPaged', null);
                self.set('selectedPlace', null);
                self.set('selectedInterest', null);
                self.set('searchMode', false);
                self.set('searchInProgress', false);
                HideLoadingImage();
                setTimeout(function(){
                    self.initLocationTooltip();
                },500)
            },
            onFilterInterests: function (args,inputValue) {
                var interests = App.YelpService.getInterestsList();
                if (interests.length>1 && interests[1].id != -2 && inputValue) {
                    interests = interests.slice(1);//remove space element to not show
                    inputValue = inputValue.toLowerCase();
                    this.set('filteredInterests', _.filter(interests, function (interest) {
                        return _.string.startsWith(interest.name.toLowerCase(), inputValue);
                    }));
                }else {
                    this.set('filteredInterests', interests);
                    args.set('selected', null);
                    //alert('reset')
                    if(!_.isNumber(this.get('selectedPlace')) || this.get('selectedPlace')==-1){
                        this.send('cancelSearch')
                    }
                }

            },
            onSelectInterest: function (args) {
                console.log(args.value);
                var value = args.value;
                if(value==-2){
                    $('.yelp-search-box .interest ic-autocomplete-toggle').click();
                    args.set('selected', null);
                    var self=this;
                    setTimeout(function(){
                        self.set('autoUpdate',true)
                        self.set('selectedInterest',-1);
                    },1)
                }else if(value == -1 && this.get('autoUpdate')){
                    this.set('autoUpdate',false);
                    $('.yelp-search-box .interest ic-autocomplete-toggle').click();
                }else if(value == -1){
                    this.send('onFilterInterests',args)
                }
            },
            onFilterPlaces: function (args,inputValue) {
                //alert(args.inputValue)
                this.set('lastExpandId',null);
                this.set('expandedItem',null);

                var places = APP_Storage.getValue(APP_Storage.yelpPlaces, [], true);
                console.log('||||||||||||||||||||||| ' , inputValue,'***',args.inputValue);
                if (inputValue) {
                    inputValue = inputValue.toLowerCase();
                    this.set('filteredPlaces', _.filter(places, function (place) {
                        return _.string.startsWith(place.name.toLowerCase(), inputValue);
                    }));
                }else {
                    this.set('searchFavMode',false);
                    this.set('model.placeFavourites',null);
                    this.set('favouriteIds', {});
                    var favouriteIds = this.get('favouriteIds');
                    _.each(this.get('model.currentFavourites'),function(fav){
                        favouriteIds[fav.placeId]=true;
                    });
                    //this.set('filteredPlaces', places);
                    //alert('no value')
                    var self = this;
                    self.set('selectedFilter', -1);
                    self.set('filterStatus', 'default');
                    self.set('filteredPlaces', self.getPlaces());
                    args.set('selected', null);
                    if(!_.isNumber(this.get('selectedInterest')) || this.get('selectedInterest')==-1){
                        this.send('cancelSearch')
                    }
                }
            },
            removeDuplicated: function(array){
                var self= this;
                var favouriteIds = self.get('favouriteIds');
                var filtered = [];
                _.each(array, function (element) {
                    if (!favouriteIds[element.placeId]) {
                        filtered.push(element);
                        favouriteIds[element.placeId] = true;
                    }
                });
                if (filtered.length) {
                    if(!self.get('model.placeFavourites')){
                        self.set('model.placeFavourites',[])
                    }
                    self.get('model.placeFavourites').pushObjects(filtered);
                    self.notifyPropertyChange('model.placeFavourites');
                    self.notifyPropertyChange('favouriteIds');
                }/*else if(!favouriteIds.length){//as it was [] and we set in the allFav `if` to [] so ember doesn't detect change , we have to fire
                 self.notifyPropertyChange('model.placeFavourites');
                 }*/

                //finalizeSearch();
                self.set('searchFavInProgress',false);
                HideLoadingImage();
            },
            onSelectPlace: function (args) {
                console.log('** ' +new Date().getTime())

                console.log('**- ' +new Date().getTime())
                console.log(args.value, _.isNumber(args.value));
                var self=this;
                var value = args.value;
                //alert('0')
                console.log('*** ' +new Date().getTime())
                if(value==-2 ||(value && !_.isNumber(value) && value.indexOf(',')!=-1)){
                    $('.yelp-search-box .city ic-autocomplete-toggle').click();
                    if(!_.isNumber(value)){
                        //alert('1')
                        //self.set('filteredPlaces',[])
                        self.set('selectedFilter',value);
                        //alert('2')
                        self.set('filterStatus',value.split(',')[0])
                        console.log('**** ' +new Date().getTime())
                        //self.notifyPropertyChange('filterStatus');
                        //self.set('filteredPlaces',self.getPlaces());
                        self.getPlaces(true)
                        console.log('***** ' +new Date().getTime())
                    }
                    //alert('3')
                    args.set('selected', null);
                    //self.set('selectedPlace',null)
                    setTimeout(function(){
                        self.set('autoUpdate',true);
                        self.set('selectedPlace',-1);
                        //self.set('selectedPlace',null)
                        //self.set('filteredPlaces',APP_Storage.getValue(APP_Storage.yelpPlaces,[],true).slice(0,5));
                    },1)
                }else if(value == -1 && this.get('autoUpdate')){
                    this.set('autoUpdate',false);
                    //args.set('selected', null);
                    $('.yelp-search-box .city ic-autocomplete-toggle').click();
                }else if(value == -1){
                    this.send('onFilterPlaces',args)
                }else{
                    if(this.get('searchFavInProgress')){
                        App.growl.info('Please wait for previous search to complete');
                        return;
                    }
                    /*function removeDuplicated(array) {

                    }*/
                    this.set('searchFavMode',true)
                    var allFavs = APP_Storage.getValue(APP_Storage.yelpAllFav, [], true);
                    var userNeighbourhoodId = APP_Storage.getValue(APP_Storage.userNeighbourhoodId);
                    var places = APP_Storage.getValue(APP_Storage.yelpPlaces,[],true);

                    var placeId = userNeighbourhoodId;// = _.isNumber(value) ?  places[value].placeId : userNeighbourhoodId ; //this.get('selectedPlace') ? this.get('selectedPlace') : userNeighbourhoodId;
                    var selected = false;
                    if(_.isNumber(value) && value!=-1){
                        placeId = value;//places[value].placeId;
                        selected = true;
                    }
                    //var interestId = this.get('selectedInterest') ? this.get('selectedInterest') : null;

                    var controller = this;
                    controller.set('favouriteIds', {});
                    var favouriteIds = controller.get('favouriteIds');
                    this.set('searchFavInProgress',true);
                    ShowLoadingImage();
                    this.set('model.placeFavourites',[])
                    if (allFavs.length && placeId) {
                        var filtered = [];
                        _.each(allFavs, function (fav) {
                            //if (fav.parent && fav.parent.placeId == placeId) {
                            if (fav.placeId == placeId) {
                                filtered.push(fav);
                                favouriteIds[fav.placeId] = true;
                            }
                        });
                        this.set('model.placeFavourites', filtered);
                    }
                    if (selected){//this.get('selectedPlace')) {
                        App.YelpService.getFavourites(placeId).then(
                            function (data, textStatus, jqXHR) {
                                controller.send('removeDuplicated',(jqXHR.status==200 ? data.places : []));
                            },
                            function(jqXHR, textStatus, error){
                                //finalizeSearch();
                                controller.send('removeDuplicated',[])
                                if(jqXHR.status!=400){
                                    SetErrorMessage(jqXHR,APP_External_Network.Yelp)
                                }
                            }
                        )
                    } else if(userNeighbourhoodId) {
                        //get new favs in current
                        App.YelpService.getAllFavourites({
                            saveData: true
                        }).then(
                            function (data, textStatus, jqXHR) {
                                //filter new data only
                                var favourites = jqXHR.status==200 ? data.places : []; //APP_Storage.getValue(APP_Storage.yelpAllFav, [], true);
                                var filtered = [];
                                _.each(favourites, function (fav) {
                                    if (fav.parent && fav.parent.placeId == userNeighbourhoodId) {
                                    //if (fav.placeId == userNeighbourhoodId) {
                                        filtered.push(fav);
                                        favouriteIds[fav.placeId] = true;
                                    }
                                });
                                //if (filtered.length) {
                                controller.send('removeDuplicated',filtered);
                                //}
                            },
                            function(jqXHR, textStatus, error){
                                //finalizeSearch();
                                controller.send('removeDuplicated',[])
                                if(jqXHR.status!=400){
                                    SetErrorMessage(jqXHR,APP_External_Network.Yelp)
                                }
                            }
                        );
                    }else{//we don't have neighbourhoodId but server may have it
                        App.YelpService.getFavourites().then(function(data, textStatus, jqXHR){
                            if(jqXHR.status==200){
                                controller.set('model.placeFavourites', data.places);
                            }
                            //finalizeSearch();
                            controller.send('removeDuplicated',[])
                        },function(jqXHR, textStatus, error){
                            //finalizeSearch();
                            controller.send('removeDuplicated',[]);
                            if(jqXHR.status!=400){
                                SetErrorMessage(jqXHR,APP_External_Network.Yelp)
                            }
                        })
                    }
                }

            },
            getLocation:function(){
                //selectFbTab();//undo click event
                var confirmed = true;
                var data = (this.get('currentFavourites') && this.get('currentFavourites').length) ? this.get('currentFavourites') : this.get('currentMostPopular');
                if(data && data.length){ //if he has fav or most popular in current location that mean he provide location before to server
                    confirmed = confirm('Are you sure you want to reset your location?');
                }
                if(confirmed) {
                    var _self = this;
                    APP_Storage.setValue(APP_Storage.userLocationInfo(), "", false, true);//just set as requested
                    APP_Storage.removeValues(APP_Storage.userNeighbourhoodId);
                    if (navigator.geolocation) {
                        navigator.geolocation.getCurrentPosition(function (position) {
                                ShowLoadingImage();
                                console.log('** share fb location accepted');
                                //the local storage should be empty array if activities endpoint returned data without location was provided for local news feed
                                //this should work properly when api implement periodic sync
                                //we use facebookPostLastModified now for local activities too
                                Ember.$.ajax(API_Base_Url + 'users/' + APP_Cookies.getCookie(APP_Cookies.userID) + '/location', {
                                    "type": 'POST',
                                    "dataType": 'JSON',
                                    "headers": {
                                        "Content-Type": 'application/json'
                                    },
                                    "data": JSON.stringify({
                                        clientPlatformId: APP_Client_Platform.WEB,
                                        timestamp: new Date().getTime(),//parseInt(new Date().getTime()/1000),
                                        latitude: position.coords.latitude,//36.75,//
                                        longitude: position.coords.longitude//-119.77//
                                    }),
                                    "success": function (data, textStatus, jqXHR) {
                                        HideLoadingImage();
                                        console.log('location 200')
                                    },
                                    "error": function (jqXHR, textStatus, errorThrown) {
                                        HideLoadingImage();
                                        if (jqXHR.status == 200) {
                                            console.log('location empty 200');
                                            APP_Storage.setValue(APP_Storage.userLocationInfo(), position.coords.latitude + "," + position.coords.longitude, false, true);

                                            var geoCoder = new google.maps.Geocoder();
                                            geoCoder.geocode({'latLng': new google.maps.LatLng(position.coords.latitude , position.coords.longitude)}, function (results, status) {
                                                if (status == google.maps.GeocoderStatus.OK && results.length && results[0]) {
                                                    APP_Storage.setValue(APP_Storage.userLocatorInfo(), results[0].formatted_address, false, true);
                                                }
                                                //error message not displayed here because it will not effect local feed request as it doesn't depend in locator
                                                //we may get locator later in yelp/search
                                            });

                                            $('#loctooltip').fadeOut(0);
                                            $('#loctooltip').tooltip('hide');

                                            _self.set('favouriteIds', {});

                                            App.YelpService.updateNeighbourhoodsStorage();
                                            var userNeighbourhoodId = APP_Storage.getValue(APP_Storage.userNeighbourhoodId);
                                            if(!userNeighbourhoodId){
                                                _self.set('currentFavourites', []);
                                                _self.set('currentMostPopular', []);
                                            }else{
                                                var favourites = App.YelpService.getUserNeighbourhoodFavourite();
                                                var favouriteIds = {};
                                                _.each(favourites, function (fav) {
                                                    favouriteIds[fav.placeId] = true;
                                                });
                                                _self.set('currentFavourites', favourites);
                                                _self.set('favouriteIds', favouriteIds);

                                                _self.set('currentMostPopular', null);
                                                App.YelpService.getMostPopular(null,userNeighbourhoodId).then(
                                                    function(data, textStatus, jqXHR){
                                                        if (jqXHR.status == 200) {
                                                            _self.set('currentMostPopular', _.sortBy(data.places,'name'));
                                                        }else{
                                                            _self.set('currentMostPopular', []);
                                                        }
                                                    },
                                                    function(jqXHR, textStatus, error){
                                                        _self.set('currentMostPopular', []);
                                                        if(jqXHR.status!=400){
                                                            SetErrorMessage(jqXHR,APP_External_Network.Yelp)
                                                        }
                                                    }
                                                );
                                            }


                                        } else {
                                            SetErrorMessage(jqXHR,APP_External_Network.Yelp)
                                        }
                                    }
                                })
                            }, function (error) {
                                //alert(error.code)
                                console.log('** share fb location error ' + error.code);
                                switch (error.code) {
                                    case error.PERMISSION_DENIED:
                                        APP_Storage.setValue(APP_Storage.userLocationInfo(), APP_Location_Error.PermissionDenied, false, true);
                                        $('#loctooltip').fadeOut(0);
                                        $('#loctooltip').tooltip('hide');
                                        App.growl.info("You has denied permission to get you location ; you won't able to get local news feed anymore");
                                        break;
                                    case error.POSITION_UNAVAILABLE:
                                        APP_Storage.setValue(APP_Storage.userLocationInfo(), APP_Location_Error.Unavailable, false, true);
                                        App.growl.info("We failed to get your location ; please try again later");
                                        break;
                                    case error.TIMEOUT:
                                        APP_Storage.setValue(APP_Storage.userLocationInfo(), APP_Location_Error.TimeOut, false, true);
                                        App.growl.info("Request to get your location has timed out ; please try again");
                                        break;
                                    case error.UNKNOWN_ERROR:
                                        APP_Storage.setValue(APP_Storage.userLocationInfo(), APP_Location_Error.Unknown, false, true);
                                        App.growl.info("Unknown error while detecting you location ; please try again later");
                                        break;
                                }
                            },
                            //options
                            {
                                timeout: 30000
                            });
                    } else {
                        APP_Storage.setValue(APP_Storage.userLocationInfo(), APP_Location_Error.NotSupported, false, true);
                        $('#loctooltip').fadeOut(0);
                        $('#loctooltip').tooltip('hide');
                        App.growl.info("Sorry,GeoLocation is not supported by this browser");
                    }
                }
            }
        }

    });
})();