const routes = [
  {
    path: "/",
    component: () => import("layouts/UtilitiesLayout.vue"),
    children: [
      { path: "", component: () => import("pages/IndexPage.vue") },
      { path: "account", component: () => import("pages/AccountPage.vue") },
      { path: "about", component: () => import("pages/AboutPage.vue") },
      { path: "todo", component: () => import("pages/ToDoApp.vue") },
      {
        path: "calculator",
        component: () => import("pages/CalculatorPage.vue"),
      },
    ],
  },
  // Rutas de control login y páginas no encontradas
  {
    path: '/',
    children: [
      {path: 'login', component: ()=>import('pages/Login/LogIn.vue')}
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
