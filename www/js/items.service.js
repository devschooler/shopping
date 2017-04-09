(function () {

angular .module('shopping')

    .factory('items', function($firebaseArray){
        var ref = new Firebase('https://flemmapp.firebaseio.com/');
        return $firebaseArray(ref);
    });




})();
