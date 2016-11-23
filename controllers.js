//CONTROLLERS
weatherApp.controller('homeController',['$scope', 'cityService',function($scope, cityService){
    $scope.city = cityService.city;
    
    $scope.$watch('city', function() {
        cityService.city = $scope.city;
    })
}]);

weatherApp.controller('forecastController',['$scope', '$resource', '$routeParams', 'cityService',function($scope, $resource, $routeParams, cityService){
    $scope.city = cityService.city;
    $scope.days = $routeParams.days||'2';
    $scope.appid = 'd4f87e32e179bb7dea92846f8315ebb7';
    $scope.units = 'metric';
    $scope.mode = 'json';
    
    $scope.weatherAPI = $resource("http://api.openweathermap.org/data/2.5/forecast/daily", {
        callback:"JSON_CALLBACK"}, {get: {method:"JSONP"}});
    $scope.weatherResult = $scope.weatherAPI.get({q:$scope.city, cnt:$scope.days, appid:$scope.appid, units:$scope.units, mode:$scope.mode});
    console.log($scope.weatherResult);
    
    $scope.convertToFahrenheit = function(degK) {
        
        return Math.round(degK *9/5 + 32);
        
    }
    
    $scope.convertToDate = function(dt) { 
      
        return new Date(dt * 1000);
        
    };
                                            
}]);