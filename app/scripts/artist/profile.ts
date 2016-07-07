/// <reference path="../../../typings/angularjs/angular.d.ts"/>
/// <reference path="../../../typings/angular-ui-router/angular-ui-router.d.ts"/>
/// <reference path="../../../typings/angular-material/angular-material.d.ts"/>
/// <reference path="../services/artist.api.ts"/>

namespace bh {

	'use strict';

	// declare var firebase: any;

	class ArtistProfileCtrl {
		artist: Artist;

		constructor(
			public ArtistApi:IArtistApi, 
			public $stateParams:angular.ui.IStateParamsService,
			public $mdToast:angular.material.IToastService) {

			// this.artist = this.ArtistApi.get( $stateParams['id'] );
		}

		update() {
			this.artist.$save()
				.then((ref) => this.$mdToast.show( this.$mdToast.simple().textContent('Successfully updated artist info')))
				.catch((error) => this.$mdToast.show( this.$mdToast.simple().textContent('Error updating info: ' + error)));
		}
	} 

	ArtistProfileCtrl.$inject = ['ArtistApi','$stateParams','$mdToast'];

	angular
		.module('bookingHelperApp')
		.component('artistProfile', {
			templateUrl: 'scripts/artist/profile.html',
			bindings: {
				artist: '<'
			},
			controller: ArtistProfileCtrl
		});
}