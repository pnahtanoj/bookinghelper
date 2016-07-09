/// <reference path="../../../typings/angularjs/angular.d.ts"/>
/// <reference path="../../../typings/angularfire/angularfire.d.ts"/>
/// <reference path="../../../typings/angular-ui-router/angular-ui-router.d.ts"/>
/// <reference path="../../../typings/angular-material/angular-material.d.ts"/>
/// <reference path="../model/venue.ts"/>

namespace bh {

    'use strict';

    // declare var firebase: any;

    class VenueList {
        venues: Venue[];

        editVenue: (venue:any) => any;

        constructor() {
            return this;
        }

        edit(venue) {
            this.editVenue({venue: venue});
        }
    } 

    VenueList.$inject = [];

    angular
        .module('bookingHelperApp')
        .component('venueList', {
            templateUrl: 'scripts/venue/venue.list.html',
            bindings: {
                venues: '<',
                editVenue: '&'
            },
            controller: VenueList
        });
}