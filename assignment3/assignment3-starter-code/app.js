(function () {
'use strict';
 var app = angular.module('NarrowItDownApp', []);
 app.controller('NarrowItDownController',NarrowItDownController);
 app.directive('foundItems', foundItems); 
 app.directive('myCustomer', function() {
    return {
      templateUrl: 'my-customer.html'
    };
  });
 app.service('MenuSearchService', MenuSearchService);
 app.constant('ApiBasePath', "https://davids-restaurant.herokuapp.com");

 function foundItems() {
    var ddo = {
        templateUrl: 'foundItems.html',
      scope: {
        categories: '<',
        title: '@',
        onRemove:'&'
      },
      controller: foundItemsDirectiveController,
      controllerAs: 'menu',
      bindToController: true
    };
  
    return ddo;
  }

  


  function foundItemsDirectiveController() {
    var list = this;
  
    list.itemsInList = function (input) {
      for (var i = 0; i < list.items.length; i++) {
        var name = list.items[i].name;
        if (name.toLowerCase().indexOf(input) !== -1) {
          return true;
        }
      }
  
      return false;
    };
  }


 NarrowItDownController.$inject = ['$scope','MenuSearchService'];
    

 function NarrowItDownController($scope,MenuSearchService) {
    var menu=this;
    menu.itemName="";
    
    

    menu.getMatchedMenuItems = function () {

        console.log(menu.itemName);
        var promise = MenuSearchService.getMatchedMenuItems(menu.itemName);
  
        promise.then(function (response) {
            menu.categories = response;
            console.log( response);
        })
        .catch(function (error) {
            console.log("Something went terribly wrong." + error);
         });
    };

    menu.removeItem = function(itemIndex){
        MenuSearchService.removeItem(itemIndex);
    } 
    
 }




 MenuSearchService.$inject = ['$http', 'ApiBasePath'];
 function MenuSearchService($http, ApiBasePath) {
    var service = this;
    var foundItems = [""];

    service.getMatchedMenuItems = function (searchTerm){
        foundItems = [""];
        var response = $http({
            method: "GET",
            url: (ApiBasePath + "/menu_items.json")
          });
        return response.then(function (result) {
            // process result and only keep items that match
            console.log(result.data.menu_items);
            
            result.data.menu_items.forEach(element => {   
                //console.log(element.description);             
                  if(element.description.includes(searchTerm)){
                      foundItems.push(element)
                  }
            });
            // return processed items

            console.log(foundItems);
            foundItems.shift();
            return foundItems;
        }); 
    }

    service.removeItem = function (itemIndex) {
        foundItems.splice(itemIndex, 1);
      };
}
})();
