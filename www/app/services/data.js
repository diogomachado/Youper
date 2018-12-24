(function() {
    angular
    .module('starter')
    .factory('dataService', dataService);

    dataService.$injector = ['firebaseTool', '$firebaseObject'];

    function dataService(firebaseTool, $firebaseObject){

        var service = {};

        /*
        var data = [
            {
                date: "5 minutes ago",
                new: true,
                collapse: false,
                content: '<p class="title">New feature!</p> <p> Now you can customize your avatar uploading your selfie. </p> <p> Just click on the avatar, take or select a picture and save. </p> <img src="/assets/img/notify-img.png"/>'
            },
            {
                date: "9 minutes ago",
                new: true,
                collapse: false,
                content: '<p class="title">Good news!</p> <p> We are launching an incredible new feature today. </p> <p> Just click on the avatar, take or select a picture and save. </p> <img src="/assets/img/notify-img.png"/>'
            }
        ];

        firebaseTool.set('messages', data);
        */
        
        service.storeProfile = function(base64){

            // Local
            sessionStorage.setItem("youper-profile", base64);

            // Cloud
            firebaseTool.set("profile", base64);
        }

        service.loadProfile = function(base64){
            return $firebaseObject(firebase.database().ref().child('profile'));
        }

        return service;
    }
})();