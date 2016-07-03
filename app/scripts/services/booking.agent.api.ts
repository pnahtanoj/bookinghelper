/// <reference path="../../../typings/angularjs/angular.d.ts"/>
/// <reference path="../model/booking.agent.ts"/>

namespace bh {

	'use strict';

	declare var firebase: any;

	export interface IBookingAgentApi {
		agentsRef: any;
        addBookingAgent: (agent: BookingAgent) => angular.IPromise<any>;
	}

	class BookingAgentApi implements IBookingAgentApi {
		agentsRef: any;

		constructor(public $q:angular.IQService) {
			this.agentsRef = firebase.database().ref(BH_ENDPOINT_BOOKINGAGENTS);
		}

		addBookingAgent(agent:BookingAgent) {
			let d = this.$q.defer();

			this.agentsRef.push(agent)
				.then((resp) => {
					console.log(resp.key); // set in band here if you want/need...
					d.resolve(agent);
				})
				.catch((err) => {
					console.log(err);
					d.reject(err)
				})

			return d.promise;
		}
	} 

	BookingAgentApi.$inject = ['$q'];

	angular
		.module('bookingHelperApp')
		.service('BookingAgentApi', BookingAgentApi);		

}