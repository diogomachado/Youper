(function() {
    'use strict';

    angular.module('starter',['ionic', 'ngRoute', 'ngSanitize', 'ngAnimate', 'firebase'])
    .config(function($routeProvider)
    {
        $routeProvider
        .when('/', {
            templateUrl  : 'app/views/home.html',
            controller   : 'HomeController',
            controllerAs : 'Home'
        })
        .when('/notifications', {
            templateUrl  : 'app/views/notifications.html',
            controller   : 'NotificationController',
            controllerAs : 'Notification'
        })
        .otherwise ({ redirectTo: '/' });
    })
    .run(function($ionicPlatform){

        document.addEventListener("deviceready", function () {
            StatusBar.hide();
        }, false);

		$ionicPlatform.ready(function () {

			if (window.cordova && window.Keyboard) {
				window.Keyboard.hideKeyboardAccessoryBar(true);
			}
		});

    });

})();