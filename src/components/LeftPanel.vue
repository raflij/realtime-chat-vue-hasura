<script setup>
import { Icon } from '@iconify/vue';
import { useRoom } from '../store';
const room = useRoom();
</script>
<template>
    <div
        class="lg:block hidden relative max-w-[350px] min-w-[310px] bg-gradient-to-br from-stone-800/80 to-transparent h-full border border-zinc-800 border-t-0 border-b-0">
        <div class="relative py-4 px-2">
            <div class="relative flex justify-start items-center">
                <p class="text-xs text-gray-400 flex items-center justify-start py-2">
                    <span class="mr-[1px]">
                        <Icon icon="icon-park-outline:right" width="16" height="16" />
                    </span>
                    <span class="font-semibold uppercase ">Available group</span>
                </p>
            </div>
            <div v-for="hasil in room.list" :key="hasil.id" class="relative flex flex-col justify-start mb-[2px]">
                <button @click="room.selectRoom(hasil.id)" class="p-2 rounded-md"
                    :class="room.selected === hasil.id ? 'bg-gradient-to-tl from-neutral-700/70 to-stone-900' : 'hover:bg-neutral-700/30'">
                    <p class="text-sm text-gray-300 flex items-center justify-start">
                        <span class="mr-1">
                            <Icon icon="system-uicons:globe" width="22" height="22" />
                        </span>
                        <span class="font-medium truncate">
                            {{ hasil.name }}
                        </span>
                    </p>
                </button>
            </div>
            <div class="relative text-white">
            </div>
        </div>
    </div>
</template>