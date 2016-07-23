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
      'ngMdIcons',
      'md.data.table'
    ])
    .config(function ($stateProvider,$urlRouterProvider) {
      $urlRouterProvider.otherwise('/login');      
     // EVENTUALLY, LOGIN ROUTES WILL GO HERE //
      $stateProvider
          .state('login', {
            url: '/login',
            template: '<login></login>'
          })
          .state('logout', {
            template: '<logout></logout>'
          })
          .state('baseline', {
            url: '/baseline',
            template: '<baseline></baseline>',
            resolve: {
              auth: ['$firebaseAuth',($firebaseAuth) => $firebaseAuth().$requireSignIn() ]
            }
          })
          .state('agent', {
            template: '<div ui-view></div>',
            resolve: {
              auth: ['$firebaseAuth',($firebaseAuth) => $firebaseAuth().$requireSignIn() ]
            }
          })
            .state('agent.profile', {
              url: '/agent/profile/:id',
              template: '<agent-profile></agent-profile>'
            })

          .state('event', {
            template: '<div ui-view></div>',
            resolve: {
              auth: ['$firebaseAuth',($firebaseAuth) => $firebaseAuth().$requireSignIn() ]
            }
          })
            .state('event.list', {
              url: '/event/list',
              template: '<event-list venues="venues"></event-list>',
              resolve: {
                auth: ['$firebaseAuth',($firebaseAuth) => $firebaseAuth().$requireSignIn() ],
                venues: ['VenueFactory','FirebaseRefs',(VenueFactory,FirebaseRefs) => new VenueFactory(FirebaseRefs.venues()) ]
                // events: ['EventApi', 'venues', (api, venues) => {
                //   console.log(venues);
                // }]
              },
              controller: ($scope,venues) => {
                $scope.venues = venues;
              }
            })

          .state('venue', {
            template: '<div ui-view></div>',
            resolve: {
              auth: ['$firebaseAuth',($firebaseAuth) => $firebaseAuth().$requireSignIn() ]
            }
          })
            .state('venue.list', {
              url: '/venue/list',
              template: '<venues venues="venues" events="events"></venue-list>',
              resolve: {
                auth: ['$firebaseAuth',($firebaseAuth) => $firebaseAuth().$requireSignIn() ],
                venues: ['VenueFactory','FirebaseRefs',(VenueFactory,FirebaseRefs) => new VenueFactory(FirebaseRefs.venues()).$loaded() ],
                events: ['EventFactory','FirebaseRefs',(EventFactory,FirebaseRefs) => new EventFactory(FirebaseRefs.events()).$loaded() ]
              },
              controller: ($scope,venues,events) => {
                $scope.venues = venues;
                $scope.events = events;
              }
            })

          .state('artist', {
            template: '<div ui-view></div>',
            resolve: {
              auth: ['$firebaseAuth',($firebaseAuth) => $firebaseAuth().$requireSignIn() ]
            }
          })
            .state('artist.profile', {
              url: '/artist/profile/:id',
              template: '<artist-profile artist="artist"></artist-profile>',
              resolve: {
                artist: ['ArtistApi','$stateParams',(api,$stateParams) => api.get($stateParams['id']).$loaded()]                
              },
              controller: ($scope,artist) => {
                $scope.artist = artist;
              }
            })
        ;
    })

    ;
}