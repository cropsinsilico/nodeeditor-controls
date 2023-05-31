<script setup lang="ts">
import { ref, watchEffect } from 'vue';
import type * as Rete from "rete";
import type { EventsTypes } from "rete/types/events";
import { defineProps, withDefaults } from 'vue';

interface Props {
  initialValue: number;
  ikey: string;
  reteEmitter?: Rete.Emitter<EventsTypes> | undefined;
  reteGetData?: (ikey: string) => number;
  retePutData?: (ikey: string, value: number) => void;
}

const props = withDefaults(defineProps<Props>(), {
  reteGetData: (ikey: string) => 0,
  retePutData: (ikey: string, value: number) => {
    return;
  },
  reteEmitter: undefined,
});

let currentValue = ref(props.initialValue ?? 0)

const change = (e: Event) => {
  currentValue.value = +(e.target as HTMLInputElement).value;
  update();
}

const update = () => {
  if (props.ikey) {
    props.retePutData?.(props.ikey, currentValue.value);
  }
  props.reteEmitter?.trigger("process");
}

watchEffect(() => {
  if (props.ikey && props.reteGetData)
    currentValue.value = props.reteGetData(props.ikey);
})
</script>

<template>
  <input
    type="number"
    @input="change($event)"
    @mousedown.stop
    v-model="currentValue"
  />
</template>
