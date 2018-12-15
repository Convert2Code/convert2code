'use strict';

convert.controller('tagViewController', ['$scope', '$resource', '$rootScope', '$http', '$location', '$routeParams',
  function ($scope, $resource, $rootScope, $http, $location, $routeParams) {
  	$scope.tag = $resource('/tag/' + $routeParams.id).get();
  	$scope.posts = $resource('/tag/' + $routeParams.id + '/posts').query();

  	$scope.follow = function(tagId) {
  		$resource('/user/follow/' + tagId).save({}, function(user) {
  			console.log('Successfully followed tag: ' + tagId);
  		}, function(err) {
  			console.log('TODO: address error handling: ');
  			console.log('ERROR: unable to follow tag: ' + err);
  		});
  	}
  }]);
