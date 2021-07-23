<template>
  <q-page padding>
    <VistaAcceso v-if="!isAuthenticated"/>
  </q-page>
</template>

<script>
import VistaAcceso from '../components/VistaAcceso.vue'
import { useAuth } from '@vueuse/firebase'
import firebase from 'firebase'
export default {
  components:{
    VistaAcceso
  },
  setup() {
    const { isAuthenticated, user } = useAuth(firebase.auth)
    return {
      isAuthenticated
    }
  }
}
</script>
