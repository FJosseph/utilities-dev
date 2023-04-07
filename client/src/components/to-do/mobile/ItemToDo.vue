<template>
    <div :class="`box-mobile ${$q.screen.lt.sm?'responsive-mb':''}`">
        <div
    class="q-pa-md bg-white q-pl-lg"
    style="position: relative; display: flex; align-items: start; flex-direction: column;z-index: 1;"
  >
  <q-fab
  v-model="fab2"
  external-label
  vertical-actions-align="left"
  flat
  unelevated
  icon="more_vert"
  direction="down"
  style="position: absolute;left: 83%;top: 5%;"
  >
  <!-- <q-fab-action external-label color="orange" @click="onClick" icon="edit" label="Edit" label-position="left"/>
  <q-fab-action external-label color="accent" @click="onClick" icon="room" label="Change Status" label-position="left"/> -->
  <q-fab-action color="pink" @click="onClick" icon="edit" label-position="left"/>
  <q-fab-action color="blue-grey" @click="deleteTodo(id)" icon="delete" label-position="left"/>
</q-fab>
<!-- <q-btn flat round color="black" icon="delete" size="18px"  style="position: absolute;left: 83.5%;top: 30%;"/> -->
  <div class="text-h5 text-weight-regular q-mt-md q-ml-md">
    {{ title }}
  </div>
  <div class="text-h6  text-weight-light q-my-md q-ml-md" style="height: 50%;">
    {{ text }}
  </div>
      <q-chip clickable @click="handleModalStatus(id, badge.id)" :label="badge.title" text-color="white" :color="badge.color" style="position: absolute;right: 5%;top: 84%;">
        <!-- <q-popup-edit touch-position="left" v-if="$q.screen.lt.sm" v-model="label2" :cover="true" :offset="[80, 13]" style="background-color: transparent;border: none; box-shadow: none;">
          <q-chip v-for="col in Object.values(columns).filter(x=>x.id != badge.id)" :label="col.title" text-color="white" :color="col.color" :key="col.id"/>
        </q-popup-edit> -->
      </q-chip>
  </div>
    </div>
</template>
<script setup>
import { computed, inject, ref } from "vue"
import { useDataTodosStore } from "../../../stores/todos"

// Stores
const storeTodos = useDataTodosStore()

const PROPS = defineProps({
    id:{type: String},
    title: {type: String},
    text: {type: String},
    badge: {type: Object},
})

const label2 = ref('')
// Columns
const columns = inject('columns')

// Modal
const modalStatus = inject('modalStatus')
const dataTodoId = inject('idTodoChange')
const handleModalStatus = (idTodo, idCol)=>{
  modalStatus.value = true
  dataTodoId.value = {idTodo, idCol}
}

// const columnsChip = computed(()=>Object.values(columns.value).filter(x=>x.id != PROPS.badge.id))


const fab2 = ref(false)
const deleteTodo = (id)=>{
  storeTodos.deleteTodo(id)
}
const onClick = ()=>{}
</script>
<style>
</style>