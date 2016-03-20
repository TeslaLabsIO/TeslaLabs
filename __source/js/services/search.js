(function () {
    'use strict';
    App.SearchService = App.Service.extend({});

    App.SearchService.reopenClass({
        // This function is responsible for calling indexed API to pull user private data according to query(search term)
        searchIndexed: function (query) {
            return Ember.$.ajax({
                    url: this.baseUrl + "documents/users/" + this.userId + "/indexed?q=" + encodeURIComponent(query),
                    type: 'GET',
                    dataType: 'JSON',
                    headers: {
                        'Content-type': 'application/json'
                    }
                }
            );
            //.then(function(data, textStatus, jqXHR){},function(jqXHR, textStatus, errorThrown){})
        },
        // This function is responsible for calling live API to pull network search result according to query(search term), page num, lat, lng and locator
        searchLive: function (query, network, page, lat, lng, locator) {
            return Ember.$.ajax({
                    url: this.baseUrl + "documents/users/" + this.userId + "/providers/" + network + "/live?q=" + encodeURIComponent(query) + "&page=" + (page ? page : 1)
                    + (lat ? ("&latitude=" + lat) : "") + (lng ? ("&longitude=" + lng) : "") + (locator ? ("&locator=" + locator) : ""),
                    type: 'GET',
                    dataType: 'JSON',
                    headers: {
                        'Content-type': 'application/json'
                    }
                }
            );
            //.then(function(data, textStatus, jqXHR){},function(jqXHR, textStatus, errorThrown){})
        },
        // This function is responsible for calling engaged API to post bookmarked search result documents
        bookmark: function (query, documents) {
            return Ember.$.ajax(this.baseUrl + "documents/users/" + this.userId + "/live/engaged", {
                type: 'POST',
                dataType: 'JSON',
                headers: {
                    'Content-type': 'application/json'
                },
                data: JSON.stringify({
                    searchTerm: query,
                    documents: documents
                })
            });
        },
        // This function is responsible for calling location API to post user current location
        postLocation: function (lat, long) {
            return Ember.$.ajax(this.baseUrl + 'users/' + this.userId + '/location', {
                type: 'POST',
                dataType: 'JSON',
                headers: {
                    'Content-type': 'application/json'
                },
                data: JSON.stringify({
                    clientPlatformId: this.clientPlatformId,
                    timestamp: new Date().getTime(),
                    latitude: lat,
                    longitude: long
                })
            });
        }
    });
})();
