'use strict';

var convert = angular.module('convert', ['ngRoute', 'ngMaterial', 'ngResource']);

convert.config(['$routeProvider',
  function ($routeProvider) {
    $routeProvider.
      when('/', {
      	templateUrl: 'components/static-feed/static-feed-template.html'
      }).
      when('/holidayhack', {
        templateUrl: 'components/holidayhack/holidayhack-template.html',
        controller: 'holidayhackController'
      }).
      when('/holidayhack/participants', {
        templateUrl: 'components/holidayhack/holidayhack-participants-template.html',
        controller: 'holidayhackParticipantsController'
      }).
      when('/login', {
        templateUrl: 'components/login/login-template.html',
        controller: 'loginController'
      }).
      when('/register', {
        templateUrl: 'components/register/register-template.html',
        controller: 'registerController'
      }).
      when('/user/:id', {
        templateUrl: 'components/user/user-template.html',
        controller: 'userController'
      }).
      otherwise({
      	redirectTo: '/'
      });
    }]);

convert.controller('mainController', ['$scope', '$resource', '$rootScope', '$http', '$location',
  function ($scope, $resource, $rootScope, $http, $location) { }]);
