<script setup lang="ts">
interface UButton {
  modelValue: string;
  BtnText?: string;
  classNameBtn?: string;
  classNameIcon?: string;
  icon?: string;
}

const props = defineProps({
  btnText: String,
  classNameBtn: String,
  classNameIcon: String,
  icon: String,
});

const emit = defineEmits(["update:click"]);
</script>

<template>
  <div>
    <button @click="$emit('update:click')" :class="props.classNameBtn">
      <span :class="props.classNameIcon" v-if="props.icon">{{
        props.icon
      }}</span>
      <span>{{ props.btnText }}</span>
    </button>
  </div>
</template>

<style scoped>
button {
  padding: 8px 16px;
  background-color: #01a7fd;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 5px;
}
</style>
