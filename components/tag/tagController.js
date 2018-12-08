'use strict';

convert.controller('tagController', ['$scope', '$resource', '$rootScope', '$http', '$location',
  function ($scope, $resource, $rootScope, $http, $location) {
  	$scope.tags = $resource('/tags').query();
  }]);
