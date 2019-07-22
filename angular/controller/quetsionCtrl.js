app.controller("questionController", questionController);

function questionController($scope, $http, $state, $stateParams) {
    console.log("withierheiheehewkghkghr");
    $scope.multipleResponse = false;
    $scope.tag = [];
    $scope.resulttopic = [];
    $scope.resultsub=[];
    $scope.result = [];
    $scope.choicesss = [];
    $scope.data = [];
    $scope.validationmsg;
    $scope.subId;
    $scope.topicId;
    $scope.add = function () {
        if ($scope.skills.length == 1) {
            $scope.mes = "please put atleast two Skills";
        }
    }
    $scope.getSubDetail=function(id){
        console.log("ID   ",id);
        $scope.subId=id;
        console.log("After click===> ",$scope.subId);    
    }
    $scope.gettopic=function(id){
        console.log("Id Topic :",id);
        $scope.topicId=id;
    }
    console.log("After click===> :::",$scope.subId);
    $http.get("http://localhost:4000/listsubject").then(function (res) {
        for (let i = 0; i < res.data.result.length; i++) {
            $scope.resultsub.push(res.data.result[i]);
           }
           console.log("Subject Are:",$scope.subjectId);
          
    })

    $http.get("http://localhost:4000/listtopic").then(function (res) {
        console.log("Within get method of LISTTOPIC",res);
        console.log("After click ",$scope.subId);
        for (let i = 0; i < res.data.result.length; i++) {
            $scope.resulttopic.push(res.data.result[i]);
            console.log("subname==>",$scope.resulttopic[i].subjectId.subName);
        }
        console.log("Within get method of LISTTOPIC",$scope.resulttopic);
    })
    console.log("Befor the listquestion funcion");
    $http.get("http://localhost:4000/listque").then(function (res) {
        console.log("Within get method of ",res);
        
        for (let i = 0; i < res.data.result.length; i++) {
            $scope.result.push(res.data.result[i]);
        }

        console.log("Result:",$scope.result);
    })
   
    //==Dynamic Option Feild==//
    $scope.choiceSet = { choices: [] };
    $scope.quest = {};
    $scope.que = [];
    $scope.choiceSet.choices = [];
    $scope.addNewChoice = function () {
        $scope.choiceSet.choices.push('');
    };
    $scope.que = $scope.choiceSet.choices;
    $scope.removeChoice = function (z) {
        //var lastItem = $scope.choiceSet.choices.length - 1;
        $scope.choiceSet.choices.splice(z, 1);
    };
    console.log("QUESTION ARRAY", $scope.que);
    //========================//
    //======Submit Function==========//
    $scope.submit = function () {
        console.log("Within Submit Function");
        console.log("skills are:", $scope.tag);
        console.log("Corrct Ans", $scope.newque.correctAns);
        console.log("$scope.choice", $scope.choices);
        console.log("Result:", $scope.data);
        console.log("Question Data is:::", $scope.newque);
        if ($scope.newque.type == 'mutipleChoice') {
            $scope.multipleResponse = true;
        }
        else {
            $scope.multipleResponse = false;
        }

        $scope.newque = {
            queText: $scope.newque.queText,
            solution: $scope.newque.solution,
            topic: $scope.newque.topic,
            type: $scope.newque.type,
            correctAns: $scope.data,
            option: $scope.que,
            tag:$scope.tag
        }
        // console.log("=========>dfdfd", $scope.newque.option);
        console.log("Question Data is:::", $scope.newque);
      //  console.log($scope.newque.topic);
        if ($scope.newque.topic != "" && $scope.newque.topic != undefined) {
            $scope.msg = 'Value Selected : ';
        }

        else
            $scope.msg = 'Please Select Dropdown Value';

        // console.log("here is data",$scope.newque); 
        if ($scope.msg == 'Value Selected : ') {
            $http.post("http://localhost:4000/addque", $scope.newque).then(function (res) {
                console.log(res);
            })
        }
    }
    $scope.delete=function(id){
        console.log("within delete Function:",id);
        $http.delete("http://localhost:4000/deleteque/"+id).then(function(res){
            console.log("within Delete method",res);
            
        })
    }
    //=====================//
    //=======Redio Button=========//
    $scope.check = function (event, i) {
        console.log("Event", event.target.checked);

        console.log("choicessssss", i);
        if (event.target.checked == true) {
            $scope.data = i;
            $scope.checked = true;
        }
        else {
            //  $scope.data.splice(i, 1);
            console.log($scope.data);
        }

        console.log("Result:", $scope.data);
    }
    //================//
    //======Checkbox ========//
    $scope.checkoptions = function (event, i) {
        console.log("Event", event.target.checked);

        console.log("choicessssss", i);
        if (event.target.checked == true) {
            $scope.data.push(i)
            $scope.checked = true;
        }
        else {
            $scope.data.splice(i, 1);
            console.log($scope.data);
        }

        console.log("Result:", $scope.data);
        if($scope.data.length <2){
            $scope.validationmsg=true;
            $scope.msg="Please Select Atleast Two checkBox";
        }
       

    }

    //========================//
    //==click type is Mutipleopt======//
    $scope.multiOpt = function () {
        $scope.multipleResponse = false;
        console.log("selected mutiplr check", $scope.multipleResponse);
    }
    //==========//
    //==click type is multiRes======//
    $scope.multiRes = function () {
        $scope.multipleResponse = true;
        console.log("selected mutiplr Res", $scope.multipleResponse);
    }
}