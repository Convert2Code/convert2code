'use strict';

convert.controller('feedController', ['$scope', '$resource', '$rootScope', '$http', '$location', '$routeParams',
  function ($scope, $resource, $rootScope, $http, $location, $routeParams) {

  	$scope.posts = $resource('/posts').query();

  	$scope.like = function(postId) {
  		$resource('/user/' + $routeParams.id + '/like/' + postId).save({}, function(user) {
        console.log('Post was successfully liked!');
        $scope.user = user;
      }, function(err) {
        console.log('There was an error while liking post!');
      });
  	}

  	$scope.save = function(postId) {
  		$resource('/user/' + $routeParams.id + '/save/' + postId).save({}, function(user) {
        console.log('Post was successfully saved!');
        $scope.user = user;
      }, function(err) {
        console.log('There was an error while save post!');
      });
  	}
/*
  	$scope.search = function(text) {
  		console.log(text);
  	}
*/
  }]);
