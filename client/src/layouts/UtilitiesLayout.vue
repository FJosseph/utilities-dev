<template>
  <q-layout view="hHh Lpr lff">
    <q-header v-if="$q.screen.lt.sm" class="bg-white">
      <q-toolbar>
        <q-btn
          flat
          @click="drawer = !drawer"
          round
          dense
          icon="menu"
          class="text-black"
          size="large"
        />
        <!-- <q-toolbar-title></q-toolbar-title> -->
      </q-toolbar>
    </q-header>
    <q-drawer
      v-model="drawer"
      show-if-above
      :mini="miniState"
      @mouseover="miniState = false"
      @mouseout="miniState = true"
      mini-to-overlay
      :width="200"
      :breakpoint="500"
      bordered
      class="bg-white-3"
    >
      <q-scroll-area class="fit" :horizontal-thumb-style="{ opacity: 0 }">
        <q-list>
          <essential-link v-for="(item, i) in links" :key="i" v-bind="item" />
          <q-separator></q-separator>
          <essential-link v-if="user"
            v-bind="{
              icon: 'person',
              link: '/account',
              title: 'Account',
            }"
          />
          <essential-link v-if="!user" v-bind="{
            icon: 'login',
            link: '/login',
            title: 'Log In',
          }"/>
          <q-item v-else clickable @click="logout">
            <q-item-section avatar>
              <q-icon name="logout" />
            </q-item-section>

            <q-item-section>
              <q-item-label>Logout</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>
    </q-drawer>

    <q-page-container>
      <q-page padding>
        <router-view />
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import { useUserStore } from "src/stores/user";
import { computed, ref, watchEffect } from "vue";
import EssentialLink from "../components/EssentialLink.vue";
import { useRouter } from 'vue-router';

const linksList = [
  {
    title: "Home",
    icon: "apps",
    link: "/",
  },
  // {
  //   title: "About",
  //   icon: "perm_contact_calendar",
  //   link: "/about",
  // },
  {
    title: "To Do App",
    icon: "checklist",
    link: "/todo",
  },
  // {
  //   title: "Calculator",
  //   icon: "calculate",
  //   link: "/calculator",
  // },
];

export default {
  components: {
    EssentialLink,
  },
  setup() {
    const storeUser = useUserStore()
    const user = computed(()=>storeUser.isAuthtenticated)
    const router = useRouter()
    watchEffect(()=>{
      window.localStorage.getItem('userCredentials') && storeUser.setUser()
    })
    return {
      user: user,
      links: linksList,
      drawer: ref(false),
      miniState: ref(true),
      logout: () => {
        storeUser.logOut()
        router.push('/')
      },
    };
  },
};
</script>
<style>
.active_link {
  color: white;
  /* background: #b7a6e4; */
  background: #9491ef;
}
</style>
