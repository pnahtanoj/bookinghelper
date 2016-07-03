var bh;
(function (bh) {
    'use strict';
    var Address = (function () {
        function Address() {
            this.key = '';
            this.address = '';
            this.address2 = '';
            this.city = '';
            this.state = '';
            this.zip = '';
            return this;
        }
        return Address;
    }());
    bh.Address = Address;
})(bh || (bh = {}));
//# sourceMappingURL=address.js.map