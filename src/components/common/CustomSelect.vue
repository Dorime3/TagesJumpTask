<template>
  <div class="custom-select-wrapper">
    <div class="custom-select" :class="{ open: isOpen }" @click="toggleSelect">
      <div class="custom-select__trigger">
        <div class="selected-option">{{ selectedOption }}</div>
        <div class="selected-actions">
          <div
            v-if="!!selectedOption"
            class="cross"
            @click.stop="removeCurrentOption"
          ></div>
          <div class="arrow"></div>
        </div>
      </div>
      <div class="custom-options" @blur="closeSelect" tabindex="-1">
        <div
          class="custom-option"
          v-for="({ label, value }, idx) in options"
          :key="idx"
          @click="selectedOption = value"
        >
          {{ label }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, computed, defineProps, defineEmits } from "vue";

interface Option {
  label: string;
  value: string;
}

interface Props {
  options: Array<Option>;
  modelValue: string;
}

const props = defineProps<Props>();
const emit = defineEmits(["update:modelValue"]);

const isOpen = ref(false);

const selectedOption = computed({
  get() {
    const [selected] = props.options.filter(
      (option) => option.value === props.modelValue
    );

    return selected?.label || "";
  },
  set(option) {
    emit("update:modelValue", option);
  },
});

const toggleSelect = () => {
  isOpen.value = !isOpen.value;
};

// const selectOption = (option: string) => {
//   selectedOption.value = option;
//   emit('update:modelValue', option);
// };

const removeCurrentOption = () => {
  selectedOption.value = "";
};

const closeSelect = () => {
  isOpen.value = false;
};

// watch(() => props.modelValue, (newValue: string) => {
//   selectedOption.value = newValue;
// });
</script>

<style scoped>
.custom-select-wrapper {
  position: relative;
  display: block;
}

.custom-select {
  position: relative;
  font-family: Arial, sans-serif;
  cursor: pointer;
  user-select: none;
}

.custom-select__trigger {
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 45px;
  padding: 10px;
  border-radius: 5px;
  background-color: #f2f2f2;
}

.custom-options {
  position: absolute;
  display: none;
  top: 100%;
  left: 0;
  right: 0;
  background-color: #fff;
  border: 1px solid #ccc;
  border-top: none;
  border-radius: 0 0 5px 5px;
  overflow: hidden;
  z-index: 1000;
}

.custom-option {
  padding: 10px;
  background-color: #fff;
  transition: background-color 0.3s;
}

.custom-option:hover {
  background-color: #4b98fd;
  color: #fff;
}

.custom-select.open .custom-options {
  display: block;
}
.selected-actions {
  display: flex;
  column-gap: 10px;

  .cross {
    width: 16px;
    height: 16px;
    background-image: url("../../assets/icons/cross.svg");
    background-size: contain;
    background-repeat: no-repeat;
    transition: transform 0.3s;
    background-position: center;
  }

  .arrow {
    width: 15px;
    height: 15px;
    background-image: url("../../assets/icons/shevron.svg");
    background-size: contain;
    background-repeat: no-repeat;
    transition: transform 0.3s;
    background-position: center;
    margin-bottom: 2px;
  }
}

.custom-select.open .arrow {
  transform: rotate(180deg);
}
</style>
