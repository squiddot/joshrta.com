<template>
  <div>
    <h2>Articles</h2>
    <div v-for="article in articles" :key="article.id">
      <h1>
        <nuxt-link :to="'/' + article.uri">{{ article.title }}</nuxt-link>
      </h1>
      <code>{{ article.uid }}</code> | <code>{{ article.id }}</code>
      <div v-html="article.itemCopy"></div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    articles: {
      type: Array,
      default() {
        return []
      },
    },
  },
}
</script>

<style lang="scss" scoped></style>
