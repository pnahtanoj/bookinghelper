/// <reference path="../../../typings/angularjs/angular.d.ts"/>
/// <reference path="../model/enums.ts"/>
/// <reference path="../model/venue.ts"/>

namespace bh {

	'use strict';

	declare var firebase: any;

	export interface IVenueApi {
		venuesRef: any;
        addVenue: (venue: Venue) => angular.IPromise<any>;
	}

	class VenueApi implements IVenueApi {
		venuesRef: any;

		constructor(public $q:angular.IQService) {
			this.venuesRef = firebase.database().ref(BH_ENDPOINT_VENUES);
		}

		addVenue(venue:Venue) {
			let d = this.$q.defer();

			this.venuesRef.push(venue)
				.then((resp) => {
					console.log(resp.key); // set in band here if you want/need...
					d.resolve(venue);
				})
				.catch((err) => {
					console.log(err);
					d.reject(err)
				})

			return d.promise;
		}
	} 

	VenueApi.$inject = ['$q'];

	angular
		.module('bookingHelperApp')
		.service('VenueApi', VenueApi);		

}