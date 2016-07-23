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

	class EventListCtrl {
		venues :any;
		venue :any;
		events :any;
		event: any;
		eventUnedited: any;

		constructor(
			public FirebaseRefs:any,
			public EventFactory:any) {

			this.events = new EventFactory(this.FirebaseRefs.events());

			this.events.$loaded()
				.then(() => console.log(this.events))
		}


		edit(event) {
			this.event = angular.copy(event);
			this.eventUnedited = angular.copy(this.event);
			this.venue = this.venues.$getRecord(this.event.venue.key);
		}
	} 

	EventListCtrl.$inject = ['FirebaseRefs','EventFactory'];

	angular
		.module('bookingHelperApp')
		.component('eventList', {
			templateUrl: 'scripts/event/list.html',
			bindings: {
				venues: '<'
			},
			controller: EventListCtrl
		});
}