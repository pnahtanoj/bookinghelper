var bh;
(function (bh) {
    'use strict';
    var BandApi = (function () {
        function BandApi($q) {
            this.$q = $q;
            this.bandsRef = firebase.database().ref('/bands');
        }
        BandApi.prototype.addBand = function (band) {
            var d = this.$q.defer();
            this.bandsRef.push(band)
                .then(function (resp) {
                console.log(resp.key);
                d.resolve(band);
            })
                .catch(function (err) {
                console.log(err);
                d.reject(err);
            });
            return d.promise;
        };
        return BandApi;
    }());
    BandApi.$inject = ['$q'];
    angular
        .module('bookingHelperApp')
        .service('BandApi', BandApi);
})(bh || (bh = {}));
//# sourceMappingURL=bandApi.js.map