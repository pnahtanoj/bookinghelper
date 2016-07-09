/// <reference path="../../../typings/angularjs/angular.d.ts"/>
/// <reference path="../../../typings/angularfire/angularfire.d.ts"/>
/// <reference path="../../../typings/es6-promise/es6-promise.d.ts"/>
/// <reference path="../model/enums.ts"/>
/// <reference path="../model/event.ts"/>

namespace bh {

	'use strict';

	declare var firebase: any;

	export interface IFirebaseRefs {
	}

	class FirebaseRefs implements IFirebaseRefs {
		constructor() {
		}

		root() {
			 return firebase.database().ref();
		}

		events() {
			 return firebase.database().ref(BH_ENDPOINT_EVENTS);
		}

		venue(key) {
			 return firebase.database().ref(BH_ENDPOINT_VENUES + '/' + key);
		}
		
		venues() {
			 return firebase.database().ref(BH_ENDPOINT_VENUES);
		}

		// NEW KEYS //
		getNewEventKey() {
            return firebase.database().ref(BH_ENDPOINT_EVENTS).push().key;
		}
		getNewVenueKey() {
            return firebase.database().ref(BH_ENDPOINT_VENUES).push().key;
		}

	} 

	FirebaseRefs.$inject = [];

	angular
		.module('bookingHelperApp')
		.service('FirebaseRefs', FirebaseRefs);		

}