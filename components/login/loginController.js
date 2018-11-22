'use strict';

convert.controller('loginController', ['$scope', '$resource', '$rootScope', '$http', '$location',
  function ($scope, $resource, $rootScope, $http, $location) {

    $scope.login = function() {

      user = {
        username: $scope.username,
        password: $scope.password
      }

      $resource('/user/login').save(user, function(user) {
        console.log(user);
        $location.path('/user/' + user._id);
      }, function(err) {
        console.log(err);
        $scope.errorMessage = err;
      });
    }
  }]);
