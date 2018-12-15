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
      console.log($scope.newTag.newTagText);
      if($scope.newTag.newTagText === undefined) {
        alert('Your tag cannot be empty!');
        return;
      }
      if(/ /.test($scope.newTag.newTagText)) {
        alert('Your tag cannot have spaces!');
        return;
      }

      var tag = {
        tag: $scope.newTag.newTagText,
        backgroundColor: 'rgb(' + $scope.newTag.newTagRed + ',' + $scope.newTag.newTagGreen + ',' + $scope.newTag.newTagBlue + ')',
        fontColor: $scope.newTag.isFontBlack ? '#000' : '#fff'
      }

      $resource('/tag/' + $routeParams.id + '/new', {}, { save: { method: 'POST', isArray: true } }).save(tag, function(tags) {
        console.log('Tag was successfully created!');
        $scope.newTag = {};
        $scope.newPostTags = tags;
        $scope.main.openModal = false;
      }, function(err) {
        console.log('There was an error while creating this new tag!' + err);
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
  			$location.path('/user/' + $routeParams.id + '/feed');
  		}, function(err) {
  			console.log('There was an error while posting!');
  		});
  	}

    $scope.newPost.placeholder = 'This text box supports markdown!\n' +
                                 'If you want to learn more about markdown, go to this site: https://www.markdowntutorial.com/\n\n' +
                                 'To create a post and get started you need:\n' +
                                 '1. A title for your new post\n' +
                                 '2. At least one tag seleected\n' +
                                 '3. Some content for your new post!\n\n' +
                                 'If a tag you need is not here, simply create it with the "+ tag" button above!\n\n' +
                                 'To preview your post, hit the preview button...and then click edit to change anything you do not like\n\n' +
                                 'REMEMBER: Anything you post can be seen by the entire Convert community, so post responsibly :)';

  }]);
