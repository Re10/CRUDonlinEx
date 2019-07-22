app.controller("editqueController", editqueController);

function editqueController($scope, $http, $state, $stateParams) {

    $scope.msge = "hello hiiii";
    var id = $stateParams.id;
    console.log("Id:", id);
    $scope.multipleResponse;
    $scope.result = [];
    $scope.tag = [];
    $scope.resulttopic = [];
    $scope.priorities = [];
    console.log("Result::", $scope.result);

    //==Dynamic Option Feild==//
    $scope.choiceSet = { choices: [] };
    $scope.quest = {};
    $scope.que = [];
    $scope.choiceSet.choices = [];

    // $scope.addNewChoice = function () {
    //     $scope.choiceSet.choices.push('');
    // };
    // $scope.que = $scope.choiceSet.choices;
    // $scope.removeChoice = function (z) {
    //     //var lastItem = $scope.choiceSet.choices.length - 1;
    //     $scope.choiceSet.choices.splice(z, 1);
    // };
    // console.log("QUESTION ARRAY", $scope.que);
    //========================//


    $http.get("http://localhost:4000/editque/" + id).then(function (res) {
        console.log("RESPONSE:",res);
        console.log("Within get method of ", res.data.result);
        $scope.newque = res.data.result;
        console.log("nsjnjsnd", $scope.newque.tag);
        $scope.tag =$scope.newque.tag;
        console.log("nsjnjsnd", $scope.newque.correctAns);
        console.log("IDD", $scope.newque._id);
        console.log("typeeeeeeeee:", $scope.newque.type);
        if ($scope.newque.type == 'multipleResponse') {
            $scope.multipleResponse = true;
            console.log("redio", $scope.multipleResponse);
        }
        else {
            $scope.multipleResponse = false;
            console.log("redio", $scope.multipleResponse);
        }

    $scope.addNewChoice = function () {
        $scope.newque.option.push('');
    };
    $scope.removeChoice = function (z) {
        //var lastItem = $scope.choiceSet.choices.length - 1;
        $scope.newque.option.splice(z, 1);
    };
    })

    $scope.submit = function (queId) {
        $scope.que
        console.log("Id =>",queId);
        console.log( "tags are" ,$scope.tag);
        $scope.newque = {
            queText: $scope.newque.queText,
            solution: $scope.newque.solution,
            topic: $scope.newque.topic._id,
            type: $scope.newque.type,
            correctAns: $scope.data,
            option: $scope.newque.option,
            tag:$scope.tag
        }
        console.log("Within PUT this Data",   $scope.que,"=======",$scope.newque);
        console.log("Within Submit FUnction opt fgfhghgh", $scope.option);
        $http.put('http://localhost:4000/updateque/' + queId, $scope.newque).then(function(res){
            console.log("Within Put FUnction",res);
        })
        // $state.go("topic");


    }
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