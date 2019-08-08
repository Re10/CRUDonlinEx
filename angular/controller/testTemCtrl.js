app.controller("testtempController", testtempController);

function testtempController($scope, $http, $state, $stateParams) {
 
  $scope.tagvalue;
  $scope.result = [];
  $scope.resulttag = [];
  $scope.questionArray = [];
  $scope.uniquequestionArray = [];
  $scope.queid=[];
  $scope.tag = [];
  $scope.tags = [];
  $scope.myvar = false;
  $scope.myvariable = false;
  $scope.rightmarks=[];
  $scope.wrongmarks=[];
  $scope.status=['Draft','Publish'];

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

 $http.get("http://localhost:4000/listtest").then(function (res) {
    $scope.listtest=res.data.result;
    // console.log("List Of Test=>",$scope.listtest);
  })

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


  //-----------------///

  $scope.addQuestions = function () {
    // console.log("here is in function::");
    $scope.myvar = true;
    // console.log($scope.myvar);

  }

  $scope.uniqueName=function(event){
    console.log("EVENT BLUR",event.target.value);
    for(let i=0;i<$scope.listtest.length;i++){
      if($scope.listtest[i].name ==  event.target.value){
        $scope.msg="Test Name Already Exists Please Enter Unique Test Name";
        // console.log("name exists ");
      }
    }
  }

  $scope.Search = function () {

    $scope.myvariable = true;
    $scope.result = [];

    $http.post("http://localhost:4000/listallque", $scope.tag).then(function (res) {
      console.log("Response=>",res.data.result);
   
      for (let i = 0; i < res.data.result.length; i++) {
      
        if (!($scope.uniquequestionArray.includes(res.data.result[i]._id))) {
          $scope.uniquequestionArray.push(res.data.result[i]._id);
        }
      }
  
      for (let i = 0; i < res.data.result.length; i++) {
        for (let j = 0; j < $scope.uniquequestionArray.length; j++) {
          if (res.data.result[i]._id == $scope.uniquequestionArray[j]) {
       
            $scope.result.push(res.data.result[i]);
          }
        }
      }
    
    })
  }

  $scope.totalValue = 0;
  $scope.checkoptions = function (event, index) {
    // console.log("here within checkbox function ", event.target);
    // console.log("here within checkbox function ", event.target.id);
    $scope.queid.push(event.target.id);
  
    $scope.quetexts = event.target.value.split("#");
    //  $scope.rightmarks=event.target.nextSibling.textContent;
    // console.log("here is question=>::", $scope.quetexts);
    $scope.question = {
      queText: $scope.quetexts[0],
      rightmarks: $scope.quetexts[1],
      wrongmarks: $scope.quetexts[2]
    }
  
    $scope.questionArray.push($scope.question);
    // console.log("here is Question array is:", $scope.questionArray);

  }
  //===Blur event to calculate totalmarks===//
  $scope.valueChange = function (event, index) {
    // console.log("here is ng-blur function::", event.target.value, index);
    $scope.total = event.target.value;
    // console.log("Total==>", $scope.total);
    $scope.totalValue = parseInt($scope.totalValue) + parseInt($scope.total);
    // console.log("total value array:", $scope.totalValue);
  }
  $scope.submit = function () {
   
    $scope.newtest.totalmarks = $scope.totalValue;
    $scope.newtest.question=$scope.queid;
    $scope.newtest.rightmarks=$scope.rightmarks;
    $scope.newtest.wrongmarks=$scope.wrongmarks;
    console.log("within Submit FUnction", $scope.newtest);
    for(let i=0;i<$scope.questionArray.length;i++)
    {
      $scope.rightmarks.push(parseInt($scope.questionArray[i].rightmarks));
      $scope.wrongmarks.push(parseInt($scope.questionArray[i].wrongmarks));
    }
    $http.post("http://localhost:4000/addtest", $scope.newtest).then(function (res) {
      // console.log("response",res);
    })



  }
  $scope.delete=function(id){
    console.log("within delete Function:",id);
    $http.delete("http://localhost:4000/deletetest/"+id).then(function(res){
        // console.log("within Delete method",res);
        
    })
}


}