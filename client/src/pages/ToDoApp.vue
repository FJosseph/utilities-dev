<template>
  <header class="text-cemter">Create your items for todo</header>
  <q-btn
    unelevated
    style="
      color: white;
      background: rgb(127, 117, 245);
      background: linear-gradient(
        90deg,
        rgba(127, 117, 245, 1) 0%,
        rgba(148, 145, 239, 1) 68%,
        rgba(143, 192, 255, 1) 100%
      );
    "
    label="New Task"
    icon-right="add"
    class="p-pa-md"
    @click="modal = true"
  />
  <div class="container-d-todo q-mt-md">
    <div class="row q-gutter-sm q-px-md q-pt-md">
      <ToDoApp v-if="!$q.screen.lt.sm" :allData="allTodosByColumns" />
      <div v-else>Esto es excelente</div>
    </div>
  </div>
  <!-- Formulario modal -->
  <modal-form />
</template>

<script setup>
import { computed, provide, ref, watchEffect } from "vue";
import ToDoApp from "../components/to-do/DashBoard.vue";
import ModalForm from "src/components/to-do/ModalForm.vue";
import { useDataTodosStore } from "../stores/todos";
const modal = ref(false);
provide("modal", modal);
// Store
const storeTodos = useDataTodosStore();

// Getters
// Data with out API and Database
// const allTodosByColumns = computed(() => storeTodos.getTodoByColumns);
// Data with database
const allTodosByColumns = computed(() => storeTodos.getAll);

// Colors
const colorTodos = {
  0: "navy",
  1: "navy",
  2: "orange",
  3: "green",
  4: "yellow",
  5: "rose-violet",
  6: "yell",
  7: "blue-green",
  8: "rose-light",
  9: "orange-light",
  10: "red-rose",
};
provide("colorTodos", colorTodos);
watchEffect(() => {
  storeTodos.setColumns();
  storeTodos.setTodos()
  storeTodos.setAll()
});
</script>

<style lang="scss">
header {
  display: flex;
  justify-content: center;
  text-align: center;
  font-weight: 900;
  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
  font-size: 5em;
}
.container-d-todo {
  background-color: #f3f4f6;
  border-radius: 10px;
  padding-bottom: 10px;
}
.drop-target {
  min-height: 50em;
  max-height: 53em;
  min-width: 300px;
  background-color: #f3f4f6;
  // background-color: gainsboro;
  display: flex;
  flex-direction: column;
  align-content: center;
  align-items: center;
  // justify-content: center;
}
</style>
