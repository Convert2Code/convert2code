'use strict';

convert.controller('userController', ['$scope', '$resource', '$rootScope', '$http', '$location',
  function ($scope, $resource, $rootScope, $http, $location) {
    $scope.toggle = 'feed';
    $scope.tags = [ 'node', 'ruby on rails', 'web dev', 'desktop dev', 'java', 'go', 'javascript', 'python', 'ruby', 'C', 'C++', 'C#', 'swift' ];

    $scope.logout = function() {
    	$resource('/logout').save(function() {
    		$location.path('/');
    	}, function(err) {
    		console.log('Error logging out: ' + err);
    	});
    }
  }]);
