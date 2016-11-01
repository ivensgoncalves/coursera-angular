(function () {
"use strict";

angular.module('public')
.controller('MyInfoController', MyInfoController);

MyInfoController.$inject = ['ApiPath', 'UserService'];
function MyInfoController(ApiPath, UserService) {
  var $ctrl = this;

  $ctrl.apiPath = ApiPath;
  $ctrl.userData = UserService.getData();
  $ctrl.isRegistered = function(){ return UserService.hasData(); }
}

})();
