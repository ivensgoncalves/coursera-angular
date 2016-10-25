(function(){

  angular.module('NarrowItDownApp', [])
    .controller('NarrowItDownController', NarrowItDownController)
    .service('MenuSearchService', MenuSearchService)
    .directive('foundItems', foundItemsDirective)
    .directive('itemsLoaderIndicator', itemsLoaderIndicatorDirective);

  NarrowItDownController.$inject = ['MenuSearchService'];
  function NarrowItDownController(service)
  {
    var c = this;
    c.txtSearch = '';
    c.loading = false;

    c.search = function()
    {
      if(!c.txtSearch){
        c.found = [];
        c.error = null;
        c.loading = false;
        return;
      }

      c.loading = true;
      service.getMatchedMenuItems(c.txtSearch)
        .then(function(response){
          c.found = response;
          c.error = null;
          c.loading = false;
        })
        .catch(function(){
          c.found = [];
          c.loading = false;
          c.error = 'Error when retrieving list from server!';
        })
    }

    c.removeItem = function(index)
    {
      c.found.splice(index, 1);
    }
  }

  MenuSearchService.$inject = ['$http'];
  function MenuSearchService($http)
  {
    this.getMatchedMenuItems = function(searchTerm)
    {
      return $http({ url: 'https://davids-restaurant.herokuapp.com/menu_items.json' })
        .then(function(response){ return filter(response.data.menu_items, searchTerm); });
    }

    function filter(list, searchTerm)
    {
      var filteredList = [];
      for(var index = 0; index < list.length; index++)
      {
        var item = list[index];
        if(item.description.toLowerCase().indexOf(searchTerm.toLowerCase()) == -1){ continue; }
        filteredList.push(item);
      }

      return filteredList;
    }
  }

  function foundItemsDirective()
  {
      var ddo = {
        restrict: 'E',
        templateUrl: "templates/found-items.html",
        scope: { foundItems: '<', onRemove: '&', error: '<' },
      };

      return ddo;
  }

  function itemsLoaderIndicatorDirective()
  {
    var ddo = {
      restrict: 'E',
      templateUrl: "loader/itemsloaderindicator.template.html",
      scope: { loading: '<' },
    };

    return ddo;
  }

})();
