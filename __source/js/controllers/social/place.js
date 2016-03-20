(function () {
    'use strict';
    App.SocialPlaceController = Ember.ObjectController.extend({
        // properties
        needs: ['yelp'],
        address: function () {
            var address = "";

            if (this.get('addressdto.streetName'))
                address += this.get('addressdto.streetName');
            if (this.get('addressdto.city'))
                address += ' ' + this.get('addressdto.city') + ',';
            if (this.get('addressdto.stateOrRegion'))
                address += ' ' + this.get('addressdto.stateOrRegion');
            if (this.get('addressdto.postalCode'))
                address += ' ' + this.get('addressdto.postalCode');

            /*   var self = this;
             var lat = self.get('boundingBox.center.latitude');
             var long = self.get('boundingBox.center.longitude');
             var myLatlng;
             if (_.isNumber(long) && _.isNumber(lat)) {
             myLatlng = new google.maps.LatLng(lat, long);
             var mapOptions = {
             zoom: 18,
             center: myLatlng
             };
             var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
             var marker = new google.maps.Marker({
             position: myLatlng,
             map: map,
             title: self.get('name')
             });
             }
             else {
             var geoCoder = new google.maps.Geocoder();
             geoCoder.geocode({ 'address': address }, function (results, status) {
             if (status == google.maps.GeocoderStatus.OK) {
             lat = results[0].geometry.location.lat();
             long - results[0].geometry.location.lng();
             myLatlng = new google.maps.LatLng(lat, long);
             var mapOptions = {
             zoom: 18,
             center: myLatlng
             };
             var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
             var marker = new google.maps.Marker({
             position: myLatlng,
             map: map,
             title: self.get('name')
             });
             } else {
             App.growl.danger("geocode was not successful for the following reason: " + status);
             }
             });
             }*/
            return address;
        }.property('addressdto.streetName'),
        rate: function () {
            var rate = this.get('ratingDto.rating');
            if (_.isNumber(rate))
                return Math.floor(rate);
            else
                return null;
        }.property('ratingDto.rating'),
        isFavorite: function () {
            console.log('is fav');
            return this.get('controllers.yelp').get('favouriteIds')[this.get('placeId')] ? true : false;
        }.property('placeId','controllers.yelp.favouriteIds'),//observer fav array due to racing in search requests
        modelChanged: function () {
            alert('x')
            var self = this;
            var lat = self.get('boundingBox.center.latitude');
            var long = self.get('boundingBox.center.longitude');
            var myLatlng;
            if (_.isNumber(long) && _.isNumber(lat)) {
                myLatlng = new google.maps.LatLng(lat, long);
                var mapOptions = {
                    zoom: 18,
                    center: myLatlng
                };
                var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
                var marker = new google.maps.Marker({
                    position: myLatlng,
                    map: map,
                    title: self.get('name')
                });
            }
            else {
                var geoCoder = new google.maps.Geocoder();
                geoCoder.geocode({ 'address': this.get('address') }, function (results, status) {
                    if (status == google.maps.GeocoderStatus.OK) {
                        lat = results[0].geometry.location.lat();
                        long = results[0].geometry.location.lng();

                        myLatlng = new google.maps.LatLng(lat, long);
                        var mapOptions = {
                            zoom: 18,
                            center: myLatlng
                        };
                        var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
                        var marker = new google.maps.Marker({
                            position: myLatlng,
                            map: map,
                            title: self.get('name')
                        });
                    } else {
                        App.growl.danger("geocode was not successful for the following reason: " + status);
                    }
                });
            }


        }.property('addressdto.streetName'),
        // actions
        actions: {
            onClick: function (place) {
                place.address = this.get('address');
                this.get('controllers.yelp').set('model.placeDetails', [place]);
            },
            onFavoriteClick: function (place) {
                var self = this;
                function updateModel(){
                    self.set('isFavorite',true);
                    /*console.log('*** '+place.isFavorite +' ***')
                    place.isFavorite = true;
                    console.log('*** '+place.isFavorite +' ***')*/
                    var userNeighbourhoodId = APP_Storage.getValue(APP_Storage.userNeighbourhoodId);
                    var controller = self.get('controllers.yelp');
                    var placeMostPopular = controller.get('model.placeMostPopular');
                    //if(place.parent && place.parent.placeId == userNeighbourhoodId){
                    var selectedPlace = controller.get('selectedPlace') ? controller.get('selectedPlace') : userNeighbourhoodId;
                    if(selectedPlace == userNeighbourhoodId){
                        //
                        var allFav = APP_Storage.getValue(APP_Storage.yelpAllFav,[],true);
                        var allFavPlaceId = {};
                        _.each(allFav,function(fav){
                            allFavPlaceId[fav.placeId]=true;
                        });
                        if(!allFavPlaceId[place.placeId]){ // not added by sync  during this action
                            allFav.push(place);
                            APP_Storage.setValue(APP_Storage.yelpAllFav,allFav,true);
                        }
                        //
                        controller.get('model.currentFavourites').pushObject(place);
                        controller.get('favouriteIds')[place.placeId]=true;
                        controller.notifyPropertyChange('favouriteCount');

                    }else if(controller.get('searchFavMode') && placeMostPopular && placeMostPopular.length){
                        //placeFav match the neighbour hood id of current data in placePopular
                        if(placeMostPopular[0].parent && placeMostPopular[0].parent.placeId == selectedPlace){
                            if(controller.get('model.placeFavourites')){
                                controller.get('model.placeFavourites').pushObject(place)
                            }else{
                                controller.set('model.placeFavourites',place)
                            }
                            /*var data = controller.get('model.placeFavourites');
                            data = data ? data : [];
                            data = data.concat(place);
                            controller.set('model.placeFavourites',data);*/
                            controller.get('favouriteIds')[place.placeId]=true;
                            controller.notifyPropertyChange('favouriteCount')
                        }
                    }
                        //any update to model , hang the browser because model have to much data
                    //}
                }
                App.YelpService.postFavourite({'places':[place]}).then(
                    function(data, textStatus, jqXHR){//success
                        if(jqXHR.status == 200) {
                            updateModel();
                        }
                    },
                    function (jqXHR, textStatus, errorThrown) {
                        if (jqXHR.status == 200) {
                            updateModel();
                        }
                    }
                );
            }
        }
    });
})();