
 
var appLunge = angular.module('appLunge', ['angular-loading-bar','ui.bootstrap','ui.router','appLungeControllers','appLungeDirectives','appLungeFilters','appLungeServices','datatables', 'highcharts-ng','pageslide-directive','ngSanitize', 'ui.select', 'ngStorage','brantwills.paging' ],function($httpProvider) {
 
});


appLunge.config(function($stateProvider, $urlRouterProvider,$httpProvider,$sceProvider) {
  $sceProvider.enabled(false);
 
  //cfpLoadingBarProvider.latencyThreshold = 900;


  // For any unmatched url, redirect to /state1
  $urlRouterProvider.otherwise("/404");

  // Now set up the states
  $httpProvider.defaults.cache = true;
 
  $httpProvider.interceptors.push(function ($q, $rootScope) {
                return {
                    'request': function (config) {
                        $rootScope.$broadcast('loading-started');
                        return config || $q.when(config);
                    },
                    'response': function (response) {
                        $rootScope.$broadcast('loading-complete');
                        return response || $q.when(response);
                    }
                };
            });
            
  $stateProvider
    .state('app',{
      url:"/app",
      cache: false,
      abstract : true,

      resolve: {
            callAppsList: 'callAppsList',
            apps: function(callAppsList ){
              
              var randomString =  function (len, an){
                an = an&&an.toLowerCase();
                var str="", i=0, min=an=="a"?10:0, max=an=="n"?10:62;
                for(;i++<len;){
                  var r = Math.random()*(max-min)+min <<0;
                  str += String.fromCharCode(r+=r>9?r<36?55:61:48);
                }
                return str;
            }
            var random = randomString(3);
              return callAppsList.query({param: random});
            }
      },

      controller:'appsCtrl',
      templateUrl:'static/dashboard/partials/base.html'
    })

    .state('app.appId',{
      url:"/{appId}",
      cache: false,
      abstract:true,

      onEnter: function($stateParams,$state){
        if($stateParams.appId == ''){ $state.transitionTo('notFound')}
      },

      resolve: {
              clientdata: 'clientdata',
              all_list: function(clientdata,$stateParams){

                var randomString =  function (len, an){

                    an = an&&an.toLowerCase();
                    var str="", i=0, min=an=="a"?10:0, max=an=="n"?10:62;
                    for(;i++<len;){
                      var r = Math.random()*(max-min)+min <<0;
                      str += String.fromCharCode(r+=r>9?r<36?55:61:48);
                    }
                    return str;
                }
                  var random = randomString(3);
                return clientdata.query({appid:$stateParams.appId}, random);
              }
        },
     
      controller:'optionsCtrl',
      templateUrl:'static/dashboard/partials/options.html'

    })

    .state('app.appId.setting',{
       url:"/setting",
       cache: false,

         resolve: {
            user_settings: 'user_settings',
            usersetting: function(user_settings){
                var randomString =  function (len, an){
                  an = an&&an.toLowerCase();
                  var str="", i=0, min=an=="a"?10:0, max=an=="n"?10:62;
                  for(;i++<len;){
                    var r = Math.random()*(max-min)+min <<0;
                    str += String.fromCharCode(r+=r>9?r<36?55:61:48);

                  }
                  return str;
                }
              var random = randomString(3);
              return user_settings.query({param: random});

            }
        },
           controller:'settingCtrl',
           templateUrl:'static/dashboard/partials/setting.html'
       })

    .state('app.appId.register',{
        url:"/register",
        
        controller:'registerCtrl',
        templateUrl:'static/dashboard/partials/register.html'
    })

    .state('app.appId.funnel',{
        url:"/funnel",
        
        controller:'funnelCtrl',
        templateUrl:'static/dashboard/partials/funnel.html'
    })

    .state('app.appId.option',{
        url:"/option",
        abstract : true,
        cache: false,

        resolve: {
        callviewList: 'callviewList',
          segments: function(callviewList,$stateParams){

            var randomString =  function (len, an){
                  an = an&&an.toLowerCase();
                  var str="", i=0, min=an=="a"?10:0, max=an=="n"?10:62;
                  for(;i++<len;){
                    var r = Math.random()*(max-min)+min <<0;
                    str += String.fromCharCode(r+=r>9?r<36?55:61:48);

                  }
                  return str;
                }
              var random = randomString(3);

            //console.log(apps)
            return callviewList.query({appid:$stateParams.appId, 'random': random}, 'segment');
          }
        },
        
        controller:'segmentCtrl',
        templateUrl:'static/dashboard/partials/segment.html'
      })

      .state('app.appId.option.uninstalls',{
          url:"/uninstalls",
          cache: false,
          controller:'analyticsCtrl',

          templateUrl:"static/dashboard/partials/uninstall.html"
       })

      .state('app.appId.option.analytics',{
          url:"/analytics",
          controller:'analyticsCtrl',

          templateUrl:'static/dashboard/partials/session.html'

      })

      .state('app.appId.option.competitors',{
          url:"/competitors",
        
          resolve: {
              clientdata: 'clientdata',
              all_list: function(clientdata,$stateParams){

                var randomString =  function (len, an){

                    an = an&&an.toLowerCase();
                    var str="", i=0, min=an=="a"?10:0, max=an=="n"?10:62;
                    for(;i++<len;){
                      var r = Math.random()*(max-min)+min <<0;
                      str += String.fromCharCode(r+=r>9?r<36?55:61:48);
                    }
                    return str;
                }
                  var random = randomString(3);

                return clientdata.query({appid:$stateParams.appId}, random);
              }
          },
               
          controller:'competitorCtrl',
          templateUrl:"static/dashboard/partials/competitors.html",
       })

      

           
        .state('notFound',{
          url:'/404',
          templateUrl: "static/dashboard/partials/404.html",

        })

});


appLunge.config(['cfpLoadingBarProvider', function(cfpLoadingBarProvider) {
    cfpLoadingBarProvider.includeSpinner = false;
    cfpLoadingBarProvider.latencyThreshold = 500;
  }])

