/// <reference path="../../../typings/angularjs/angular.d.ts"/>

namespace bh {

	'use strict';

	export class BookingAgent {
	    key: string;
	    name: string;
	    active: boolean;

	    constructor() {
	    	this.key = '';
	    	this.name = '';
	    	this.active = true;
	    	return this;
	    }
	}
}