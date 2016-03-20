(function () {
    'use strict';

    App.VimeoService = App.Service.extend({});

    App.VimeoService.reopenClass({
        contentNetworkId: App.CONSTANT.get('vimeo.contentNetworkId'), // contentNetworkId is 1 for vimeo
        // functions
        authorize: function (code, redirectUrl) {
            return Ember.$.ajax({
                url: this.baseUrl + 'users/' + this.userId + '/authorized',
                type: 'POST',
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                data: JSON.stringify({
                    code: code,
                    redirectUrl: redirectUrl,
                    externalNetworkId: this.contentNetworkId,
                    clientPlatformId: this.clientPlatformId
                })
            });
        },
        getVideos: function (lastModifiedKey, syncTimeout, syncUntilData, syncForEver, stopOnError,options) {
            var defer = Ember.Deferred.create({});
            var syncArgs = {
                url: this.baseUrl + 'content/users/' + this.userId + '/providers/' + this.contentNetworkId + '/videos',
                lastModifiedKey: lastModifiedKey,//APP_Storage.youtubeLastModified,
                syncTimeout: syncTimeout, //APP_Sync.youtubeSyncTimeOut,
                syncUntilData: syncUntilData, //false,//will be true in sync fn
                syncForEver: syncForEver, //false,
                stopOnError: stopOnError, //true
                successCallback: function (data, textStatus, jqXHR, isLast) {
                    defer.resolve({data: data, textStatus: textStatus, jqXHR: jqXHR, isLast: isLast});
                    return true;//force stop as 304 will start new call on videoSync method
                },
                errorCallback: function (jqXHR, textStatus, errorThrown, isLast) {
                    defer.reject({jqXHR: jqXHR, textStatus: textStatus, errorThrown: errorThrown, isLast: isLast});
                }
            };
            if(options){
                $.extend(syncArgs,options);
            }
            // start vimeo videos sync
            APP_Sync.GetData(syncArgs);
            return defer;
        }
    });
})();