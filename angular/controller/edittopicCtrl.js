
app.controller("edittopicController", edittopicController);

function edittopicController($scope, $http, $state,$stateParams) {
    $scope.msge = "hello hiiii";
    var id=$stateParams.id;
    // console.log("Id:",id);
    $scope.result = [];
    $scope.resulttopic = [];
    // console.log("Result::", $scope.result);
    $http.get("http://localhost:4000/edittopic/"+id).then(function (res) {
        // console.log("Within get method of ",res.data.result); 
        $scope.newtopic=res.data.result;
        // console.log("nsjnjsnd", $scope.newtopic);
        // console.log("IDD", $scope.newtopic._id);
    })
    $scope.submit=function(topicId){
        // console.log("Within Submit FUnction", $scope.newtopic,topicId);
        $http.put('http://localhost:4000/updatetopic/' + topicId,$scope.newtopic).then(function(res){
            // console.log("Within Put FUnction",res);
        })
        $state.go("topic");

       
    }
    

    


}