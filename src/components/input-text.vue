<template>
  <v-field
    v-model="internalValue"
    :type="inputType"
    :name="name"
    :class="classValue"
    :placeholder="placeHolder"
    :rules="rules"
    :label="labelValue"
    @blur="$emit('blur')"
  ></v-field>
  <error-message :name="name" class="text-red-700 pl-2"></error-message>
</template>

<script setup lang="ts">
import { computed } from "vue";

const emit = defineEmits(["input"]);

const props = defineProps({
  modelValue: { type: [String, Number], default: "" },

  inputType: { type: String, required: true },

  name: { type: String, default: "" },

  classValue: { type: [String, Array], default: "" },

  placeHolder: { type: String, default: "" },

  labelValue: { type: String, default: "" },

  rules: { type: [String, Object], default: "" },
});

const internalValue = computed({
  get: () => {
    return props.modelValue;
  },
  set: (newVal) => {
    emit("input", newVal);
  },
});
</script>
