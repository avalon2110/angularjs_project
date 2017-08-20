var myApp = angular.module('myApp');

myApp.controller('CarController', ['$scope', '$http', '$location', '$routeParams',function($scope, $http, $location, $routeParams) {
    console.log('Car Controller loaded');
    $scope.getCars = function () {
        $http.get('/api/cars').then( function (response){
            $scope.cars = response.data;
        })
    };

    $scope.getCar = function () {
        var id = $routeParams.id;
        $http.get('/api/cars/' + id).then( function (response){
            $scope.car = response.data;
        })
    };

    $scope.addCar = function () {
        // console.log($scope.car);
        $http.post('/api/cars/', $scope.car).then( function (response){
            $location.path('/cars');
        })
    };

    $scope.updateCar = function () {
        var id = $routeParams.id;
        $http.put('/api/cars/' + id, $scope.car).then( function (response){
            $location.path('/cars');
        })
    };

    $scope.deleteCar = function (id) {
        $http.delete('/api/cars/' + id,).then( function (response){
            $location.path('/cars');
        })
    };
}]);