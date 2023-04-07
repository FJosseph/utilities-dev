<template>
    <q-dialog v-model="modal" position="right">
      <q-card style="width: 150px; height: 20em;background-color: transparent;border: none;box-shadow: none;">
        <q-card-section class="col items-center wrap">
          <q-chip  @click="changeStatus(dataTodo.idTodo, col.id)" v-for="col in Object.values(statusColumns).filter(x=>x.id !== dataTodo.idCol)" :key="col.id" clickable :label="col.title" text-color="white" :color="col.color"></q-chip>
        </q-card-section>
      </q-card>
    </q-dialog>
</template>
<script setup>
import { inject } from "vue";
import {useDataTodosStore} from '../../../stores/todos'

// Store
const storeTodo = useDataTodosStore()

const modal = inject('modalStatus')
// Data
const dataTodo = inject('idTodoChange')
const statusColumns = inject('columns')

const changeStatus = (idTodo, idCol)=>{
    // console.log(idTodo, idCol);
    storeTodo.updateTodo(idTodo, idCol)
    modal.value = false
    // storeTodo.updateTodo(idTodo, idCol)
    // console.log('Hola mundo!!');
}
</script>
<style>
    
</style>