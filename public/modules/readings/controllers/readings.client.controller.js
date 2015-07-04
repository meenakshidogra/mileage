'use strict';

// Readings controller
angular.module('readings')
.controller('ReadingsController',
            ['$scope', '$stateParams','$http', '$location', 'Authentication', 'Readings', 'Cars', 'Shared',
                function($scope, $stateParams, $http, $location, Authentication, Readings, Cars, Shared) {
                    $scope.authentication = Authentication;
                    $scope.cars = Cars.query();
                    $scope.selectedcar = Shared.getSelectedCar();

                    /*calculate the fuel economy here and put it in req.reading.mileage variable*/
                    /**
                     ** getMileage
                     **
                     ** @desc Function to calculate the mileage of the car
                     ** @param newReading - The reading of the odometer of the car just after refill
                     ** @param oldReading - The reading of the odometer of the car last time the car was refilled
                     ** @param fuelAmount - Amount of the fuel filled to full the fule tank of the car.
                     **                     This could be red on the meter of the station pump or in the receipt
                     */
                    var getMileage = function (newReading, oldReading, fuelAmount) {
                        var distanceCovered = 0;
                        if (isNumber(newReading) && isNumber(oldReading)) {
                            distanceCovered = Number(newReading) - Number(oldReading);
                        }
                        if(isNumber(fuelAmount)) {
                            //mileage is distance covered divided by the fuelAmount spent
                            var mileage = distanceCovered/Number(fuelAmount);
                            //return the rounded off value
                            return Math.round(mileage * 10) / 10;
                        }
                        return null;
                    };

                    /**
                     ** isNumber
                     **
                     ** @desc returns true if the value is positive numeric (decimal number or integer)
                     ** @param value - Any string
                     **/
                    var isNumber = function (value) {
                        return /*TODO $.isNumeric(value) &&*/ (value > 0);
                    };


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
                            //$location.path('readings/' + response._id);
                            $location.path('cars/' + response.car);

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
                                $location.path('cars/' + $scope.selectedcar._id);
                            });
                        }
                    };

                    // Update existing Reading
                    $scope.update = function() {
                        var reading = $scope.reading;
                        console.log(reading);
                        reading.$update(function() {
                            $location.path('cars/' + reading.car._id);
                        }, function(errorResponse) {
                            $scope.error = errorResponse.data.message;
                        });
                    };

                    // Find a list of Readings
                    $scope.find = function() {
                        $scope.readings = Readings.query(), prevElement;
                    };

                    // Find existing Reading
                    $scope.findOne = function() {
                        $scope.reading = Readings.get({
                            readingId: $stateParams.readingId
                        });
                    };

                    //Find a list of reading based on the carID
                    $scope.findByCar = function() {
                        var prevElement;
                        $http.get('readings/car/'+$scope.carid).
                            success(function(readings) {
                                $scope.readings = readings.map(function(element, index, array){
                                    if (index < array.length-1) {
                                        prevElement = array[index+1];
                                        element.mileage = getMileage(element.odoreading, prevElement.odoreading, element.fuelreading);
                                    } else {
                                         element.mileage = 0;
                                    }
                                    return element;
                                });
                                console.log ($scope.readings[0]);
                                $scope.latestMileage = $scope.readings[0].mileage || null;
                                $scope.latestMileageUnit = $scope.readings[0].distanceunit + '/' + $scope.readings[0].fuelunit;
                            }).error(function() {
                            }
                        );
                    };

                    //Function which takes you to the readings details page
                    $scope.showDetails = function (reading) {
                        $location.path('readings/'+ reading._id);
                    }
                }
            ]);
