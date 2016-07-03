var bh;
(function (bh) {
    'use strict';
    var VenueApi = (function () {
        function VenueApi($q) {
            this.$q = $q;
            this.venuesRef = firebase.database().ref(BH_ENDPOINT_VENUES);
        }
        VenueApi.prototype.addVenue = function (venue) {
            var d = this.$q.defer();
            this.venuesRef.push(venue)
                .then(function (resp) {
                console.log(resp.key);
                d.resolve(venue);
            })
                .catch(function (err) {
                console.log(err);
                d.reject(err);
            });
            return d.promise;
        };
        return VenueApi;
    }());
    VenueApi.$inject = ['$q'];
    angular
        .module('bookingHelperApp')
        .service('VenueApi', VenueApi);
})(bh || (bh = {}));
//# sourceMappingURL=venue.api.js.map