(function () {
    'use strict';

    App.RecommendedService = App.Service.extend();

    App.RecommendedService.reopenClass({
        // functions
        getRecommendations: function () {
            return Ember.$.ajax({
                url: this.baseUrl + 'analytics/users/' + this.userId + '/recommendations',
                type: 'GET',
                headers: {
                    "Content-Type": "application/json"
                }
            });
        }
    });
})();