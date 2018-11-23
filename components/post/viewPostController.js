'use strict';

convert.controller('viewPostController', ['$scope', '$resource', '$rootScope', '$http', '$location', '$routeParams',
  function ($scope, $resource, $rootScope, $http, $location, $routeParams) {
    $scope.post = $resource('/post/' + $routeParams.id).query();
  }]);
