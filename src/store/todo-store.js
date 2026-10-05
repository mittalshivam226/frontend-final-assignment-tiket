import { defineStore } from 'pinia'


export const useTodoStore = defineStore('todoStore', {
  state: () => ({
    todoData: [],
    currentDisplayedTodo: {}
  }),

  getters: {
  },

  actions: {
    setTodoData(data) {
      this.todoData = data;
    },

    setCurrentDisplayedTodo(value) {
      this.currentDisplayedTodo = value;
    },

    fetchTodoData() {

      const API_URL_TODOS = "https://jsonplaceholder.typicode.com/todos";
      fetch(API_URL_TODOS)
        .then(response => {
          if (!response.ok) {
            throw new Error(`Error in fetching Todos: ${response.status}`);
          }
          return response.json();
        })
        .then(data => {
          this.setTodoData(data);
        })
        .catch(error => console.log("Error Occured in Todos"))
    }
  }
})