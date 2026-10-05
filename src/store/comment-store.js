import { defineStore } from 'pinia'


export const useCommentStore = defineStore('commentStore', {

    state: () => ({
        commentData: [],
        currentDisplayedComment: {}
    }),

    getters: {
    },

    actions: {
        setCommentData(data) {
            this.commentData = data;
        },

        setCurrentDisplayedComment(value) {
            this.currentDisplayedComment = value;
        },

        fetchCommentData() {
            const API_URL_COMMENT = "https://jsonplaceholder.typicode.com/comments";
            fetch(API_URL_COMMENT)
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`Error in fetching Comments: ${response.status}`);
                    }
                    return response.json();
                })
                .then(data => {
                    this.setCommentData(data);
                })
                .catch(error => console.log("Error Occured in Comments"))
        }
    }
})