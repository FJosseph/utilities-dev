<template>
  <div
    :id="id"
    draggable="true"
    @dragstart="onDragStart"
    :class="`q-pa-md box ${color}`"
    style="position: relative; display: flex; align-items: center"
  >
  <q-btn @click="()=>(modalEdit = !modalEdit) && (todoCurrent = id)" outline round color="black" dense icon="arrow_outward" size="12px"  style="position: absolute;left: 20.5em;top: 10px;">
    <q-tooltip>
      Edit your todo!
    </q-tooltip>
  </q-btn>
  <div class="text-h6 text-weight-regular" style="position: absolute; left: 16px; top: 10px;">
    {{ title }}
  </div>
  <div class="text-h4 text-weight-regular">
    {{ text }}
  </div>
  <q-btn @click="todoDelete(id)" round unelevated dense icon="delete" size="18px"  style="position: absolute;left: 13.3em;bottom: 10px;">
  </q-btn>
  </div>
</template>
<script setup>
import { inject } from "vue";
import { useDataTodosStore } from "../../stores/todos";

// Stores
const storeTodo = useDataTodosStore()

const onDragStart = inject("drag-start");

const modalEdit = inject('modal-edit')
const todoDelete = (id)=>{
  storeTodo.deleteTodo(id)
}
const todoCurrent = inject('todo-current')
defineProps({
  id: { type: String },
  title: { type: String },
  text: { type: String },
  color: { type: String },
});
</script>
<style lang=""></style>
