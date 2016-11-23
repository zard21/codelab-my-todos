angular.module('mytodos.todo-data', [])
.factory('TodoData', function() {
  var todos = angular.fromJson(window.localStorage['todos'] || '[]');

  function saveToStorage() {
    window.localStorage['todos'] = angular.toJson(todos);
  }

  return {
    getList: function() {
      return todos;
    },
    get: function(todoId) {
      for (var i = 0; i < todos.length; i++) {
        if (todos[i].id === todoId) {
          return todos[i];
        }
      }
      return undefined;
    },
    insert: function(todo) {
      todos.push(todo);
      saveToStorage();
    },
    update: function(todo) {
      for (var i = 0; i < todos.length; i++) {
        if (todos[i].id === todo.id) {
          todos[i] = todo;
          saveToStorage();
          return;
        }
      }
    },
    delete: function(todoId) {
      for (var i = 0; i < todos.length; i++) {
        if (todos[i].id === todoId) {
          todos.splice(i, 1);
          saveToStorage();
          return;
        }
      }
    },
    doReorder: function(todo, fromIndex, toIndex) {
      todos.splice(fromIndex, 1);
      todos.splice(toIndex, 0, todo);
      saveToStorage();
    }
  }
});
