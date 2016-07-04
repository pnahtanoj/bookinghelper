/// <reference path="../../../typings/angularjs/angular.d.ts"/>
/// <reference path="../model/enums.ts"/>
/// <reference path="../model/user.ts"/>

namespace bh {

	'use strict';

	declare var firebase: any;

	export interface IUserApi {
		auth: any;
		usersRef: any;
		// createAgent: (user:User) => angular.IPromise<any>;
		// createBand: (user:User) => angular.IPromise<any>;
        createFirebaseUser: (email:string, password:string) => angular.IPromise<any>;
        create: (user:User) => angular.IPromise<any>;
	}

	class UserApi implements IUserApi {
		usersRef: any;
		auth: any;

		constructor(public $q:angular.IQService, public $firebaseAuth:any) {
			this.usersRef = firebase.database().ref(BH_ENDPOINT_USERS);
		    this.auth = this.$firebaseAuth();
		}

		// createBand(user:User) {
		// 	if (user.agent) delete user.agent;

		// 	return this.createUser(user);
		// }

		// createAgent(user:User) :angular.IPromise<any>{
		// 	if (user.band) delete user.band;

		// 	return this.createUser(user);
		// }

		create(user:User) :angular.IPromise<any> {
			let d = this.$q.defer();

			this.usersRef.child(user.uid).set(user)
				.then((resp) => d.resolve(user))
				.catch((err) => d.reject(err))

			return d.promise;
		}

		createFirebaseUser(email:string, password:string) :angular.IPromise<any> {
			let d = this.$q.defer();

		    this.auth.$createUserWithEmailAndPassword(email, password)
		    	.then((data) => {
		    		console.log('created firebase user: ', data);
		    		d.resolve(data.uid);
		    	})
		    	.catch((error) => {
		    		console.log('login failed: ', error)
		    		d.reject(error);
		    	})

			return d.promise;
		}
	} 

	UserApi.$inject = ['$q','$firebaseAuth'];

	angular
		.module('bookingHelperApp')
		.service('UserApi', UserApi);		

}