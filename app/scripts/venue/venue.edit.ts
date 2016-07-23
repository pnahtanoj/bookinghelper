/// <reference path="../../../typings/angularjs/angular.d.ts"/>
/// <reference path="../../../typings/angularfire/angularfire.d.ts"/>
/// <reference path="../../../typings/angular-ui-router/angular-ui-router.d.ts"/>
/// <reference path="../../../typings/angular-material/angular-material.d.ts"/>
/// <reference path="../model/enums.ts"/>
/// <reference path="../model/event.ts"/>
/// <reference path="../model/venue.ts"/>

/// <reference path="../services/firebase.refs.ts"/>

namespace bh {

    'use strict';

    class VenueEdit {
        venue: Venue;
        events: any;

        constructor(public FirebaseRefs:IFirebaseRefs, public Venue:any, public EventFactory:any) {
            this.clear();
            return this;
        }

        clear() {            
            this.venue = new this.Venue();
        }

        add() {
            this.venue.key = this.FirebaseRefs.getNewVenueKey();
            this.updateAll( this.fanoutUpdate() );
        }  

        update() {
            this.updateAll( this.fanoutUpdate() );
        }

        // delete() {
        //     let fanout = this.fanout( null );

        //     console.log('LOOKING: ', this.venue.key);

        //     this.events.findWithVenue(this.venue.key)
        //         .then((resp) => {
        //             console.log('FOUND: ', resp.val());
        //             angular.forEach(resp.val(), (e) => fanout[this.fanoutEventLocation(e)] = null );
        //             this.updateAll(fanout);
        //         })
        //         .catch((error) => console.log('FIND ERROR: ', error));
        // }

        fanoutUpdate() {
            return this.fanoutVenue( this.venue.toJSON() );
        }

        fanoutVenue(venue) {
            let fanoutRefs = {};

            fanoutRefs[BH_ENDPOINT_VENUES + '/' + this.venue.key] = venue;

            console.log('venue edit fanout: ', fanoutRefs);
            return fanoutRefs;
        }

        // fanoutEventLocation(e) {
        //     return BH_ENDPOINT_EVENTS + '/' + e.key + '/venue';
        // }        

        updateAll(fanout) {
            let rootRef = this.FirebaseRefs.root();

            rootRef.update(fanout)
                .then((resp) => {
                    this.clear();
                })
                .catch((error) => console.log(error));
        }

    } 

    VenueEdit.$inject = ['FirebaseRefs','Venue','EventFactory'];

    angular
        .module('bookingHelperApp')
        .component('venueEdit', {
            templateUrl: 'scripts/venue/venue.edit.html',
            bindings: {
                venue: '=',
                events: '='
            },
            controller: VenueEdit
        });
}