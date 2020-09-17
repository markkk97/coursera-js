'use strict'

var app = angular.module("ShoppingListCheckOff",[]);
 app.controller("ToBuyController", ToBuyController);
 app.controller("AlreadyBoughtController", AlreadyBoughtController);
 app.service("ShoppingListCheckOffService",ShoppingListCheckOffService);

 ToBuyController.$inject = [ '$scope','ShoppingListCheckOffService'];
 
  function ToBuyController($scope, ShoppingListCheckOffService) {
    var itemAdder = this;
      
    $scope.toBuy = ShoppingListCheckOffService.toBuy;
  
    // itemAdder.itemName = "";
    // itemAdder.itemQuantity = "";
    // itemAdder.itemIndex = 0;

    itemAdder.addRemove = function (itemName, itemQuantity, itemIndex) {
        if ($scope.toBuy.length != 0){
                ShoppingListCheckOffService.addRemove(itemName, itemQuantity, itemIndex);
        }
        
        
       
    }
    
    
  }


 AlreadyBoughtController.$inject = ['$scope','ShoppingListCheckOffService'];
  function AlreadyBoughtController($scope,ShoppingListCheckOffService) {
    $scope.bought = ShoppingListCheckOffService.bought;
    
    
    
  }




function ShoppingListCheckOffService() {
    var service = this;
  
    // List of shopping items
     this.toBuy = [
        {name:"cookies",quantity:10},
        {name:"milk",quantity:2},
        {name:"eggs",quantity:5},
        {name:"fish",quantity:10},
        {name:"meat",quantity:33},
        {name:"yogurt",quantity:2}
    ];

    this.bought = [];
  
    service.addRemove = function (itemName, quantity,itemIndex) {
      var item = {
        name: itemName,
        quantity: quantity
      };
      this.toBuy.splice(itemIndex, 1);
      this.bought.push(item);
    };

    service.checkSize = function (arr){
         arr.length == 0 ?  true :  false;

    }
  
   
  
    // service.getItems = function () {
    //   return items;
    // };
  }
