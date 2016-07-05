/// <reference path="../../../typings/angularjs/angular.d.ts"/>
/// <reference path="../../../typings/angular-ui-router/angular-ui-router.d.ts"/>
/// <reference path="../model/user.ts"/>
/// <reference path="../model/artist.ts"/>
/// <reference path="../model/booking.agent.ts"/>

namespace bh {

	'use strict';

	export interface IActiveSession {
		user: User;
		artist: Artist;
		agent: BookingAgent;
	}
	
	export class ActiveSession implements IActiveSession {
		user: User;
		artist: Artist;
		agent: BookingAgent;

		constructor() {
			this.user = new User();
		}
	}

	ActiveSession.$inject = [];

	angular
		.module('bookingHelperApp')
		.service('ActiveSession', ActiveSession);		

}