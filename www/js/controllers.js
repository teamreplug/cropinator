/**
   Copyright 2015 Landmark Replug Team

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.

**/
angular.module('starter.controllers', ['toaster'])

.factory("Data", ['$http', 'toaster',
    function ($http, toaster) { // This service connects to REST API

        var serviceBase = 'http://api.botmotion.net/replug/cropinator/v1/';

        var obj = {};
        obj.toast = function (data) {
            toaster.pop(data.status, "", data.message, 10000, 'trustedHtml');
        }
        obj.get = function (q) {
            return $http.get(serviceBase + q).then(function (results) {
                return results.data;
            });
        };
        obj.post = function (q, object) {
            return $http.post(serviceBase + q, object).then(function (results) {
                return results.data;
            });
        };
        obj.put = function (q, object) {
            return $http.put(serviceBase + q, object).then(function (results) {
                return results.data;
            });
        };
        obj.delete = function (q) {
            return $http.delete(serviceBase + q).then(function (results) {
                return results.data;
            });
        };

        return obj;
}])

    .factory('knowledgeBase', function($http) {
        var baseRes = [];

        return {
            all: function(callback) {
                $http.get('server/knowledgeBase.json').success(
                    function(data) {
                        baseRes = data;
                        callback(data);
                    }
                );
            },
            get: function(resId) {
                console.log('resService get ' + resId);
                return baseRes[Res - 1];
            }
        }
    })


.controller('AppCtrl', function($rootScope, $scope, $ionicModal, $http, $location, $timeout, toaster, Data, $ionicActionSheet, $ionicPopup) {
 //GUEST MENU
    $scope.guest = true;
    $scope.user = false;
             $scope.language = "Language";
             $scope.search = 'Knowledge Base';
             $scope.cancel= 'Cancel';
             $scope.About= 'About';
             $scope.Home= 'Alerts';
             $scope.login= 'Sign In';
             $scope.SignIn= 'Sign In';
             $scope.SignUp= 'Sign Up';
             $scope.SETTINGS = 'SETTINGS';
             $scope.Settings = 'Settings';
             $scope.Help= 'Help';
             $scope.Menu = 'Menu';
             $scope.Alerts = 'Alerts';
             $scope.MORE = 'MORE';
             $scope.KnowledgeBase = 'Knowledge Base';
             $scope.Profile = 'Profile';
             $scope.Subscriptions = 'Subscriptions';
             $scope.Diagnoses = 'Diagnoses';
             $scope.AlertNotification = 'Alert Notification';
             $scope.GetalertsviaSMS = 'Get alerts via SMS';
    
    
        Data.get('session').then(function (results) {
            if (results.uid != "" ) {
                $rootScope.authenticated = true;
                $rootScope.uid = results.uid;
                $rootScope.othername = results.othername;
                $rootScope.surname = results.surname;
                $rootScope.username = results.username;
                $rootScope.phone = results.phone;
                $rootScope.country = results.country;
                $rootScope.email = results.email;
                $scope.guest = false;
                $scope.user = true;
            }else{
                $rootScope.authenticated = false;
            }
        });
  /** POP UP (Modals) declarations **/
    
  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/modalLogin.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.login_modal = modal;
  });
    
    
  // Create the post alert modal
  $ionicModal.fromTemplateUrl('templates/create.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.post_modal = modal;
  });
    
     $ionicModal.fromTemplateUrl('templates/addDiagnose.html', {
        scope: $scope
        }).then(function(modal) {
        $scope.diagnosis_modal = modal;
        });

    
    // Create the about alert modal
  $ionicModal.fromTemplateUrl('templates/about.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.about_modal = modal;
  });


  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.errState = false;
    $scope.form = true;
    $scope.login_modal.hide();
  };

    
  $scope.closeAddPost = function() {
    $scope.post_modal.hide();
  };
    
  $scope.closeAbout = function() {
    $scope.about_modal.hide();
  };
    
  $scope.closeDiagnosis = function() {
    $scope.diagnosis_modal.hide();
    $scope.diaLoader = false;
  };

  /**Writing functions in angularJS **/
  // Open the login modal
  $scope.login = function() {
    $scope.login_modal.show();
      $scope.pwd = false;
      $scope.logIn = true;
      $scope.forgotPwd = function() {
          $scope.pwd = true;
          $scope.logIn = false;
      }
      $scope.newLogin = function() {
          $scope.pwd = false;
          $scope.logIn = true;
          $scope.guest = true;
          $scope.user = false;
      }
      
  };
    
    
  // Open the post alert modal
  $scope.addPost = function() {
    $scope.post_modal.show();
  };
  $scope.showAddDiagnose = function() {
    $scope.diagnosis_modal.show();
  };  
    
  // Open the about modal
  $scope.showAbout = function() {
    $scope.about_modal.show();
  };  
    
 $scope.form = true;
  // Perform the login action when the user submits the login form
  $scope.doLogin = function(user) {
      
 $scope.guest = true;
  $scope.user = false;
  $scope.form = false;
  $scope.loader = true;
      //POST
        $timeout(function() {    
    
      $http.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";
      $scope.user = {username: '', password: ''};
      Data.post('login', {
            user: user
        }).then(function (results) {
            Data.toast(results);
            if (results.status == "success") {
                $scope.loader = false; 
                $scope.errState = true;
                $scope.errMsg = results.message;
                $scope.uid = results.uid;
                $scope.form = true;
                $scope.closeLogin();
                $scope.errState = false;
                $scope.guest = false;
                $scope.user = true;
                
                
            }else{
                  $scope.loader = false; 
                  $scope.errState = true;
                  $scope.errMsg = results.message;
                  $scope.guest = true;
                  $scope.user = false;
                $scope.tryAgain = function(){
                    $scope.errState = false;
                    $scope.form = true;
            }
            }
        });
      $scope.loader = false; 
      $scope.errState = true;
      $scope.errMsg = "Sorry, The Connection timed out as it could not be established, Please check mobile network";
      $scope.guest = true;
      $scope.user = false; 
        
      $scope.tryAgain = function(){          
      $scope.errState = false;
      $scope.form = true;    
            }
    }, 10000);
  };


    $scope.logOut = function(){
        Data.get('logout').then(function (results) {
            Data.toast(results);
            if (results.status == "info") {
                $scope.loader = false;
                alert(results.message);
                $scope.guest = true;
                $scope.user = false;
                
            }
        });
        
    };
    
    
        $scope.shareVia = function(){
     $ionicActionSheet.show({
      titleText: 'Share via',
      buttons: [
        { text: '<i class="icon ion-email"></i> Email' },
        { text: '<i class="icon ion-email-unread"></i> SMS' },
        { text: '<i class="icon ion-social-facebook"></i> Facebook' },
        { text: '<i class="icon ion-social-twitter"></i> Twitter' },
        { text: '<i class="icon ion-social-instagram"></i> Instagram' },
      ],
    })
     
};
    
 // watch confirm dialog
 $scope.watchConfirm = function() {
   var confirmPopup = $ionicPopup.confirm({
     title: 'Start Watching Post?',
     template: 'Are you sure you want to watch? You must upgrade to premium to receive sms alerts'
   });
   confirmPopup.then(function(res) {
     if(res) {
       alert("Alert watch successful");
     }
   });
 };
    
 // location based alert dialog
 $scope.locationConfirm = function() {
   var confirmPopup = $ionicPopup.confirm({
     title: 'Alerts based in location?',
     template: 'You can also receive SMS alerts based on this locations. Do you want to do this?'
   });
   confirmPopup.then(function(res) {
     if(res) {
       alert("alert based in kaduna watch was successful");
     }
   });
 };

})

