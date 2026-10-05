import { defineStore } from 'pinia'


export const useUserStore = defineStore('userStore', {

    state: () => ({
        userData: [],
        currentDisplayedUser: {}
    }),

    getters: {
    },

    actions: {
        setUserData(data) {
            this.userData = data;
        },

        setCurrentDisplayedUser(value) {
            this.currentDisplayedUser = value;
        },

        fetchUserData() {
            const API_URL_USER = "https://jsonplaceholder.typicode.com/users";
            fetch(API_URL_USER)
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`Error in fetching Users: ${response.status}`);
                    }
                    return response.json();
                })
                .then(data => {
                    this.setUserData(data);
                })
                .catch(error => console.log("Error Occured in Users"))
        }
    }
})