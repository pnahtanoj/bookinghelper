/// <reference path="../../../typings/angularjs/angular.d.ts"/>
/// <reference path="./address.ts"/>

namespace bh {

	'use strict';

	export class Venue {
	    key: string;
	    name: string;
	    address: Address;
	    active: boolean;

	    constructor() {
	    	this.key = '';
	    	this.name = '';
	    	this.address = new bh.Address();
	    	this.active = true;
	    	return this;
	    }
	}
}