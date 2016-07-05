/// <reference path="../../../typings/angularjs/angular.d.ts"/>
/// <reference path="../../../typings/angular-ui-router/angular-ui-router.d.ts"/>
/// <reference path="../../../typings/angular-material/angular-material.d.ts"/>
/// <reference path="../services/active.session.ts"/>
/// <reference path="../services/user.api.ts"/>
/// <reference path="../model/enums.ts"/>
/// <reference path="../model/user.ts"/>

namespace bh {

	'use strict';

	class LoginCtrl {
		email: string;
		password: string;
		constructor(
			public $q:angular.IQService, 
			public $firebaseAuth:any, 
			public $state:angular.ui.IStateService,
			public $mdToast:angular.material.IToastService,
			public UserApi:IUserApi,
			public ActiveSession:IActiveSession) {

			this.email = '';
			this.password = '';
		}

		login() {
		    let auth = this.$firebaseAuth();

		    auth.$signInWithEmailAndPassword(this.email,this.password)
		    	.then((usr) => {
		    		console.log('signed in user: ', usr);

		    		this.UserApi.get(usr.uid)
		    			.then((user) => {
		    				console.log('retrieved user info: ', user);

		    				this.ActiveSession.user = user;
							this.$mdToast.show( this.$mdToast.simple().textContent('Login success!'));

							if (user.role == 'agent')
								this.$state.go('agent.profile', {id: user.uid});
							else if (user.role == 'artist')
								this.$state.go('artist.profile', {id: user.uid});								
							else if (1===1)
								this.$mdToast.show( this.$mdToast.simple().textContent('Invalid user data: ' + user.role));

		    			})
		    			.catch((error) => {
	    					console.log(error);
							this.$mdToast.show( this.$mdToast.simple().textContent('Error retrieving user data: ' + error));
		    			});

		    	})
		    	.catch((error) => this.$mdToast.show( this.$mdToast.simple().textContent(error.message)))
		}

		registerAgent() {
		}
	} 

	LoginCtrl.$inject = ['$q','$firebaseAuth','$state','$mdToast','UserApi','ActiveSession'];

	angular
		.module('bookingHelperApp')
		.component('login', {
			templateUrl: 'scripts/security/login.html',
			bindings: {},
			controller: LoginCtrl
		});
}