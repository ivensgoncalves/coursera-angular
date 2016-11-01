(function () {
"use strict";

angular.module('public')
.controller('SignUpController', SignUpController);

SignUpController.$inject = ['UserService', 'MenuService'];
function SignUpController(UserService, MenuService) {
  var $ctrl = this;

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
    MenuService.getCategoryDetailByShortName($ctrl.user.favorite)
      .then(function(data){ $ctrl.signUpForm.favorite.$setValidity('notFound', true); })
      .catch(function(){ $ctrl.signUpForm.favorite.$setValidity('notFound', false); })
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
      favorite: $ctrl.user.favorite
    });
  }
}

})();
