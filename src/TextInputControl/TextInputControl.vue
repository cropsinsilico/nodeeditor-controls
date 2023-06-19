<script setup lang="ts">
import { ref, watchEffect } from "vue";
import type * as Rete from "rete";
import type { EventsTypes } from "rete/types/events";

interface Props {
  initialValue: string;
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

const currentValue = ref("" + (props.initialValue || ""));

const change = (e: Event) => {
  currentValue.value = (e.target as HTMLInputElement).value;
  update();
};

const update = () => {
  if (props.ikey) {
    props.retePutData?.(props.ikey, Number(currentValue.value));
  }
  // props.reteEmitter?.trigger("process");
};

const emit = defineEmits(["update:currentValue"]);
defineExpose({ currentValue });

watchEffect(() => {
  if (props.ikey && props.reteGetData) {
    const data = props.reteGetData(props.ikey);
    emit("update:currentValue", data !== undefined ? data.toString() : "");
  }
});
</script>

<template>
  <input
    type="text"
    @input="change($event)"
    @mousedown.stop
    v-model="currentValue"
  />
</template>
