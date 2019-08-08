application.controller("listtestController",listtestController);

function listtestController($scope,$http,$state){
    // console.log("within List Controller");
    $scope.msg="helllo";
    $http.get("http://localhost:4000/listtestpublish").then(function(res){
        // console.log("Response is",res);
        $scope.result=res.data.result;

    })
    $scope.Logout=function(){
        // console.log("Within Logout Function");
        window.localStorage.clear();
        $state.go("login");
    }
}