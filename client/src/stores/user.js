import axios from 'axios';
import { defineStore } from 'pinia';

const URL_API = 'http://localhost:3001'

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null,
  }),
  getters: {
    getUser: (state) => state.user,
    isAuthtenticated: (state)=>!!state.user,
  },
  actions: {
    async setUser(){
      const token = window.localStorage.getItem('userCredentials')
      console.log('getUser:', JSON.parse(token));
      try {
        const response = await axios.get(`${URL_API}/user`, {headers: {'x-access-token': JSON.parse(token).token}})
        console.log(response.data);
        this.user = response.data
      } catch (error) {
        console.log(error);
        if(error.response.data.error == "User doesn't exists!") window.localStorage.removeItem('userCredentials')
        // console.log(error.response.data.error);
      }
    },
    async signIn(email, password){
        try {
          const response = await axios.post(`${URL_API}/signin`, {email, password})
          console.log(response.data);
          window.localStorage.setItem('userCredentials', JSON.stringify(response.data))
          this.user = response.data.user
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
        window.localStorage.setItem('userCredentials', JSON.stringify(response.data))
        this.user = response.data.user
      } catch (error) {
        console.log(error);
      }
    },
    async signUpWithGoogle(token){},
    logOut(){
      window.localStorage.removeItem('userCredentials')
      this.user = null
    }
  },
});
