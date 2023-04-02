<template>
  <div class="drop-target" draggable="false">
    <div class="q-ma-sm header-todo q-pa-sm" draggable="false">{{ title }}</div>
    <div class="c-target q-px-sm overflow-hidden"
    >
      <q-scroll-area 
      @dragenter="onDragEnter"
      @dragleave="onDragLeave"
      @dragover="onDragOver"
      @drop="onDrop"  style="min-height: 90%; width: 100%" class="rounded-borders" :id="id">
        <item-to-do
          v-for="item in todos"
          :key="item.id"
          :id="item.id"
          :title="item.title"
          :text="item.text"
          :color="colorTodos[item.color]"
        />
      </q-scroll-area>
    </div>
  </div>
</template>
<script setup>
import { inject } from "vue";
import ItemToDo from "./ItemToDo.vue";

const onDragEnter = inject("drag-enter");
const onDragLeave = inject("drag-leave");
const onDragOver = inject("drag-over");
const onDrop = inject("on-drop");

defineProps({
  id: { type: String },
  name: { type: String },
  title: {type: String},
  status: { type: Number },
  icon: { type: String },
  todos: { type: Array },
});

const colorTodos = inject("colorTodos");
</script>
<style>
.c-target{
  width: 100%; 
  height: 100%; 
  display: flex;
  flex-direction: column;
  align-content: center;
  align-items: center;
}
@media only screen and (max-width: 500px) {
  .drop-target {
    height: 200px;
    width: 100px;
    min-width: 100px;
    background-color: gainsboro;
  }

  .box {
    width: 50px;
    height: 50px;
  }
}

.box:nth-child(3) {
  clear: both;
}

.navy {
  background-color: #d5c3ff;
}

.orange {
  background-color: #ffaf77;
}

.green {
  background-color: #86d9d9;
}

.yellow {
  background-color: #fffaba;
}

.rose-violet {
  background-color: #f2caff;
}
.yell {
  background-color: #f8efbf;
}
.blue-green {
  background-color: #7ae6e4;
}
.rose-light {
  background-color: #ffa4c9;
}
.orange-light {
  background-color: #ffb8b2;
}
.red-rose {
  background-color: #c15387;
}
</style>
