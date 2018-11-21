'use strict';

convert.controller('holidayhackController', ['$scope', '$resource', '$rootScope', '$http', '$location',
  function ($scope, $resource, $rootScope, $http, $location) {

    $scope.registerToggle = 'indiv';
    $scope.indiv = false;
    $scope.group = false;

    $scope.emailRegEx = /.+@.+\..+/;
    $scope.groupSize = 5;
    $scope.age = 15;
    $scope.experience = 3;
    $scope.experience_levels = ['none', 'little', 'beginner', 'intermediate', 'advanced'];

    $scope.submitIndividual = function() {

      var newParticipant = {
        firstName: $scope.firstName,
        lastName: $scope.lastName,
        email: $scope.email,
        district: $scope.schoolDistrict,
        age: $scope.age,
        experience: $scope.experience
      };

      $resource('/participant/new').save(newParticipant, function(participant) {
          $scope.registerMessage = "You have been registered for Convert to Code's Holiday Hack! We will be in touch shortly";
          console.log('Participant registered!');
        }, function(err) {
          console.error('Error registering participant: ' + err);
      });
    }
    $scope.submitGroup = function() {

      var newGroup = {
        groupName: $scope.groupName,
        leaderName: $scope.leaderName,
        leaderEmail: $scope.leaderEmail,
        district: $scope.district,
        groupSize: $scope.groupSize
      };

      $resource('/group/new').save(newGroup, function(group) {
          $scope.registerMessage = "Your group has been registered for Convert to Code's Holiday Hack! We will be in touch shortly";
          console.log('Group registered!');
        }, function(err) {
          console.error('Error registering group: ' + err);
      });
    }
    $scope.toggle = function(toggle) { $scope.registerToggle = toggle; }
    $scope.scrollDown = function() {
      $("html, body").animate({
        scrollTop: $('#learnmore').offset().top
      }, 500);
    }
    $scope.scrollUp = function() {
      $("html, body").animate({
        scrollTop: 0
      }, 500);
    }
    $(window).scroll(function() {
      if ($(window).scrollTop() > 400) {
        $("#signupbutton").show();
      }
      else if($(window).scrollTop() < 100) {
        $("signupbutton").hide();
      }
      else {
        $("#signupbutton").hide();
      }
    });
  }]);
