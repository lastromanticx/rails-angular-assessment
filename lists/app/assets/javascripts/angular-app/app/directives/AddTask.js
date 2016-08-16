function AddTask(){
  return {
    restrict: 'E',
    template:'test'
  };
}

angular
  .module('app')
  .directive('addTask',AddTask);
