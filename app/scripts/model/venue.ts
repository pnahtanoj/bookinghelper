/// <reference path="../../../typings/angularjs/angular.d.ts"/>
/// <reference path="./address.ts"/>

namespace bh {

	'use strict';

	export class Venue {
		// AngularFireObject values //
		$id: any;
		$priority: any;
		$value: any;
		$remove: any;
		$save: any;
		$loaded: any;
		$ref: any;
		$bindTo: any;
		$watch: any;
		$destroy: any;
		// AngularFireObject values //

	    name: string;
	    address: Address;
	    active: boolean;

	    constructor() {
	    	this.name = '';
	    	this.address = new Address();
	    	this.active = true;
	    	return this;
	    }
	}
}