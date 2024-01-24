<template>
  <div id="app">
    <Header></Header>
    <router-view />
  </div>
</template>

<script>
import Header from './components/common/Header.vue'

export default {
  components: {
    'Header' : Header
  }
}
</script>

<style>
</style>
