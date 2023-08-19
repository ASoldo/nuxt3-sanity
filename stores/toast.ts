import { defineStore } from 'pinia'
import { clearTimeout } from "timers";

export const useToastStore = defineStore('toast', {
    state: () => {
        return { toastText: null }
    },
    actions: {
        showToast(text = "Uspjeh") {
            this.toastText = text;
            setTimeout(() => {
                this.toastText = null;
            }, 5000);
        },
        closeToast() {
            this.toastText = null;
        }
    },
})