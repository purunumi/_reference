<template>
  <div id="wrap">
    <div id="header">
      <Header></Header>
    </div>
    <div id="container">
      <slot></slot>
    </div>
    <div id="footer"></div>
  </div>
</template>

<script>
import Header from './Header.vue'

export default {
  components: {
    Header
  }
}
</script>