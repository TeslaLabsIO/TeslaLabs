(function () {
    'use strict';
    App.YelpRoute = Ember.Route.extend({
        model: function () {
            console.log('\n \n reset sync service \n \n');

            App.SynchronizeService.resetSyncService();

            console.log('\n \n reset sync service \n \n');

            var userNeighbourhoodId = APP_Storage.getValue(APP_Storage.userNeighbourhoodId);
            var controller = this.controllerFor('yelp');
            //
            controller.set('favouriteIds',{});
            var favouriteIds = controller.get('favouriteIds');
            //
            var currentFavourites = null;
            var currentMostPopular = null;
            //
            var places = controller.getPlaces();
            //
            var interestList = App.YelpService.getInterestsList();
            //
            var defer = Ember.Deferred.create({});
            function resolveIfDone(){
                if(_.isArray(currentFavourites) && _.isArray(currentMostPopular)){
                    //alert('model created');
                    defer.resolve({
                        currentFavourites : _.sortBy(currentFavourites,'name'),//currentMostPopular.slice(3,7)
                        currentMostPopular : _.sortBy(currentMostPopular,'name'),
                        placeFavourites : null,
                        placeMostPopular : null,
                        placeDetails : [],
                        filteredPlaces : places,
                        filteredInterests: interestList
                    });
                }
            }
            if(userNeighbourhoodId){
                //filter fav by nid and call most popular
                var favourites = App.YelpService.getUserNeighbourhoodFavourite();
                _.each(favourites, function (fav) {
                    favouriteIds[fav.placeId] = true;
                });
                currentFavourites = favourites;
            }else{//we don't have neighbourhoodId but server may have it from another browser/device or prev session on same browser
                //call current fav and most popular
                App.YelpService.getFavourites().then(function(data, textStatus, jqXHR){
                    if(jqXHR.status==200){
                        _.each(data.places,function(fav){
                            favouriteIds[fav.placeId] = true;
                        });
                        currentFavourites = data.places;
                    }else{
                        currentFavourites = [];
                    }
                    resolveIfDone();
                },function(jqXHR, textStatus, error){
                    currentFavourites = [];
                    if(jqXHR.status!=400){
                        SetErrorMessage(jqXHR,APP_External_Network.Yelp)
                    }
                    resolveIfDone();
                })
            }
            App.YelpService.getMostPopular(null,userNeighbourhoodId).then(
                function(data, textStatus, jqXHR){
                    if (jqXHR.status == 200) {
                        currentMostPopular = data.places;
                    }else{
                        currentMostPopular = [];
                    }
                    resolveIfDone();
                },
                function(jqXHR, textStatus, error){
                    currentMostPopular = [];
                    if(jqXHR.status!=400){
                        SetErrorMessage(jqXHR,APP_External_Network.Yelp)
                    }
                    resolveIfDone();
                }
            );
            return defer;
        }
    });
})();