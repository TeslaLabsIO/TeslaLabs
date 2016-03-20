(function () {
    'use strict';

    App.utilities = Ember.Object.create({
        constant: App.CONSTANT,
        capitalizeFirstLetter:function(string)
        {
            return string ? (string.charAt(0).toUpperCase() + string.slice(1)) : string;
        },
        getParamsByName: function (name) {
            name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
            var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
                results = regex.exec(location.search);
            return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
        },
        reloadPage: function () {
            location.reload();
        },
        redirectToUrl: function (url) {
            window.location.href = url;
        },
        setSprocketApiKey: function (key, val) {
            Ember.$.ajaxSetup({
                beforeSend: function (xhr) {
                    xhr.setRequestHeader(key, val);
                }
            });
        },
        getPostDate: function (ms, type) {
            if (moment(ms).isValid() && moment().year() == moment(ms).year()) {
                if (type == 'short') {
                    return moment(ms).format('DD MMM');
                } else {
                    return moment(ms).format('DD MMM , hh:mm A');
                }
            } else if (moment(ms).isValid() && moment().year() != moment(ms).year()) {
                if (type == 'short') {
                    return moment(ms).format('DD MMM YYYY');
                } else {
                    return moment(ms).format('DD MMM YYYY, hh:mm A');
                }
            } else {
                return "";
            }
        },
        resetNetworkSyncStatus: function (networkID, startSync) {
            var options = App.CONSTANT.network[networkID];
            var keys = [];
            _.each(options.entities, function (entity) {
                if (_.isString(options.dataStorageKeys[entity]))
                    keys.push(options.dataStorageKeys[entity]);
                else if (_.isArray(options.dataStorageKeys[entity]))
                    keys = keys.concat(options.dataStorageKeys[entity]);
                if (_.isString(options.lastModifiedStorageKeys[entity]))
                    keys.push(options.lastModifiedStorageKeys[entity]);
                else if (_.isArray(options.lastModifiedStorageKeys[entity]))
                    keys = keys.concat(options.lastModifiedStorageKeys[entity]);
            });
            APP_Storage.removeValues(keys);
            if (startSync)
                App.utilities.redirectToUrl('/#/sync?network=' + networkID);
        },
        getNetworkIds: function () {
            var keys = _.keys(this.get('constant.network'));
            var ids = _.filter(keys, function (item) {
                return _.isNumber(Number(item)) && Number(item) > -1 && Number(item) != 1;
            });
            return [1].concat(ids);
        },
        getNetworkNameById: function (id) {
            if (id > -1)
                return this.get('constant.network.' + id + '.name');
            else
                return null
        },
        getNetworkIdByName: function (name) {
            var that = this;
            var ids = _.find(that.getNetworkIds(), function (id) {
                return that.get('constant.network.' + id + '.name') == name;
            });
            return _.isArray(ids) && ids.length > 0 ? ids[0] : null;
        }
    });

})();