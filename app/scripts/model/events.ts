/// <reference path="../../../typings/angularjs/angular.d.ts"/>
/// <reference path="../../../typings/angularfire/angularfire.d.ts"/>
/// <reference path="../../../typings/es6-promise/es6-promise.d.ts"/>
/// <reference path="./event.ts"/>

namespace bh {

	'use strict';

	// export class Events {
	//     // constructor() {}

	//     $$added(snap, prev) {
	//     	console.log(snap);
	//     	return new Event(snap);
	//     }
	// }

	angular
		.module('bookingHelperApp')
		.factory('Events', ($firebaseArray) => {

			return $firebaseArray.$extend({
			    $$added: function(snap, prev) {
			    	console.log('$$added: ', snap.val());
			    	return new Event().populate(snap);
			    }

				// $$updated: function(snap) {
				// 	console.log(snap.key);

				// 	// we need to return true/false here or $watch listeners will not get triggered
				// 	// luckily, our Widget.prototype.update() method already returns a boolean if
				// 	// anything has changed
				// 	// return this.$getRecord(snap.key()).update(snap);

				// 	// I'm ham fisting to true.
				// 	// this.$getRecord(snap.key).populate(snap);
				// 	return true;
				// }			    
			})
		});
}