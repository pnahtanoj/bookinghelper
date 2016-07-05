/// <reference path="../../../typings/angularjs/angular.d.ts"/>
/// <reference path="../../../typings/angular-ui-router/angular-ui-router.d.ts"/>
/// <reference path="../services/artist.api.ts"/>

namespace bh {

	'use strict';

	// declare var firebase: any;

	class ArtistProfileCtrl {
		artist: Artist;

		constructor(public ArtistApi:IArtistApi, public $stateParams:angular.ui.IStateParamsService) {
			this.artist = this.ArtistApi.get( $stateParams['id'] );

			console.log(this.artist);
		}

		update() {
			this.artist.$save()
				.then((ref) => console.log(ref))
				.catch((error) => console.log(error));
		}
	} 

	ArtistProfileCtrl.$inject = ['ArtistApi','$stateParams'];

	angular
		.module('bookingHelperApp')
		.component('artistProfile', {
			templateUrl: 'scripts/artist/profile.html',
			bindings: {},
			controller: ArtistProfileCtrl
		});
}