.controller('HomeCtrl', function($scope, $http, $translate, $timeout) {
    $scope.curlang = $translate.use();
    $scope.Alerts = [];
    $scope.loading = true;
     $timeout(function() {
    return $http.get('server/alerts.json', { params: { "callback": ""} }).
    success(function(data, status, headers, config) {
      $scope.Alerts = data;
        $scope.loading = false;
    }).
    error(function(data, status, headers, config) {
       console.error("Error while fetching data");
        alert('Error while fetching data');
       $scope.loading = false;
    });
        }, 3500);  
    
     $scope.doRefresh = function() {
         $scope.showRefStat = true;
         $scope.refMsg = "Fetching alert updates...";
    $timeout( function() {
      //simulate async response

      //Stop the ion-refresher from spinning
      $scope.$broadcast('scroll.refreshComplete');
      $scope.showRefStat = false;
    }, 1000);
      
  };
     
})




.controller('addDiagnosis', function($scope, $timeout) {
    $scope.diaForm = true;
    $scope.diaLoader = false;
    $scope.errState = false;
    
    $scope.postDia =function(){
    $scope.diaForm = false;
    $scope.diaLoader = true;
     $timeout(function() {   
    $scope.closeDiagnosis();
        
    }, 5000);
    
}
})
    


.controller('AlertCtrl', function($scope, $stateParams, Alert, $http, $ionicActionSheet, $timeout) {

    $scope.Alerts = [];
    $scope.loading = true;
    return $http.get('server/alerts.json', { params: { "callback": ""} }).
    success(function(data, status, headers, config) {
      $scope.Alerts = data;
        $scope.loading = false;
    }).
    error(function(data, status, headers, config) {
       console.error("Error while fetching data");
        alert('Error while fetching data');
       $scope.loading = false;
    });
    

})


