var bh;
(function (bh) {
    'use strict';
    var Band = (function () {
        function Band() {
            this.key = '';
            this.name = '';
            this.hometown = '';
            this.genre = '';
            this.active = true;
            return this;
        }
        return Band;
    }());
    bh.Band = Band;
})(bh || (bh = {}));
//# sourceMappingURL=band.js.map