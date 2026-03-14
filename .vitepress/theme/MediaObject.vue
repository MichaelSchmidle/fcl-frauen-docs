<script setup>
defineProps({
  image: { type: String, default: '' },
  alt: { type: String, default: '' },
  size: { type: Number, default: 120 },
  round: { type: Boolean, default: false },
})
</script>

<template>
  <div class="media-object">
    <img
      v-if="image"
      :src="image"
      :alt="alt"
      :width="size"
      :height="size"
      :class="['media-image', { round }]"
    />
    <div class="media-body">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.media-object {
  display: flex;
  align-items: flex-start;
  gap: 24px;
  margin: 24px 0;
}

.media-image {
  flex-shrink: 0;
  object-fit: cover;
}

.media-image.round {
  border-radius: 50%;
}

.media-body {
  flex: 1;
  min-width: 0;
}

.media-body :deep(h2) {
  margin-top: 0;
  border-top: none;
  padding-top: 0;
}

.media-body :deep(p) {
  margin: 4px 0;
}

@media (max-width: 480px) {
  .media-object {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
}
</style>
