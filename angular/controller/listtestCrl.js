application.controller("listtestController",listtestController);

function listtestController($scope,$http,$state,$stateParams){

    var id=window.localStorage.getItem('id');
  console.log("Id",id);
    $scope.msg="helllo";
    console.log("befor list");
    $http.get("http://localhost:4000/listtestpublishtest/" +id).then(function(res){
        console.log("Response is",res);
        $scope.result=res.data.result;
        console.log("Result::",$scope.result);

    })
    $scope.Logout=function(){
        // console.log("Within Logout Function");
        window.localStorage.clear();
        $state.go("login");
    }
}