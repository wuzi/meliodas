<template>
  <div class="form-group">
    <div :class="hasIcon(icon)">
      <span v-if="iconDir === 'left'" class="input-group-text">
        <i :class="getIcon(icon)"></i>
      </span>
      <input
        :id="id"
        :type="type"
        class="form-control"
        :class="getClasses(size, success, error)"
        :name="name"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
        :placeholder="placeholder"
        :required="isRequired"
      />
      <span v-if="iconDir === 'right'" class="input-group-text">
        <i :class="getIcon(icon)"></i>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: "SoftInput",
  props: {
    size: {
      type: String,
      default: "default",
    },
    success: {
      type: Boolean,
      default: false,
    },
    error: {
      type: Boolean,
      default: false,
    },
    icon: {
      type: String,
      default: "",
    },
    iconDir: {
      type: String,
      default: "",
    },
    name: {
      type: String,
      default: "",
    },
    id: {
      type: String,
      default: "",
    },
    placeholder: {
      type: String,
      default: "Type here...",
    },
    type: {
      type: String,
      default: "text",
    },
    isRequired: {
      type: Boolean,
      default: false,
    },
    modelValue: {
      type: String,
      default: "",
    },
  },
  emits: ["update:modelValue"],
  methods: {
    getClasses: (size, success, error) => {
      let sizeValue, isValidValue;

      sizeValue = size ? `form-control-${size}` : null;

      if (error) {
        isValidValue = "is-invalid";
      } else if (success) {
        isValidValue = "is-valid";
      } else {
        isValidValue = "";
      }

      return `${sizeValue} ${isValidValue}`;
    },
    getIcon: (icon) => (icon ? icon : null),
    hasIcon: (icon) => (icon ? "input-group" : null),
  },
};
</script>
