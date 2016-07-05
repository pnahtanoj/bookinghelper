/// <reference path="../../../typings/angularjs/angular.d.ts"/>
/// <reference path="../model/enums.ts"/>

namespace bh {

	'use strict';

	declare var firebase: any;

	class BandListCtrl {
		bandsRef: any;
		bands: any;
		selected: any[];
		constructor(public $q:angular.IQService) {
			this.bandsRef = firebase.database().ref(BH_ENDPOINT_ARTISTS);
			this.selected = [];
			
		}

		load() {
			console.log('loadin...');
			this.bandsRef.on('value', 
				(snap) => console.log( this.bands = snap.val()),
				(err) => console.log(err))
		}
	} 

	BandListCtrl.$inject = ['$q','$firebaseAuth'];

	angular
		.module('bookingHelperApp')
		.component('bandsList', {
			templateUrl: 'scripts/agent/bands.list.html',
			bindings: {},
			controller: BandListCtrl
		});
}