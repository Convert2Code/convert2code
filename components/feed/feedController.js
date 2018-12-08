'use strict';

convert.controller('feedController', ['$scope', '$resource', '$rootScope', '$http', '$location', '$routeParams',
  function ($scope, $resource, $rootScope, $http, $location, $routeParams) {

  	$scope.posts = $resource('/posts').query();

  	$scope.like = function(postId) {
  		$resource('/user/' + $routeParams.id + '/like/' + postId).save({}, function(user) {
        console.log('Post was successfully liked!');
      }, function(err) {
      	console.log(err);
        console.log('There was an error while liking post!');
      });
  	}
  	$scope.search = function(text) {
  		console.log(text);
  	}
  }]);
