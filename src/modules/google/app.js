angular.module('app.google', []);

angular
    .module("app.google")
    .constant('AUTH_EVENTS', {
        logInSuccess: 'log-in-success',
        logOutSuccess: 'log-out-success'
    });