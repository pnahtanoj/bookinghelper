/// <reference path="../../../typings/angularjs/angular.d.ts"/>
/// <reference path="../../../typings/angularfire/angularfire.d.ts"/>
/// <reference path="../../../typings/angular-ui-router/angular-ui-router.d.ts"/>
/// <reference path="../../../typings/angular-material/angular-material.d.ts"/>
/// <reference path="../model/enums.ts"/>
/// <reference path="../model/event.ts"/>
/// <reference path="../model/venue.ts"/>

namespace bh {

    'use strict';

    class EventEdit {
        edit: any;
        original: any;
        venue: Venue;
        venues: Venue[];

        constructor(public FirebaseRefs:any, public Event:any) {
            this.clear();
            return this;
        }

        clear() {            
            this.edit = new this.Event();
            this.original = new this.Event();
            this.venue = null;
        }

        venueDupe() {
            let ev = new EventVenue();
            ev.name = this.venue.name;
            ev.key = this.venue.key;
            return ev;            
        }

        add() {
            let rootRef = this.FirebaseRefs.root();
            this.edit.key = this.FirebaseRefs.getNewEventKey();

            this.edit.venue = this.venueDupe();
            rootRef.update(this.getFanoutUpdate(this.edit.key))
                .then((resp) => {
                    this.clear();
                })
                .catch((error) => console.log(error));
        }

        update() {
            let rootRef = this.FirebaseRefs.root();
            let key = this.edit.key;

            this.edit.venue = this.venueDupe();
            let fanout = this.getFanoutUpdate(this.edit.key);

            // IF CHANGED, DELETE OLD VENUE EVENT //
            if (this.edit.venue.key !== this.original.venue.key) {
                fanout[BH_ENDPOINT_VENUE_EVENTS + '/' + this.original.venue.key + '/' + key] = null;
            }

            rootRef.update(fanout)
                .then((resp) => {
                    this.clear();
                })
                .catch((error) => console.log(error));
        }

        delete() {
            this.edit.venue = this.venueDupe();
            let rootRef = this.FirebaseRefs.root();
            let key = this.edit.key;

            rootRef.update(this.getFanoutDelete(key))
                .then((resp) => {
                    this.clear();
                })
                .catch((error) => console.log(error));
        }

        getFanoutUpdate(key) {
            return this.getFanout(key, this.edit.toJSON());
        }

        getFanoutDelete(key) {
            return this.getFanout(key, null);
        }

        getFanout(key, event) {
            let rootRef = this.FirebaseRefs.root();
            let fanoutRefs = {};

            fanoutRefs[BH_ENDPOINT_EVENTS + '/' + key] = event;
            fanoutRefs[BH_ENDPOINT_VENUE_EVENTS + '/' + this.venue.key + '/' + key] = event;
            console.log(fanoutRefs);
            return fanoutRefs;
        }

    } 

    EventEdit.$inject = ['FirebaseRefs','Event'];

    angular
        .module('bookingHelperApp')
        .component('eventEdit', {
            templateUrl: 'scripts/event/event.edit.html',
            bindings: {
                edit: '=',
                original: '=',
                venue: '=',
                venues: '<'
            },
            controller: EventEdit
        });
}