/// <reference path="../../../typings/angularjs/angular.d.ts"/>
/// <reference path="../../../typings/angularfire/angularfire.d.ts"/>
/// <reference path="../../../typings/es6-promise/es6-promise.d.ts"/>
/// <reference path="../model/booking.agent.ts"/>
/// <reference path="./user.api.ts"/>

namespace bh {

	'use strict';

	declare var firebase: any;

	export interface IBookingAgentApi {
		agentsRef: any;
        get: (uid:string) => BookingAgent;
        create: (agent:BookingAgent, uid:string) => angular.IPromise<any>;
	}

	class BookingAgentApi implements IBookingAgentApi {
		agentsRef: any;

		constructor(public $q:angular.IQService, public $firebaseObject:any) {
			this.agentsRef = firebase.database().ref(BH_ENDPOINT_BOOKINGAGENTS);
		}

		get(uid:string) :BookingAgent {
			return this.$firebaseObject(this.agentsRef.child(uid));
		}

		create(agent:BookingAgent, uid:string) {
			let obj:BookingAgent = this.$firebaseObject(this.agentsRef.child(uid));

			obj.name = agent.name;
			obj.active = agent.active;
			return obj.$save();
		}
	} 

	BookingAgentApi.$inject = ['$q','$firebaseObject'];

	angular
		.module('bookingHelperApp')
		.service('BookingAgentApi', BookingAgentApi);		

}