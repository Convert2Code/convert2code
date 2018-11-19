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
      otherwise({
      	redirectTo: '/'
      });
    }]);

convert.controller('mainController', ['$scope', '$resource', '$rootScope', '$http', '$location',
  function ($scope, $resource, $rootScope, $http, $location) { }]);
