(function() {
    'use strict';

    angular
        .module('starter')
        .controller('HomeController', HomeController);

    HomeController.$injector = ['$scope', '$location', 'dataService', '$firebaseArray'];

    function HomeController($scope, $location, dataService, $firebaseArray){

        // Default profile
        $scope.urlSourceProfile = "/assets/img/svg/profile.svg";
        $scope.profileSelected = false;

        $scope.haveNews = false;
        let profileFire = dataService.loadProfile();

        profileFire
        .$loaded()
        .then(function(val) {

            if (val.$value){
                $scope.urlSourceProfile = val.$value;
                $scope.profileSelected = true;
                
                setTimeout(() => {
                    $scope.$apply();
                });
            }
        }, 
        function(){
            $scope.urlSourceProfile = "/assets/img/svg/profile.svg";
            $scope.profileSelected = false;
            
            setTimeout(() => {
                $scope.$apply();
            });
        }); 

        var messagesFire = $firebaseArray(firebase.database().ref().child('messages'));

        messagesFire.$loaded()
        .then(function() {
        
            // Check news
            let arrMessages = messagesFire;
            arrMessages.forEach(message => {
                if (message.new){
                    $scope.haveNews = true;
                }
            });
        });

        this.changeProfile = function(){
            navigator.camera.getPicture(uploadPicture, uploadError,
                {
                    quality: 50,
                    destinationType: navigator.camera.DestinationType.DATA_URL,
                    sourceType: navigator.camera.PictureSourceType.PHOTOLIBRARY
                }
            );
        }

        this.goNotifications = function(){
            $location.path('notifications');
        }

        function uploadPicture(source) {

            // Prepare image
            $scope.urlSourceProfile = "data:image/jpeg;base64," + source;
            $scope.profileSelected = true;

            // Store image
            dataService.storeProfile($scope.urlSourceProfile);
            $scope.$apply();

            // Feedback
            snackbar.timer("Profile changed with success", 4000); 
        }

        function uploadError(message){
            console.log('Get picture failed', message);
        }
    }
})();