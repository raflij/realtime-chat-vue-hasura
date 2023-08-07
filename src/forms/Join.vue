<script setup>
import { ref } from "vue";
import { useMutation } from "@vue/apollo-composable"
import { INSERT_USER } from "../graphql-operations"


const name = ref('');
const errorMessage = ref('');
const buttonText = ref('Join');

const { mutate, loading } = useMutation(INSERT_USER);

// Generate a random user ID
const generateRandomNumber = () => {
    const min = 1000;
    const max = 9999;
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Generate a random background color
const generateRandomColor = () => {
    const color = ['red', 'orange', 'amber', 'yellow', 'lime', 'green', 'emerald', 'teal', 'cyan', 'sky', 'blue', 'indigo', 'violet', 'purple', 'fuchsia', 'pink', 'rose']
    const num = [500, 600];
    const randomIcolor = Math.floor(Math.random() * color.length);
    const randomInum = Math.floor(Math.random() * num.length);
    return `${color[randomIcolor]}-${num[randomInum]}`;
}

const handleJoin = () => {
    if (name.value !== "") {
        if (name.value.length < 4) {
            errorMessage.value = 'Minimal terdiri dari 4 karakter'
        } else {
            buttonText.value = 'Please wait...'
            loading.value = true;
            const randomColor = `bg-${generateRandomColor()}`;
            // save user to database
            mutate({
                username: name.value,
                unique_id: generateRandomNumber(),
                color: randomColor
            })
                .then(() => {
                    // save user at localStorage
                    localStorage.setItem('user', JSON.stringify({ name: name.value, id: generateRandomNumber(), color: randomColor }));
                })
                .catch((error) => {
                    errorMessage.value = error
                })
                .finally(() => {
                    window.location.reload();
                });
        }
    } else {
        errorMessage.value = 'Harus diisi untuk bergabung'
    }
};
</script>
<template>
    <form @submit.prevent="handleJoin">
        <div class="text-cyan-400 font-semibold text-xl flex justify-center items-center">
            <h1>Bergabung ke dalam obrolan</h1>
        </div>

        <div class="my-[25px] flex flex-col justify-start items-start">
            <div class="w-full">
                <input autocomplete="off" v-model="name" type="text" id="name" placeholder="Masukkan nama..."
                    :class="{ 'bg-zinc-600 opacity-30': loading }" :disabled="loading"
                    class=" text-white w-full bg-zinc-900 py-2 text-base shadow-xl border border-slate-300/60 rounded-md focus:ring-2 focus:border-cyan-400 px-6">
            </div>
            <div class="pt-1" v-if="errorMessage">
                <p class="font-semibold text-rose-700 text-base">{{ errorMessage }}</p>
            </div>
        </div>

        <div class="flex justify-center items-center">
            <button type="submit" :class="{ 'opacity-50': loading }" :disabled="loading"
                class="bg-cyan-400 py-2 px-3 rounded-lg text-white font-bold transition-opacity duration-200">
                {{ buttonText }}
            </button>
        </div>
    </form>
</template>