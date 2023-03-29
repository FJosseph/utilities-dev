import { defineStore } from "pinia";

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

export const useDataTodosStore = defineStore("todos", {
  state: () => ({
    todo: [
      { id: 1, title: "", text: "Parfait", status: 0, color: "1" },
      { id: 2, title: "", text: "Excelente", status: 1, color: "2" },
      { id: 3, title: "", text: "Adhoc", status: 0, color: "3" },
    ],
    columnsStatement: [],
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
  },
  actions: {
    addTodo(data) {
      //! <--- Example without api and database
      const dataFinal = { ...data, id: Date.now(), status: 0 };
      console.log(dataFinal);
      this.todo.push(dataFinal);
      //! --->
    },
    dropTodo(id) {
      //! <--- Example without api and database
      this.todo = this.todo.filter((x) => x.id !== id);
      //! --->
    },
    setColumns() {
      this.columnsStatement = examplesColumns;
    },
  },
});
