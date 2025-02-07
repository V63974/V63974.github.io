(function() {
    'use strict';

    angular.module('LunchCheck', [])
        .controller('LunchCheckController', LunchCheckController);

    LunchCheckController.$inject = ['$scope'];

    function LunchCheckController($scope) {

        // Method to check the number of lunch items
        $scope.checkLunch = function() {
            // Trim any leading/trailing spaces from the input
            var items = $scope.lunchItems ? $scope.lunchItems.trim() : "";

            // Check if the input is empty
            if (items === "") {
                $scope.message = "Please enter data first";
            } else {
                // Split the input string by commas and filter out empty items (if any)
                var itemsArray = items.split(',').filter(function(item) {
                    return item.trim() !== ""; // Exclude empty items
                });

                // Display message based on the number of items
                if (itemsArray.length <= 3) {
                    $scope.message = "Enjoy!";
                } else {
                    $scope.message = "Too much!";
                }
            }
        };
    }
})();
