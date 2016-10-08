(function(){

  /// Angular Declarations
  angular
    .module('ShoppingListCheckOff', [])
    .controller('ToBuyController', ToBuyController)
    .controller('AlreadyBoughtController', AlreadyBoughtController)
    .service('ShoppingListCheckOffService', ShoppingListCheckOffService);

  /// ToBuy Controller
  ToBuyController.$inject = ['ShoppingListCheckOffService'];
  function ToBuyController(service)
  {
    var ctrlBuy = this;
    ctrlBuy.items = service.getPendingList();
    ctrlBuy.buy = function(index) { service.buy(index); }
  }

  /// Bought Controller
  AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
  function AlreadyBoughtController(service)
  {
    var ctrlBought = this;
    ctrlBought.items = service.getBoughtList();
  }

  /// Service Implementation
  function ShoppingListCheckOffService()
  {
    /// Declaring Lists
    var boughtList = [];
    var pendingList =
    [
      { name: 'Cookies', quantity: 10 },
      { name: 'Chips', quantity: 4 },
      { name: 'Bread', quantity: 15 },
      { name: 'Apple', quantity: 6 },
      { name: 'Cake', quantity: 1 },
    ];

    /// Declaring Methods
    this.buy = function(index)
    {
      var removedItem = pendingList.splice(index, 1)[0];
      boughtList.push(removedItem);
    }

    this.getPendingList = function(){ return pendingList; }
    this.getBoughtList = function(){ return boughtList; }
  }

})();
