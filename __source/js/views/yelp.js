(function () {
    'use strict';
    App.YelpView = Ember.View.extend({

        didInsertElement: function () {
            $('#favorites').collapse('show');
            //$('#listings').collapse('hide');
            $(".placeList").mCustomScrollbar({
                callbacks: {
                    whileScrolling: function () {
                        if (this.mcs.topPct > 93) {
                            var controller = App.__container__.lookup('controller:yelp');
                            var paging = controller.get('paging');
                            if (paging) return;
                            controller.set('paging', true);
                            var pagedPlaces = controller.get('placeMostPopularPaged');
                            var allPlaces = controller.get('placeMostPopular');
                            if (!paging && _.isArray(pagedPlaces) && _.isArray(allPlaces) && pagedPlaces.length < allPlaces.length) {
                                pagedPlaces = pagedPlaces.concat(allPlaces.slice(pagedPlaces.length, pagedPlaces.length + 50));
                                controller.set('placeMostPopularPaged', pagedPlaces);
                                Ember.run.later(function () {
                                    controller.set('paging', false);
                                }, 2000);
                            }else{
                                controller.set('paging', false);
                            }

                        }
                        //console.log("---------------------------scrolled to bottom-------------------------", this.mcs);
                    }
                }
            });
            $(".search_wrapper_root").mCustomScrollbar();
            //$('.yelp-search-box ic-autocomplete-list').mCustomScrollbar();
            var controller = App.__container__.lookup('controller:yelp');
            setTimeout(function () {
                controller.initLocationTooltip();
            }, 1000);

            //controller.notifyPropertyChange('filteredPlaces');
            //controller.set('filterStatus','default');
            //controller.notifyPropertyChange('filterStatus');
            //controller.set('filteredPlaces',controller.getPlaces());
            var cityScroll = 0;
            var interestScroll = 0;
            $('.yelp-search-box .city ic-autocomplete-list').mCustomScrollbar({
                callbacks: {
                    onScroll: function () {
                        cityScroll = this.mcs.top;
                        //console.log(cityScroll)
                    }
                }
            });
            $('.yelp-search-box .city ic-autocomplete-toggle').on('click', function () {
                console.log('city click')
                $('.yelp-search-box .city ic-autocomplete-list').mCustomScrollbar("scrollTo", cityScroll, {scrollInertia: 0});
                $('#loctooltip').tooltip('hide');
            });
            $('.yelp-search-box .interest ic-autocomplete-list').mCustomScrollbar({
                callbacks: {
                    onScroll: function () {
                        interestScroll = this.mcs.top;
                    }
                }
            });
            $('.yelp-search-box .interest ic-autocomplete-toggle').on('click', function () {
                console.log('interest click')
                $('.yelp-search-box .interest ic-autocomplete-list').mCustomScrollbar("scrollTo", interestScroll, {scrollInertia: 0});
                $('#loctooltip').tooltip('hide');
            });
        }
    });
})();