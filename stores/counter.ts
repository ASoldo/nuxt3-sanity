export const useCounterStore = defineStore(
  "counter",
  () => {
    const count = ref(0);
    const name = ref("Eduardo");
    const doubleCount = computed(() => count.value * 2);
    const increment = () => {
      count.value++;
    };
    const $reset = () => {
      count.value = 0;
      name.value = "";
    };

    return { count, name, doubleCount, increment, $reset };
  },
  {
    persist: {
      storage: persistedState.cookiesWithOptions({
        sameSite: "strict",
      }),
    },
  }
);
