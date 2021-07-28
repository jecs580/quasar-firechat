<template>
  <q-page padding>
    <VistaAcceso v-if="!isAuthenticated"/>
    <div v-else>
      <VistaUsuariosActivos/>
      <VistaChat/>
    </div>
  </q-page>
</template>

<script>
import VistaAcceso from '../components/VistaAcceso.vue'
import VistaUsuariosActivos from '../components/VistaUsuariosActivos.vue'
import VistaChat from '../components/VistaChat.vue'
import { useAuth } from '@vueuse/firebase'
import firebase from 'firebase'
import { provide, ref } from 'vue'
export default {
  components:{
    VistaAcceso,
    VistaUsuariosActivos,
    VistaChat
  },
  setup() {
    const { isAuthenticated, user } = useAuth(firebase.auth)
    const  uidSeleccionado = ref('');
    provide('uidSeleccionado', uidSeleccionado)
    return {
      isAuthenticated
    }
  }
}
</script>
