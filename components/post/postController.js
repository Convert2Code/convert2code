'use strict';

convert.controller('postController', ['$scope', '$resource', '$rootScope', '$http', '$location', '$routeParams',
  function ($scope, $resource, $rootScope, $http, $location, $routeParams) {
    var converter = new showdown.Converter();

  	$scope.myPosts = $resource('/user/' + $routeParams.id + '/posts').query();
    $scope.markdownPreview = false;
  	$scope.newPostTags = $resource('/tags').query();
  	$scope.selectedTags = [];
  	$scope.newPost = {};
    $scope.newTag = {};

    $scope.preview = function() {
      document.getElementById('preview').innerHTML = converter.makeHtml($scope.newPost.postContent);
      $scope.markdownPreview = !$scope.markdownPreview;
    }
  	$scope.toggleTag = function(tagId) {
      console.log(tagId);
  		if($scope.selectedTags.includes(tagId)) $scope.selectedTags.splice($scope.selectedTags.indexOf(tagId), 1);
  		else $scope.selectedTags.push(tagId);
  	}
    $scope.createTag = function() {

      var tag = {
        tag: $scope.newTag.newTagText,
        backgroundColor: 'rgb(' + $scope.newTag.newTagRed + ',' + $scope.newTag.newTagGreen + ',' + $scope.newTag.newTagBlue + ')',
        fontColor: $scope.newTag.isFontBlack ? '#000' : '#fff'
      }

      $resource('/tag/' + $routeParams.id + '/new').save(tag, function(tag) {
        console.log('Tag was successfully created!');
        $scope.main.openModal = false;
      }, function(err) {
        console.log('There was an error while creating this new tag!');
      });

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
