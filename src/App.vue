<template>
  <div id="app">
    <top-bar></top-bar>
    <div id="content">
      <router-view/>
    </div>
  </div>
</template>

<script>
import TopBar from './components/TopBar'

export default {
  name: 'app',
  components: {TopBar}
}
</script>

<style>
  body {
    background-image: linear-gradient(to top, #37ecba 0%, #72afd3 100%);
    color: #eaeaea;
  }
  html {
    position: relative;
    min-height: 100%;
  }
  .main {
    margin-bottom: 30px;
    margin-top: 30px;
  }

  #content {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #ffffff;
    margin-top: 60px;
  }

  h1 {
    color: #ffffff;
  }
</style>
