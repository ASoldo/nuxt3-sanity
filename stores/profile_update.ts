import { defineStore } from 'pinia'
import { clearTimeout } from "timers";

export const useProfileUpdateStore = defineStore('profile_update', {
    state: () => {
        return { }
    },
    actions: {
        profileUpdated() {
        }
    },
})