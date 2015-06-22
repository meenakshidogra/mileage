'use strict';

//Readings service used to communicate Readings REST endpoints
angular.module('readings').factory('Readings', ['$resource',
	function($resource) {
		return $resource('readings/:readingId', { readingId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);
