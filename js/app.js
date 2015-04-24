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

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'ngCordova', 'pascalprecht.translate', 'toaster', 'ngAnimate'])

.run(function($ionicPlatform,$rootScope, $location, Data) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }     
      
      

  });
})

.config(function($translateProvider) {
        $translateProvider.translations('en', translations_en);
        $translateProvider.translations('es', translations_es);
        $translateProvider.preferredLanguage('en');
        // console.log("$translateProvider initialized");
    })

.config(function($httpProvider){
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
})



.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

  .state('app', {
    url: "/app",
    abstract: true,
    templateUrl: "templates/menu.html",
    controller: 'AppCtrl'
  })
  

  .state('app.knowledgeBase', {
    url: "/knowledgeBase",
    views: {
      'menuContent': {
        templateUrl: "templates/knowledgeBase.html",
          controller: 'KnowledgeCtrl'
      }
    }
  })
  
  .state('app.setup', {
    url: "/setup",
    views: {
      'menuContent': {
        templateUrl: "templates/settings.html",
          controller: 'SettingsCtrl'
      }
    }
  })
  

    .state('app.alert', {
      url: "/alerts",
      views: {
        'menuContent': {
          templateUrl: "templates/alerts.html",
          controller: 'HomeCtrl'
        }
      }
    })
  
  
 .state('app.alert-details', {
      url: '/alerts/:alertId',
      views: {
        'tab-chats': {
          templateUrl: 'templates/alert-details.html',
          controller: 'AlertCtrl'
        }
      }
    })
  
 .state('app.changeLanguage', {
      url: '/changeLang',
      views: {
        'menuContent': {
          templateUrl: 'templates/changeLanguage.html'
        }
      }
    })
  
 .state('app.subs', {
      url: "/subs",
      views: {
        'menuContent': {
          templateUrl: 'templates/subs.html'
        }
      }
    })
  
  
 .state('app.register', {
      url: '/register',
      views: {
        'menuContent': {
          templateUrl: 'templates/signup.html',
            controller: 'SignUpCtrl'
        }
      }
    });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/alerts');
});
