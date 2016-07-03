var bh;
(function (bh) {
    'use strict';
    angular
        .module('bookingHelperApp', [
        'ngAnimate',
        'ngCookies',
        'ngResource',
        'ngRoute',
        'ngSanitize',
        'firebase',
        'ui.router',
        'ngMaterial',
        'md.data.table'
    ])
        .config(function ($stateProvider) {
        $stateProvider
            .state('login', {
            url: '/login',
            template: '<login></login>'
        })
            .state('baseline', {
            url: '/baseline',
            template: '<baseline></baseline>'
        })
            .state('agent', {
            template: '<div ui-view></div>'
        })
            .state('agent.bands', {
            url: '/bands',
            template: '<bands-list></bands-list>'
        });
    });
})(bh || (bh = {}));
//# sourceMappingURL=app.js.map