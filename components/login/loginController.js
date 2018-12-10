'use strict';

convert.controller('loginController', ['$scope', '$resource', '$rootScope', '$http', '$location',
  function ($scope, $resource, $rootScope, $http, $location) {

    $scope.login = function() {

      var user = {
        username: $scope.username,
        password: $scope.password
      }

      $resource('/user/login').save(user, function(user) {
        console.log(user);
        $scope.main.user = user;
        $location.path('/user/' + user._id + '/feed');
      }, function(err) {
        console.log(err);
        $scope.errorMessage = err;
      });
    }
  }]);
