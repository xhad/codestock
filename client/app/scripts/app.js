'use strict';

/**
 * @ngdoc overview
 * @name clientApp
 * @description
 * # clientApp
 *
 * Main module of the application.
 */
angular
   .module('clientApp', [
      'ngRoute',
      'ngStorage',
      'angular-loading-bar'
   ])
   .constant('urls', {
         BASE: 'http://localhost:8080',
         BASE_API: 'http://localhost:8000/api'
      })

      .config(['$routeProvider', '$httpProvider', function($routeProvider, $httpProvider) {
         $routeProvider
            .when('/', {
               templateUrl: 'views/main.html',
               controller: 'MainCtrl',
            })
            .when('/tutorials', {
               templateUrl: 'views/tutorials.html',
               controller: 'TutorialsCtrl'
            })
            .when('/signin', {
               templateUrl: 'views/signin.html',
               controller: 'SigninCtrl',
               controllerAs: 'signin'
            })
            .when('/signup', {
               templateUrl: 'views/signup.html',
               controller: 'SignupCtrl',
               controllerAs: 'signup'
            })
            .when('/dashboard', {
               templateUrl: 'views/dashboard.html',
               controller: 'AuthCtrl',
            })
            .otherwise({
               redirectTo: '/'
            });

         $httpProvider.interceptors.push(['$q', '$location', '$localStorage', function($q, $location, $localStorage) {
            return {
               'request': function(config) {
                  config.headers = config.headers || {};
                  if ($localStorage.token) {
                     config.headers.Authorization = 'Bearer ' + $localStorage.token;
                  }
                  return config;
               },
               'responseError': function(response) {
                  if (response.status === 401 || response.status === 403) {
                     $location.path('/signin');
                  }
                  return $q.reject(response);
               }
            };
         }]);
      }]);
