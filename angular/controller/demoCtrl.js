app.controller("demoController", demoController);

function demoController($scope, $http, $state, $stateParams) {
  'use strict';
  $scope.readonly = false;
$scope.selectedItem = null;
$scope.searchText = null;

$scope.tag = [];
$scope.numberChips = [];
$scope.numberChips2 = [];
$scope.numberBuffer = '';
$scope.msg="hiiiiii";
$scope.myvar=false;
$scope.upload = function () {
    console.log("within upload function");
    $scope.msgs="hiiiiiilllllllllll";
    console.log("here is msg",$scope.msg);
    $scope.myvar=true;
    
}
/**
 * Return the proper object when the append is called.
 */
$scope.transformChip=  function (chip) {
  // If it is an object, it's already a known chip
  if (chip) {
    console.log("Chips:",chip);
    return chip;  
  }

  // Otherwise, create a new one  
}

/**
 * Search for vegetables.
 */
$scope.querySearch=  function (query) {
   $scope.results = query ? $scope.vegetables : [];
  console.log("Result=>",$scope.results);
  return $scope.results;
}

  $scope.loadVegetables=function() {
    $scope.veggies = [
   'oops','cpp','java','javascript'
  ];

 return  $scope.veggies;
  //  .map(function (veg) {
  //     console.log("vegies:",veg);
  //   return veg;
  // });
}
//$scope.querySearch =  $scope.querySearch();
$scope.vegetables =  $scope.loadVegetables();
$scope.transformChip =  $scope.transformChip();


}