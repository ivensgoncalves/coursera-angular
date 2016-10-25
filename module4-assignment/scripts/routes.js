(function(){
  'use strict';

  angular.module('MenuApp').config(RoutesConfig);

  RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
  function RoutesConfig($stateProvider, $urlRouterProvider)
  {
    /// Home State as Default
    $urlRouterProvider.otherwise('/');

    /// States
    $stateProvider

      // Home page
      .state('home', {
        url: '/',
        templateUrl: 'templates/home.template.html'
      })

      /// Categories List State
      .state('categories', {
        url: '/categories',
        template: '<categories items="categories.items"></categories>',
        controller: 'CategoriesController as categories',
        resolve:
        {
          categories: ['MenuDataService', function (MenuDataService) {
            return MenuDataService.getAllCategories();
          }]
        },
      })

      /// Items State
      .state('categories.items', {
        url: '/{id}',
        template: '<category-items category="categoryItems.category" items="categoryItems.items"></category>',
        //templateUrl: 'templates/categories.items.template.html',
        controller: 'CategoriesItemsController as categoryItems',
        resolve: {
          data: ['$stateParams', 'MenuDataService', function ($stateParams, MenuDataService) {
            return MenuDataService.getItemsForCategory($stateParams.id);
          }]
        }
      });
  }

})();
