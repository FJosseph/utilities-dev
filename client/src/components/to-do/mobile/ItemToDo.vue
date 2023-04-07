<template>
    <div :class="`box-mobile ${$q.screen.lt.sm?'responsive-mb':''}`">
        <div
    class="q-pa-md bg-white q-pl-xl"
    style="position: relative; display: flex; align-items: start; flex-direction: column;z-index: 1;"
  >
  <!-- <q-btn flat round color="black" icon="more_vert" size="20px"  style="position: absolute;left: 83%;top: 10%;"/> -->
  <q-fab
        v-model="fab2"
        external-label
        vertical-actions-align="left"
        flat
        unelevated
        icon="more_vert"
        direction="down"
        style="position: absolute;left: 83%;top: 10%;"
      >
        <q-fab-action external-label color="primary" @click="onClick" icon="mail" label="Email" />
        <q-fab-action external-label color="secondary" @click="onClick" icon="alarm" label="Alarm" />
        <q-fab-action external-label color="orange" @click="onClick" icon="airplay" label="Airplay" />
        <q-fab-action external-label color="accent" @click="onClick" icon="room" label="Map" />
  </q-fab>
  <div class="text-h5 text-weight-regular q-my-md">
    {{ title }}
  </div>
  <div class="text-h6  text-weight-light q-my-md" style="height: 50%;">
    {{ text }}
  </div>
  <div class="row" style="width: 100%;justify-content: right;" size="lg">
      <q-chip :label="badge.title" text-color="white" :color="badge.color"/>
  </div>
  </div>
    </div>
</template>
<script setup>
defineProps({
    title: {type: String},
    text: {type: String},
    badge: {type: Object},
})
</script>
<style>
</style>