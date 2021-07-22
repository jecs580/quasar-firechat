<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>

        <q-toolbar-title>
          FireChat
        </q-toolbar-title>
        <div>
          <q-btn color="negative">Salir</q-btn>
        </div>
      </q-toolbar>
    </q-header>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>


import { ref } from 'vue'
export default {
  name: 'MainLayout',

  components: {
  },

  setup () {

    return {
    }
  }
}
</script>
