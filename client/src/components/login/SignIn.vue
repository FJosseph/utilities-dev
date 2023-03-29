<template>
  <!-- <div class="form q-gutter-md q-px-lg"> -->
    <q-form @submit="submit" class="form q-gutter-sm q-px-lg">
    <div class="text-center text-h4 q-mt-xl">Sign In</div>
      <div class="row">
        <q-input class="col" color="deep-purple-7" outlined v-model="email" label="Email" lazy-rules :rules="[(val)=>val.length || 'Ingresa un usuario']">
          <template v-slot:append>
            <q-avatar>
              <q-icon name="mail" color="deep-purple-7"/>
            </q-avatar>
          </template>
        </q-input>
  
      </div>
      <div class="row">
        <q-input class="col" color="deep-purple-7" outlined v-model="password" :type="visibility?'text':'password'" label="Password" lazy-rules :rules="[(val)=>val.length || 'Ingresa una contraseña']">
          <template v-slot:append>
            <q-avatar @click="visibility = !visibility">
              <q-icon :name="!visibility?'visibility':'visibility_off'" color="deep-purple-7"/>
            </q-avatar>
          </template>
        </q-input>
      </div>
      <div class="col q-my-none">¿No tienes cuenta? <a @click="changeForm" class="" style="cursor: pointer;font-weight: 500;color: #725AC1;">Regístrate</a></div>
      <div class="row justify-center">
        <button id="submit" type="submit">Sign In</button>
      </div>
      <!-- <div class="row justify-center q-my-md"> -->
        <q-separator inset />
      <!-- </div> -->
      <div class="row justify-center q-my-md">
        <q-btn outline>
          <div class="q-mr-md">
            Sign In with Google
          </div>
          <q-avatar size="30px">
            
            <img src="https://cdn.icon-icons.com/icons2/2351/PNG/512/logo_google_icon_143197.png">
          </q-avatar>
    </q-btn>
      </div>
    </q-form>
    <!-- </div> -->
</template>
<script setup>
import { useUserStore } from "src/stores/user";
import { inject, ref, watch, watchEffect } from "vue";

// Stores
const storeUser = useUserStore()

// Estados input
const email = ref("");
const password = ref("");
const visibility = ref(false)

const formState = inject('login')

// Fomrulario
const changeForm = ()=>{
  formState.value = false
}

const submit = ()=>{
  storeUser.signIn(email.value, password.value)
}

</script>
<style scoped>
.form{
  width: 100%;
}
#submit {
  position: relative;
  display: inline-block;
  margin: 15px;
  padding: 12px 20px;
  text-align: center;
  font-size: 18px;
  letter-spacing: 1px;
  text-decoration: none;
  color: #725AC1;
  background: transparent;
  cursor: pointer;
  transition: ease-out 0.5s;
  border: 2px solid #725AC1;
  border-radius: 10px;
  box-shadow: inset 0 0 0 0 #725AC1;
}

#submit:hover {
  color: white;
  box-shadow: inset 0 -100px 0 0 #725AC1;
}

#submit:active {
  transform: scale(0.9);
}</style>
