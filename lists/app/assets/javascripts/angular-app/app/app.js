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
      .state('lists.index',{
        url: '/lists',
        templateUrl: 'lists/index.html',
        resolve: {
          lists: function(ListService,$state){
            return ListService.getLists().then(function(resp){
              if (resp.data.error){
                if (!resp.data.error.match('Could not validate server session')){
                  alert("An error occured: " + resp.data.error);

                } else {
                  $state.go('sessions.new');
                }
      
                return [];

              } else {
                return resp.data;
              }
            });
          }
        }
      })
      .state('lists.new',{
        url: '/lists/new',
        controller: 'ListsCrudController as ctrl',
        templateUrl: 'lists/_form.html',
        resolve: {
          list: function(ListService){
            return {};
          }
        }
      })
      .state('lists.show',{
        url: '/lists/:id',
        controller: 'ListsShowController as ctrl',
        templateUrl: 'lists/show.html',
        resolve: {
          list: function($stateParams,ListService,$state){
            return ListService.getList($stateParams.id).then(function(resp){
              if (resp.data.error){
                if (!resp.data.error.match('Could not validate server session')){
                  alert("An error occured: " + resp.data.error);

                } else {
                  $state.go('sessions.new');    
                }            

                return {};

              } else {
                return resp.data;
              }
            });
          }
        }
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
