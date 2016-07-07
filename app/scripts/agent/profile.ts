/// <reference path="../../../typings/angularjs/angular.d.ts"/>
/// <reference path="../../../typings/angular-ui-router/angular-ui-router.d.ts"/>
/// <reference path="../../../typings/angular-material/angular-material.d.ts"/>
/// <reference path="../services/booking.agent.api.ts"/>

namespace bh {

	'use strict';

	// declare var firebase: any;

	class AgentProfileCtrl {
		agent: BookingAgent;

		constructor(
			public BookingAgentApi:IBookingAgentApi, 
			public $stateParams:angular.ui.IStateParamsService, 
			public $mdToast:angular.material.IToastService) {
			
			this.agent = this.BookingAgentApi.get( $stateParams['id'] );
		}

		update() {
			this.agent.$save()
				.then((ref) => this.$mdToast.show( this.$mdToast.simple().textContent('Successfully updated agent info')))
				.catch((error) => this.$mdToast.show( this.$mdToast.simple().textContent('Error updating info: ' +  error)));
		}
	} 

	AgentProfileCtrl.$inject = ['BookingAgentApi','$stateParams','$mdToast'];

	angular
		.module('bookingHelperApp')
		.component('agentProfile', {
			templateUrl: 'scripts/agent/profile.html',
			bindings: {},
			controller: AgentProfileCtrl
		});
}