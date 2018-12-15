'use strict';

convert.controller('viewPostController', ['$scope', '$resource', '$rootScope', '$http', '$location', '$routeParams', '$sce',
  function ($scope, $resource, $rootScope, $http, $location, $routeParams, $sce) {
  	$scope.user = $resource('/get/user').get();
    $scope.post = $resource('/post/' + $routeParams.id).get(function(post) {
    	$scope.markdownContent = $sce.trustAsHtml(post.content);
    }, function(err) {
    	console.log('Unable to retrieve the requested post: ' + err);
    });

    $scope.like = function() {
  		$resource('/user/' + $scope.user._id + '/like/' + $routeParams.id).save({}, function(user) {
  			console.log($scope.user);
        console.log('Post was successfully liked!');
        $scope.user = user;
        $scope.post.hearts++; // Need because post does not auto update
      }, function(err) {
        console.log('There was an error while liking post!');
      });
  	}

  	$scope.save = function() {
  		$resource('/user/' + $scope.user._id + '/save/' + $routeParams.id).save({}, function(user) {
        console.log('Post was successfully saved!');
        $scope.user = user;
      }, function(err) {
        console.log('There was an error while saving post!');
      });
  	}
  }]);
