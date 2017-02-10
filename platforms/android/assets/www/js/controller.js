angular.module('shopping')


    .controller('ShoppingCtrl', function($scope, $http) {
        var url = 'https://shopping-74698.firebaseio.com/items.json';

        $scope.items = getItems();

        $scope.addItem = function() {
            var name = prompt("Que manque t'il à la maison ?");
            if (name) {
                var postData = {
                    "name": name
                };
                $http.post(url, postData).success(function(data) {
                    $scope.items = getItems();
                });
            }
        };

        function getItems() {
            var items = [];
            $http.get(url).success(function(data) {
                angular.forEach(data, function(value, key) {
                    var name = {name: value.name};
                    items.push(name);
                });
            });

            return items;
        }


        $scope.deleteItem = function() {
            var name =  prompt('ëtes-vous sur de vouloir supprimer TOUTE la liste de course ? ');
            if (name) {
                var deleteData = {
                    "name": name
                };
                $http.delete(url, deleteData).success(function(data) {
                    $scope.items = getItems();
                });
            }
        };


        $scope.deleteThis = function(item) {
            $scope.list.$remove(item);
        };

    });

