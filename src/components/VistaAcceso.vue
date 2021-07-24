<template>
    <div class="q-px-x1">
        <h5>Formulario de {{acceder? 'Login': 'Registro'}}</h5>
        <q-form class="q-gutter-md" @submit.prevent
        ="procesarFormulario">
            <q-input
                label="Email"
                v-model="email"
            />
            <q-input
                label="Password"
                v-model="password"
            />
            <q-btn
                :label="acceder? 'login':'Registro'"
                type="submit"
                color="primary"
            />
            <q-btn color="primary" outline v-if="!acceder" @click="acceder = true">¿Ya tienes una cuenta?</q-btn>
            <q-btn color="negative" outline v-else @click="acceder = false">¿No tienes una cuenta?</q-btn>
        </q-form>
    </div>
</template>
<script>
import { ref } from 'vue'
import { auth,db } from 'boot/firebase'

export default {
    setup(){
        const email =ref('sanchezenrique580@gmail.com')
        const password =ref('123456')
        const acceder =  ref(true)
        
        const procesarFormulario = async()=>{
            if (!email.value.trim()|| !password.value.trim()) {
                console.log('Campos vacios');
                return;
            }
            try {
                if(!acceder.value){
                    const usuario = await auth.createUserWithEmailAndPassword(email.value,password.value);
                    await db.collection('users').doc(usuario.user.uid).set({
                        email:usuario.user.email,
                        estado:true,
                        uid:usuario.user.uid
                    });
                }else{
                    const usuario = await auth.signInWithEmailAndPassword(email.value, password.value);
                    await db.collection('users').doc(usuario.user.uid).update({
                        estado:true
                    })
                }
                email.value = '';
                password.value = '';
            } catch (error) {
                console.log(error);
            }
        }
        return {
            email,
            password,
            procesarFormulario,
            acceder,
        }
    }
}
</script>