'use strict';

// Readings controller
angular.module('readings').controller('ReadingsController',
      ['$scope', '$stateParams', '$location', 'Authentication', 'Readings', 'Cars',
	function($scope, $stateParams, $location, Authentication, Readings, Cars) {
		$scope.authentication = Authentication;
        $scope.cars = Cars.query();
		// Create new Reading
		$scope.create = function() {
			// Create new Reading object
			var reading = new Readings ({
                odoreading: this.odoreading,
                fuelreading: this.fuelreading,
                distanceunit: this.distanceunit,
                fuelunit: this.fuelunit,
                car: this.selectedcar._id
			});

			// Redirect after save
			reading.$save(function(response) {
				$location.path('readings/' + response._id);

				// Clear form fields
               $scope.odoreading = '';
               $scope.fuelreading = '';
               $scope.distanceunit = '';
               $scope.fuelunit = '';
               $scope.car = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Reading
		$scope.remove = function(reading) {
			if ( reading ) {
				reading.$remove();

				for (var i in $scope.readings) {
					if ($scope.readings [i] === reading) {
						$scope.readings.splice(i, 1);
					}
				}
			} else {
				$scope.reading.$remove(function() {
					$location.path('readings');
				});
			}
		};

		// Update existing Reading
		$scope.update = function() {
			var reading = $scope.reading;

			reading.$update(function() {
				$location.path('readings/' + reading._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Readings
		$scope.find = function() {
			$scope.readings = Readings.query();
		};

		// Find existing Reading
		$scope.findOne = function() {
			$scope.reading = Readings.get({
				readingId: $stateParams.readingId
			});
		};
	}
]);
