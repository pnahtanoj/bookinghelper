/// <reference path="../../../typings/angularjs/angular.d.ts"/>
/// <reference path="../model/enums.ts"/>

namespace bh {

	'use strict';

	class LoginCtrl {

		constructor(public $q:angular.IQService, public $firebaseAuth:any) {
		}

		login() {
		    let auth = this.$firebaseAuth();
		    auth.$signInWithEmailAndPassword('imakethissound@gmail.com','testing')
		    	.then((usr) => console.log('signed in user: ', usr))
		    	.catch((error) => console.log('login failed: ', error))
		}

		register() {
		    let auth = this.$firebaseAuth();
		    auth.$createUserWithEmailAndPassword('imakethissoundddd@gmail.com','testing')
		    	.then((usr) => console.log('signed in user: ', usr))
		    	.catch((error) => console.log('login failed: ', error))
		}
	} 

	LoginCtrl.$inject = ['$q','$firebaseAuth'];

	angular
		.module('bookingHelperApp')
		.component('login', {
			templateUrl: 'scripts/security/login.html',
			bindings: {},
			controller: LoginCtrl
		});
}