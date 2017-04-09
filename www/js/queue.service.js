(function () {

var app = angular.module('shopping');

app.factory('Queue', function($firebaseArray){
  var ref = new Firebase('https://flemmapp.firebaseio.com/');
  return $firebaseArray(ref);
});




})();
