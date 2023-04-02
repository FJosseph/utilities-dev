import { defineStore } from "pinia";
import { computed } from "vue";
import {useUserStore} from './user'
import axios from "axios";

const { VUE_TODO } = process.env
let examplesColumns = [
  {
    name: "Todo",
    status: 0,
    icon: "event_available",
  },
  {
    name: "In progress",
    status: 1,
    icon: "",
  },
  { name: "Completed", status: 2, icon: "check_circle" },
  { name: "Review", status: 3, icon: "verified" },
];

let examplesTodos = [
      { id: 1, title: "", text: "Parfait", status: 0, color: "1" },
      { id: 2, title: "", text: "Excelente", status: 1, color: "2" },
      { id: 3, title: "", text: "Adhoc", status: 0, color: "3" },
]

const storeUser = useUserStore()
const isAuthtenticated = computed(()=>storeUser.isAuthtenticated)
const getUser = computed(()=>storeUser.getUser)
export const useDataTodosStore = defineStore("todos", {
  state: () => ({
    todo: [],
    columnsStatement: [],
    all: []
  }),
  getters: {
    getTodoByColumns: (state) => {
      return state.columnsStatement.reduce(
        (a, b) =>
          a.concat({
            ...b,
            todos: state.todo.filter((x) => x.status == b.status),
          }),
        []
      );
    },
    getAll: (state)=>state.all
  },
  actions: {
    async addCols(title){
      const add = await axios.post(`${VUE_TODO}/col`, {
        title,
        idUser: getUser.value.id
      })
      console.log(add.data);
      this.setAll()
    },
    addTodo(data) {
      //! <--- Example without api and database
      if(!isAuthtenticated.value){
      const dataFinal = { ...data, id: Date.now(), status: 0 };
      console.log(dataFinal);
      this.todo.push(dataFinal);
      return
      }
      //! --->
    },
    dropTodo(id) {
      //! <--- Example without api and database
      this.todo = this.todo.filter((x) => x.id !== id);
      //! --->
    },
    async setColumns() {
      //! <--- Example without api and database
      if(!isAuthtenticated.value){
        this.columnsStatement = examplesColumns;
        return
      }
      //! --->
      const cols = await axios.get(`${VUE_TODO}/col?idUser=${getUser.value.id}`)
      console.log(cols.data);
    },
    setTodos(){
      //! <--- Example without api and database
      if(!isAuthtenticated.value){
        this.todo = examplesTodos
        return
      }
      //! --->
    },
    async setAll(){
      if(isAuthtenticated.value){
        const data = await axios.get(`${VUE_TODO}/all?idUser=${getUser.value.id}`)
        this.all = data.data.cols
      }
    }
  },
});
