'use strict';

convert.controller('registerController', ['$scope', '$resource', '$rootScope', '$http', '$location',
  function ($scope, $resource, $rootScope, $http, $location) {

  	// Need to retrieve all usernames to validate in browser, sans server
    $scope.usernames = [];
  	$scope.users = $resource('/users').query(function(users) {
      $scope.usernames = users.map(function(user) {
        return user.username;
      });
    }, function(err) {
      console.log('Error: unable to retrieve all users for username check');
    });

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
        $rootScope.$broadcast('login');
      	$location.path('/user/' + user._id + '/feed');
      }, function(err) {
      	console.log(err);
      	$scope.errorMessage = err;
      });
    }

  }]);
