/// <reference path="../../typings/angularjs/angular.d.ts"/>
/// <reference path="./model/enums.ts"/>
/// <reference path="./model/band.ts"/>
/// <reference path="./services/band.api.ts"/>
/// <reference path="./model/booking.agent.ts"/>
/// <reference path="./services/booking.agent.api.ts"/>
/// <reference path="./model/venue.ts"/>
/// <reference path="./services/venue.api.ts"/>

namespace bh {

	'use strict';

	declare var firebase: any;

	class BaselineCtrl {
		bandsRef: any;
		bookingAgentsRef: any;
		venuesRef: any;

		constructor(public $q:angular.IQService, public BandApi:IBandApi, 
			public BookingAgentApi:IBookingAgentApi, public VenueApi:IVenueApi) {

			this.bandsRef = firebase.database().ref(BH_ENDPOINT_BANDS);
			this.bookingAgentsRef = firebase.database().ref(BH_ENDPOINT_BOOKINGAGENTS)
			this.venuesRef = firebase.database().ref(BH_ENDPOINT_VENUES);
		}

		baselineData() {
			this.baselineBands();
			this.baselineBookingAgents();
			this.baselineVenues();
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
			
			let baselineBookingAgents = [];
			
			let jen:BookingAgent = new BookingAgent();
			jen.name = 'Jennifer Tefft';
			jen.active = true;

			let liz:BookingAgent = new BookingAgent();
			liz.name = 'Liz Garo';
			liz.active = true;

			baselineBookingAgents.push(jen);
			baselineBookingAgents.push(liz);

			this.clearBookingAgents()
				.then(() => {
					angular.forEach(baselineBookingAgents, (b) => {
						this.BookingAgentApi.addBookingAgent(b)
							.then((resp) => {
								console.log('booking agent added: ', b);
							})
					})
				})
				.catch((err) => console.log('clearing error: ', err))
		}

		baselineBands() {
			
			let baselineBands = [];
			
			let band:Band = new Band();
			band.name = 'Chumbawumba';
			band.hometown = 'Saskatoon';
			band.genre = 'Pop';
			band.active = true;

			let band2:Band = new Band();
			band2.name = 'Spoon';
			band2.hometown = 'Austin';
			band2.genre = 'Rock';
			band2.active = true;

			baselineBands.push(band);
			baselineBands.push(band2);

			this.clearBands()
				.then(() => {
					angular.forEach(baselineBands, (b) => {
						this.BandApi.addBand(b)
							.then((resp) => {
								console.log('band added: ', b);
							})
					})
				})
				.catch((err) => console.log('clearing error: ', err))
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

			this.bandsRef.remove()
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
	} 

	BaselineCtrl.$inject = ['$q','BandApi','BookingAgentApi','VenueApi'];

	angular
		.module('bookingHelperApp')
		.component('baseline', {
			templateUrl: 'scripts/baseline.html',
			bindings: {},
			controller: BaselineCtrl
		});
}