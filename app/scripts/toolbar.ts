/// <reference path="../../typings/angularjs/angular.d.ts"/>
/// <reference path="../../typings/angular-ui-router/angular-ui-router.d.ts"/>


namespace bh {

    'use strict';

    declare var firebase: any;

    class ToolbarCtrl {

        constructor(public $state:angular.ui.IStateService, public $firebaseAuth:any) {
        }

        logout() {
            this.$firebaseAuth().$signOut();
            this.$state.go('login');
        }
   } 

    ToolbarCtrl.$inject = ['$state','$firebaseAuth'];

    angular
        .module('bookingHelperApp')
        .component('toolbar', {
            templateUrl: 'scripts/toolbar.html',
            bindings: {},
            controller: ToolbarCtrl
        });
}