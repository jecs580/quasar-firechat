<template>
        <div class="q-pa-md row justify-center q-mt-xl">
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
    <q-toolbar class="bg-grey-3 text-black row">
        <q-btn round flat icon="insert_emoticon" class="q-mr-sm" />
        <q-input rounded outlined dense class="WAL__field col-grow q-mr-sm" bg-color="white" v-model="message" placeholder="Type a message" />
        <q-btn round flat icon="send"  type="submit"/>
    </q-toolbar>
    </q-footer>
</template>

<script>
import { ref } from 'vue'
export default {
    setup() {
    const message = ref('')
    return {
        message
    }
    }
}
</script>