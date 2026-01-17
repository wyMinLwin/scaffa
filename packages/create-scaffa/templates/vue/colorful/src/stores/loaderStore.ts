import { defineStore } from "pinia";
import { ref } from "vue";

export const useLoaderStore = defineStore("loaderStore", () => {
    const isLoading = ref(false);

    const startLoading = () => {
        isLoading.value = true;
    }

    const stopLoading = () => {
        isLoading.value = false;
    }

    return {
        isLoading,
        startLoading,
        stopLoading
    }
})