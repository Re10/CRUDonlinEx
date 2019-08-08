
app.controller("topicController", topicController);

function topicController($scope, $http, $state) {
    $scope.msge = "hello hiiii";
    $scope.result = [];
    $scope.resulttopic = [];
   

    $http.get("http://localhost:4000/listsubject").then(function (res) {
        for (let i = 0; i < res.data.result.length; i++) {
            $scope.result.push(res.data.result[i]);
          
        }

    })
    console.log("Result::", $scope.result);
    $http.get("http://localhost:4000/listtopic").then(function (res) {
        console.log("Within get method of ");
        for (let i = 0; i < res.data.result.length; i++) {
            $scope.resulttopic.push(res.data.result[i]);
          
        }
    })
   
    $scope.submit = function () {
        // console.log("subject", $scope.subject);
        // console.log("topic:", $scope.newtopic);
        $scope.data = [];
        $scope.subjectObj = {
            id: $scope.subject
        }
        // console.log("topic:", $scope.subjectObj);
        $scope.data.push($scope.subjectObj);
        $scope.data.push($scope.newtopic);
        // console.log("DATA:", $scope.data);
        if ($scope.subject != "" && $scope.subject != undefined)
            $scope.msg = 'Value Selected : ';
        else
            $scope.msg = 'Please Select Dropdown Value';
        if ($scope.msg == 'Value Selected : ') {
            // console.log("withtin")
            $http.post("http://localhost:4000/addtopic", $scope.data).then(function (res) {
                console.log(res);
                $state.go("question");
            })

        }
        else
            console.log('Please Select Dropdown Value');
       
    }
    $scope.delete=function(id){
        console.log("Id:",id);
        $http.delete("http://localhost:4000/deletetopic/"+id).then(function(res){
            // console.log("within Delete method",res);
            $state.go("question");
        })

    } 



}