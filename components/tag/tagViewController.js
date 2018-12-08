'use strict';

convert.controller('tagViewController', ['$scope', '$resource', '$rootScope', '$http', '$location', '$routeParams',
  function ($scope, $resource, $rootScope, $http, $location, $routeParams) {
  	$scope.tag = $resource('/tag/' + $routeParams.id).get();
  	$scope.posts = $resource('/tag/' + $routeParams.id + '/posts').query();
  }]);
