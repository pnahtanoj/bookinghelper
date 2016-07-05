/// <reference path="../../../typings/angularjs/angular.d.ts"/>
/// <reference path="../../../typings/angular-ui-router/angular-ui-router.d.ts"/>
/// <reference path="../services/booking.agent.api.ts"/>

namespace bh {

	'use strict';

	// declare var firebase: any;

	class AgentProfileCtrl {
		agent: BookingAgent;

		constructor(public BookingAgentApi:IBookingAgentApi, public $stateParams:angular.ui.IStateParamsService) {
			this.agent = this.BookingAgentApi.get( $stateParams['id'] );

			console.log(this.agent);
		}

		update() {
			this.agent.$save()
				.then((ref) => console.log(ref))
				.catch((error) => console.log(error));
		}
	} 

	AgentProfileCtrl.$inject = ['BookingAgentApi','$stateParams'];

	angular
		.module('bookingHelperApp')
		.component('agentProfile', {
			templateUrl: 'scripts/agent/profile.html',
			bindings: {},
			controller: AgentProfileCtrl
		});
}