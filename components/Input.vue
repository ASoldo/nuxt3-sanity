<template>
  <div class="flex flex-col md:flex-row md:items-center gap-4 mb-4">
    <div class="text-white w-[120px] font-bold text-xl uppercase">
      {{ label }}
    </div>
    <div class="relative flex-1 flex items-center">
      <span v-if="icon" class="absolute inset-y-0 left-0 h-11 flex items-center pl-3">
        <i :class="'pi pi-fw ' + icon"></i>
      </span>
      <input
          :type="type"
          :placeholder="placeholder"
          :value="inputValue"
          @input="updateValue"
          :class="{'pl-10': icon}"
          class="outline-none shadow bg-white border w-full py-2 px-3 text-kaufland-dark-red font-bold text-xl leading-tight focus:outline-none focus:shadow-outline"
      />
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  name: 'Input',
  props: {
    modelValue: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'text'
    },
    placeholder: {
      type: String,
      default: ''
    },
    label: {
      type: String,
      default: ''
    },
    icon: {
      type: String,
      default: ''
    }
  },
  setup(props, { emit }) {
    const inputValue = ref(props.modelValue);

    const updateValue = (event) => {
      inputValue.value = event.target.value;
      emit('update:modelValue', inputValue.value);
    };

    return {
      inputValue,
      updateValue
    };
  }
}
</script>

<style scoped>
</style>
