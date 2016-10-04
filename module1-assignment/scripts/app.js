(function () {
'use strict';

  /// Declaring Enum Body
  var MessageType = function(cssClass, message)
  {
    this.getCssClass = function(){ return cssClass; }
    this.getMessage = function(){ return message; }
  };

  /// Declaring Enum Values
  MessageType.Empty = new MessageType('empty', 'Please enter data first');
  MessageType.Enjoy = new MessageType('enjoy', 'Enjoy!');
  MessageType.TooMuch = new MessageType('toomuch', 'Too Much!');

  /// Creating Angular Application
  angular
    .module('LunchCheck', [])
    .controller('LunchCheckController', LunchCheckController);

  LunchCheckController.$inject = ['$scope'];
  function LunchCheckController ($scope) {
    $scope.menu = "";
    $scope.message = "";
    $scope.checkMenu = function () {
      var items = splitValidItems($scope.menu, ',');
      var type = getMessageType(items.length);
      $scope.message = type.getMessage();
      $scope.messageCssStyle = type.getCssClass();
    };
  }

  /// Common Functions
  function splitValidItems(value, separator)
  {
    value = value || '';
    var items = value.split(separator);
    var validItems = [];
    for(var index = 0; index < items.length; index++){
      var item = trim(items[index]);
      if(item){ validItems.push(item); }
    }

    return validItems;
  }

  function getMessageType(total){
    if(total == 0){ return MessageType.Empty; }
    else if(total <= 3){ return MessageType.Enjoy; }
    return MessageType.TooMuch;
  }

  function trim(value){
    if(!value){ return value; }
    while(value[0] == ' '){ value = value.slice(1); }
    while(value[value.length -1] == ' '){ value = value.slice(0, -1); }
    return value;
  }

})();
