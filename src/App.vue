<script setup>
import { ref } from 'vue';
import Navbar from './components/Navbar.vue'
import LeftPanel from './components/LeftPanel.vue'
import Main from './components/Main.vue'
import Users from './features/Users.vue';
import { Icon } from '@iconify/vue';

const isUsersShow = ref(false);

const handleShowUsers = () => {
  isUsersShow.value = !isUsersShow.value;
}
</script>
<template>
  <div class="relative overflow-hidden h-screen">
    <Navbar @showUsers="handleShowUsers" />
    <div class="relative bg-stone-900 h-full">
      <div class="relative flex mx-auto h-full">
        <LeftPanel />
        <Main />
      </div>
      <div v-if="isUsersShow" class="md:hidden flex justify-start absolute bottom-0 left-0 right-0 top-0 z-20 bg-stone-900">
        <div class="relative w-full flex flex-col bg-stone-900/40 px-6 py-4">
          <div class="relative flex flex-none justify-between items-center pb-2">
            <div class="flex items-center justify-start py-2">
              <span class="mr-0">
                <div class="h-[1px] w-3 bg-gray-300"></div>
              </span>
              <span class="font-semibold uppercase text-xs text-gray-300 ">yang bergabung</span>
            </div>
            <button @click="isUsersShow = false" class="md:hidden flex justify-center items-center text-gray-500">
              <Icon icon="ic:round-close" width="22" height="22" />
            </button>
          </div>
          <Users />
          <div class="relative lg:h-[115px] h-[80px] w-full flex-none"></div>
        </div>
      </div>
    </div>
    <div class="hidden">
      <div class="flex items-center">
        <div class="bg-red-500"></div>
        <div class="bg-red-600"></div>
        <div class="bg-orange-500"></div>
        <div class="bg-orange-600"></div>
        <div class="bg-amber-500"></div>
        <div class="bg-amber-600"></div>
        <div class="bg-yellow-500"></div>
        <div class="bg-yellow-600"></div>
        <div class="bg-lime-500"></div>
        <div class="bg-lime-600"></div>
        <div class="bg-green-500"></div>
        <div class="bg-green-600"></div>
        <div class="bg-emerald-500"></div>
        <div class="bg-emerald-600"></div>
        <div class="bg-teal-500"></div>
        <div class="bg-teal-600"></div>
        <div class="bg-cyan-500"></div>
        <div class="bg-cyan-600"></div>
        <div class="bg-sky-500"></div>
        <div class="bg-sky-600"></div>
        <div class="bg-blue-500"></div>
        <div class="bg-blue-600"></div>
        <div class="bg-indigo-500"></div>
        <div class="bg-indigo-600"></div>
        <div class="bg-violet-500"></div>
        <div class="bg-violet-600"></div>
        <div class="bg-purple-500"></div>
        <div class="bg-purple-600"></div>
        <div class="bg-fuchsia-500"></div>
        <div class="bg-fuchsia-600"></div>
        <div class="bg-pink-500"></div>
        <div class="bg-pink-600"></div>
        <div class="bg-rose-500"></div>
        <div class="bg-rose-600"></div>
      </div>
    </div>
  </div>
</template>