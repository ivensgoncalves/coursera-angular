(function(){
  'use strict';

  angular.module('MenuApp').controller('CategoriesItemsController', CategoriesItemsController);

  CategoriesItemsController.$inject = ['data'];
  function CategoriesItemsController(data)
  {
    this.category = data.category;
    this.items = data.menu_items;
    this.items.sort(function(item1, item2){ return item1.name.localeCompare(item2.name); });
  }

})();
