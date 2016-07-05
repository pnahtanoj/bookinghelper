/// <reference path="../../../typings/angularfire/angularfire.d.ts"/>
/// <reference path="../../../typings/es6-promise/es6-promise.d.ts"/>

namespace bh {

	'use strict';

	export class Artist implements AngularFireObject {
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