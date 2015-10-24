angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
})

.controller('PlaylistCtrl', function($scope, $stateParams) {
})


.controller('DateCtrl', function($scope, $cordovaSQLite,$filter) {

        $scope.date = {};

        var date = new Date();

        $scope.date.start_date = date;

        $scope.date.end_date = date;

        var db = $cordovaSQLite.openDB({ name: "demo.db" })



        // for opening a background db:
//        var db = $cordovaSQLite.openDB({ name: "myDB.sqlite", bgType: 1 });


        $scope.date_save = function(){


            $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS people (id integer primary key, first_date text, last_date text)").then(function(res) {

                console.log("insertId: " + res.insertId);

            }, function (err) {
                console.error(JSON.stringify(err));
            });;



            var start_date = $scope.date.start_date;

            var _start_date = $filter('date')(start_date,"MM/dd/yyyy");

            console.log("start date in format",_start_date);


            var end_date = $scope.date.end_date;

            var _end_date = $filter('date')(end_date,"MM/dd/yyyy");

            console.log("end date in format",_end_date);


            if(_start_date<=_end_date){

                console.log("true");
            }
            else{
                console.log("false");
            }


                var query = "INSERT INTO people (first_date, last_date) VALUES (?,?)";
                $cordovaSQLite.execute(db, query, [_start_date, _end_date]).then(function(res) {
                    console.log("INSERT ID -> " + res.insertId);
                }, function (err) {
                    console.error(err);
                });




                var query = "SELECT first_date, last_date FROM people";
                $cordovaSQLite.execute(db, query).then(function(res) {
                    if(res.rows.length > 0) {
                        console.log("SELECTED -> " + res.rows.item(0).first_date + " " + res.rows.item(0).last_date);
                    } else {
                        console.log("No results found");
                    }
                }, function (err) {
                    console.error(err);
                });

//            var query = "INSERT INTO student (first_name, last_name) VALUES (?,?)";
//            $cordovaSQLite.execute(db, query, [start_date,start_date]).then(function(res) {
//
//                    console.log("insertId: " + res.insertId);
//
//                }, function (err) {
//                    console.error(JSON.stringify(err));
//                });


        }


});