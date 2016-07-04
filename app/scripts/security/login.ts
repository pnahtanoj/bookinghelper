/// <reference path="../../../typings/angularjs/angular.d.ts"/>
/// <reference path="../services/user.api.ts"/>
/// <reference path="../model/enums.ts"/>
/// <reference path="../model/user.ts"/>

namespace bh {

	'use strict';

	class LoginCtrl {
		email: string;
		password: string;
		constructor(public $q:angular.IQService, public $firebaseAuth:any, public UserApi:IUserApi) {
			this.email = '';
			this.password = '';
		}

		login() {
		    let auth = this.$firebaseAuth();
		    auth.$signInWithEmailAndPassword('spoon@spoon.com','spoonspoon')
		    // auth.$signInWithEmailAndPassword('imakethissound@gmail.com','testing')
		    	.then((usr) => console.log('signed in user: ', usr))
		    	.catch((error) => console.log('login failed: ', error))
		}

		registerAgent() {
			// let newUser = new User();
			// newUser.email = this.email;
			
			// this.UserApi.createFirebaseUser(newUser, this.password)
		 //    	.then((usr) => console.log('created user: ', usr))
		 //    	.catch((error) => console.log('create failed: ', error))

		    // let auth = this.$firebaseAuth();
		    // auth.$createUserWithEmailAndPassword('imakethissoundddd@gmail.com','testing')
		    // 	.then((usr) => console.log('signed in user: ', usr))
		    // 	.catch((error) => console.log('login failed: ', error))
		}
	} 

	LoginCtrl.$inject = ['$q','$firebaseAuth','UserApi'];

	angular
		.module('bookingHelperApp')
		.component('login', {
			templateUrl: 'scripts/security/login.html',
			bindings: {},
			controller: LoginCtrl
		});
}