import { defineStore } from "pinia";
import { computed } from "vue";
import {useUserStore} from './user'
import axios from "axios";

const { VUE_TODO } = process.env
let examplesColumns = [
  {
    id: '1',
    title: "Todo",
    status: 0,
    icon: "event_available",
  },
  {
    id: '2',
    title: "In progress",
    status: 1,
    icon: "",
  },
  { id: '3',
    title: "Completed", status: 2, icon: "check_circle" },
  { id: '4',
    title: "Review", status: 3, icon: "verified" },
];

let examplesTodos = [
      { id: '10', title: "Bienvenue", text: "Parfait", status: 0, color: "1" },
      { id: '20', title: "Bienvenido", text: "Excelente", status: 1, color: "2" },
      { id: '30', title: "Welcome", text: "Adhoc", status: 0, color: "3" },
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
    getTodos: (state)=>state.todo,
    getColumns: (state)=>state.columnsStatement,
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
    async addTodo(data) {
      //! <--- Example without api and database
      if(!isAuthtenticated.value){
      const dataFinal = { ...data, id: String(Date.now()), status: 0 };
      console.log(dataFinal);
      this.todo.push(dataFinal);
      window.localStorage.setItem('todos', JSON.stringify(this.todo))
      this.setAll()
      return
      }
      //! --->
      try {
        const newTodo = await axios.post(`${VUE_TODO}/todo`, {
          ...data, idUser: getUser.value.id
        })
        console.log(newTodo.data);     
        this.setAll()   
      } catch (error) {
        console.log(error);
      }
    },
    async updateTodo(idTodo, idCol){
      if(!isAuthtenticated.value){
        // console.log('update');
        const colFilter = this.columnsStatement.find(x=>x.id == idCol)
        const todoFilter = this.todo.findIndex(x=>x.id == idTodo)
        console.log('Column', colFilter, 'TodoFilter', this.todo[todoFilter]);
        this.todo[todoFilter] = {...this.todo[todoFilter], status: colFilter.status}
        window.localStorage.setItem('todos', JSON.stringify(this.todo))
        return
      }
      try {
        const response = await axios.put(`${VUE_TODO}/todo/${idTodo}?idCol=${idCol}`)
        console.log(response.data);
        this.setAll()
      } catch (error) {
        console.log(error);
      }
    },
    async deleteTodo(id) {
      //! <--- Example without api and database
      if(!isAuthtenticated.value){
        this.todo = this.todo.filter((x) => x.id != id);
        window.localStorage.setItem('todos', JSON.stringify(this.todo))
        this.setAll()        
        return
      }
      //! --->
      try {
        const response = await axios.delete(`${VUE_TODO}/todo/${id}`)
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    },
    async setColumns() {
      //! <--- Example without api and database
      if(!isAuthtenticated.value){
        // Validamos si existe en el localStorage
        const columns = window.localStorage.getItem('columns')
        if(!columns){
          this.columnsStatement = examplesColumns;
          window.localStorage.setItem('columns', JSON.stringify(examplesColumns))
          return
        }
        this.columnsStatement = JSON.parse(columns)
        return
      }
      //! --->
      const cols = await axios.get(`${VUE_TODO}/col?idUser=${getUser.value.id}`)
      console.log(cols.data);
    },
    setTodos(){
      //! <--- Example without api and database
      if(!isAuthtenticated.value){
        // Validamos si existe en el localStorage
        const todos = window.localStorage.getItem('todos')
        if(!todos){
          this.todo = examplesTodos
          window.localStorage.setItem('todos', JSON.stringify(examplesTodos))
          return
        }
        this.todo = JSON.parse(todos)
        return
      }
      //! --->
    },
    async setAll(){
      if(isAuthtenticated.value){
        const data = await axios.get(`${VUE_TODO}/all?idUser=${getUser.value.id}`)
        this.all = data.data.cols.sort((a,b)=>a.status-b.status)
        return
      }
      this.all = this.getTodoByColumns

    }
  },
});
