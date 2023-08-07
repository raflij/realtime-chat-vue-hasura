<script setup>
import { Icon } from '@iconify/vue';
const emits = defineEmits(['showUsers']);
</script>
<template>
    <header class="relative bg-stone-950 border-b border-b-zinc-800">
        <div class="relative flex justify-between items-center md:justify-start md:items-start mx-auto max-w-[1244px] px-4 py-4 md:py-2">
            <div class="relative flex justify-start items-center">
                <h1 class="md:text-3xl text-xl text-gray-400 font-semibold">Real Time Chat App</h1>
            </div>
            <button @click="emits('showUsers')" class="md:hidden text-gray-300 flex justify-center items-center">
                <Icon icon="mdi:users" width="20" height="20" />
            </button>
        </div>
    </header>
</template>