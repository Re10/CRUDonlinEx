application.controller("finishController",finishController);
function finishController($scope,$http, $state, $stateParams,$rootScope){
    console.log("within finish controller");
    $scope.mymsg=false;

$scope.totalmarks=window.localStorage.getItem('totalmarks');
$scope.passing=window.localStorage.getItem('passing');
$scope.rightQue=window.localStorage.getItem('que');
$scope.wrongQue=window.localStorage.getItem('wrongQue');
$scope.correct=window.localStorage.getItem('correct');
$scope.wrong=window.localStorage.getItem('wrong');

if(parseInt($scope.totalmarks) < parseInt($scope.passing)){
    $scope.mymsg=true;
    $scope.msg=" Result Is Fail....";
}

    $scope.result=function(){
        // console.log("within result function");
        $scope.resultValue=!$scope.resultValue;
    }
}