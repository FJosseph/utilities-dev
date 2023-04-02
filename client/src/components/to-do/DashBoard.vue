<template>
  <!-- <div
    @dragenter="onDragEnter"
    @dragleave="onDragLeave"
    @dragover="onDragOver"
    @drop="onDrop"
    class="drop-target rounded-borders overflow-hidden"
  >
    <div class="q-ma-sm header-todo q-pa-sm" draggable="false">Todo</div>
    <q-scroll-area style="min-height: 90%; width: 100%" class="q-px-sm q-pb-sm">
      <div
        id="box1"
        draggable="true"
        @dragstart="onDragStart"
        class="box navy"
      ></div>
      <div
        id="box2"
        draggable="true"
        @dragstart="onDragStart"
        class="box red"
      ></div>
      <div
        id="box3"
        draggable="true"
        @dragstart="onDragStart"
        class="box green"
      ></div>
      <div
        id="box4"
        draggable="true"
        @dragstart="onDragStart"
        class="box orange"
      ></div>
    </q-scroll-area>
  </div>

  <div
    @dragenter="onDragEnter"
    @dragleave="onDragLeave"
    @dragover="onDragOver"
    @drop="onDrop"
    class="drop-target rounded-borders overflow-hidden"
  >
    <div class="q-ma-sm header-todo q-pa-sm" draggable="false">In progress</div>
    <q-scroll-area style="min-height: 90%; width: 100%" class="q-px-sm q-pb-sm">
    </q-scroll-area>
  </div>
  <div
    @dragenter="onDragEnter"
    @dragleave="onDragLeave"
    @dragover="onDragOver"
    @drop="onDrop"
    class="drop-target rounded-borders overflow-hidden"
  >
    <div class="q-ma-sm header-todo q-pa-sm" draggable="false">Completed</div>
    <q-scroll-area style="min-height: 90%; width: 100%" class="q-px-sm q-pb-sm">
    </q-scroll-area>
  </div>
  <div
    @dragenter="onDragEnter"
    @dragleave="onDragLeave"
    @dragover="onDragOver"
    @drop="onDrop"
    class="drop-target rounded-borders overflow-hidden"
  >
    <div class="q-ma-sm header-todo q-pa-sm" draggable="false">Review</div>
    <q-scroll-area style="min-height: 90%; width: 100%" class="q-px-sm q-pb-sm">
    </q-scroll-area>
  </div> -->
  <ColumnsBox
    v-for="col in allData"
    :key="col.status"
    :id="col.id"
    :name="col.name"
    :title="col.title"
    :status="col.status"
    :icon="col.icon"
    :todos="col.todos"
  />
  <!-- Add Columns -->
  <!-- <div class="drop-target rounded-borders overflow-hidden justify-start">
    <div id="add-column" class="q-ma-sm q-pa-sm" draggable="false">Add</div>
  </div> -->
</template>
<script setup>
import { provide } from "vue";
import { useDataTodosStore } from "../../stores/todos";
import ColumnsBox from "./ColumnsBox.vue";
// Store
const storeTodo = useDataTodosStore()
// List Example
const listStatus = [
  {
    name: "Todo",
    status: 0,
    icon: "event_available",
    todos: [{ id: 1, text: "Parfait" }],
  },
  {
    name: "In progress",
    status: 1,
    icon: "",
    todos: [{ id: 2, text: "Excelente" }],
  },
  { name: "Completed", status: 2, icon: "check_circle", todos: [] },
  { name: "Review", status: 3, icon: "verified", todos: [] },
];
// store the id of the draggable element
const onDragStart = (e) => {
  e.dataTransfer.setData("text", e.target.id);
  e.dataTransfer.dropEffect = "move";
};

const onDragEnter = (e) => {
  // don't drop on other draggables
  if (e.target.draggable !== true) {
    e.target.classList.add("drag-enter");
  }
};

const onDragLeave = (e) => {
  e.target.classList.remove("drag-enter");
};

const onDragOver = (e) => {
  e.preventDefault();
};

const onDrop = (e) => {
  e.preventDefault();

  // don't drop on other draggables
  if (e.target.draggable === true) {
    return;
  }

  const draggedId = e.dataTransfer.getData("text");
  const draggedEl = document.getElementById(draggedId);

  // check if original parent node
  if (draggedEl.parentNode === e.target) {
    e.target.classList.remove("drag-enter");
    return;
  }

  // make the exchange
  draggedEl.parentNode.removeChild(draggedEl);
  e.target.appendChild(draggedEl);
  e.target.classList.remove("drag-enter");
  // Update todo
  const idCol = e.target.parentNode.parentElement.id
  const idTodo = draggedEl.id
  console.log('col:', idCol);
  console.log('todo:', idTodo);
  storeTodo.updateTodo(idTodo, idCol)
};

// Injectando las funciones
provide("drag-enter", onDragEnter);
provide("drag-leave", onDragLeave);
provide("drag-over", onDragOver);
provide("on-drop", onDrop);

provide("drag-start", onDragStart);

// Definiendo Props
defineProps({
  allData: {
    type: Array,
  },
});
</script>

<style lang="scss">
.header-todo {
  background: white;
  border-radius: 10px;
  height: 3em;
  width: 95%;
  font-weight: 500;
  font-size: medium;
  display: flex;
  align-items: center;
}

#add-column {
  background: white;
  border-radius: 10px;
  height: 3em;
  width: 15%;
  font-weight: 500;
  font-size: medium;
  display: flex;
  align-items: center;
}

.drag-enter {
  // outline-style: dashed;
  // back
}

.box {
  width: 100%;
  height: 170px;
  margin: 0.5em 0;
  border-radius: 15px;
  // float: left;
  cursor: pointer;
}
</style>
