/// <reference path="../../../typings/angularjs/angular.d.ts"/>

namespace bh {

	'use strict';

	export class Band {
	    name: string;
		hometown: string;
	    genre: string;
	    active: boolean;

	    constructor() {
	    	this.name = '';
			this.hometown = '';
	    	this.genre = '';
	    	this.active = true;
	    	return this;
	    }
	}
}