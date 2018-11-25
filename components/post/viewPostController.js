'use strict';

convert.controller('viewPostController', ['$scope', '$resource', '$rootScope', '$http', '$location', '$routeParams', '$sce',
  function ($scope, $resource, $rootScope, $http, $location, $routeParams, $sce) {
    $scope.post = $resource('/post/' + $routeParams.id).get(function(post) {
    	$scope.markdownContent = $sce.trustAsHtml(post.content);
    }, function(err) {
    	console.log('Unable to retrieve the requested post: ' + err);
    });
  }]);
