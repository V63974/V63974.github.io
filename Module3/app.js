// AngularJS Application
var app = angular.module('menuApp', []);

app.controller('MenuController', function($scope, $http) {
    // Initialize foundItems array
    $scope.foundItems = [];
    $scope.searchTerm = '';
    $scope.noResultsMessage = '';

    // Function to search for menu items
    $scope.searchMenuItems = function() {
        if (!$scope.searchTerm) {
            // If the search term is empty, do nothing
            return;
        }

        // Make the API call to get the menu items
        $http.get('https://api.example.com/menuItems')  // Replace with actual API URL
            .then(function(response) {
                var items = response.data;
                $scope.foundItems = [];  // Clear previous results
                $scope.noResultsMessage = '';

                // Loop through all items and check if the search term is in the description
                items.forEach(function(item) {
                    if (item.description.toLowerCase().includes($scope.searchTerm.toLowerCase())) {
                        $scope.foundItems.push(item);
                    }
                });

                // If no items are found, display the message
                if ($scope.foundItems.length === 0) {
                    $scope.noResultsMessage = "Nothing found";
                }
            }, function(error) {
                // Handle any error in the API call
                console.error("Error fetching menu items:", error);
                $scope.noResultsMessage = "Error fetching menu items";
            });
    };

    // Function to remove an item from the foundItems list
    $scope.removeItem = function(index) {
        $scope.foundItems.splice(index, 1);
    };
});
