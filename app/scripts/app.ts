/// <reference path="../../typings/angularjs/angular.d.ts"/>

namespace bh {

  'use strict';


  /**
   * @ngdoc overview
   * @name bookinghelperApp
   * @description
   * # bookinghelperApp
   *
   * Main module of the application.
   */
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
     // EVENTUALLY, LOGIN ROUTES WILL GO HERE //
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
            })
        ;
    })

    ;
}