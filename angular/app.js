
var imgFile;

var app = angular.module("myApp", ['ngMaterial', 'ngMessages', 'material.svgAssetsCache','ui.router']).config(($stateProvider, $httpProvider, $urlRouterProvider) => {
    //$qProvider.errorOnUnhandledRejections(false); ['ngMaterial', 'ngMessages', 'material.svgAssetsCache']
    $stateProvider.state("subject", {
        url: "/subject",
        templateUrl: "subject.html",
        controller: "subjectController",
        controllerAs: 'subjectCtrl'
    }).state("topic", {
            url: "/topic",
            templateUrl: "topic.html",
            controller: "topicController",
            controllerAs: "topicctrl",
        })
        .state("edittopic", {
            url: "/edittopic/:id",
            templateUrl: "edittopic.html",
            controller: "edittopicController",
            controllerAs: "edittopicctrl",
        })
       
        .state("question", {
            url: "/question",
            templateUrl: "question.html",
            controller: "questionController",
            controllerAs: "questionCtrl"
        })
        .state("editque", {
            url: "/editque/:id",
            templateUrl: "editque.html",
            controller: "editqueController",
            controllerAs: "editqueCtrl"
        })
        .state("testtemp", {
            url: "/testtemp",
            templateUrl: "testtemp.html",
            controller: "testtempController",
            controllerAs: "testtempCtrl"
        })
        .state("demo", {
            url: "/demo",
            templateUrl: "demo.html",
            controller: "demoController",
            controllerAs: "demoCtrl"
        })
        .state("edittest", {
            url: "/edittest/:id",
            templateUrl: "edittest.html",
            controller: "edittestController",
            controllerAs: "edittestctrl",
        })
        .state("assigntest", {
            url: "/assigntest",
            templateUrl: "assignTest.html",
            controller: "assigntestController",
            controllerAs: "assigntestctrl",
        })
        // .state("login", {
        //     url: "/login",
        //     templateUrl: "login.html",
        //     controller: "loginController",
        //     controllerAs: "loginCtrl"
        // })
        // .state("listtest", {
        //     url: "/listtest",
        //     templateUrl: "listtest.html",
        //     controller: "listtestController",
        //     controllerAs: "listtestctrl",
        //      resolve: {
        //     authRouth: ['authoService', '$state', function (authoService, $state) {
        //         if (authoService.auth()) {
        //             return true;
        //         }
        //         else {
        //             $state.go('login');
        //             return false;
        //         }
        //     }]
        // }
        // })
        .state("test", {
            url: "/test/:id",
            templateUrl: "test.html",
            controller: "testController",
            controllerAs: 'testCtrl'
        })
        .state("finish",{
            url:"/finish",
            templateUrl:"finish.html",
            controller:"finishController",
            controllerAs:"finishCtrl",
           
        })
        //.state("forgot", {
        //     url: "/forgot/:id",
        //     templateUrl: "forgotpass.html",
        //     controller: "forgotController",
        //     controllerAs: "forgotCtrl"
        // })
});
function FileUpload(event) {
    console.log(event);
    uploadFile = event.target.files[0];
    console.log("file:", uploadFile);
}
 