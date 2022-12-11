<script setup>
defineProps({
  title: {
    type: String,
    required: true,
  },
  count: {
    type: Number,
    default: 0
  },
});
</script>

<template>
  <h2>{{ title }}</h2>
  <p>count city : {{ count }}</p>
</template>

<style scoped></style>