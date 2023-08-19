import { defineStore } from 'pinia'

export const useLoadingStore = defineStore('loading', {
    state: () => {
        return { loading: false }
    },
    actions: {
        toggleLoading() {
            this.loading = !this.loading;
        },
        showLoading() {
            this.loading = true;
        },
        hideLoading() {
            this.loading = false;
        },
    },
})