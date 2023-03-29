<template>
  <div>Account</div>
</template>
<script setup>
import { useUserStore } from "src/stores/user";
import { computed, watch, watchEffect } from "vue";
import { useRouter } from "vue-router";

const router = useRouter()
const storeUser = useUserStore()
const auth = computed(()=>storeUser.isAuthtenticated)
watchEffect(()=>{
  !auth.value && router.push('/')
})
</script>
<style></style>
