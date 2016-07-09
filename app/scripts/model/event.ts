/// <reference path="../../../typings/angularjs/angular.d.ts"/>
/// <reference path="../../../typings/angularfire/angularfire.d.ts"/>
/// <reference path="../../../typings/es6-promise/es6-promise.d.ts"/>
/// <reference path="./address.ts"/>

namespace bh {

	'use strict';

	export class EventVenue {
		name: string;
		key: string;
	}
	
	export class Event {
		$id: string;
		key: string;
	    title: string;
	    venue: EventVenue;
	    active: boolean;

	    constructor() {
	    	// console.log('event constructor snap: ', snapshot);

	    	this.title = '';
	    	this.venue = new EventVenue();
	    	this.active = true;

	    	// if (!!snapshot && typeof snapshot !== 'undefined') {
			   //  this.key = snapshot.key;
		    // 	this.populate( snapshot.val() );
	    	// }
	    	return this;
	    }

	    populate(snapshot) {
			// var oldData = angular.extend({}, this.snapshot.val());

			// // apply changes to this.snapshot.val() instead of directly on `this`
			// this.snapshot.val() = snapshot.val();

	    	if (typeof snapshot.val().key != 'undefined') {
				this.$id = snapshot.val().key;
	    		this.key = snapshot.val().key;
	    	}
	    	if (typeof snapshot.val().title != 'undefined')
	    		this.title = snapshot.val().title;
	    	if (typeof snapshot.val().venue != 'undefined')
	    		this.venue = snapshot.val().venue;
	    	if (typeof snapshot.val().active != 'undefined')
	    		this.active = snapshot.val().active;
	    	return this;
	    }

	    toJSON() {
            return angular.extend({}, {
            	key: this.key,
                title: this.title,
                venue: {
                	name: this.venue.name,
                	key: this.venue.key
                },
                active: this.active
            });	    	
	    }
	}

	angular
		.module('bookingHelperApp')
		.factory('Event', ($firebaseObject) => {
			return $firebaseObject.$extend(Event)
		});		
}