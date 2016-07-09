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
		eventsDef: any;
		event: any;
		eventUnedited: any;

		constructor(
			public FirebaseRefs:any,
			public ActiveSession:IActiveSession,
			public Event:any,
			public Events:any,
			public $firebaseArray:any,
			public $q:angular.IQService,
			public $stateParams:angular.ui.IStateParamsService,
			public $mdToast:angular.material.IToastService) {

			// this.events = this.$firebaseArray(this.FirebaseRefs.events());
			this.events = new Events(this.FirebaseRefs.events());

			this.events.$loaded()
				.then(() => console.log(this.events))

			this.eventsDef = $firebaseArray(this.FirebaseRefs.events());
		}


		edit(event) {
			// this.event = new Event().populate(event);
			this.event = angular.copy(event);
			this.eventUnedited = angular.copy(this.event);

			console.log(this.event);
			this.venue = this.venues.$getRecord(this.event.venue.key);
			// console.log(this.venue);
		}

		// clear() {
		// 	this.event = new Event();
		// 	this.venue = new Venue();
		// }
		// delete() {
		// 	this.event.$save();
		// }
	} 

	EventListCtrl.$inject = ['FirebaseRefs','ActiveSession','Event','Events','$firebaseArray','$q','$stateParams','$mdToast'];

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