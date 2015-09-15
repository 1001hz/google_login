(function () {

    'use strict';

    angular
        .module('app.google')
        .directive('googleSignout', googleSignout);

    googleSignout.$inject = ['GoogleSrv', '$rootScope', 'AUTH_EVENTS'];

    function googleSignout(GoogleSrv, $rootScope, AUTH_EVENTS) {
        return {
            restrict: 'A',
            link: link
        }

        function link(scope, elem, attrs) {

            elem.on('click', logOut);

            function logOut() {
                GoogleSrv.signOut(function (success) {
                    if (success) {
                        scope.$apply(function(){
                            $rootScope.$broadcast(AUTH_EVENTS.logOutSuccess, { user: null });
                        });
                    }
                });
            }

        }

    }
})();