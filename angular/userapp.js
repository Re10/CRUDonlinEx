
var imgFile;

var application = angular.module("myApplication", ['ngMaterial', 'ngMessages', 'material.svgAssetsCache','ui.router']).config(($stateProvider, $httpProvider, $urlRouterProvider) => {
    //$qProvider.errorOnUnhandledRejections(false); ['ngMaterial', 'ngMessages', 'material.svgAssetsCache']
    $stateProvider.state("login", {
            url: "/login:id",
            templateUrl: "login.html",
            controller: "loginController",
            controllerAs: "loginCtrl"
        })
        .state("listtest", {
            url: "/listtest",
            templateUrl: "listtest.html",
            controller: "listtestController",
            controllerAs: "listtestctrl",
             resolve: {
            authRouth: ['authoService', '$state', function (authoService, $state) {
                if (authoService.auth()) {
                    return true;
                }
                else {
                    $state.go('login');
                    return false;
                }
            }]
        }
        })
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
// function FileUpload(event) {
//     console.log(event);
//     uploadFile = event.target.files[0];
//     console.log("file:", uploadFile);
// }
 