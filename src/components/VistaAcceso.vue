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
export default {
    setup(){
        const email =ref('')
        const password =ref('')
        const acceder =  ref(true)
        const procesarFormulario = async()=>{
            if (!email.value.trim()|| !password.value.trim()) {
                console.log('Campos vacios');
                return;
            }
            try {
                
            } catch (error) {
                console.log(error);
            }
        }
        return {
            email,
            password,
            procesarFormulario,
            acceder
        }
    }
}
</script>