angular.module('shopping')




.controller('ShoppingCtrl', function($scope, $http ,$ionicPopup , $state ) {
    var url = 'https://flemmapp.firebaseio.com/';

    $scope.items = getItems();

    $scope.addItem = function() {
        var name = prompt("what do u want ");
        var lama = lama;

        if (name) {
            var postData = {
                "name": name,
                "date": new Date().getTime(),
                "lama": lama




            };
            $http.post(url, postData).success(function(data) {
                $scope.items = getItems()
            });


        }};

    $scope.items = getItems();

    var lama = lama;
        var postData = {
            "name": name,
            "date": new Date().getTime(),
            "lama": lama




        };






    function getItems() {
        var items = [];
        $http.get(url).success(function (data) {
            angular.forEach(data, function (value , key ) {
                var name = {name: value.name};
                var date = { date: value.date};
                var id2 = { id2 : key };
                items.push(name);
                items.push(date);
                items.push(id2);
            });
        });

        return items;
    }




    $scope.deleteItem = function (key) {
        var items = [];
        var id2 = { id2 : key };
        var item = item in items;
        var date = {date : item.date };
        $scope.items = [];



        $http.delete(url ,this.items,  key).success(function(date, key) {



        });
 return items ;
    };

});
