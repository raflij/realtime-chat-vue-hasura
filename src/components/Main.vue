<script setup>
import { ref } from 'vue';
import { Icon } from '@iconify/vue';

import Message from '../features/Message.vue';
import MessageForm from '../forms/Message.vue';
import Users from '../features/Users.vue';

import { useRoom } from '../store';

const room = useRoom();

const isToggleMenuOpen = ref(false);

const toggleMenu = () => {
    isToggleMenuOpen.value = !isToggleMenuOpen.value;
};

const handleClick = (u) => {
    isToggleMenuOpen.value = false;
    room.selectRoom(u)
}
</script>
<template>
    <div class="relative w-full max-w-full flex justify-start">
        <div class="relative z-10 w-full max-w-full flex flex-col">
            <div class="flex-none relative flex justify-between items-center px-4
             border-b-zinc-800 border-b py-2 bg-gradient-to-tl from-neutral-700/70 to-stone-900">
                <div class="relative flex justify-start items-start">
                    <p class="text-xs text-gray-400 flex items-center justify-start py-2">
                        <span class="mr-2">
                            <Icon icon="system-uicons:globe"
                                class="text-gray-300 md:w-[28px] md:h-[28px] w-[24px] h-[24px]" />
                        </span>
                    <h1 class="md:text-xl text-base text-gray-200 font-semibold truncate">{{ room.list[room.selected -
                        1].name }}
                    </h1>
                    </p>
                </div>
                <button name="toggleMenu" @click="toggleMenu" class="md:hidden flex items-center justify-center">
                    <template v-if="isToggleMenuOpen">
                        <Icon icon="mingcute:up-line" class="text-gray-300 w-[24px] h-[24px]" />
                    </template>
                    <template v-if="isToggleMenuOpen === false">
                        <Icon icon="mingcute:down-line" class="text-gray-300 w-[24px] h-[24px]" />
                    </template>
                </button>
            </div>
            <div v-if="isToggleMenuOpen" class="absolute mt-[56px] w-full bg-stone-950 z-10 md:hidden block">
                <div class="relative w-full h-1 bg-cyan-600"></div>
                <div v-for="hasil in room.list" :key="hasil.id"
                    class="flex flex-col justify-start px-4 py-[2px] space-y-[2px] hover:bg-neutral-700/30">
                    <button @click="handleClick(hasil.id)" class="relative flex justify-start items-start">
                        <p class="text-xs text-gray-400 flex items-center justify-start py-2">
                            <span class="mr-2">
                                <Icon icon="system-uicons:globe" class="text-gray-300 w-[24px] h-[24px]" />
                            </span>
                        <h1 class="text-base text-gray-200 font-semibold">
                            {{ hasil.name }}</h1>
                        </p>
                    </button>
                </div>
            </div>
            <Message />
            <div class="relative lg:h-[140px] h-[185px] w-full flex-none"></div>
            <div class="w-full bottom-0 fixed left-0 right-0 flex flex-col items-center">
                <div class="relative flex w-full">
                    <div class="lg:inline hidden max-w-[360px] min-w-[320px]"></div>
                    <div class="w-full md:px-2 px-4 pb-[28px] lg:pb-[10px]">
                        <MessageForm />
                    </div>
                    <div class="lg:inline hidden max-w-[390px] min-w-[310px]"></div>
                </div>
                <div class="w-full">
                    <div class="bg-stone-800 w-full flex items-center justify-between py-2 px-6">
                        <div class="flex items-center justify-start hover:text-gray-100 text-gray-400">
                            <span class="mr-1"><Icon icon="mdi:web" /></span>
                            <a href="https://raflij.web.app" target="_blank" class="text-sm ">https://raflij.web.app</a>
                        </div>
                        <div class="flex items-center justify-start hover:text-gray-100 text-gray-400">
                            <span class="mr-1"><Icon icon="mdi:github" /></span>
                            <a href="https://github.com/raflij/realtime-chat-vue-hasura" target="_blank" class="text-sm ">Source Code</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div
            class="relative z-0 lg:flex flex-col hidden max-w-[380px] min-w-[300px] bg-gradient-to-tl from-stone-800/80 to-transparent px-6 py-4">
            <div class="relative flex flex-none justify-start items-center pb-2">
                <div class="flex items-center justify-start py-2">
                    <span class="mr-0">
                        <div class="h-[1px] w-3 bg-gray-300"></div>
                    </span>
                    <span class="font-semibold uppercase text-xs text-gray-300 ">yang bergabung</span>
                </div>
            </div>
            <Users />
            <div class="relative lg:h-[60px] h-[120px] w-full flex-none"></div>
        </div>
    </div>
</template>