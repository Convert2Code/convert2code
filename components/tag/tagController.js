'use strict';

convert.controller('tagController', ['$scope', '$resource', '$rootScope', '$http', '$location',
  function ($scope, $resource, $rootScope, $http, $location) {
  	// $scope.tags = $resource('/tags').query();
    $scope.tags = [ 'node', 'ruby on rails', 'web dev', 'desktop dev', 'java', 'go', 'javascript', 'python', 'ruby', 'C', 'C++', 'C#', 'swift' ];
  }]);
