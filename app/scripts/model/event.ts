/// <reference path="../../../typings/angularjs/angular.d.ts"/>
/// <reference path="./address.ts"/>

namespace bh {

	'use strict';

	export class EventVenue {
		name: string;
	}
	export class Event {
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

	    title: string;
	    venue: EventVenue;
	    active: boolean;

	    constructor() {
	    	this.title = '';
	    	this.venue = new EventVenue();
	    	this.active = true;
	    	return this;
	    }
	}
}