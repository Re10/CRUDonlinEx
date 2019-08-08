application.controller("testController", testController);

function testController($scope, $http, $state, $stateParams, $rootScope, $interval, $window) {
    console.log("within test Controller");
    console.log("get token==>",window.localStorage.getItem('token'));
    $scope.cnt = 4;
    $window.onfocus = function () { }


    $window.onblur = function () {
        $scope.cnt--;
        // console.log("Blur", $scope.cnt);
        if ($scope.cnt > 0) {
            // toastr.error("Don't open new tab OtherWise test Automatically close:");
        }
        if ($scope.cnt === 0) {
            // console.log("Blur cnt is 0");
            $scope.counter = 0;
            $scope.min = 0;
            $state.go("finish");
        }
    }

    var id = $stateParams.id;

    $scope.checked = false;
    $scope.que = [];
    $scope.test=[]
    $scope.wrongQue = [];
    $scope.questionText;
    $scope.newtest;
    $scope.multipleRes;
    $scope.singleRes;
    console.log("id:::::::::::::", id);
    $scope.question = [];
    $scope.options = [];
    $scope.userOptionArra = [];
    $scope.i = 1;
    $scope.correctAns = 0;
    $scope.wrongAns =0;
    $scope.counter=60 ;
    $scope.min;
  

    $http.get("http://localhost:4000/listtestpublish").then(function (res) {
        console.log("within get of test", res);


        for (let i = 0; i < res.data.result.length; i++) {
            // console.log("Test id:", res.data.result[i]._id);
            // console.log("requested Id:", id);
            if ((res.data.result[i]._id.toString()) === id) {
                // console.log("id is same", res.data.result[i].name);
                $scope.testname = res.data.result[i].name;
                $scope.test.push(res.data.result[i]);
                for (let j = 0; j < res.data.result[i].questions.length; j++) {
                    $scope.question.push(res.data.result[i].questions[j]);
                    $scope.min=$scope.test[0].duration-1;

                }
                // console.log("questions are", $scope.question);
            }
            else {
                console.log("Not same id");
            }

        }





        $scope.questionText = $scope.question[0].question.queText;
        // console.log("question=>", $scope.questionText);

        if ($scope.question[0].question.type === "multipleResponse") {
            $scope.multipleRes = true;
         }
        else {
            // console.log("WIRHIN WLSE BLOCK");
            $scope.multipleRes = false;

        }
        // console.log("===================>", $scope.multipleRes);
        // console.log("--------->", $scope.que);
        // console.log("Result::::::::::::", $scope.userOptionArra);
        // console.log("=========>>>>>>>", $scope.question[0].question.option);
        for (let k = 0; k < $scope.question[0].question.option.length; k++) {
            $scope.options.push($scope.question[0].question.option[k]);
        }
        // console.log("options=>", $scope.options);

    })
  
    var increaseCounter = function () {
        $scope.counter = $scope.counter - 1;
        localStorage.setItem("counter", $scope.counter);
        if ($scope.counter == 0) {
            $scope.counter = 60;
            $scope.min = $scope.min - 1;
            localStorage.setItem("min", $scope.min);
            if ($scope.min == 5) {
                toastr.error("Only 5min remaining");
            }
            if ($scope.min == 0) {
                $state.go("finish");
            }
            if ($scope.min < 0) {
                $state.go("finish");
            }
        }

    }
    $interval(increaseCounter, 1000);
    //====finish timmer func===//
    if(localStorage.getItem("counter")){
        if(localStorage.getItem("min")){
          $scope.counter = $scope.counter - 1;
        if(localStorage.getItem("counter") == 0){
          $scope.counter = 60;
          $scope.min = $scope.min - 1;
        }else{
          $scope.counter = localStorage.getItem("counter");
         $scope.min=localStorage.getItem("min");
        }
      }
      }









    $scope.next = function (i) {
        $scope.count = 0;
        $scope.checked = false;
    //     console.log("value of i==>", i);
    //    console.log("here is correct options",$scope.question[i - 1].question.correctAns);
    //    console.log("userarray:",$scope.userOptionArra);
        if ($scope.userOptionArra.length === $scope.question[i - 1].question.correctAns.length) {
            for (let j = 0; j < $scope.question[i - 1].question.correctAns.length; j++) {

                // console.log("Length is same");
                for (let k = 0; k < $scope.userOptionArra.length; k++) {
                    // console.log("corr options are", $scope.question[i - 1].question.correctAns[j]);
                    if ($scope.question[i - 1].question.correctAns[j] === $scope.userOptionArra[k]) {
                        $scope.count++;
                        //  console.log("Count==>", $scope.count);

                    }

                }
            }
            if ($scope.count === $scope.question[i - 1].question.correctAns.length) {
                $scope.que.push($scope.question[i - 1].question.queText);
                $scope.correctAns++;
            }
            else {
                // console.log("WRONG Marks ",$scope.question[i - 1].wrongmarks);
                $scope.test[0].totalmarks=$scope.test[0].totalmarks-$scope.question[i - 1].wrongmarks;
                // console.log("TOtla markssss",$scope.question[i - 1],"====",$scope.test[0].totalmarks);
                $scope.wrongQue.push($scope.question[i - 1].question.queText);
                $scope.wrongAns++;

            }
            //  console.log("Wrong question:::", $scope.wrongQue);
            //  console.log("Correct question:::", $scope.que)
        }
        else {

            /////---Redioooo---//
            // console.log("within else block data is",$scope.data);
            // console.log("DATA:",$scope.question[i - 1].question.correctAns);
            if ($scope.question[i - 1].question.correctAns == $scope.data) {
                $scope.que.push($scope.question[i - 1].question.queText);
                $scope.correctAns++;

            }
            else {
                // console.log("WRONG Marks ",$scope.question[i - 1].wrongmarks);
               $scope.test[0].totalmarks=$scope.test[0].totalmarks-$scope.question[i - 1].wrongmarks;
                // console.log("TOtla markssss",$scope.question[i - 1],"====",$scope.test[0].totalmarks);
                $scope.wrongQue.push($scope.question[i - 1].question.queText);
                $scope.wrongAns++;

            }
          
        }
        $scope.i++;
        console.log("within next Function", $scope.i);
        if ($scope.i <= $scope.question.length) {
            $scope.questionText = $scope.question[i].question.queText;
            // console.log($scope.questionText);
            // console.log("==========>fggfg", $scope.question[i].question.correctAns.length);

            if ($scope.question[i].question.type === "multipleResponse") {
                // console.log("Mutiple res type");
                $scope.multipleRes = true;

            }
            else {
                // console.log("WIRHIN WLSE BLOCK");
                $scope.multipleRes = false;

            }
            $scope.options = [];
            for (let k = 0; k < $scope.question[i].question.option.length; k++) {
                $scope.options.push($scope.question[i].question.option[k]);
            }
        }


        else {
            // console.log("question over:");
            $scope.counter = 0;
            $scope.min = 0;
            $scope.cnt = 2;
            $state.go("finish");
        }
       
        console.log("Questions are Hereeeeeeeeeeeeeeeeeeee", $scope.question.length);
        console.log("Questions are Hereeeeeeeeeeeeeeeeeeee", $scope.correctAns);
        // //$scope.wrongAns = $scope.question.length - $scope.correctAns;
        // //console.log("Wrong Answers:::::", $scope.wrongAns);
       window.localStorage.setItem('correct', $scope.correctAns);
        window.localStorage.setItem('wrong', $scope.wrongAns);
        // window.localStorage.setItem('totque', $scope.question.length);
        // window.localStorage.setItem('totalmarks',$scope.test[0].totalmarks);
        // window.localStorage.setItem('testName', $scope.testname);
        window.localStorage.setItem('que', $scope.que);
        window.localStorage.setItem('wrongQue', $scope.wrongQue);
        console.log("here is total marks::",$scope.test[0].totalmarks);
        window.localStorage.setItem('totalmarks',$scope.test[0].totalmarks);
        window.localStorage.setItem('passing',$scope.test[0].passingscore);
          console.log("Wrong question::::::::::::::", $scope.wrongQue);
             console.log("Correct question::::::::::::::", $scope.que)
       // console.log("here is total marks::",$scope.test[0]._id);
        // $http.put('http://localhost:4000/updatetotal/' + $scope.test[0]._id, $scope.test[0].totalmarks).then(function(res){
        //     console.log("Within Put FUnction",res);
        // })
       

    }

    $scope.data;
    $scope.check = function (event, i) {
        // console.log("Event", event.target.checked);

        // console.log("choicessssss", i);
        if (event.target.checked == true) {
            $scope.data = i;
            $scope.checked = true;
        }
        else {
            //  $scope.data.splice(i, 1);
            console.log($scope.data);
        }

        // console.log("Result:", $scope.data);
    }
    $scope.checkoptions = function (event, i) {
        // console.log("Event", event.target.checked);

        // console.log("choicessssss", i);
        if (event.target.checked == true) {
            $scope.userOptionArra.push(i)
            $scope.checked = true;
        }
        else {
            $scope.userOptionArra.splice(i, 1);
            console.log($scope.userOptionArra);
        }

        console.log("Result:", $scope.userOptionArra);
    }
   
  

}


