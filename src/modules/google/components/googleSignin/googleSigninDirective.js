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

            disableButton();

            GoogleSrv.loadAuth()
                .then(googleApiLoaded)
                .catch(googleApiFailedToLoad);


            function googleApiLoaded() {

                enableButton();

                elem.on('click', function(){
                    disableButton();
                });

                GoogleSrv.signedIn()
                    .then(function (val) {
                        if (val) {
                            scope.loading = true;
                            GoogleSrv.getCurrentUser(function (googleUser) {
                                setUser(googleUser);
                            });
                        }
                    })
                    .catch(googleApiSignedInCheckFailed)
                    .finally(enableButton);


                if(elem[0] !== undefined){
                    GoogleSrv.onClick(elem[0])
                        .then(setUser)
                        .catch(googleApiButtonBindFailed)
                        .finally(enableButton);
                }
                else{
                    console.error("Can't find login button");
                }

            }

            function googleApiFailedToLoad(error){
                console.error(error);
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

                $rootScope.$broadcast(AUTH_EVENTS.logInSuccess, {user: user});
            }

            function googleApiButtonBindFailed(error){
                console.error(error);
            }

            function disableButton(){
                elem.prop('disabled',true);
            }

            function enableButton(){
                elem.prop('disabled',false);
            }


            function googleApiSignedInCheckFailed(error){
                console.error(error);
            }




        }

    }
})();