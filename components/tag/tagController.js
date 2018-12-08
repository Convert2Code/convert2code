'use strict';

convert.controller('tagController', ['$scope', '$resource', '$rootScope', '$http', '$location',
  function ($scope, $resource, $rootScope, $http, $location) {
  	$scope.tags = $resource('/tags').query(function(tags) {
  		return tags.sort(function(tagOne, tagTwo) { return tagTwo.relations - tagOne.relations });
  	}, function(err) {
  		console.log('TODO: address error handling: ');
  		console.log('ERROR: unable to retrieve all tags: ' + err);
  	});
  }]);
