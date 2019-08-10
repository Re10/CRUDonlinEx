application.controller("finishController", finishController);
function finishController($scope, $http, $state, $stateParams, $rootScope) {
    console.log("within finish controller");
    var id=window.localStorage.getItem('id');
    console.log("Id",id);
    $scope.mymsg = false;
    $scope.token = window.localStorage.getItem('token');
    $scope.totalmarks = window.localStorage.getItem('totalmarks');
    $scope.totalscore = window.localStorage.getItem('totalscore');
    $scope.passing = window.localStorage.getItem('passing');
    $scope.rightQue = window.localStorage.getItem('que');
    $scope.wrongQue = window.localStorage.getItem('wrongQue');
    $scope.correct = window.localStorage.getItem('correct');
    $scope.wrong = window.localStorage.getItem('wrong');
    $scope.quelength = window.localStorage.getItem('questionlength');

    console.log("tttttttt", parseInt($scope.totalmarks) < parseInt($scope.passing));
    if (parseInt($scope.totalmarks) < parseInt($scope.passing)) {
        $scope.mymsg = true;
        $scope.status = "Fail";
    }
    else {
        $scope.status = "Pass";
    }

    $scope.result = function () {
        console.log("Within Result Function Id is",id);
        $scope.data={
            token:$scope.token,
            status:$scope.status,
            marks:$scope.totalmarks,
            correct:$scope.correct
        }
        console.log("data",$scope.data);
        $http.put("http://localhost:4000/updateStud/"+id,$scope.data).then(function(res){
            console.log("response",res);
        })
        $scope.resultValue = !$scope.resultValue;
    }
}