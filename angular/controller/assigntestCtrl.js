app.controller("assigntestController", assigntestController);

function assigntestController($scope, $http, $state, $stateParams) {
    $scope.msg = "HEllo";
    $http.get("http://localhost:4000/listtestpublish").then(function (res) {
        $scope.listtest = res.data.result;
        // console.log("List Of Test=>", $scope.listtest);
    })
    $http.get("http://localhost:4000/liststud").then(function (res) {
        $scope.result = res.data.result;
        // console.log("List Of Publish Test=>",$scope.result);
    })
    $scope.getTestDetail = function (testid) {
        // console.log("TEST  IDDD", testid);
        $scope.newasstest.id = testid;
    }
    $scope.submit = function () {
        console.log("within Submit Function");
       
        // console.log("Uploades File =>", uploadFile);
        $scope.newasstest.file = uploadFile;
        // console.log("DATA ISSSS:", $scope.newasstest);
        var formData = new FormData();
        formData.append("title", $scope.newasstest.title);
        formData.append("id", $scope.newasstest.id);
        formData.append("date", $scope.newasstest.date);
        formData.append("description", $scope.newasstest.description);
        formData.append("file", $scope.newasstest.file);
        for (var value of formData.values()) {
            // console.log("Formdatavalues", value);
        }
            $http.post('http://localhost:4000/read', formData, {

                transformRequest: angular.identity,
                headers: {
                    'Content-Type': undefined
                }

            }).then(function (res) {
                console.log("Response", res);
           })
    }
    $scope.send=function(testId){
        console.log("test Id",testId);
        $http.get("http://localhost:4000/listonetest/" + testId).then(function (res) {
            // console.log(res);
        })
    }
}