<script setup>
import { computed, reactive, nextTick, ref, watchEffect } from "vue"
import { Icon } from '@iconify/vue';

import gql from 'graphql-tag'
import { format, isToday, isYesterday } from 'date-fns';
import { useSubscription } from "@vue/apollo-composable"

import { useRoom, useMessageStore } from '../store';

const room = useRoom();
const msgStore = useMessageStore();

const messageContainer = ref(null);

const userDataJSON = localStorage.getItem('user');
const userData = JSON.parse(userDataJSON);

const SUBSCRIPTION_MESSAGE = gql`
subscription SUBSCRIPTION_MESSAGES($order_by: [chatting_messages_order_by!] = {}, $limit: Int, $offset: Int, $where: chatting_messages_bool_exp = {room_id: {_eq: ""}}) {
  chatting_messages(order_by: $order_by, limit: $limit, offset: $offset, where: $where) {
    id
    message
    username
    is_verified
    color
    created_at
    user_id
  }
}
 `;

const state = reactive({
    limit: 15,
    messages: msgStore.message,
    receivedMessages: msgStore.receivedMessage,
})

watchEffect(() => {
    const newValue = msgStore.receivedMessage;
    if (newValue) {
        if (newValue && newValue.length > 0 && (newValue[0].q || newValue[0].q === "instantShow")) {
            state.messages = insertMessageStore([...state.messages, ...newValue])
            scrollToBottom();
            state.receivedMessages = insertNewMessageStore([])
        } else {
        }
    }
    const selectedRoom = room.selected;
    const currentRoom = room.current;
    if (currentRoom !== selectedRoom) {
        state.limit = 15;
        previousLimit = 15;
    }
});

const sortMessagesByIdAsc = () => {
    state.messages.sort((a, b) => a.id - b.id);
};

const scrollToBottom = () => {
    nextTick(() => {
        const container = messageContainer.value;
        if (container) {
            container.scrollTop = container.scrollHeight;
        }
    });
}

const scrollToMessage = (id) => {
    if (messageContainer.value && state.messages.length > 0) {
        const lastMessageId = id;
        const lastMessageElement = document.getElementById(lastMessageId);
        if (lastMessageElement) {
            messageContainer.value.scrollTop = lastMessageElement.offsetTop;
        }
    }
};

let previousLimit = state.limit
let initialMessagesSet = false

const insertMessageStore = (value) => {
    msgStore.updateMessage(value);
    return value;
}
const insertNewMessageStore = (value) => {
    msgStore.updateReceivedMessage(value);
    return value;
}

let latest = 0;

const loadOlderMessage = () => {
    if (latest !== state.messages[0].id) {
        const container = messageContainer.value;
        if (container.scrollTop === 0) {
            state.limit += 5;
            latest = state.messages[0].id;
            scrollToMessage(latest);
        }
    }
};

const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    if (isToday(date)) {
        return 'Today at ' + format(date, 'h:mm a');
    } else if (isYesterday(date)) {
        return 'Yesterday at ' + format(date, 'h:mm a');
    } else {
        return format(date, 'MM/dd/yyyy h:mm a');
    }
}

const { onResult, loading } = useSubscription(
    SUBSCRIPTION_MESSAGE,
    computed(() => ({
        where: {
            "room_id": {
                "_eq": room.selected
            }
        },
        limit: state.limit,
        order_by: {
            created_at: "desc",
        },
    }))
)

onResult(({ data }) => {

    if (data.chatting_messages.length !== 0) {
        if (!initialMessagesSet) {
            state.messages = insertMessageStore(data.chatting_messages)
            initialMessagesSet = true
            scrollToBottom();
        } else {
            if (room.current !== room.selected) {
                room.updateCurrent(room.selected)
                state.messages = insertMessageStore(data.chatting_messages)
                initialMessagesSet = true
                scrollToBottom();
            } else {
                if (state.limit != previousLimit) {
                    // load old messages
                    state.messages = [...data.chatting_messages]
                    state.receivedMessages = []
                    previousLimit = state.limit
                } else {
                    // listen to a new messages
                    if (data.chatting_messages[0].username !== (userData ? userData.name : null) || data.chatting_messages[0].user_id !== (userData ? userData.id : null)) {
                        const panjang = state.messages.length;
                        const theData = data.chatting_messages;
                        const newIncomingMessage = ref();
                        newIncomingMessage.value = theData.filter((item) => item.id >= (state.messages[panjang - 1].id) + 1 && item.id <= data.chatting_messages[0].id);
                        if (!state.receivedMessages) {
                            state.receivedMessages = insertNewMessageStore(newIncomingMessage.value)
                        } else {
                            state.receivedMessages.push(insertNewMessageStore(newIncomingMessage.value))
                        }
                        state.messages = insertMessageStore([...state.receivedMessages, ...state.messages]);
                        state.receivedMessages = insertNewMessageStore('')
                        scrollToBottom();
                    } else {
                    }
                }
            }
        }
    } else {
        state.messages = '';
    }
    sortMessagesByIdAsc();
})
</script>
<template>
    <div ref="messageContainer" @scroll="loadOlderMessage"
        class="relative flex grow flex-col overflow-y-auto w-full px-4 py-2 space-y-4 hide-scrollbar">
        <div v-if="loading" class="w-full fixed left-0 right-0 flex items-center">
            <div class="lg:inline hidden max-w-[360px] min-w-[320px]"></div>
            <div class="w-full">
                <div class="flex justify-center">
                    <Icon icon="mingcute:loading-fill" width="28" height="28" class="animate-spin text-zinc-300" />
                </div>
            </div>
            <div class="lg:inline hidden max-w-[390px] min-w-[310px]"></div>
        </div>
        <div v-if="loading" class="h-[28px]">
        </div>
        <div v-for="message in state.messages" :key="message.id" :id="message.id"
            :class="`relative flex ${message.username === (userData ? userData.name : null) || message.user_id === (userData ? userData.id : null) ? 'justify-end' : 'justify-start'} items-end w-full`">
            <div v-if="message.username !== (userData ? userData.name : null) || message.user_id !== (userData ? userData.id : null)"
                class="mr-2">
                <div :class="`${message.color} w-[30px] h-[30px] rounded-full flex justify-center items-center`">
                    <span v-if="message.username" class="font-semibold text-white text-base uppercase">{{
                        message.username.charAt(0) }}</span>
                </div>
            </div>
            <div class="relative flex flex-col space-y-1">
                <p v-if="message.username !== (userData ? userData.name : null) || message.user_id !== (userData ? userData.id : null)"
                    class="pl-3 flex items-center justify-start">
                    <span class="text-sm text-lime-400 mr-2 font-semibold">{{ message.username }}</span>
                    <span class="text-xs text-gray-400">{{ formatDate(message.created_at) }}</span>
                </p>
                <div class="inline-flex">
                    <div class="inline-block bg-neutral-800 py-1 px-3 rounded-full">
                        <span class="text-sm text-gray-300 whitespace-pre-wrap">{{ message.message }}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<style>
/* Hide the default scrollbar */
.hide-scrollbar::-webkit-scrollbar {
    width: 7px;
    background-color: #666666;
}

/* Track */
.hide-scrollbar::-webkit-scrollbar-track {
    background: #515151;
}

/* Handle */
.hide-scrollbar::-webkit-scrollbar-thumb {
    background: #0c476e;
    border-radius: 0.25em;
}

/* Handle on hover */
.hide-scrollbar::-webkit-scrollbar-thumb:hover {
    background: #082f49;
}
</style>