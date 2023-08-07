<script setup>

import { ref } from "vue";
import { Icon } from '@iconify/vue';

import { useMutation } from "@vue/apollo-composable"
import { INSERT_MESSAGE } from "../graphql-operations"

import { useMessageStore, useRoom } from '../store';

const { mutate } = useMutation(INSERT_MESSAGE)

const room = useRoom();
const messageStores = useMessageStore();

let messagesIn = '';

const MAX_ROWS = 5;
const textareaValue = ref('');
const numRows = ref(1);
const emits = defineEmits(['showModal']);

const handleInput = (event) => {
    const lineBreaks = (event.target.value.match(/\n/g) || []).length;
    numRows.value = Math.min(MAX_ROWS, Math.max(1, lineBreaks + 1));
};

const handleKeyDown = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
        event.preventDefault();
        handleTypeEnter();
    } else if (event.key === "Enter" && event.shiftKey) {
        textareaValue.value += "\n";
        handleInput(event);
    }
};

const handleTypeEnter = () => {
    const isiPesan = textareaValue.value
    textareaValue.value = ''
    const userDataJSON = localStorage.getItem('user');
    const userData = JSON.parse(userDataJSON);
    if (userData === null || !userData.name) {
        emits('showModal');
    }
    if (userData) {
        if (userData.name) {
            if (isiPesan) {
                messagesIn = messageStores.message;
                if (messagesIn) {
                    // simpan ke messageStores terlebih dahulu daripada database untuk instant ditampilkan di kolom pesan
                    const panjang = messagesIn.length
                    const latestId = messagesIn[panjang - 1].id
                    const instantMsg = [
                        {
                            "id": latestId + 1,
                            "message": isiPesan,
                            "username": userData.name,
                            "is_verified": false,
                            "color": userData.color,
                            "created_at": "",
                            "user_id": userData.id,
                            "q": "instantShow"
                        }
                    ];
                    messageStores.updateReceivedMessage(instantMsg);
                }
                mutate({
                    username: userData.name,
                    message: isiPesan,
                    color: userData.color,
                    room_id: room.selected,
                    user_id: userData.id
                })
                    .then(() => {
                        //success console.log('')
                    })
                    .catch((error) => {
                        console.log(error)
                    })
                    .finally(() => {
                        textareaValue.value = ''
                        numRows.value = 1;
                    });
            }
        }
    }
}
</script>
<template>
    <div class="flex items-end space-x-2">
        <textarea v-model="textareaValue" id="textareaValue" @input="handleInput" @keydown="handleKeyDown" type="text"
            placeholder="Ketik pesan" :class="{
                'w-full bg-stone-900 py-2 text-sm border border-stone-400': true,
                'rounded-2xl': numRows > 1,
                'rounded-lg': numRows === 1,
                'focus:ring-0 focus:border focus:border-lime-400 px-6 text-gray-300': true
            }" :rows="numRows"></textarea>
        <button @click="handleTypeEnter" :disabled="!messageStores.message"
            :class="`rounded-lg flex justify-center items-center p-[10px] ${!messageStores.message ? 'bg-sky-950' : 'bg-sky-800'}`">
            <template v-if="!messageStores.message">
                <Icon icon="mingcute:loading-fill" width="20" height="20" class="animate-spin text-sky-600" />
            </template>
            <template v-else>
                <Icon icon="carbon:send-filled" :class="`${!messageStores.message ? 'text-sky-800' : 'text-cyan-400'}`"
                    width="20" height="20" />
            </template>
        </button>
    </div>
</template>