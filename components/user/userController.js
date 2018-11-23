'use strict';

convert.controller('userController', ['$scope', '$resource', '$rootScope', '$http', '$location',
  function ($scope, $resource, $rootScope, $http, $location) {
    $scope.toggle = 'feed';
    $scope.tags = [ 'node', 'ruby on rails', 'web dev', 'desktop dev', 'java', 'go', 'javascript', 'python', 'ruby', 'C', 'C++', 'C#', 'swift' ];
  }]);
