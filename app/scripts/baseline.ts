/// <reference path="../../typings/angularjs/angular.d.ts"/>
/// <reference path="./model/enums.ts"/>
/// <reference path="./model/artist.ts"/>
/// <reference path="./services/artist.api.ts"/>
/// <reference path="./model/booking.agent.ts"/>
/// <reference path="./services/booking.agent.api.ts"/>
/// <reference path="./model/venue.ts"/>
/// <reference path="./services/venue.api.ts"/>
/// <reference path="./model/user.ts"/>
/// <reference path="./services/user.api.ts"/>

namespace bh {

	'use strict';

	declare var firebase: any;

	class BaselineCtrl {
		artistRef: any;
		bookingAgentsRef: any;
		venuesRef: any;
		usersRef: any;

		constructor(public $q:angular.IQService, public ArtistApi:IArtistApi, 
			public BookingAgentApi:IBookingAgentApi, public VenueApi:IVenueApi, public UserApi:IUserApi,
			public $firebaseAuth:any) {

			this.artistRef = firebase.database().ref(BH_ENDPOINT_ARTISTS);
			this.bookingAgentsRef = firebase.database().ref(BH_ENDPOINT_BOOKINGAGENTS)
			this.venuesRef = firebase.database().ref(BH_ENDPOINT_VENUES);
			this.usersRef = firebase.database().ref(BH_ENDPOINT_USERS);
		}

		baselineData() {
			// firebase.database().ref().$removeUser({email:'jen@jen.com', password:'jennifer'});
			// this.createAccounts();
			// 	.then(() => {
					this.clearUsers();

					this.baselineBands();
					this.baselineBookingAgents();
					this.baselineVenues();
				// })
		}

		baselineVenues() {
			let venues = [];
			
			let spaceland:Venue = new Venue();
			spaceland.name = 'Spaceland';
			spaceland.address.address = '1717 Silver Lake Blvd';
			spaceland.address.city = 'Los Angeles';
			spaceland.address.state = 'CA';
			spaceland.address.zip = '90026';

			let theecho:Venue = new Venue();
			theecho.name = 'The Echo';
			theecho.address.address = '1822 Sunset Blvd';
			theecho.address.city = 'Los Angeles';
			theecho.address.state = 'CA';
			theecho.address.zip = '90026';

			venues.push(spaceland);
			venues.push(theecho);

			this.clearVenues()
				.then(() => {
					angular.forEach(venues, (b) => {
						this.VenueApi.addVenue(b)
							.then((resp) => {
								console.log('venue added: ', b);
							})
					})
				})
				.catch((err) => console.log('clearing error: ', err))
		}

		baselineBookingAgents() {
			this.clearBookingAgents()
				.then(() => {
					// password = jennifer //
					let jenU:User = new User();
					jenU.uid = 'YsHIKqtMLNZRRUKgzJYqccbfIzh1';
					jenU.role = 'agent';
					this.UserApi.create(jenU);
					let jen:BookingAgent = new BookingAgent();
					jen.name = 'Jennifer Tefft';
					this.BookingAgentApi.create(jen, jenU.uid);

					// password = lizgaro //
					let lizU:User = new User();
					lizU.uid = 'd1m1fH0U2ndOiAQfjWDaFHgNyQL2';
					lizU.role = 'admin';
					this.UserApi.create(lizU);
					let liz:BookingAgent = new BookingAgent();
					liz.name = 'Liz Garo';
					this.BookingAgentApi.create(liz,lizU.uid);					
				})			

		}

		baselineBands() {
			
			this.clearBands()
				.then(() => {
					// password = flyinglotus //
					let flyU:User = new User();
					flyU.uid = 'CJgV6xVfTfbLWdUyZGIHJrVS37I2';
					flyU.role = 'artist';
					this.UserApi.create(flyU);
					let flylo:Artist = new Artist();
					flylo.name = 'Flying Lotus';
					flylo.hometown = 'Los Angeles';
					flylo.genre = 'Electronic';
					flylo.active = true;
					this.ArtistApi.create(flylo, flyU.uid);

					// password = spoonspoon //
					let spoonU:User = new User();
					spoonU.uid = '57U0zyJypkb1yXd0PQ6oTkVaMpw2';
					spoonU.role = 'artist';
					this.UserApi.create(spoonU);

					let spoon:Artist = new Artist();
					spoon.name = 'Spoon';
					spoon.hometown = 'Austin';
					spoon.genre = 'Rock';
					spoon.active = true;
					this.ArtistApi.create(spoon, spoonU.uid);
				});

		}

		clearBookingAgents() {
			let d = this.$q.defer();

			this.bookingAgentsRef.remove()
				.then((err) => {
					if (err)
						d.reject(err)
					else
						d.resolve();
				})

			return d.promise;

		}
		clearBands() {
			let d = this.$q.defer();

			this.artistRef.remove()
				.then((err) => {
					if (err)
						d.reject(err)
					else
						d.resolve();
				})

			return d.promise;
		}

		clearVenues() {
			let d = this.$q.defer();

			this.venuesRef.remove()
				.then((err) => {
					if (err)
						d.reject(err)
					else
						d.resolve();
				})

			return d.promise;
		}	

		clearUsers() {
			let d = this.$q.defer();

			this.usersRef.remove()
				.then((err) => {
					if (err)
						d.reject(err)
					else
						d.resolve();
				})

			return d.promise;
		}

		// clearAccounts() {
		// 	let d = this.$q.defer();
		// 	let auth = this.$firebaseAuth();

		// 	this.$q.all([
		// 		auth.removeUser({email: 'jen@jen.com', password: 'jennifer'}),
		// 		auth.removeUser({email: 'liz@liz.com', password: 'lizgaro'})
		// 	])
		// 	.then(() => d.resolve());

		// 	return d.promise;
		// }			
	} 

	BaselineCtrl.$inject = ['$q','ArtistApi','BookingAgentApi','VenueApi','UserApi','$firebaseAuth'];

	angular
		.module('bookingHelperApp')
		.component('baseline', {
			templateUrl: 'scripts/baseline.html',
			bindings: {},
			controller: BaselineCtrl
		});
}