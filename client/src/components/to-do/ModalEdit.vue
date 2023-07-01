<template>
  <q-dialog v-model="modal">
    <q-card class="form-todo" style="max-width: 30em">
      <q-form @submit.prevent="submit">
        <q-card-section>
          <div class="text-h4 text-center q-mt-sm">Create a new task</div>
        </q-card-section>

        <q-card-section class="q-pt-none q-gutter-md">
          <q-input
            label="Title"
            v-model="input.title"
            input-style="width: 100%"
            lazy-rules
            :rules="[(val) => !!val || 'Title is required']"
          />
          <q-input v-model="input.text" label="Description" type="textarea" />
          <div class="row justify-center">
            <div
              style="display: flex; align-items: center; font-weight: 800"
              class="q-mr-md"
            >
              Select a color:
            </div>
            <q-btn
              round
              :style="`background-color: ${colorCurrent}`"
              @click="pickerColor = true"
            />
          </div>
        </q-card-section>

        <q-card-actions align="center" class="q-mb-sm">
          <q-btn
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
            label="Submit"
            type="submit"
          />
        </q-card-actions>
      </q-form>
    </q-card>
    <!-- Modal color picker -->
    <q-dialog v-model="pickerColor">
      <div>
        <q-color
          v-model="colorCurrent"
          no-footer
          no-header
          no-header-tabs
          flat
          default-view="palette"
          :palette="palette"
          class="color-picker"
          bordered
        />
      </div>
    </q-dialog>
  </q-dialog>
</template>
<script setup>
import { useDataTodosStore } from "src/stores/todos";
import { computed, inject, ref, watch, watchEffect } from "vue";
// Stores
const storeTodos = useDataTodosStore();

const todoCurrent = inject("todo-current");

// Estado modal
const modal = inject("modal-edit");
const pickerColor = ref(false);
const colorTodos = inject("colorTodos");

// Estado color picker
const colorCurrent = ref("");

const allColors = {
  1: "#d5c3ff",
  2: "#ffaf77",
  3: "#86d9d9",
  4: "#fffaba",
  5: "#f2caff",
  6: "#f8efbf",
  7: "#7ae6e4",
  8: "#ffa4c9",
  9: "#ffb8b2",
  10: "#c15387",
};

const allColorsRef = {
  "#d5c3ff": 1,
  "#ffaf77": 2,
  "#86d9d9": 3,
  "#fffaba": 4,
  "#f2caff": 5,
  "#f8efbf": 6,
  "#7ae6e4": 7,
  "#ffa4c9": 8,
  "#ffb8b2": 9,
  "#c15387": 10,
};
// Palette
const palette = [...Object.values(allColors)];

// Estados input
const input = ref({
  title: "",
  text: "",
  color: allColors[colorCurrent.value],
});

const todoFilter = computed(() =>
  storeTodos.getTodos.find((x) => x.id == todoCurrent.value)
);

// Manejo de input
watchEffect(() => {
  console.log(todoFilter.value);
  if(todoCurrent.value && modal.value){
      const { title, color, text } = todoFilter.value;
      input.value = {
        title,
        color,
        text,
      };
      colorCurrent.value = allColors[color]
  }
});

// Manejo del input color
watch(
  () => colorCurrent.value,
  () => {
    if(colorCurrent.value)
    input.value.color = allColorsRef[colorCurrent.value];
  }
);
const submit = () => {
  console.log("Parfait!!");
  //   storeTodos.addTodo(input.value);
  storeTodos.updateTodoData(todoCurrent.value, input.value)
  modal.value = false;
  todoCurrent.value = ''
};
</script>
<style>
.form-todo {
  /* min-width: 30em; */
  width: 100%;
}

.color-picker {
  /* width: 10em; */
  /* height: 10em; */
}
</style>
