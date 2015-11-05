'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
	.controller('MainCtrl', ['$rootScope', '$scope', '$location', '$localStorage', 'Auth', 
		function ($rootScope, $scope, $location, $localStorage, Auth) {
			function successAuth(res) {
				$localStorage.token = res.token;
				window.location = '/';
			}

			$scope.signin = function () {
				var formData = {
					email: $scope.email,
					password: $scope.password
				};

				Auth.signin(formData, successAuth, function() {
					$rootScope.error = 'Authorization failed.';
				});
			};

			$scope.signup = function () {
				var formData = {
					email: $scope.email,
					passowrd: $scope.password
				};

				Auth.signup(formData, successAuth, function () {
					$rootScope.error = 'Signup failed.';
				});
			};

			$scope.logout = function() {
				Auth.logout(function () {
					window.location = '/';
				});
			};

			$scope.token = $location.token;
			$scope.tokenClaims = Auth.getTokenClaims();
		}]);
 
