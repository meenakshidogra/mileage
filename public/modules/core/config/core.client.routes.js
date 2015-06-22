'use strict';

// Setting up route
angular.module('core')
.config(['$stateProvider', '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {
        // Redirect to home view when route not found
        $urlRouterProvider.otherwise('/');

        // Home state routing
        $stateProvider.
            state('home', {
            url: '/',
            views: {
                '': {
                    templateUrl: 'modules/core/views/home.client.view.html'
                },
                //the child views will be defined here (absolutely named)
                'cars@home': {
                    templateUrl: 'modules/cars/views/list-cars.client.view.html'
                }
            }
        });
    }
]);
