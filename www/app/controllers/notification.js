(function() {
    'use strict';

    angular
        .module('starter')
        .controller('NotificationController', NotificationController);

    NotificationController.$injector = ['$scope', '$location', 'dataService', '$firebaseObject'];

    function NotificationController($scope, $location, dataService, $firebaseObject){

        this.back = function() {

            // Redirect
            $location.path('/');
        }
        
        var messagesFire = $firebaseObject(firebase.database().ref().child('messages'));

        messagesFire.$bindTo($scope, "arrMessages");

        this.open = function(message){

            // Open/close info
            if (message.collapse) {
                message.collapse = false; 

                // Check when is not new
                message.new = false;
            }else { 
                message.collapse = true;
            }
        }
    }
})();