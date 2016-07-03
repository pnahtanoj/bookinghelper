var bh;
(function (bh) {
    'use strict';
    var BandListCtrl = (function () {
        function BandListCtrl($q) {
            this.$q = $q;
            this.bandsRef = firebase.database().ref(BH_ENDPOINT_BANDS);
        }
        BandListCtrl.prototype.load = function () {
            this.bandsRef.on('value', function (snap) { return console.log(snap); });
        };
        return BandListCtrl;
    }());
    BandListCtrl.$inject = ['$q', '$firebaseAuth'];
    angular
        .module('bookingHelperApp')
        .component('login', {
        templateUrl: 'scripts/agent/band.list.html',
        bindings: {},
        controller: BandListCtrl
    });
})(bh || (bh = {}));
//# sourceMappingURL=band.list.js.map