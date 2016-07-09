/// <reference path="../../../typings/angularjs/angular.d.ts"/>
/// <reference path="../../../typings/angularfire/angularfire.d.ts"/>
/// <reference path="../../../typings/es6-promise/es6-promise.d.ts"/>
/// <reference path="../model/enums.ts"/>
/// <reference path="../model/event.ts"/>

namespace bh {

	'use strict';

	declare var firebase: any;

	export interface IVenueEventApi {
		eventsRef: any;
        fetch: (venueId:string) => Event[];
		// update: (event:Event, venueId:string) => angular.IPromise<any>;
        // update: (artist:Artist, uid:string) => angular.IPromise<any>;
	}

	class VenueEventApi implements IVenueEventApi {
		eventsRef: any;

		constructor(public $firebaseArray:any, public $firebaseObject:any) {
			this.eventsRef = firebase.database().ref(BH_ENDPOINT_VENUE_EVENTS);
		}

		fetch(venueId:string) {
			 return this.$firebaseArray(this.eventsRef.child(venueId));
		}
		
		get(venueId:string, eventId:string) {
			console.log('get: ', eventId);

			return this.$firebaseObject(this.eventsRef.child(venueId).child(eventId));
		}

		// update(event:Event, venueId:string) {
		// 	let vEvent = this.get(venueId, event.$id);
		// 	vEvent.title = event.title;
		// 	vEvent.active = event.active;

		// 	return vEvent.$save(event);
		// }
	} 

	VenueEventApi.$inject = ['$firebaseArray','$firebaseObject'];

	angular
		.module('bookingHelperApp')
		.service('VenueEventApi', VenueEventApi);		

}