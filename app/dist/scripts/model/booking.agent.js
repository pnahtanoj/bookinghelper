var bh;
(function (bh) {
    'use strict';
    var BookingAgent = (function () {
        function BookingAgent() {
            this.key = '';
            this.name = '';
            this.active = true;
            return this;
        }
        return BookingAgent;
    }());
    bh.BookingAgent = BookingAgent;
})(bh || (bh = {}));
//# sourceMappingURL=booking.agent.js.map