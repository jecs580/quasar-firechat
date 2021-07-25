<template>
    <q-page-sticky position="top" expand>
       <q-tabs
        v-model="uidSeleccionado"
        inline-label
        outside-arrows
        mobile-arrows
        class="bg-primary text-white shadow-2"
      >
        <q-tab 
            v-for="user in users"
            :key="user.uid"
            icon="account_circle"
            :label="user.correo"
            :name="user.uid"
            :class="user.estado ? 'text-white' : 'text-grey'"
        />
      </q-tabs>
    </q-page-sticky>
</template>
<script>
import { ref } from 'vue'
import { db } from 'boot/firebase'
export default {
    setup() {
        const uidSeleccionado = ref('mails');
        const users = ref([]);
        db.collection('users').onSnapshot((snapshot)=>{
            snapshot.docChanges().forEach((change) => {
            if (change.type === "added") {
                console.log("Nuevo usuario: ", change.doc.data());
                users.value = [...users.value, change.doc.data()];
                console.log('USUARIOS', users.value);
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
        })
        return {
            uidSeleccionado,
            users,
        }
    }
}
</script>