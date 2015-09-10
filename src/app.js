(function () {

    'use strict';

    angular.module('app', ['app.google']);

    angular
        .module("app")
        .config(['GoogleSrvProvider', function (GoogleSrvProvider) {
            GoogleSrvProvider.setClientId("533519621566-g873o4k46kkcmsmoci6n9a72obsuqm15");
        }]);



})();