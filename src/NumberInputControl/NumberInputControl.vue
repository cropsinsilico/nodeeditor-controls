<script setup lang="ts">
import { ref, watchEffect } from 'vue';
import type * as Rete from "rete";
import type { EventsTypes } from "rete/types/events";

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

const currentValue = ref(props.initialValue ?? 0)

//detect any changes happen from the interface
const change = (e: Event) => {
  currentValue.value = +(e.target as HTMLInputElement).value;
  update();
}

const update = () => {
  if (props.ikey) {
    props.retePutData?.(props.ikey, currentValue.value);
  }
  // props.reteEmitter?.trigger("process");
};

// this will monitor any potentail changes to the ikey
// which come from python
watchEffect(() => {
  if (props.ikey) {
    emit("update:initialValue", currentValue.value);
  }
});

const emit = defineEmits(["update:initialValue"]);
</script>

<template>
  <input
    type="number"
    @input="change($event)"
    @mousedown.stop
    v-model="currentValue"
  />
</template>
