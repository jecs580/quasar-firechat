<template>
    <q-page-sticky position="top" expand class="tabs-zindex">
       <q-tabs
        v-model="uidSeleccionado"
        inline-label
        outside-arrows
        mobile-arrows
        class="bg-primary text-white shadow-2"
      >
        <q-tab 
            v-for="user in arraySinUser"
            :key="user.uid"
            icon="account_circle"
            :label="user.email"
            :name="user.uid"
            :class="user.estado ? 'text-white' : 'text-grey'"
        />
      </q-tabs>
    </q-page-sticky>
</template>
<script>
import { ref, computed, inject } from 'vue'
import { db, auth } from 'boot/firebase'
import { useAuth } from '@vueuse/firebase'
export default {
    setup() { 
        const uidSeleccionado = inject('uidSeleccionado');
        const users = ref([]);
        const {user} = useAuth(auth)
        db.collection('users').onSnapshot((snapshot)=>{
            snapshot.docChanges().forEach((change) => {
            if (change.type === "added") {
                console.log("Nuevo usuario: ", change.doc.data());
                users.value = [...users.value, change.doc.data()];
                users.value = users.value.sort((a,b)=> b.estado - a.estado)
            }
            if (change.type === "modified") {
                console.log("Usuario modificado: ", change.doc.data());
                users.value = users.value.map((user) =>{
                    return user.uid === change.doc.data().uid ? {...user, estado: change.doc.data().estado}:user
                 }
                )
            }
            if (change.type === "removed") {
                console.log("Usuario eliminado: ", change.doc.data());
            }
        });
        });
        const arraySinUser =  computed(()=>{
            return users.value.filter(item => item.uid !== user.value.uid)
        })
        return {
            uidSeleccionado,
            arraySinUser,
        }
    }
}
</script>
<style>
    .tabs-zindex{
        z-index: 2000;
    }
</style>