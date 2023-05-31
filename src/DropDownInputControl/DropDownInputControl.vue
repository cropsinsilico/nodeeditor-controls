<script setup lang="ts">
import { ref, onMounted } from 'vue';
import type * as Rete from "rete";
import type { EventsTypes } from "rete/types/events";
import { defineProps, withDefaults } from 'vue';

interface Option {
  text: string;
  value: string;
}

interface Props {
  ikey: string;
  options?: Option[];
  reteEmitter?: Rete.Emitter<EventsTypes> | undefined;
  reteGetData?: (ikey: string) => string;
  retePutData?: (ikey: string, value: string) => void;
}

const props = withDefaults(defineProps<Props>(), {
  options: () => [
    { text: "x_dimension", value: "x_dimension" },
    { text: "y_dimension", value: "y_dimension" },
    { text: "z_dimension", value: "z_dimension" },
  ],
  reteGetData: (ikey: string) => "",
  retePutData: (ikey: string, value: string) => {
    return;
  },
  reteEmitter: undefined,
});

let currentValue = ref(props.options[0].value)

const change = (e: Event) => {
  currentValue.value = (e.target as HTMLSelectElement).value;
  update();
}

const update = () => {
  if (props.ikey) {
    props.retePutData?.(props.ikey, currentValue.value);
  }
  props.reteEmitter?.trigger("process");
}

onMounted(() => {
  if (props.ikey && props.reteGetData)
    currentValue.value = props.reteGetData(props.ikey);
})
</script>

<template>
  <select v-model="currentValue" @change="change">
    <option v-for="option in options" :key="option.value" :value="option.value">
      {{ option.text }}
    </option>
  </select>
</template>
