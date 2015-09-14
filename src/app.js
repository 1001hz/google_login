(function () {

    'use strict';

    angular.module('app', ['app.google']);

    angular
        .module("app")
        .config(['GoogleSrvProvider', function (GoogleSrvProvider) {
            GoogleSrvProvider.setClientId("533519621566-g873o4k46kkcmsmoci6n9a72obsuqm15");
        }]);

    angular
        .module("app")
        .controller("testController", testController);

    testController.$inject = ["$rootScope","AUTH_EVENTS"];

    function testController($rootScope, AUTH_EVENTS){
        var vm = this;
        vm.user = null;

        $rootScope.$on(AUTH_EVENTS.logInSuccess, setUser);

        function setUser(event, args){
            vm.user = args.user;
        }
    }

})();