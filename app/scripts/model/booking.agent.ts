/// <reference path="../../../typings/angularjs/angular.d.ts"/>
/// <reference path="../model/user.ts"/>

namespace bh {

	'use strict';

	export class BookingAgent {
	    name: string;
	    active: boolean;

	    constructor() {
	    	this.name = '';
	    	this.active = true;
	    	return this;
	    }
	}
}