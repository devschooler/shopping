// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('shopping', ['ionic' , 'angularMoment', 'firebase'])




    .config(function($stateProvider, $urlRouterProvider) {
      $stateProvider
          .state('shopping', {
            url: '/shopping',
              controller:'ShoppingCtrl',

            templateUrl: 'views/shopping.html'

          });

        $stateProvider.state('queue',{
            url:'/queue',
            templateUrl:'views/queue.html'
        });

        $stateProvider.state('edit',{
            url:'/edit/:personId',
            controller:'EditController',
            templateUrl:'views/edit.html'
        });

        $stateProvider.state('add',{
            url:'/add',
            controller:'AddController',
            templateUrl:'views/edit.html'
        });
      $urlRouterProvider.otherwise('/shopping');
    })





.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.controller('QueueController', function($scope,Queue,$state){
    $scope.queue = Queue;
    /*
     $scope.queue.$loaded(function(){
     if($scope.queue.length === 0){
     $scope.queue.$add({
     name:'David Cai',
     status:'Added to queue',
     updatedTime:Firebase.ServerValue.TIMESTAMP
     });
     $scope.queue.$add({
     name:'Denis Koletić',
     status:'Added to queue',
     updatedTime:Firebase.ServerValue.TIMESTAMP
     });
     }
     });
     */

    $scope.add = function(){
        $state.go('add');
    };

    $scope.delete = function(person){
        //queueService.deletePerson(personId);
        Queue.$remove(person);
    };

 var persons = [] ;


    $scope.deleteAll = function() {
        var ref = new Firebase('https://flemmapp.firebaseio.com/');

        ref.remove() ;
        console.log('lama')


    };
})

    .controller('EditController', function($scope,$state,Queue){
        var ref = new Firebase("https://flemmapp.firebaseio.com/");



        var person = Queue.$getRecord($state.params.personId);
        //$scope.person = angular.copy(queueService.getPerson($state.params.personId));
        $scope.person = angular.copy(person);


        //console.log($scope.person);
        $scope.save = function(){
            //  queueService.updatePerson($scope.person);
            //$state.go('queue');
            person.name = $scope.person.name;
            person.quantity = $scope.person.quantity;
            person.updatedTime = Firebase.ServerValue.TIMESTAMP;
            Queue.$save(person);
            $state.go('queue');
        };

        $scope.delete = function(){
            //  queueService.deletePerson($scope.person.id);
            //$state.go('queue');
            Queue.$remove(person);
            $state.go('queue');

        };


    })

.controller('AddController', function($scope,$state,Queue){
    $scope.person = {
        name:'',
        quantity:''
    };
    $scope.save = function(){
//  queueService.addPerson($scope.person);
        //$state.go('queue');
        $scope.person.updatedTime = Firebase.ServerValue.TIMESTAMP;
        Queue.$add($scope.person);
        $state.go('queue');
    }

});


