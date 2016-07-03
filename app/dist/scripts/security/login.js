var bh;
(function (bh) {
    'use strict';
    var LoginCtrl = (function () {
        function LoginCtrl($q, $firebaseAuth) {
            this.$q = $q;
            this.$firebaseAuth = $firebaseAuth;
        }
        LoginCtrl.prototype.login = function () {
            var auth = this.$firebaseAuth();
            auth.$signInWithEmailAndPassword('imakethissound@gmail.com', 'testing')
                .then(function (usr) { return console.log('signed in user: ', usr); })
                .catch(function (error) { return console.log('login failed: ', error); });
        };
        LoginCtrl.prototype.register = function () {
            var auth = this.$firebaseAuth();
            auth.$createUserWithEmailAndPassword('imakethissoundddd@gmail.com', 'testing')
                .then(function (usr) { return console.log('signed in user: ', usr); })
                .catch(function (error) { return console.log('login failed: ', error); });
        };
        return LoginCtrl;
    }());
    LoginCtrl.$inject = ['$q', '$firebaseAuth'];
    angular
        .module('bookingHelperApp')
        .component('login', {
        templateUrl: 'scripts/security/login.html',
        bindings: {},
        controller: LoginCtrl
    });
})(bh || (bh = {}));
//# sourceMappingURL=login.js.map