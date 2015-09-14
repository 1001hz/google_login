(function () {

    'use strict';

    angular
        .module('app.google')
        .provider("GoogleSrv", GoogleSrv);

    function GoogleSrv() {
        var self = this;
        self.auth2 = null;
        self.clientId = null;

        self.setClientId = function (clientId) {
            if (clientId) self.clientId = clientId;
        }

        self.$get = ['$q', function ($q) {
            return {
                loadAuth: function () {
                    var loadDefer = $q.defer();
                    var loadPromise = loadDefer.promise;
                    if (self.auth2 == null) {
                        gapi.load('auth2', function () {
                            // Retrieve the singleton for the GoogleAuth library and set up the client.
                            self.auth2 = gapi.auth2.init({
                                client_id: self.clientId + '.apps.googleusercontent.com',
                                cookiepolicy: 'single_host_origin',
                            });
                            loadDefer.resolve();
                        });
                    }
                    else {
                        loadDefer.resolve();
                    }
                    return loadPromise;
                },
                signedIn: function () {
                    var signedInDefer = $q.defer();
                    var signedInPromise = signedInDefer.promise;
                    self.auth2.isSignedIn.listen(function (val) {
                        signedInDefer.resolve(val);
                    });
                    return signedInPromise;
                },
                onClick: function (elem) {
                    var onClickDefer = $q.defer();
                    var onClickPromise = onClickDefer.promise;
                    self.auth2.attachClickHandler(elem,
                        {},
                        function (googleUser) {
                            onClickDefer.resolve(googleUser);
                        }, function (error) {
                            onClickDefer.reject(error);
                        });
                    return onClickPromise;
                },
                getCurrentUser: function (callback) {
                    var googleUser = self.auth2.currentUser.get();
                    return callback(googleUser);
                },
                signOut: function (callback) {
                    self.auth2.signOut().then(function () {
                        return callback(true);
                    }, function () {
                        return callback(false);
                    });
                }
            };
        }];
    }
})();