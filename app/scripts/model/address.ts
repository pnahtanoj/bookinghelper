/// <reference path="../../../typings/angularjs/angular.d.ts"/>

namespace bh {

	'use strict';

	export class Address {
	    key: string;
	    address: string;
	    address2: string;
	    city: string;
	    state: string;
	    zip: string;

	    constructor() {
	    	this.key = '';
			this.address = '';
			this.address2 = '';
			this.city = '';
			this.state = '';
			this.zip = '';
	    	return this;
	    }
	}
}