'use strict';

convert.controller('userController', ['$scope', '$resource', '$rootScope', '$http', '$location', '$routeParams',
  function ($scope, $resource, $rootScope, $http, $location, $routeParams) {
  	var selectedPhotoFile;   // Holds the last file selected by the user
  	var userId = $routeParams.id

    $scope.toggle = 'feed';
    $scope.tags = $resource('/tags').query();
    $scope.user = $resource('/user/' + userId).get();

    $scope.logout = function() {
    	$resource('/logout').save(function() {
    		$location.path('/');
    	}, function(err) {
    		console.log('Error logging out: ' + err);
    	});
    }

    $scope.inputFileNameChanged = function (element) {
        selectedPhotoFile = element.files[0];
    };

    $scope.inputFileNameSelected = function () {
        return !!selectedPhotoFile;
    };

    $scope.uploadPhoto = function () {
      if (!$scope.inputFileNameSelected()) {
          console.error("Tried to upload photo without first selecting file");
          return;
      }
      console.log('Submitting File: ', selectedPhotoFile);

      var profileForm = new FormData();
      profileForm.append('profilepic', selectedPhotoFile);

      $http.post('/user/' + userId + '/setprofilepic', profileForm, {
          transformRequest: angular.identity,
          headers: { 'Content-Type': undefined }
      }).then(function(res) {
      	console.log('Profile pic uploaded successfully!');
      }, function(err) {
      	console.log('Error while uploading profile pic: ' + err);
      });
    }

  }]);
