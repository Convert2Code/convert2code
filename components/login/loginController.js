'use strict';

convert.controller('loginController', ['$scope', '$resource', '$rootScope', '$http', '$location',
  function ($scope, $resource, $rootScope, $http, $location) {

    $scope.login = function() {

      user = {
        username: $scope.username,
        password: $scope.password
      }

      $resource('/user/login').save(user, function(user) {}

    }

  }]);
