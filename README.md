# Lists

Lists is an Angular 1.5 web-based application with a Ruby On Rails backend, where users can create and collaborate on task lists. Each list has its own tasks and tasks can be tagged with any of multiple shared tags. Overdue tasks are noted on the list's display page. A search feature allows users to query their tasks. 

I set a Bootstrap theme, Cyborg, to give the app some color and visual organization.

### Models

Perhaps the most interesting is the join table `user_lists`, which allows users to share lists by associating many users with many lists. Aside from `user_id` and `list_id`, a `permission` column enables a differentiation between `creator` and `collaborator` to be used in setting resource access and use policies. Other interesting methods include a `collaborators=` method for the List class, which takes a string of emails as input and sets the list's users array and their permissions; methods that allow to query a user's permission for a list; and the list class `search` method, which queries the user's tasks joined by tags.

I chose to write `policy.rb`, a module in the 'models' folder that implements resource authorization, myself rather than use one of the popular libraries, such as Pundit, to experiment and learn. Including the module in `ApplicationController` allows for controller resource authorization where appropriate.

Like 'collaborators', tags are also set via a custom `tags_attributes=` method for tasks that checks for uniquness and are added to a task through nested checkboxes in the task form. Tags can only be edited or destoyed by admins. The `:admin` role is set via an user's `enum role:` attribute, currently only manually, by another admin, of course!

### Views

### Controllers

### Challenges

### Pleasures

Thanks you for reading! I hope you'll enjoy any time with the applicaton.
