angular
  .module('app',['ui.router','templates','ngMessages'])
  .config(['$stateProvider', '$urlRouterProvider',function($stateProvider,$urlRouterProvider){
    $stateProvider

    ///////* LISTS *///////
      .state('lists',{
        abstract: true,
        url: '',
        template: '<div ui-view></div>'
      })

    ///////* SESSIONS *///////

      .state('sessions',{
        abstract: true,
        url: '',
        template: '<div ui-view></div>'
      })
      .state('sessions.new',{
        url: '/login',
        templateUrl: 'sessions/new.html',
        controller: 'SessionsController as ctrl'
      });

    $urlRouterProvider.otherwise('/lists');
  }])

  ///////* RUN *///////

  // http://stackoverflow.com/questions/27212182/angularjs-ui-router-how-to-redirect-to-login-page
  .run(function($rootScope, $location, $state, $window, Auth) {

      $rootScope.$on('$stateChangeStart', function(e, toState, toParams, fromState, fromParams) {

          var isLogin = toState.name === "sessions.new";
          if(isLogin){
            return; // no need to redirect 
          }

          // now, redirect only not authenticated
          if (!Auth.isLoggedIn() && !$window.localStorage.loggedIn) {
            e.preventDefault(); // stop current execution
            $state.go('sessions.new'); // go to login
          }
      });
  });