.controller('alertPostCtrl', function($scope, $cordovaCamera, $cordovaFile, $ionicActionSheet, $ionicPopup, $filter, $translate, $http, Data) {
    $scope.curlang = $translate.use();
    $scope.showImgSheet = function() {
      // 1
    $scope.images = [];

    $ionicActionSheet.show({
      titleText: 'Image Source',
      buttons: [
        { text: '<i class="icon ion-camera"></i> Camera' },
        { text: '<i class="icon ion-folder"></i> Folder' },
      ],
      destructiveText: 'Close',
      buttonClicked: function(index) {
          if(index==0){
        // 2
        var options = {
            destinationType : Camera.DestinationType.FILE_URI,
            sourceType : Camera.PictureSourceType.CAMERA,
            allowEdit : false,
            encodingType: Camera.EncodingType.JPEG,
            popoverOptions: CameraPopoverOptions,
        };
          }else if(index==1){
              
            var options = {
            destinationType : Camera.DestinationType.FILE_URI,
            sourceType : Camera.PictureSourceType.PHOTOLIBRARY,
            allowEdit : false,
            encodingType: Camera.EncodingType.JPEG,
            popoverOptions: CameraPopoverOptions,
        };
          }
    
        // 3
        $cordovaCamera.getPicture(options).then(function(imageData) {

            // 4
            onImageSuccess(imageData);

            function onImageSuccess(fileURI) {
                createFileEntry(fileURI);
            }

            function createFileEntry(fileURI) {
                window.resolveLocalFileSystemURL(fileURI, copyFile, fail);
            }

            // 5
            function copyFile(fileEntry) {
                var name = fileEntry.fullPath.substr(fileEntry.fullPath.lastIndexOf('/') + 1);
                var newName = makeid() + name;

                window.resolveLocalFileSystemURL(cordova.file.dataDirectory, function(fileSystem2) {
                    fileEntry.copyTo(
                        fileSystem2,
                        newName,
                        onCopySuccess,
                        fail
                    );
                },
                fail);
            }

            // 6
            function onCopySuccess(entry) {
                $scope.$apply(function () {
                    $scope.images.push(entry.nativeURL);
                });
            }

            function fail(error) {
                console.log("fail: " + error.code);
            }

            function makeid() {
                var text = "";
                var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

                for (var i=0; i < 5; i++) {
                    text += possible.charAt(Math.floor(Math.random() * possible.length));
                }
                return text;
            }

        }, function(err) {
            console.log(err);
        });
    

        return true;
      },
      destructiveButtonClicked: function() {
        console.log('DESTRUCT');
        return true;
      }
    });
  };
  

    $scope.urlForImage = function(imageName) {
        var name = imageName.substr(imageName.lastIndexOf('/') + 1);
        var trueOrigin = cordova.file.dataDirectory + name;
        return trueOrigin;
    }
    
    $scope.postForm = true;
    $scope.postAlert = function(alert){
    $http.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";
      $scope.alert = {alert: {title:'',description:'',startDate:'',areaAffected:'', uid:'', tag: '', image: '', location: '', smsAlert: '', emailAlert: '' }};
      Data.post('postAlert', {
            alert: alert
        }).then(function (results) {
            Data.toast(results);
            if (results.status == "success") {
                $scope.postForm = false;
                $scope.postLoader = false;
                alert(results.message);
                $scope.closeAddPost();
            }else{
                  $scope.postForm = false;
                  $scope.postLoader = true;
                  $scope.errState = true;
                  $scope.errMsg = results.message;
                  
                $scope.tryAgain = function(){
                    
                    $scope.errState = false;
                    $scope.postForm = true;  
            }
            }
        });
        
    };
    
})

