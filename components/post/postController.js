'use strict';

convert.controller('postController', ['$scope', '$resource', '$rootScope', '$http', '$location', '$routeParams',
  function ($scope, $resource, $rootScope, $http, $location, $routeParams) {
    var converter = new showdown.Converter();

  	$scope.myPosts = $resource('/user/' + $routeParams.id + '/posts').query();
  	$scope.newPostTags = [ 'node', 'ruby on rails', 'web dev', 'desktop dev', 'java', 'go', 'javascript', 'python', 'ruby', 'C', 'C++', 'C#', 'swift' ];
  	$scope.selectedTags = [];
  	$scope.newPost = {};

    $scope.preview = function() { document.getElementById('target').innerHTML = converter.makeHtml($scope.newPost.postContent); }
  	$scope.toggleTag = function(tag) {
  		if($scope.selectedTags.includes(tag)) $scope.selectedTags.splice($scope.selectedTags.indexOf(tag), 1);
  		else $scope.selectedTags.push(tag);
  	}
  	$scope.newPost = function() {

  		var newPost = {
  			title: $scope.newPost.postTitle,
  			content: converter.makeHtml($scope.newPost.postContent), // $scope.newPost.postContent,
  			tags: $scope.selectedTags
  		}

  		// Finishing building out logic handling responses to successful/failed posting
  		$resource('/post/' + $routeParams.id + '/new').save(newPost, function(post) {
  			console.log('Post was successfully shared!');
  			$location.path('/user/' + $routeParams.id);
  		}, function(err) {
  			console.log('There was an error while posting!');
  		});
  	}

  }]);
