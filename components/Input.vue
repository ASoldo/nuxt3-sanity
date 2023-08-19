<template>
  <div class="flex flex-col md:flex-row md:items-center md:gap-4 self-center md:self-auto mb-4">
    <div class="text-white w-[120px] font-bold text-xl uppercase">
      {{ label }}
    </div>
    <div class="relative flex-1 flex items-center">
      <span v-if="icon" class="absolute inset-y-0 left-0 h-11 flex items-center pl-3">
        <i :class="'pi pi-fw ' + icon"></i>
      </span>
      <input
          :type="(type === 'password' && showPassword) ? 'text' : type"
          :placeholder="placeholder"
          :value="inputValue"
          @input="updateValue"
          :class="{'pl-10': icon}"
          :disabled="disabled"
          class="outline-none shadow bg-white border w-full py-2 px-3 text-kaufland-dark-red font-bold text-xl leading-tight focus:outline-none focus:shadow-outline"
      />
      <div
          class="text-2xl text-kaufland-dark-red -ml-8 relative"
          v-if="type === 'password'"
          @click="toggleShowPassword">
        <Transition>
          <i class="pi pi-eye absolute top-[-10px]" v-if="!showPassword"></i>
        </Transition>
        <Transition>
          <i class="pi pi-eye-slash absolute top-[-10px]" v-if="showPassword"></i>
        </Transition>
      </div>
    </div>
  </div>
</template>

<script>
import {ref} from 'vue';

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
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  setup(props, {emit}) {
    const inputValue = ref(props.modelValue);
    const showPassword = ref(false);

    const updateValue = (event) => {
      inputValue.value = event.target.value;
      emit('update:modelValue', inputValue.value);
    };

    const toggleShowPassword = () => {
      showPassword.value = !showPassword.value;
    }

    return {
      inputValue,
      showPassword,
      updateValue,
      toggleShowPassword
    };
  }
}
</script>

<style scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>