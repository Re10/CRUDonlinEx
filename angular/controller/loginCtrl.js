application.controller("loginController",loginController);

function loginController($scope,$http,$state){
    $scope.msg="hello";
    // console.log("within Login Controller");
    $scope.submit=function(){
        // console.log("Within Submit Finction");
        // console.log("ddsdsd",$scope.newregi);
        $http.post("http://localhost:4000/login",$scope.newregi).then(function(res){
            // console.log("Response",res);
            window.localStorage.setItem('token',res.data.token);
            $state.go('listtest');
        })
       
    }
}