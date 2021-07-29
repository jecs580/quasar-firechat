<template>
   <div v-if="uidSeleccionado !== ''" class="q-mt-xl">
        <div class="q-pa-md row justify-center ">
        <div style="width: 100%; max-width: 600px">
            <q-chat-message
                :text="['hey, how are you?']"
                sent
            />
            <q-chat-message
                :text="['doing fine, how r you?']"
            />
        </div>
    </div>
    <q-footer>
        <q-form @submit.prevent="enviarMensaje">
            <q-toolbar class="bg-grey-3 text-black row">
                <q-btn round flat icon="insert_emoticon" class="q-mr-sm" />
                <q-input rounded outlined dense class="WAL__field col-grow q-mr-sm" bg-color="white" v-model="message" placeholder="Type a message" />
                <q-btn round flat icon="send"  type="submit"/>
            </q-toolbar>
        </q-form>
    </q-footer>
   </div>
   <div v-else>
       <h5 class="q-mt-xl">Selecciona un usuario para conversar.</h5>
   </div>
</template>

<script>
import { ref, inject, watchEffect } from 'vue'
import { useAuth } from '@vueuse/firebase'
import {  auth,db, marcaTiempo } from 'boot/firebase'
export default {
    setup() {
        const message = ref('')
        const uidSeleccionado = inject('uidSeleccionado');
        const {user} = useAuth(auth)
        watchEffect(()=>{
            console.log(uidSeleccionado.value);
        });
        const enviarMensaje= async()=>{
            try {
                const objetoMensaje = {
                    user:user.value.email,
                    texto: message.value,
                    fecha: marcaTiempo(),
                    uid: user.value.uid
                }
                console.log(objetoMensaje);
                await db.collection("chat")
                    .doc(user.value.uid)
                    .collection(uidSeleccionado.value)
                    .add(objetoMensaje);
                await db.collection("chat")
                .doc(uidSeleccionado.value)
                .collection(user.value.uid)
                .add(objetoMensaje)
                message.value ='';
            } catch (error) {
                console.log(error);
            }
        }
        return {
            message,
            enviarMensaje,
            uidSeleccionado,
        }
    }
}
</script>