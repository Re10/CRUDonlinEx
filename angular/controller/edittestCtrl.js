app.controller("edittestController", edittestController);

function edittestController($scope, $http, $state, $stateParams) {
  $scope.msg="hello edit";
  var id=$stateParams.id;
  $scope.tag = [];
  $scope.tags = [];
  $scope.resulttag = [];
  $scope.uniquequestionArray=[];
  $scope.uniquequestiontext=[];
  $scope.questionArr=[];
  $scope.questionArray=[];
  $scope.total=0;
  $scope.status=['Draft','Publish'];
  console.log("Id",id);
  $http.get("http://localhost:4000/edittest/" + id).then(function (res) {
    $scope.newtest=res.data.result;
    console.log("List",$scope.newtest);
    console.log("List",$scope.newtest.status);
  })

  $http.get("http://localhost:4000/listque").then(function (res) {
    console.log("Res",res);
    for (let i = 0; i < res.data.result.length; i++) {
      for (let j = 0; j < res.data.result[i].tag.length; j++) {
        $scope.resulttag.push(res.data.result[i].tag[j]);
        }
    }
    $scope.onlyUnique = function (value, index, self) {
      return self.indexOf(value) === index;
    }
    $scope.unique = $scope.resulttag.filter($scope.onlyUnique); // returns ['a', 1, 2, '1']
    });
    //for md -AutoCompltete//
    $scope.readonly = false;
    $scope.selectedItem = null;
    $scope.searchText = null;
    /**
     * Return the proper object when the append is called.
     */
    $scope.transformChip = function (chip) {
      // If it is an object, it's already a known chip
      if (chip) {
        console.log("Chips:", chip);
        return chip;
      }
  
      // Otherwise, create a new one  
    }
  
    /**
     * Search for tag.
     */
    $scope.querySearch = function (query) {
      $scope.results = query ? $scope.unique : [];
    
      return $scope.results;
    }
  
    $scope.transformChip = $scope.transformChip();

    $scope.checkoptions = function (event, index) {
      // console.log("here within checkbox function ", event.target);
      // console.log("here within checkbox function ", event.target.id);
   
 
      $scope.quetexts = event.target.value.split("#");
      //  $scope.rightmarks=event.target.nextSibling.textContent;
      // console.log("here is question=>::", $scope.quetexts);
      $scope.question = {
        queText: $scope.quetexts[0],
        rightmarks: $scope.quetexts[1],
        wrongmarks: $scope.quetexts[2]
      }
    console.log($scope.question.rightmarks);
    $scope.total=parseInt($scope.total)+parseInt($scope.question.rightmarks);
    console.log("TOTALLL=>",$scope.total);
      $scope.questionArray.push($scope.question);
     console.log("here is Question array is:", $scope.questionArray);
   
    }

    
  
  
    //-----------------///
    $scope.Search=function(){
      $scope.arr=[];
      $scope.question=[];
        console.log("within search function",$scope.newtest.questions);
        $http.post("http://localhost:4000/listallque", $scope.tag).then(function (res) {
            console.log("Response=>",res.data.result);
            for (let i = 0; i < res.data.result.length; i++) {
      
              if (!($scope.uniquequestionArray.includes(res.data.result[i]._id))) {
                $scope.uniquequestionArray.push(res.data.result[i]._id);
                $scope.uniquequestiontext.push(res.data.result[i]);
              }
            }
            for(let j=0;j<$scope.newtest.questions.length;j++){
              $scope.arr.push($scope.newtest.questions[j].question._id);
            }
            console.log("here is unique array",$scope.uniquequestionArray,"====ARRRR", $scope.arr);
            $scope.questionArr=$scope.uniquequestiontext.filter(o => !$scope.arr.find(o2 => o._id === o2))
           console.log("data issss:", $scope.questionArr);
           for(let i=0;i< $scope.questionArr.length;i++){
           $scope.question[i]={
            question:$scope.questionArr[i]
           }
          }
           console.log("Que=>",$scope.question);
           for(let i=0;i< $scope.question.length;i++){
           $scope.newtest.questions.push( $scope.question[i]);
           }
           console.log("Question=>",  $scope.newtest.questions)
          
       
           
           
    })
}
  $scope.submit=function(testId){
  
    console.log("here is Question array is:", $scope.questionArray,"======",  $scope.total);
    //$scope.newtest.totalmarks=$scope.total;
    console.log("Question id==>", $scope.newtest.questions);
    for(let i=0;i<$scope.newtest.questions.length;i++){
    $scope.newtest.questions[i].question= $scope.newtest.questions[i].question._id;
    }
    $scope.newtest={
      name:$scope.newtest.name,
      description:$scope.newtest.description,
      questions:$scope.newtest.questions,
      totalmarks:$scope.total,
      passingscore:$scope.newtest.passingscore,
      duration:$scope.newtest.duration,
      status:$scope.newtest.status

    }

    console.log("here is netest data=>",$scope.newtest,"======",testId);
    $http.put('http://localhost:4000/updatetest/' + testId, $scope.newtest).then(function(res){
      console.log("Within Put FUnction",res);
  })


  }
   

}