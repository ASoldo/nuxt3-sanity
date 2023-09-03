<template>
  <div class="flex flex-col md:flex-row md:items-center md:gap-4 self-center md:self-auto mb-4">
    <div class="text-white w-full md:w-[120px] font-kaufland-bold text-xl uppercase">
      {{ label }}
    </div>
    <div class="relative flex-1 flex"
         v-if="!readonly">
      <span v-if="icon" class="absolute inset-y-0 left-0 h-11 flex items-center pl-3">
        <i :class="'pi pi-fw ' + icon"></i>
      </span>
      <input
          ref="input"
          :type="(type === 'password' && showPassword) ? 'text' : type"
          :placeholder="placeholder"
          :value="modelValue"
          @input="$emit('update:modelValue', $event.target.value)"
          :class="{'pl-10': icon, 'bg-gray-200 disabled': disabled, 'rounded-r-none': type === 'password'}"
          :disabled="disabled"
          class="outline-none shadow bg-white border w-full py-2 px-3 text-kaufland-dark-red font-kaufland-bold text-xl leading-tight focus:outline-none focus:shadow-outline"
      />
      <div
          class="text-2xl text-kaufland-dark-red flex bg-gray-100 items-center border border-left-none px-1 relative w-[36px]"
          v-if="type === 'password'"
          @click="toggleShowPassword">
        <Transition>
          <i class="pi pi-eye absolute" v-if="!showPassword"></i>
        </Transition>
        <Transition>
          <i class="pi pi-eye-slash absolute" v-if="showPassword"></i>
        </Transition>
      </div>
    </div>
    <div class="text-xl font-kaufland-bold" v-if="readonly">
      {{modelValue}}
    </div>
  </div>
</template>

<script setup>
import {ref} from 'vue';

const input = ref("");

const props = defineProps({
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
  },
  readonly: {
    type: Boolean,
    default: false
  }
})
const emit = defineEmits(['update:modelValue'])
const showPassword = ref(false);

const toggleShowPassword = () => {
  showPassword.value = !showPassword.value;
}

onMounted(() => {
  const inputValue = input.value.value;
  if(inputValue) {
    props.modelValue =  input.value.value
    emit('update:modelValue', input.value.value);
  }
})
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

.disabled {
  -webkit-text-fill-color: rgba(130, 0, 1, 0.6);
  color: rgba(130, 0, 1, 0.6);
  opacity: 1; /* required on iOS */
}
input::-ms-reveal {
  display:none;
}
</style>