/// <reference path="../../../typings/angularjs/angular.d.ts"/>
/// <reference path="./booking.agent.ts"/>
/// <reference path="./band.ts"/>

namespace bh {

	'use strict';

	export class User {
		uid: string;
		role: string;
	    active: boolean;

	    constructor() {
			this.uid = '';
			this.role = '';
	    	this.active = true;
	    	return this;
	    }
	}
}