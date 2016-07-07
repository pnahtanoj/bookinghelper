/// <reference path="../../../typings/angularjs/angular.d.ts"/>
/// <reference path="../../../typings/angularfire/angularfire.d.ts"/>
/// <reference path="../../../typings/es6-promise/es6-promise.d.ts"/>
/// <reference path="../model/enums.ts"/>
/// <reference path="../model/event.ts"/>

namespace bh {

	'use strict';

	declare var firebase: any;

	export interface IEventApi {
		eventsRef: any;
        fetch: () => Event[];
        // create: (artist:Artist, uid:string) => angular.IPromise<any>;
	}

	class EventApi implements IEventApi {
		eventsRef: any;

		constructor(public $firebaseArray:any) {
			this.eventsRef = firebase.database().ref(BH_ENDPOINT_EVENTS);
		}

		fetch() {
			 return this.$firebaseArray(this.eventsRef);
		}
		
		// get(uid:string) :Artist {
		// 	return this.$firebaseObject(this.eventsRef.child(uid));
		// }

		// create(agent:Artist, uid:string) {
		// 	let obj:Artist = this.$firebaseObject(this.eventsRef.child(uid));

		// 	obj.name = agent.name;
		// 	obj.hometown = agent.hometown;
		// 	obj.genre = agent.genre;
		// 	obj.active = agent.active;
		// 	return obj.$save();
		// }
	} 

	EventApi.$inject = ['$firebaseArray'];

	angular
		.module('bookingHelperApp')
		.service('EventApi', EventApi);		

}