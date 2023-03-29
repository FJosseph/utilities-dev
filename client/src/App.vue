<template>
  <router-view />
</template>

<script>
import { defineComponent, watchEffect } from 'vue'
import { useUserStore } from './stores/user';

export default defineComponent({
  name: 'App'
})
</script>
