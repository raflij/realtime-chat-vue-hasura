<script setup>
const { show } = defineProps(['show'])
</script>

<template>
    <Transition name="modal">
        <div v-if="show" @click="closeModal"
            class="bg-[#000000] bg-opacity-50 fixed z-[10] top-0 left-0 w-full h-full flex transition-opacity duration-100 ease-linear">
            <div @click.stop
                class="modal-container w-auto m-auto py-[20px] px-[30px] bg-gradient-to-br from-stone-950 to-zinc-800 rounded-md transition-all duration-100 ease">
                <slot name="content"></slot>
            </div>
        </div>
    </Transition>
</template>

<style>
.modal-enter-from {
    opacity: 0;
}

.modal-leave-to {
    opacity: 0;
}

.modal-enter-from .modal-container,
.modal-leave-to .modal-container {
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
}
</style>
<script>
export default {
    methods: {
        closeModal() {
            this.$emit('clickOutside')
        },
    },
}
</script>