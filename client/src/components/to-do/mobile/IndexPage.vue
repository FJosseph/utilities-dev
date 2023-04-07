<template>
    <div :class="`${$q.screen.lt.sm?'justify-center':''}`">
        <div :class="`container-todo-mobile q-gutter-sm q-mt-md ${$q.screen.lt.sm?'justify-center':''}`">
            <item-to-do v-for="item in todos" :badge="{...colObject[item.status],color: colorStatus[item.status]}" :title="item.title" :text="item.text" :key="item.id"/>
        </div>
    </div>
</template>
<script setup>
import { computed } from 'vue';
import { useDataTodosStore } from '../../../stores/todos';
import ItemToDo from './ItemToDo.vue';

// Store
const storeTodos = useDataTodosStore()

const todos = computed(()=>storeTodos.getTodos)
const columns = computed(()=>storeTodos.getColumns)

// Columns Object
const colObject = computed(()=>columns.value.reduce((a,b)=>{
    a[b.status] = b
    return a
},{}))

const colorStatus = {
    0: 'amber-8',
    1: 'indigo-13',
    2: 'teal-7',
    3: 'green',
    4: 'purple-6',
    5: 'deep-purple',
}
</script>
<style>
.container-todo-mobile{
    display: flex;
    flex-wrap: wrap;
    /* justify-content: center;  */
}

.box-mobile{
    overflow: hidden;
    min-width: 18em;
    min-height: 14em;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    border-radius: 15px;
}

.responsive-mb{
    width: 85%;
}
</style>