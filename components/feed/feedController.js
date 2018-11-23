'use strict';

convert.controller('feedController', ['$scope', '$resource', '$rootScope', '$http', '$location', '$routeParams',
  function ($scope, $resource, $rootScope, $http, $location, $routeParams) {

  	$scope.posts = $resource('/posts').query();

  	$scope.search = function(text) {
  		console.log(text);
  	}

  }]);
