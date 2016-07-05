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
            .state('agent.profile', {
              url: '/agent/profile/:id',
              template: '<agent-profile></agent-profile>'
              // resolve: {
              //   agent: ['$stateParams','BookingAgentApi',($stateParams,api) => api.get($stateParams.id) ] 
              // },
              // controller: ($scope, agent) => $scope.agent = agent
            })
            // .state('agent.bands', {
            //   url: '/agent/bands',
            //   template: '<bands-list></bands-list>'
            // })

          .state('artist', {
            template: '<div ui-view></div>'
          })
            .state('artist.profile', {
              url: '/artist/profile/:id',
              template: '<artist-profile></artist-profile>'
            })
        ;
    })

    ;
}