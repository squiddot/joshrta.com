<template>
  <div>
    <div>
      <template v-for="(banner, b) in bannerBuilderBlocks">
        <BannerBuilder :key="b" :banner="banner" />
      </template>
      <PageBuilder :blocks="pageBuilderBlocks" />
    </div>
  </div>
</template>

<script>
export default {
  layout: process.env.DEFAULT_LAYOUT,
  props: {
    error: {
      type: Object,
      default() {
        return {}
      },
    },
  },
  computed: {
    statusCode() {
      return this.error?.statusCode || 500
    },
    message() {
      return this.error?.message
    },
    bannerBuilderBlocks() {
      try {
        if (this.statusCode === 404) {
          return this.$store.state.globals.sets.fourOFour.bannerBuilder
        }
        return this.$store.state.globals.sets.fiveHundred.bannerBuilder
      } catch (err) {
        return []
      }
    },
    pageBuilderBlocks() {
      try {
        if (this.statusCode === 404) {
          return this.$store.state.globals.sets.fourOFour.pageBuilder
        }
        return this.$store.state.globals.sets.fiveHundred.pageBuilder
      } catch (err) {
        return []
      }
    },
  },
}
</script>