.controller('SettingsCtrl', function($scope, $translate) {
            
            $scope.langTrans = function(key){
                
            
         
         if(key == "en"){
             
             $scope.language = 'Language';
             $scope.search = 'Knowledge Base';
             $scope.cancel = 'Cancel';
             $scope.About = 'About';
             $scope.Home = 'Alerts';
             $scope.login = 'Sign In';
             $scope.SignIn = 'Sign In';
             $scope.SignUp = 'Sign Up';
             $scope.SETTINGS = 'SETTINGS';
             $scope.Settings = 'SETTINGS';
             $scope.Help = 'Help';
             $scope.Menu = 'Menu';
             $scope.Alerts = 'Alerts';
              $scope.MORE = 'MORE';
              $scope.KnowledgeBase = 'Knowledge Base';
             $scope.Profile = 'Profile';
             $scope.Diagnoses = 'Diagnoses';
             $scope.AlertNotification = 'Alert Notification';
             $scope.GetalertsviaSMS = 'Get alerts via SMS';
             
             
         }
         else if(key == "yr"){
             $scope.language = 'Ede';
                $scope.search = 'àwárí';
                $scope.cancel = 'fagile';
                $scope.About = 'nípa';
                $scope.home = 'ibẹrẹ';
                $scope.login = 'wo ile';
                $scope.SignIn = 'wọle';
                $scope.SignUp = 'forúkọ sílẹ';
                $scope.SETTINGS = 'aṣayan';
                $scope.Settings = 'aṣayan';
                $scope.Help= 'Ìrànlọwọ';
                $scope.Menu = 'akojọ';
                $scope.Alerts = 'titaniji';
                $scope.MORE = 'PUPO';
                $scope.KnowledgeBase = 'Iwe Ifilelẹ';
             $scope.Profile = 'Nipa Emi';
             $scope.Diagnoses = 'ni arowoto';
             $scope.AlertNotification = 'ipe iwifunni';
             $scope.GetalertsviaSMS = 'Gba ipe SMS';
             
             
         }
        else if(key == "ha"){
    $scope.language = 'harshe';    
    $scope.search = 'Bincike',
	$scope.cancel= 'soke';
	$scope.About=   'game da';
	$scope.Home=   'Home';
	$scope.Login=   'shiga';
	$scope.SignIn= 'shiga';
	$scope.SignUp= 'rajista';
	$scope.SETTINGS= 'zažužžukan';
	$scope.Settings= 'zažužžukan';
	$scope.Help= 'taimako';
            $scope.menu = 'Menu';
            $scope.Alerts = 'fdkw';
            $scope.MORE = 'KARA';
            $scope.KnowledgeBase = 'ilmi Tushe';
            $scope.Profile = 'rabin fuska';
            $scope.Diagnoses = 'magani';
            $scope.AlertNotification = 'kira Sanarwar';
            $scope.GetalertsviaSMS = 'Sami kira daga SMS';
        }
                else if(key == "ib"){
                    
                        $scope.search= 'Search';
                        $scope.cancel= 'Ikagbu';
                        $scope.About = 'Omụma';
                        $scope.home = 'Na-amalite';
                        $scope.login = 'Banye';
                        $scope.SignIn = 'Ndebanye mbata';
                        $scope.SignUp = 'Dekoo aha';
                        $scope.SETTINGS = 'Nhọrọ';
                        $scope.Settings = 'Nhọrọ';
                        $scope.Help = 'Enyemaka';
                        $scope.language = 'Asụsụ'; 
                        $scope.menu = 'NchNhr';
                        $scope.Alerts = 'mata';
                        $scope.MORE = 'ỌZỌ';
                        $scope.KnowledgeBase = 'ihe ọmụma isi';
                        $scope.Profile = 'Profaịlụ';
                        $scope.Diagnoses = 'Ngwọta';
                    $scope.AlertNotification = 'oku ngosi';
                    $scope.GetalertsviaSMS = 'Anata oku site SMS';
                }
                
                
         
     };
    })

.controller('AboutCtrl', function($scope, $translate) {
    $scope.curlang = $translate.use();
  $scope.aboutApp =
    { appName: 'Cropinator', appVersion: '1.2' };
  $scope.Languages =[
      { id: '1', name: 'English', code: 'en'},
      {id: '2', name: 'Yoruba', code: 'yr'},
      {id: '3', name: 'Igbo', code: 'ib'},
      {id: '4', name: 'Hausa', code: 'ha'},
      {id: '5', name: 'French', code: 'fr'},
      {id: '6', name: 'Spanish', code: 'es'},
      {id: '7', name: 'Italian', code: 'it'}
  ];


})


.controller('KnowledgeCtrl', function($scope, knowledgeBase ) {

        knowledgeBase.all(function(baseRes) {
        $scope.baseRes = baseRes;
        $scope.$apply();
        });

        $scope.clearFilter = function() {
            $scope.searchString = '';
        };
})



.controller('SignUpCtrl', function($scope, $http, $location, toaster, Data){

  $scope.form = true;
  $scope.loader = false;
  $scope.doReg = function(user) {  
      
  $scope.form = false;
  $scope.loader = true;
      //POST
      $http.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";
      $scope.user = {email:'',password:'',name:'',phone:'',address:''};
      Data.post('signUp', {
            user: user
        }).then(function (results) {
            Data.toast(results);
            if (results.status == "success") {
                $scope.guest = false;
                $scope.user = true;
                $location.path('app.alerts');
                $scope.form = false;
                $scope.loader = false;
                $scope.errState = false;
                $scope.succState = true;
                $scope.successMsg = results.message;
            }else{
                  $scope.form = false;
                  $scope.loader = false; 
                  $scope.succState = false;
                  $scope.errState = true;
                  $scope.errMsg = results.message;
                  $scope.guest = true;
                  $scope.user = false;
                  
                $scope.tryAgain = function(){
                    
                    $scope.errState = false;
                    $scope.succState = false;
                    $scope.form = true;
                    $scope.guest = true;
                    $scope.user = false;   
            }
            }
        });
      
    };
    
})



