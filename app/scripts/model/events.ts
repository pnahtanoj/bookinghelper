/// <reference path="../../../typings/angularjs/angular.d.ts"/>
/// <reference path="../../../typings/angularfire/angularfire.d.ts"/>
/// <reference path="../../../typings/es6-promise/es6-promise.d.ts"/>
/// <reference path="./event.ts"/>

namespace bh {

	'use strict';

	angular
		.module('bookingHelperApp')
		.factory('EventFactory', ($firebaseArray,$q) => {

			return $firebaseArray.$extend({
			    $$added: function(snap, prev) {
			    	console.log('$$added: ', snap.val());
			    	return new Event().populate(snap);
			    },

			    findWithVenue: function(key) {
			    	let d = $q.defer();

            		this.$ref().orderByChild("venue/key").equalTo(key).once('value')
            			.then((resp) => d.resolve(resp))
            			.catch((error) => d.reject(error));

            		return d.promise;
			    }	    
			})
		});
}