<script setup lang="ts">
interface Input {
  modelValue: string;
  labelText?: string;
  inputId?: string;
  classNameInput?: string;
  classNameLabel?: string;
  classNameInputWrapper?: string;
  typeInput?: string;
  placeholder?: string;
  error?: string;
}
const props = withDefaults(defineProps<Input>(), {
  typeInput: "text",
  classNameInput: "form-input",
  classNameLabel: "form-label",
  inputId: "default-input-id",
  error: "",
});

const emit = defineEmits(["update:modelValue"]);

const updateValue = (event: Event) => {
  const target = event.target as HTMLInputElement;
  emit("update:modelValue", target.value);
};
</script>

<template>
  <div :class="props.classNameInputWrapper">
    <label
      v-if="props.labelText"
      :class="props.classNameLabel"
      :for="props.inputId"
    >
      {{ props.labelText }}
    </label>

    <input
      :type="props.typeInput"
      :id="props.inputId"
      :class="[props.classNameInput, { error: error }]"
      :value="modelValue"
      :placeholder="props.placeholder"
      @input="updateValue"
    />
    <div v-if="error" class="error-message">
      {{ error }}
    </div>
  </div>
</template>

<style scoped>
label {
  position: absolute;
  top: 8px;
  left: 17px;
  font-size: 12px;
  color: #11111165;
}
input {
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
}

.error {
  border-color: red;
}
.error-message {
  width: 200px;
  color: red;
  font-size: 0.8em;
  margin-top: 4px;
}
</style>
