/// <reference path="../../../typings/angularjs/angular.d.ts"/>
/// <reference path="../../../typings/angular-material/angular-material.d.ts"/>
/// <reference path="../../../typings/angularfire/angularfire.d.ts"/>
/// <reference path="../../../typings/es6-promise/es6-promise.d.ts"/>
/// <reference path="../model/enums.ts"/>
/// <reference path="../model/venue.ts"/>

namespace bh {

	'use strict';

	declare var firebase: any;

	export interface IVenueApi {
		venuesRef: any;
        create: (venue:Venue) => angular.IPromise<any>;
	}

	class VenueApi implements IVenueApi {
		venuesRef: any;

		constructor(public $q:angular.IQService, public $firebaseObject:any, public $mdToast:angular.material.IToastService) {
			this.venuesRef = firebase.database().ref(BH_ENDPOINT_VENUES);
		}

		create(venue:Venue) {
			let d = this.$q.defer();
			this.venuesRef.push(venue)
				.then((resp) => {
					let obj:Venue = this.$firebaseObject(this.venuesRef.child(resp.key));

			    	obj.name = venue.name;
			    	obj.address = venue.address;
			    	obj.active = venue.active;

					this.$mdToast.show( this.$mdToast.simple().textContent('Successfully created venue ' + venue.name))
					console.log('create success, new key: ', resp.key);
					d.resolve(obj);
				})
				.catch((error) => this.$mdToast.show( this.$mdToast.simple().textContent(error)))

			return d.promise;
		}
	} 

	VenueApi.$inject = ['$q','$firebaseObject','$mdToast'];

	angular
		.module('bookingHelperApp')
		.service('VenueApi', VenueApi);		

}