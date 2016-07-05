/// <reference path="../../../typings/angularjs/angular.d.ts"/>

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