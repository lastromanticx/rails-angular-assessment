function ListsShowController(list,TaskService,$filter){
  var ctrl = this;

  ctrl.list = new List(list);
  ctrl.allTags = list.all_tags;

  ctrl.list.tasks = ctrl.list.tasks.map(x => new Task(x));

  ctrl.refilterTasks = function(){
    ctrl.list.filteredTasks = $filter('filter')(ctrl.list.tasks,ctrl.search);
  }

  ctrl.refilterTasks();

  ctrl.formData = {task: {status: 'Incomplete', list_id: ctrl.list.id}};
  ctrl.newTask = ctrl.formData.task;

  ctrl.addTask = function(){
    ctrl.newTask.tag_ids = [];

    for (let i in ctrl.newTask.tagIdsObj){
      if (ctrl.newTask.tagIdsObj[i]) {
        ctrl.newTask.tag_ids.push(parseInt(i));
      }
    }

    TaskService.postTask(ctrl.formData).then(function(resp){
      if (resp.data.error){
        alert("An error occured: " + resp.data.error);

      } else {
        ctrl.list.tasks.push(new Task(resp.data));

        // render new tag
        if (ctrl.newTask.tags_attributes && ctrl.newTask.tags_attributes['0'].name.match(/\S/)){
          ctrl.allTags.push(resp.data.tags.splice(-1)[0]);
        }
      }
    });
  }
}

angular
  .module('app')
  .controller('ListsShowController',ListsShowController);
