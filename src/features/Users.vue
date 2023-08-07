<script setup>
import { computed, reactive, ref } from 'vue'
import { useQuery } from "@vue/apollo-composable"
import { Icon } from '@iconify/vue';
import gql from 'graphql-tag'

const usersContainer = ref(null);

const state = reactive({
    limit: 100,
    users: [],
    receivedUsers: [],
})

const QUERY_GetUsers = gql`
query GetUsers($order_by: [chatting_users_order_by!] = {}, $offset: Int, $limit: Int) {
  chatting_users(order_by: $order_by, offset: $offset, limit: $limit) {
    id
    is_verified
    color
    username
    unique_id
  }
}
 `;

const { onResult, loading } = useQuery(
    QUERY_GetUsers,
    computed(() => ({
        limit: state.limit,
        order_by: {
            id: "asc",
        },
    }))
)

let previousLimit = state.limit
let initialUsersSet = false

onResult(({ data }) => {
    if (data)
        if (!initialUsersSet) {
            state.users = data.chatting_users
            initialUsersSet = true
        } else {
            if (state.limit != previousLimit) {
                state.users = [...data.chatting_users, ...state.receivedUsers]
                state.receivedUsers = []
            }
        }
});


const userDataJSON = localStorage.getItem('user');
const userData = JSON.parse(userDataJSON);
</script>
<template>
    <div ref="usersContainer"
        class="relative grow flex flex-col overflow-y-auto md:max-w-full max-w-[639px] pr-1 hide-scrollbar">
        <div class="relative flex flex-col space-y-[1px]">
            <div v-if="userData ? userData.name : null"
                class="bg-gradient-to-br from-stone-800/80 to-stone-700/70 relative flex items-center justify-start rounded-lg py-[6px] px-3">
                <div class="mr-3">
                    <div :class="`w-[32px] h-[32px] rounded-full ${userData.color} flex justify-center items-center`">
                        <span v-if="userData.name" class="font-semibold text-white text-base md:text-lg">
                            {{ userData.name.charAt(0) }}
                        </span>
                    </div>
                </div>
                <span class=" truncate  flex items-center justify-start">
                    <span class="text-lime-400 md:text-base text-sm font-medium truncate mr-1">{{ userData.name }}</span>
                    <span class="text-gray-400 md:text-sm text-xs"> -- You</span>
                </span>
            </div>
        </div>
        <div v-if="loading" class="flex mx-auto pt-2">
            <Icon icon="mingcute:loading-fill" width="28" height="28" class="animate-spin text-zinc-300" />
        </div>
        <div v-for="user in state.users" :key="user.id" class="relative flex flex-col space-y-[1px]">
            <div v-if="user.username !== (userData ? userData.name : null)"
                :class="user.username === (userData ? userData.name : null) ? 'bg-gradient-to-br from-stone-800/80 to-stone-700/70' : ''"
                class="relative flex items-center justify-start rounded-lg py-[6px] px-3">
                <div class="mr-3">
                    <div :class="`w-[32px] h-[32px] rounded-full ${user.color} flex justify-center items-center`">
                        <span v-if="user.username" class="font-semibold text-white text-base md:text-lg">
                            {{ user.username.charAt(0) }}
                        </span>
                    </div>
                </div>
                <span class="text-lime-400 md:text-base text-sm font-medium">
                    {{ user.username }}
                    <template v-if="user.username === (userData ? userData.name : null)">
                        <span class="text-gray-400 md:text-sm text-xs"> -- You</span>
                    </template>
                </span>
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