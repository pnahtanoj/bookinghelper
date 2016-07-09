/// <reference path="../../../typings/angularjs/angular.d.ts"/>
/// <reference path="../../../typings/angularfire/angularfire.d.ts"/>
/// <reference path="../../../typings/es6-promise/es6-promise.d.ts"/>
/// <reference path="./venue.ts"/>

namespace bh {

	'use strict';

	angular
		.module('bookingHelperApp')
		.factory('VenueFactory', ($firebaseArray) => {

			return $firebaseArray.$extend({
			    $$added: function(snap, prev) {
			    	// console.log('$$added venue: ', snap);
			    	return new Venue().populate(snap);
			    }
			})

		});
}