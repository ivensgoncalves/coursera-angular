(function(){
  'use strict';

  angular.module('data').service('MenuDataService', MenuDataService);

  MenuDataService.$inject = ['$http'];
  function MenuDataService($http)
  {
    var baseUrl = 'https://davids-restaurant.herokuapp.com/';

    this.getAllCategories = function()
    {
      return $http({ url: baseUrl + 'categories.json' }).then(function(response){
        var list = response.data;
        list.sort(function(item1, item2){ return item1.name.localeCompare(item2.name); });
        return list;
      });
      //categories.json
    }

    this.getItemsForCategory = function(categoryShortName)
    {
      return $http({
        url: baseUrl + 'menu_items.json',
        params: { category: categoryShortName }
      })
      .then(function(response){
        return response.data;
      });
    }
  }

})();
