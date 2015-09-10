(function () {

    'use strict';

    angular
        .module('app.google')
        .directive('googleSignout', googleSignout);

    googleSignout.$inject = ['GoogleSrv', '$rootScope', 'AUTH_EVENTS'];

    function googleSignout(GoogleSrv, $rootScope, AUTH_EVENTS) {
        return {
            restrict: 'E',
            templateUrl: '/views/googleSignoutDirective.html',
            replace: true,
            link: link
        }


        function link(scope, element, attrs) {

            scope.logOut = logOut;

            GoogleSrv.getCurrentUser(function (googleUser) {
                if (googleUser !== null) {
                    scope.signedIn = true;
                }
                else {
                    scope.signedIn = false;
                }
            });

            function logOut() {
                GoogleSrv.signOut(function (success) {
                    if (success) {
                        $rootScope.$broadcast(AUTH_EVENTS.logOutSuccess, { user: null });
                    }
                });
            }

        }

    }
})();