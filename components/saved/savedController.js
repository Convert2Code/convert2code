'use strict';

convert.controller('userController', ['$scope', '$resource', '$rootScope', '$http', '$location', '$routeParams',
  function ($scope, $resource, $rootScope, $http, $location, $routeParams) {
  	var userId = $routeParams.id
    $scope.savedPosts = $resource().query();

  }]);
