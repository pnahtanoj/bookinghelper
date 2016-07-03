var bh;
(function (bh) {
    'use strict';
    var BookingAgentApi = (function () {
        function BookingAgentApi($q) {
            this.$q = $q;
            this.agentsRef = firebase.database().ref(BH_ENDPOINT_BOOKINGAGENTS);
        }
        BookingAgentApi.prototype.addBookingAgent = function (agent) {
            var d = this.$q.defer();
            this.agentsRef.push(agent)
                .then(function (resp) {
                console.log(resp.key);
                d.resolve(agent);
            })
                .catch(function (err) {
                console.log(err);
                d.reject(err);
            });
            return d.promise;
        };
        return BookingAgentApi;
    }());
    BookingAgentApi.$inject = ['$q'];
    angular
        .module('bookingHelperApp')
        .service('BookingAgentApi', BookingAgentApi);
})(bh || (bh = {}));
//# sourceMappingURL=booking.agent.api.js.map