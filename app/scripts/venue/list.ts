/// <reference path="../../../typings/angularjs/angular.d.ts"/>
/// <reference path="../../../typings/angularfire/angularfire.d.ts"/>
/// <reference path="../../../typings/angular-ui-router/angular-ui-router.d.ts"/>
/// <reference path="../../../typings/angular-material/angular-material.d.ts"/>
/// <reference path="../services/event.api.ts"/>
/// <reference path="../services/venue.event.api.ts"/>
/// <reference path="../services/agent.event.api.ts"/>
/// <reference path="../services/active.session.ts"/>
/// <reference path="../model/event.ts"/>
/// <reference path="../model/venue.ts"/>

namespace bh {

	'use strict';

	declare var firebase: any;

	class VenueListCtrl {
		venue:any;
		venues:any;
		events:any;

		constructor() {}

		edit(venue) {
			this.venue = angular.copy(venue);
		}
	} 

	VenueListCtrl.$inject = [];

	angular
		.module('bookingHelperApp')
		.component('venues', {
			templateUrl: 'scripts/venue/list.html',
			bindings: {
				venues: '<',
				events: '<'
			},
			controller: VenueListCtrl
		});
}