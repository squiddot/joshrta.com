<template>
  <picture v-observe-visibility="visibilityChanged">
    <source v-if="inView" :srcWebp="srcWebp" :srcset="srcsetWebp" type="image/webp" />
    <source v-if="inView" :src="src" :srcset="srcset" :type="srcType" />
    <img :class="{ blur: !inView }" :src="placeholder" :alt="alt" />
  </picture>
</template>

<script>
export default {
  props: {
    srcWebp: {
      type: String,
      default: '',
    },
    srcsetWebp: {
      type: String,
      default: '',
    },
    src: {
      type: String,
      default: '',
    },
    srcset: {
      type: String,
      default: '',
    },
    srcType: {
      type: String,
      default: '',
    },
    placeholder: {
      type: String,
      default: '',
    },
    alt: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      inView: false,
    }
  },
  methods: {
    visibilityChanged(isVisible) {
      if (isVisible) this.inView = true
    },
  },
}
</script>

<style scoped>
picture {
  width: 100%;
}
img {
  width: 100%;
  transition: 500ms;
}
.blur {
  filter: blur(8px);
}
</style>
