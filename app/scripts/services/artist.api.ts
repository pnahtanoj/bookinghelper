/// <reference path="../../../typings/angularjs/angular.d.ts"/>
/// <reference path="../../../typings/angularfire/angularfire.d.ts"/>
/// <reference path="../../../typings/es6-promise/es6-promise.d.ts"/>
/// <reference path="../model/enums.ts"/>
/// <reference path="../model/artist.ts"/>

namespace bh {

	'use strict';

	declare var firebase: any;

	export interface IArtistApi {
		artistsRef: any;
        get: (uid:string) => Artist;
        create: (artist:Artist, uid:string) => angular.IPromise<any>;
	}

	class ArtistApi implements IArtistApi {
		artistsRef: any;

		constructor(public $firebaseObject:any) {
			this.artistsRef = firebase.database().ref(BH_ENDPOINT_ARTISTS);
		}

		get(uid:string) :Artist {
			return this.$firebaseObject(this.artistsRef.child(uid));
		}

		create(agent:Artist, uid:string) {
			let obj:Artist = this.$firebaseObject(this.artistsRef.child(uid));

			obj.name = agent.name;
			obj.hometown = agent.hometown;
			obj.genre = agent.genre;
			obj.active = agent.active;
			return obj.$save();
		}
	} 

	ArtistApi.$inject = ['$firebaseObject'];

	angular
		.module('bookingHelperApp')
		.service('ArtistApi', ArtistApi);		

}