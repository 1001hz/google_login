(function () {

    'use strict';

    angular
        .module('app.google')
        .directive('googleSignin', googleSignin);

    googleSignin.$inject = ['GoogleSrv', '$rootScope', 'AUTH_EVENTS'];

    function googleSignin(GoogleSrv, $rootScope, AUTH_EVENTS) {
        return {
            restrict: 'A',
            link: link
        }


        function link(scope, elem, attrs) {
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

                if(elem[0] !== undefined){
                    GoogleSrv.onClick(elem[0]).then(setUser).catch(googleApiButtonBindFailed);
                }
                else{
                    console.error("Can't find login button");
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