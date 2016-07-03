var bh;
(function (bh) {
    'use strict';
    var BandListCtrl = (function () {
        function BandListCtrl($q) {
            this.$q = $q;
            this.bandsRef = firebase.database().ref(BH_ENDPOINT_BANDS);
            this.selected = [];
        }
        BandListCtrl.prototype.load = function () {
            var _this = this;
            console.log('loadin...');
            this.bandsRef.on('value', function (snap) { return console.log(_this.bands = snap.val()); }, function (err) { return console.log(err); });
        };
        return BandListCtrl;
    }());
    BandListCtrl.$inject = ['$q', '$firebaseAuth'];
    angular
        .module('bookingHelperApp')
        .component('bandsList', {
        templateUrl: 'scripts/agent/bands.list.html',
        bindings: {},
        controller: BandListCtrl
    });
})(bh || (bh = {}));
//# sourceMappingURL=bands.list.js.map