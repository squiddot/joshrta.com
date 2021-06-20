<template>
  <div>
    <Articles :articles="articles" />
    <h2>Entries</h2>
    <pre>{{ JSON.stringify(entries, null, 2) }}</pre>
  </div>
</template>

<script>
import Articles from '~/components/Articles'
import gqlArticles from '~/gql/articles.graphql'
import gqlEntries from '~/gql/entries.graphql'

export default {
  apollo: {
    articles: gqlArticles,
    entries: gqlEntries,
  },
  components: {
    Articles,
  },
  async asyncData({ app, route }) {
    return {
      headData: await app.seomaticMeta(route),
    }
  },
  data() {
    return {
      environment: process.env,
    }
  },
  head() {
    return this.headData
  },
}
</script>

<style lang="scss" scoped>
.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue',
    Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
