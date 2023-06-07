export const useCounterStore = defineStore(
  "counter",
  () => {
    const count = ref(0);
    const name = ref("Eduardo");
    const doubleCount = computed(() => count.value * 2);
    const increment = () => {
      count.value++;
    };

    return { count, name, doubleCount, increment };
  },
  {
    persist: {
      storage: persistedState.cookiesWithOptions({
        sameSite: "strict",
      }),
    },
  }
);
