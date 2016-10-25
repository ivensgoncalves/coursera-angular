(function(){
  'use strict';

  angular.module('MenuApp').component('categoryItems', {
    templateUrl: 'templates/items.template.html',
    bindings: {
      'category': '<',
      'items': '<'
    }
  });

})();
