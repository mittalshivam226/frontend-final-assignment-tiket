import { defineStore } from 'pinia'


export const usePostStore = defineStore('postStore', {
  state: () => ({
    postData: [],
    currentDisplayedPost: {}
  }),

  getters: {
  },

  actions: {
    setPostData(data) {
      this.postData = data;
    },

    setCurrentDisplayedPost(value) {
      this.currentDisplayedPost = value;
    },

    fetchPostData() {
      const API_URL_POSTS = "https://jsonplaceholder.typicode.com/posts";
      fetch(API_URL_POSTS)
        .then(response => {
          if (!response.ok) {
            throw new Error(`Error in fetching Posts: ${response.status}`);
          }
          return response.json();
        })
        .then(data => {
          this.setPostData(data);
        })
        .catch(error => console.log("Error Occured in Posts"))
    }
  }
})