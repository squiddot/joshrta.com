<template>
  <div>
    <h1>Toggle</h1>
    <button @click="toggleVisible">{{ isVisible ? 'Hide' : 'Show' }}</button>
    <Sidebar class="sidebar" :n-cloak="$cloak" :pose="isVisible ? 'visible' : 'hidden'">
      <Item v-for="item in items" :key="item" class="item" />
    </Sidebar>
    <h1>Appear</h1>
    <Sidebar
      v-observe-visibility="visibilityChanged"
      class="sidebar"
      :n-cloak="$cloak"
      :pose="isVisible2 ? 'visible' : 'hidden'"
    >
      <Item v-for="item in items" :key="item" class="item" />
    </Sidebar>
    <div class="copy">
      <div class="copy__wrapper">
        <h1>Test</h1>
        <p v-for="item in items" :key="item" :data-aos="aosAnims[item]" data-aos-offset="200" data-aos-delay="100">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus alias aliquam aliquid, aperiam atque
          blanditiis deleniti dicta dignissimos distinctio eligendi excepturi, maiores perspiciatis placeat quia quidem
          ratione sunt voluptate voluptates?
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import posed from 'vue-pose'

export default {
  components: {
    Sidebar: posed.div({
      visible: {
        opacity: 1,
        x: 0,
        beforeChildren: true,
        staggerChildren: 125,
      },
      hidden: {
        opacity: 0,
        x: '-100%',
        afterChildren: true,
        staggerChildren: 50,
        staggerDirection: -1,
      },
    }),
    Item: posed.div({
      hoverable: true,
      init: { scale: 1 },
      hover: { scale: 1.1 },
      pressable: true,
      press: { scale: 0.8 },
      visible: { opacity: 1, y: 0 },
      hidden: { opacity: 0, y: 20 },
    }),
  },
  data: () => ({
    isVisible: false,
    isVisible2: false,
    items: [0, 1, 2, 3, 4],
    aosAnims: ['fade-up', 'flip-up', 'slide-right', 'zoom-in', 'zoom-out'],
  }),
  computed: {
    process() {
      return process
    },
  },
  methods: {
    toggleVisible() {
      this.isVisible = !this.isVisible
    },
    visibilityChanged(isVisible, entry) {
      if (process.browser) {
        this.isVisible2 = isVisible
      }
    },
  },
}
</script>

<style lang="scss" scoped>
[n-cloak] {
  opacity: 0;
}

.sidebar {
  background: #54e365;
  padding: 20px;
}

.item {
  width: 300px;
  height: 50px;
  border-radius: 5px;
  background: #fff;
  margin-bottom: 10px;
}
.copy {
  margin-top: 512px;
  margin-bottom: 128px;
  background-color: #eee;

  padding: 32px;
  &__wrapper {
    max-width: 500px;
    margin-right: auto;
    margin-left: auto;
  }
  p {
    margin-top: 32px;
    padding: 12px 4px;
  }
}
</style>
