'use strict';

convert.controller('registerController', ['$scope', '$resource', '$rootScope', '$http', '$location',
  function ($scope, $resource, $rootScope, $http, $location) {

  	// Need to retrieve all usernames to validate in browser, sans server
  	$scope.usernames = [];
  	// Need to retrieve all active tech tags from server to select interests
  	$scope.tags = [];

    $scope.register = function() {
      // TODO Login logic here

      var newUser = {}

      $resource('/user/new').save(newUser, function(user) {}


    }

  }]);
