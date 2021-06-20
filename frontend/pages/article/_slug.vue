<!--<template>-->
<!--  <div>-->
<!--    <h1>{{ article.title }}</h1>-->
<!--    <small>{{ article.uid }} | {{ article.id }}</small>-->
<!--    <div v-html="$sanitize(article.itemCopy)"></div>-->
<!--  </div>-->
<!--</template>-->

<!--<script>-->
<!--import gqlArticle from '~/gql/article.graphql'-->

<!--export default {-->
<!--  apollo: {-->
<!--    articles: {-->
<!--      query: gqlArticle,-->
<!--      prefetch: ({ route }) => ({ slug: route.params.slug }),-->
<!--      variables() {-->
<!--        return { slug: [this.$route.params.slug] }-->
<!--      },-->
<!--      // pollInterval: process.server ? false : 5000, // Auto update !-->
<!--    },-->
<!--  },-->
<!--  async asyncData({ app, route }) {-->
<!--    return {-->
<!--      headData: await app.seomaticMeta(route),-->
<!--    }-->
<!--  },-->
<!--  computed: {-->
<!--    article() {-->
<!--      if (this.articles) {-->
<!--        return this.articles[0]-->
<!--      }-->
<!--      return {}-->
<!--    },-->
<!--  },-->
<!--  head() {-->
<!--    return this.headData-->
<!--  },-->
<!--}-->
<!--</script>-->

<!--<style lang="scss" scoped></style>-->
