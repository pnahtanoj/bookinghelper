var bh;
(function (bh) {
    'use strict';
    var Venue = (function () {
        function Venue() {
            this.key = '';
            this.name = '';
            this.address = new bh.Address();
            this.active = true;
            return this;
        }
        return Venue;
    }());
    bh.Venue = Venue;
})(bh || (bh = {}));
//# sourceMappingURL=venue.js.map