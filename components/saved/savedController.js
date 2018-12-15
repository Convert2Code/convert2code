'use strict';

convert.controller('savedController', ['$scope', '$resource', '$rootScope', '$http', '$location', '$routeParams',
  function ($scope, $resource, $rootScope, $http, $location, $routeParams) {
  	var userId = $routeParams.id
    $scope.savedPosts = $resource('/user/' + userId + '/saved').query();
  }]);
