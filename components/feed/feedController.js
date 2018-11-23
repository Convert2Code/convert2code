'use strict';

convert.controller('feedController', ['$scope', '$resource', '$rootScope', '$http', '$location', '$routeParams',
  function ($scope, $resource, $rootScope, $http, $location, $routeParams) {

  	$scope.posts = $resource('/user/' + $routeParams.id + '/posts').query();

  	$scope.search = function(text) {
  		console.log(text);
  	}

  }]);
