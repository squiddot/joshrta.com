<template>
  <div>
    <nuxt-logo />
    <h1 class="title">
      nuxt-testing
    </h1>
    <h2 class="subtitle">
      My rad Nuxt.js project
    </h2>
    <div class="links">
      <a href="https://nuxtjs.org/" target="_blank" class="button--green">
        Documentation
      </a>
      <a href="https://github.com/nuxt/nuxt.js" target="_blank" class="button--grey">
        GitHub
      </a>
      <button class="button--grey" @click="toastTest">Toast Test</button>
    </div>
    <responsive-table :table-data="tableData" :flip="false" :min-width="700" />
    <responsive-table :table-data="tableData" />
  </div>
</template>

<script>
import NuxtLogo from '~/assets/svgs/nuxt.svg?inline'
import ResponsiveTable from '~/components/ResponsiveTable'

export default {
  components: {
    NuxtLogo,
    ResponsiveTable,
  },
  // async asyncData({ app, route }) {
  //   return {
  //     headData: await app.seomaticMeta(route),
  //   }
  // },
  data() {
    return {
      tableData: {
        columns: ['First Name', 'Last Name', 'Age', 'Column 4', 'Column 5', 'Column 6', 'Column 7', 'Column 8'],
        rows: [
          ['John', 'Doe', 34, 'test', 'test', 'test', 'test', 'test'],
          ['Jane', 'Doe', 32, 'test', 'test', 'test', 'test', 'test'],
          ['Steve', 'Smith', 12, 'test', 'test', 'test', 'test', 'test'],
        ],
      },
    }
  },
  methods: {
    toastTest() {
      // this.$toasted.global.myError()
      this.$toast.show('Test toast...', {
        action: [
          {
            text: 'Cancel',
            onClick: this.toastCancel,
          },
        ],
      })
    },
    toastCancel(e, toastObject) {
      toastObject.goAway(0)
      this.$toast.global.myError()
    },
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
