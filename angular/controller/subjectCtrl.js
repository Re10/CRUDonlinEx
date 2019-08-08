app.controller("subjectController", subjectController);

function subjectController($scope, $http, $state,$stateParams) {
    $scope.msg="hello";
    $scope.result=[];
     
    $http.get("http://localhost:4000/listsubject").then(function(res){
    for(let i=0;i<res.data.result.length ;i++){
        $scope.result.push(res.data.result[i]);
     }
    // console.log("Result::",  $scope.result);
        })
    
  
    //==Delete Function==//
    $scope.delete=function(id){
        // console.log("Id:",id);
        $http.delete("http://localhost:4000/deletesubject/"+id).then(function(res){
            // console.log("within Delete method",res);
            $state.go("subject");
        })
        // console.log("Befor that Releated topic delete");
      

    }

    //==Submit Function===//
    $scope.submit=function(){
        $http.post("http://localhost:4000/addsubject",$scope.newsub).then(function(res){
            // console.log(res); 
        })
        $scope.newsub={};
        $state.go("topic");
        }

}