/// <reference path="../../../typings/angularjs/angular.d.ts"/>
/// <reference path="./address.ts"/>

namespace bh {

	'use strict';

	export class Venue {
		$id: string;
		key: string;
	    name: string;
	    address: Address;
	    active: boolean;

	    constructor() {
	    	this.name = '';
	    	this.address = new Address();
	    	this.active = true;
	    	return this;
	    }

	    populate(snapshot) {
	    	if (typeof snapshot.val().key != 'undefined') {
	    		this.$id = snapshot.val().key;
	    		this.key = snapshot.val().key;
	    	}
	    	if (typeof snapshot.val().name != 'undefined')
	    		this.name = snapshot.val().name;
	    	if (typeof snapshot.val().address != 'undefined')
	    		this.address = snapshot.val().address;
	    	if (typeof snapshot.val().active != 'undefined')
	    		this.active = snapshot.val().active;
	    	return this;
	    }

	    toJSON() {
            return angular.extend({}, {
            	key: this.key,
                name: this.name,
	            address: {
					address: this.address.address,
					address2: this.address.address2,
					city: this.address.city,
					state: this.address.state,
					zip: this.address.zip
                },
                active: this.active
            });	    	
	    }
	}
}