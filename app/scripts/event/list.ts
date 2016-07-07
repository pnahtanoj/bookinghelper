/// <reference path="../../../typings/angularjs/angular.d.ts"/>
/// <reference path="../../../typings/angularfire/angularfire.d.ts"/>
/// <reference path="../../../typings/angular-ui-router/angular-ui-router.d.ts"/>
/// <reference path="../../../typings/angular-material/angular-material.d.ts"/>
/// <reference path="../services/event.api.ts"/>
/// <reference path="../model/event.ts"/>
/// <reference path="../model/venue.ts"/>

namespace bh {

	'use strict';

	// declare var firebase: any;

	class EventListCtrl {
		venues :any;
		venue :any;
		events :any;
		event: any;

		constructor(
			public EventApi:IEventApi, 
			public $stateParams:angular.ui.IStateParamsService,
			public $mdToast:angular.material.IToastService) {

			this.events = EventApi.fetch();
			this.clear(); // blanks //
		}

		venueDupe() {
			let ev = new EventVenue();
			ev.name = this.venue.name;
			ev.key = this.venue.$id;
			return ev;			
		}
		add() {
			this.event.venue = this.venueDupe();
			this.events.$add(this.event)
				.then(() => {
					this.$mdToast.show( this.$mdToast.simple().textContent('Successfully added event'))
					this.clear();
				})
				.catch((error) => this.$mdToast.show( this.$mdToast.simple().textContent(error)))
		}

		edit(event) {
			this.event = event;
			this.venue = this.venues.$getRecord(this.event.venue.key);
		}
		clear() {
			this.event = new Event();
			this.venue = new Venue();
		}
		update() {
			this.event.venue = this.venueDupe();
			this.events.$save(this.event)
				.then(() => {
					this.$mdToast.show( this.$mdToast.simple().textContent('Successfully updated event'))
					this.clear();
				})
				.catch((error) => this.$mdToast.show( this.$mdToast.simple().textContent(error)))
		}
		delete() {
			this.event.$save();
		}
	} 

	EventListCtrl.$inject = ['EventApi','$stateParams','$mdToast'];

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