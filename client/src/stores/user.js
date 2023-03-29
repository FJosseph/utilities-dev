import axios from 'axios';
import { defineStore } from 'pinia';

const URL_API = 'http://localhost:3001'

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null,
  }),
  getters: {
    getUser: (state) => state.user,
  },
  actions: {
    async signIn(email, password){
        try {
          const response = await axios.post(`${URL_API}/signin`, {email, password})
          console.log(response.data);
          // localStorage.setItem('userCredentials', JSON.stringify(response))
        } catch (error) {
          console.log(error);
        }
    },
    async signInWithGoogle(token){},
    async signUp({firstname, lastname, email, password}){
      try {
        const response = await axios.post(`${URL_API}/signup`, {
          firstname, lastname, email, password
        })
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    },
    async signUpWithGoogle(token){},
  },
});
