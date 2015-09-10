angular.module('app.google', []);

angular
    .module("app.google")
    .constant('AUTH_EVENTS', {
        notAuthorized: 'not-authorized',
        logInSuccess: 'log-in-success',
        logOutSuccess: 'log-out-success'
    });