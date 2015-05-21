'use strict';

//Setting up route
angular.module('readings').config(['$stateProvider',
	function($stateProvider) {
		// Readings state routing
		$stateProvider.
		state('listReadings', {
			url: '/readings',
			templateUrl: 'modules/readings/views/list-readings.client.view.html'
		}).
		state('createReading', {
			url: '/readings/create',
			templateUrl: 'modules/readings/views/create-reading.client.view.html'
		}).
		state('viewReading', {
			url: '/readings/:readingId',
			templateUrl: 'modules/readings/views/view-reading.client.view.html'
		}).
		state('editReading', {
			url: '/readings/:readingId/edit',
			templateUrl: 'modules/readings/views/edit-reading.client.view.html'
		});
	}
]);