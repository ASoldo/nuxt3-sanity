import { defineStore } from 'pinia'
import { clearTimeout } from "timers";

export const useLoginStore = defineStore('login', {
    state: () => {
        return { }
    },
    actions: {
        openLogin() {
            console.log("Login open")
        }
    },
})