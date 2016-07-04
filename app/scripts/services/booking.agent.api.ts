/// <reference path="../../../typings/angularjs/angular.d.ts"/>
/// <reference path="../model/booking.agent.ts"/>
/// <reference path="./user.api.ts"/>

namespace bh {

	'use strict';

	declare var firebase: any;

	export interface IBookingAgentApi {
		agentsRef: any;
        create: (agent:BookingAgent, uid:string) => angular.IPromise<any>;
	}

	class BookingAgentApi implements IBookingAgentApi {
		agentsRef: any;

		constructor(public $q:angular.IQService, public UserApi:IUserApi) {
			this.agentsRef = firebase.database().ref(BH_ENDPOINT_BOOKINGAGENTS);
		}

		create(agent:BookingAgent, uid:string) {
			let d = this.$q.defer();

			this.agentsRef.child(uid).set(agent)
				.then((resp) => {
					d.resolve(agent);
				})
				.catch((err) => {
					d.reject(err)
				})

			return d.promise;
		}
	} 

	BookingAgentApi.$inject = ['$q','UserApi'];

	angular
		.module('bookingHelperApp')
		.service('BookingAgentApi', BookingAgentApi);		

}