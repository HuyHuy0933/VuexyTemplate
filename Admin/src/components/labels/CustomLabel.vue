<template>
  <label :for="forLabel">
    {{ text }}
    <span v-if="required" style="color: red">*</span>
  </label>
</template>

<script src="./CustomLabel.ts"></script>
