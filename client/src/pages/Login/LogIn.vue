<template>
    <div :style="'width: 100%;' + !$q.screen.lt.sm?'height:100vh':'min-height:20em'" class="flex justify-center" id="container-login">
        <div class="form-container">
           <sign-in v-if="isLogin"/>
           <sign-up v-else/>
        </div>
        <!-- <GoogleSignInButton @params="params" @success="handleLoginSuccess"
        @error="handleLoginError"/> -->
        <button v-google-signin-button="params.client_id" class="google-signin-button"></button>
    </div>
</template>
<script setup>
import SignIn from 'src/components/login/SignIn.vue';
import SignUp from 'src/components/login/SignUp.vue';
import { provide, ref } from 'vue';
import {GoogleSignInButton, } from "vue3-google-signin"

const  {VUE_ID_CLIENTE}  = process.env
// Estado formulario renderización
const isLogin = ref(true)
provide('login', isLogin)

// Manejo de login con google
const params = {
  client_id: VUE_ID_CLIENTE,
  ux_mode: 'popup',
}

const handleLoginSuccess = (response) => {
  const { credential } = response;
  console.log("Access Token", credential);
};

// handle an error event
const handleLoginError = () => {
  console.error("Login failed");
};
</script>
<style>    
#container-login{
    align-items: center;
}

.form-container{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 30em;
    /* max-width: 40em; */
    min-height: 30em;
    max-height: 52em;
    box-shadow: rgba(17, 12, 46, 0.15) 0px 48px 100px 0px;
}
</style>