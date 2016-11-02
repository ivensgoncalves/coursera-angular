(function () {
"use strict";

angular.module('public')
.controller('SignUpController', SignUpController);

SignUpController.$inject = ['UserService', 'MenuService'];
function SignUpController(UserService, MenuService) {
  var $ctrl = this;
  var menuItem = null;

  $ctrl.isRegistered = function(){
    return UserService.hasData();
  }

  $ctrl.hasPendingTasks = function(){
    return $ctrl.signUpForm.favorite.checked === false || $ctrl.signUpForm.favorite.loading;
  }

  $ctrl.dishChanged = function(){
    $ctrl.signUpForm.favorite.checked = false;
    $ctrl.signUpForm.favorite.$setValidity('notFound', true);
  }

  $ctrl.validateFavorite = function(){
    if($ctrl.signUpForm.favorite.checked !== false){ return; }

    $ctrl.signUpForm.favorite.loading = true;
    MenuService.getMenuItemDetailByShortName($ctrl.user.favorite)
      .then(function(data){
        $ctrl.signUpForm.favorite.$setValidity('notFound', true);
        menuItem = data;
      })
      .catch(function(){
        $ctrl.signUpForm.favorite.$setValidity('notFound', false);
        menuItem = null;
      })
      .finally(function(){
        $ctrl.signUpForm.favorite.checked = true;
        $ctrl.signUpForm.favorite.loading = false;
      })
  }

  $ctrl.submit = function(){

    UserService.save({
      firstName: $ctrl.user.firstName,
      lastName: $ctrl.user.lastName,
      emailAddress: $ctrl.user.emailAddress,
      phone: $ctrl.user.phone,
      favorite: menuItem
    });
  }
}

})();
