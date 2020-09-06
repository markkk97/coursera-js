
var app = angular.module("LunchCheck", []);
app.controller("LunchCheckController", LunchCheckController );

LunchCheckController.$inject =[ '$scope', '$filter' ];
     function LunchCheckController($scope, $filter){


    $scope.check = function(){
        if (!$scope.food || $scope.food == " "){
            $scope.alert = "Please enter data first"
            return;
        } else {
            console.log($scope.food);
            
        }

        
        
       var foodItems = $scope.food.split(",");
       var foodItems = foodItems.filter(String);
      

    if (foodItems.length > 3){
           $scope.message = "Too much food!"
       } else if (foodItems.length <= 3){
        $scope.message = "Enjoy your meal!"
       } else{
           "an error occurred"
       }
        
        console.log(foodItems);
    }

     
    
};