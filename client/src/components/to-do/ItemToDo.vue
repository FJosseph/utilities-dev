<template>
  <div
    :id="id"
    draggable="true"
    @dragstart="onDragStart"
    :class="`q-pa-md box ${color}`"
  >
    {{ text }}
  </div>
</template>
<script setup>
import { inject } from "vue";

const onDragStart = inject("drag-start");
defineProps({
  id: { type: Number },
  text: { type: String },
  color: { type: String },
});
</script>
<style lang=""></style>
