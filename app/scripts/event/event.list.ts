/// <reference path="../../../typings/angularjs/angular.d.ts"/>
/// <reference path="../../../typings/angularfire/angularfire.d.ts"/>
/// <reference path="../../../typings/angular-ui-router/angular-ui-router.d.ts"/>
/// <reference path="../../../typings/angular-material/angular-material.d.ts"/>
/// <reference path="../services/event.api.ts"/>

namespace bh {

    'use strict';

    // declare var firebase: any;

    class EventListDir {
        editEvent: (event:any) => any;

        constructor() {
            return this;
        }

        edit(event) {
            this.editEvent({event: event});
        }
    } 

    EventListDir.$inject = ['EventApi','$stateParams','$mdToast'];

    angular
        .module('bookingHelperApp')
        .component('eventListDir', {
            templateUrl: 'scripts/event/event.list.html',
            bindings: {
                events: '<',
                editEvent: '&'
            },
            controller: EventListDir
        });
}