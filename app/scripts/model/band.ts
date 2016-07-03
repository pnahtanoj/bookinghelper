/// <reference path="../../../typings/angularjs/angular.d.ts"/>

namespace bh {

	'use strict';

	export class Band {
	    key: string;
	    name: string;
		hometown: string;
	    genre: string;
	    active: boolean;

	    constructor() {
	    	this.key = '';
	    	this.name = '';
			this.hometown = '';
	    	this.genre = '';
	    	this.active = true;
	    	return this;
	    }
	}
}