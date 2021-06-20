<template>
  <div>
    <div v-for="(block, b) in page.pageBuilder" :key="b">
      <div v-if="block.typeHandle === 'copy'">
        <h1>{{ block.itemHeadline }}</h1>
        <div v-html="$sanitize(block.itemCopy)"></div>
      </div>
      <div v-else-if="block.typeHandle === 'image'">
        <div class="images">
          <Picture
            v-for="image in block.image"
            :key="image.id"
            :src-webp="image.thumbnail.srcWebp"
            :srcset-webp="image.thumbnail.srcsetWebp"
            :src="image.thumbnail.src"
            :srcset="image.thumbnail.srcset"
            :src-type="image.mimeType"
            :placeholder="image.thumbnail.placeholderImage"
            :alt="image.alt"
          />
        </div>
      </div>
      <div v-if="block.typeHandle === 'form'">
        <h1 v-if="block.itemHeadline">{{ block.itemHeadline }}</h1>
        <Form :form-handle="camelCase(block.form)" />
      </div>
    </div>
  </div>
</template>

<script>
import Picture from '~/components/Picture'
import Form from '~/components/Form'
import gqlPage from '~/gql/page.graphql'

export default {
  apollo: {
    pages: {
      query: gqlPage,
      prefetch: ({ route }) => ({ slug: route.params.slug }),
      variables() {
        return { slug: [this.$route.params.slug] }
      },
      // pollInterval: process.server ? false : 5000, // Auto update !
    },
  },
  components: {
    Picture,
    Form,
  },
  async asyncData({ app, route }) {
    return {
      headData: await app.seomaticMeta(route),
    }
  },
  computed: {
    page() {
      if (this.pages) {
        return this.pages[0]
      }
      return {}
    },
  },
  head() {
    return this.headData
  },
}
</script>

<style lang="scss">
.images {
  width: 800px;
  display: flex;
}
</style>
