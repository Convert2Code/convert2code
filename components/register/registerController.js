'use strict';

convert.controller('registerController', ['$scope', '$resource', '$rootScope', '$http', '$location',
  function ($scope, $resource, $rootScope, $http, $location) {

  	// Need to retrieve all usernames to validate in browser, sans server
  	$scope.usernames = [];
  	$scope.users = $resource('/users').query();;
  	// Need to retrieve all active tech tags from server to select interests
  	$scope.tags = [];

    $scope.register = function() {
      // TODO Login logic here

      var newUser = {
      	username: $scope.username,
      	password: $scope.password,
      	interests: $scope.selectedTags
      }

      $resource('/user/new').save(newUser, function(user) {
      	console.log(user);
      	$location.path('/user/' + user._id);
      }, function(err) {
      	console.log(err);
      	$scope.errorMessage = err;
      });
    }

  }]);
