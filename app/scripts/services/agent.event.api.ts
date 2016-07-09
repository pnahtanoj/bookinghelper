/// <reference path="../../../typings/angularjs/angular.d.ts"/>
/// <reference path="../../../typings/angularfire/angularfire.d.ts"/>
/// <reference path="../../../typings/es6-promise/es6-promise.d.ts"/>
/// <reference path="../model/enums.ts"/>
/// <reference path="../model/event.ts"/>

namespace bh {

	'use strict';

	declare var firebase: any;

	export interface IAgentEventApi {
		eventsRef: any;
        fetch: (venueId:string) => Event[];
		// update: (event:Event, agentId:string) => angular.IPromise<any>;
	}

	class AgentEventApi implements IAgentEventApi {
		eventsRef: any;

		constructor(public $firebaseArray:any, public $firebaseObject:any) {
			this.eventsRef = firebase.database().ref(BH_ENDPOINT_BOOKINGAGENTS_EVENTS);
		}

		fetch(agentId:string) {
			 return this.$firebaseArray(this.eventsRef.child(agentId));
		}
		
		get(agentId:string, eventId:string) {
			console.log('get: ', eventId);

			return this.$firebaseObject(this.eventsRef.child(agentId).child(eventId));
		}

		// update(event:Event, agentId:string) {
		// 	let vEvent = this.get(agentId, event.$id);
		// 	vEvent.title = event.title;
		// 	vEvent.active = event.active;

		// 	return vEvent.$save(event);
		// }
	} 

	AgentEventApi.$inject = ['$firebaseArray','$firebaseObject'];

	angular
		.module('bookingHelperApp')
		.service('AgentEventApi', AgentEventApi);		

}