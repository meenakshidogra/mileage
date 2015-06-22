'use strict';

//Menu service used for managing  menus
angular.module('core').service('Shared', [
    function() {
        var selectedCar = null;
        return {
            getSelectedCar: function() {
                return selectedCar;
            },
            setSelectedCar: function (car) {
                selectedCar = car;
            }
        }
    }
]);

