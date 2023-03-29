<template>
    <div :style="'width: 100%;' + !$q.screen.lt.sm?'height:100vh':'min-height:20em'" class="flex justify-center" id="container-login">
        <div class="form-container">
           <sign-in v-if="isLogin"/>
           <sign-up v-else/>
        </div>
        <!-- <GoogleSignInButton @params="params" @success="handleLoginSuccess"
        @error="handleLoginError"/> -->
    </div>
</template>
<script setup>
import SignIn from 'src/components/login/SignIn.vue';
import SignUp from 'src/components/login/SignUp.vue';
import { computed, provide, ref, watch, watchEffect } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '../../stores/user';
// import {GoogleSignInButton, } from "vue3-google-signin"
const router = useRouter()
const storeUser = useUserStore()
const auth = computed(()=>storeUser.isAuthtenticated)
// const  {VUE_ID_CLIENTE}  = process.env
// Estado formulario renderización
const isLogin = ref(true)
provide('login', isLogin)

watchEffect(()=>{
  // Seteamos el usuario en caso esté logueado
  window.localStorage.getItem('userCredentials') && storeUser.setUser()
  auth.value && router.push('/')
})

// Manejo de login con google
// const params = {
//   client_id: VUE_ID_CLIENTE,
//   ux_mode: 'popup',
// }

// const handleLoginSuccess = (response) => {
  // const { credential } = response;
  // console.log("Access Token", credential);
// };

// handle an error event
// const handleLoginError = () => {
  // console.error("Login failed");
// };
</script>
<style>    
#container-login{
    align-items: center;
    background-image: url('../../assets/background_form.jpg');
    background-size: auto;
    background-repeat: no-repeat;
}

.form-container{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 30em;
    background-color: white;
    border-radius: 10px;
    /* max-width: 40em; */
    min-height: 30em;
    max-height: 52em;
    box-shadow: rgba(17, 12, 46, 0.15) 0px 48px 100px 0px;
}
</style>