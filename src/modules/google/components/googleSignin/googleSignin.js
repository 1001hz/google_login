(function () {

    'use strict';

    angular
        .module('app.google')
        .directive('googleSignin', googleSignin);

    googleSignin.$inject = ['GoogleSrv', '$rootScope', 'AUTH_EVENTS'];

    function googleSignin(GoogleSrv, $rootScope, AUTH_EVENTS) {
        return {
            restrict: 'E',
            template:'<div class="btn-group" role="group"><button type="button" class="btn btn-default google-group-btn"><i class="fa fa-google"></i></button> <button type="button" class="btn btn-default google-group-btn" id="googleBtn">Sign in with Google</button><span data-ng-if="loading"><loader loading="loading"></loader></span></div>',
            replace: true,
            transclude: false,
            link: link
        }


        function link(scope, element, attrs) {
            scope.loading = false;
            GoogleSrv.loadAuth().then(googleApiLoaded).catch(googleApiFailedToLoad);

            function googleApiLoaded() {

                GoogleSrv.signedIn().then(function (val) {
                    if (val) {
                        scope.loading = true;
                        GoogleSrv.getCurrentUser(function (googleUser) {
                            setUser(googleUser);
                        });
                    }
                }).catch(googleApiSignedInCheckFailed);

                var buttonId = attrs.buttonId;
                if (document.getElementById(buttonId) !== undefined) {
                    GoogleSrv.onClick(buttonId).then(setUser).catch(googleApiButtonBindFailed);
                }

            }

            function setUser(googleUser) {
                scope.loading = true;
                var profile = googleUser.getBasicProfile();
                var user = {
                    id: profile.getId(),
                    name: profile.getName(),
                    imageUrl: profile.getImageUrl(),
                    email: profile.getEmail(),
                    idToken: googleUser.getAuthResponse().id_token
                }

                scope.loading = false;
                $rootScope.$broadcast(AUTH_EVENTS.logInSuccess, {user: user});
            }


            function googleApiFailedToLoad(error){
                console.error(error);
            }

            function googleApiSignedInCheckFailed(error){
                console.error(error);
            }

            function googleApiButtonBindFailed(error){
                console.error(error);
            }


        }

    }
})();