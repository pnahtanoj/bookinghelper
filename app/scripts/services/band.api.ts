/// <reference path="../../../typings/angularjs/angular.d.ts"/>
/// <reference path="../model/band.ts"/>

namespace bh {

	'use strict';

	declare var firebase: any;

	export interface IBandApi {
		bandsRef: any;
        create: (band:Band, uid:string) => angular.IPromise<any>;
	}

	class BandApi implements IBandApi {
		bandsRef: any;

		constructor(public $q:angular.IQService) {
			this.bandsRef = firebase.database().ref(BH_ENDPOINT_BANDS);
		}

		create(band:Band, uid:string) {
			let d = this.$q.defer();

			this.bandsRef.child(uid).set(band)
				.then((resp) => {
					console.log(resp.key); // set in band here if you want/need...
					d.resolve(band);
				})
				.catch((err) => {
					console.log(err);
					d.reject(err)
				})

			return d.promise;
		}
	} 

	BandApi.$inject = ['$q'];

	angular
		.module('bookingHelperApp')
		.service('BandApi', BandApi);		

}