<script setup>

import { ref } from "vue";

import Modal from './Modal.vue'
import Join from './Join.vue'
import SendMessage from './SendMessage.vue'

const showModal = ref(false);

const handleShowModal = () => {
    showModal.value = true;
};
</script>
<template>
    <div class="relative">
        <SendMessage @showModal="handleShowModal" />
    </div>
    <Teleport to="body">
        <!-- use the modal component, pass in the prop -->
        <Modal :show="showModal" @clickOutside="showModal = false">
            <template #content>
                <Join/>
            </template>
        </modal>
    </Teleport>
</template>