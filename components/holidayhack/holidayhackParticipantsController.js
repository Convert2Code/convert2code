'use strict';

convert.controller('holidayhackParticipantsController', ['$scope', '$resource', '$rootScope', '$http', '$location',
  function ($scope, $resource, $rootScope, $http, $location) {
    $scope.participants = $resource('/participants/all').query();
    $scope.groups = $resource('/groups/all').query();
  }]);
