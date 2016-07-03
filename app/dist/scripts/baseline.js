var bh;
(function (bh) {
    'use strict';
    var BaselineCtrl = (function () {
        function BaselineCtrl($q, BandApi, BookingAgentApi, VenueApi) {
            this.$q = $q;
            this.BandApi = BandApi;
            this.BookingAgentApi = BookingAgentApi;
            this.VenueApi = VenueApi;
            this.bandsRef = firebase.database().ref(BH_ENDPOINT_BANDS);
            this.bookingAgentsRef = firebase.database().ref(BH_ENDPOINT_BOOKINGAGENTS);
            this.venuesRef = firebase.database().ref(BH_ENDPOINT_VENUES);
        }
        BaselineCtrl.prototype.baselineData = function () {
            this.baselineBands();
            this.baselineBookingAgents();
            this.baselineVenues();
        };
        BaselineCtrl.prototype.baselineVenues = function () {
            var _this = this;
            var venues = [];
            var spaceland = new bh.Venue();
            spaceland.name = 'Spaceland';
            spaceland.address.address = '1717 Silver Lake Blvd';
            spaceland.address.city = 'Los Angeles';
            spaceland.address.state = 'CA';
            spaceland.address.zip = '90026';
            var theecho = new bh.Venue();
            theecho.name = 'The Echo';
            theecho.address.address = '1822 Sunset Blvd';
            theecho.address.city = 'Los Angeles';
            theecho.address.state = 'CA';
            theecho.address.zip = '90026';
            venues.push(spaceland);
            venues.push(theecho);
            this.clearVenues()
                .then(function () {
                angular.forEach(venues, function (b) {
                    _this.VenueApi.addVenue(b)
                        .then(function (resp) {
                        console.log('venue added: ', b);
                    });
                });
            })
                .catch(function (err) { return console.log('clearing error: ', err); });
        };
        BaselineCtrl.prototype.baselineBookingAgents = function () {
            var _this = this;
            var baselineBookingAgents = [];
            var jen = new bh.BookingAgent();
            jen.name = 'Jennifer Tefft';
            jen.active = true;
            var liz = new bh.BookingAgent();
            liz.name = 'Liz Garo';
            liz.active = true;
            baselineBookingAgents.push(jen);
            baselineBookingAgents.push(liz);
            this.clearBookingAgents()
                .then(function () {
                angular.forEach(baselineBookingAgents, function (b) {
                    _this.BookingAgentApi.addBookingAgent(b)
                        .then(function (resp) {
                        console.log('booking agent added: ', b);
                    });
                });
            })
                .catch(function (err) { return console.log('clearing error: ', err); });
        };
        BaselineCtrl.prototype.baselineBands = function () {
            var _this = this;
            var baselineBands = [];
            var band = new bh.Band();
            band.name = 'Chumbawumba';
            band.hometown = 'Saskatoon';
            band.genre = 'Pop';
            band.active = true;
            var band2 = new bh.Band();
            band2.name = 'Spoon';
            band2.hometown = 'Austin';
            band2.genre = 'Rock';
            band2.active = true;
            baselineBands.push(band);
            baselineBands.push(band2);
            this.clearBands()
                .then(function () {
                angular.forEach(baselineBands, function (b) {
                    _this.BandApi.addBand(b)
                        .then(function (resp) {
                        console.log('band added: ', b);
                    });
                });
            })
                .catch(function (err) { return console.log('clearing error: ', err); });
        };
        BaselineCtrl.prototype.clearBookingAgents = function () {
            var d = this.$q.defer();
            this.bookingAgentsRef.remove()
                .then(function (err) {
                if (err)
                    d.reject(err);
                else
                    d.resolve();
            });
            return d.promise;
        };
        BaselineCtrl.prototype.clearBands = function () {
            var d = this.$q.defer();
            this.bandsRef.remove()
                .then(function (err) {
                if (err)
                    d.reject(err);
                else
                    d.resolve();
            });
            return d.promise;
        };
        BaselineCtrl.prototype.clearVenues = function () {
            var d = this.$q.defer();
            this.venuesRef.remove()
                .then(function (err) {
                if (err)
                    d.reject(err);
                else
                    d.resolve();
            });
            return d.promise;
        };
        return BaselineCtrl;
    }());
    BaselineCtrl.$inject = ['$q', 'BandApi', 'BookingAgentApi', 'VenueApi'];
    angular
        .module('bookingHelperApp')
        .component('baseline', {
        templateUrl: 'scripts/baseline.html',
        bindings: {},
        controller: BaselineCtrl
    });
})(bh || (bh = {}));
//# sourceMappingURL=baseline.js.map