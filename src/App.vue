<template>
  <div id="app">
    <div v-if="!isLoggedIn" class="landing-home">
      <navigation-home/>
    </div>
    <div v-if="isLoggedIn"  class="landing-sigin">
      <navigation-signin/>
    </div>
    <router-view/>
  </div>
</template>

<script>
import NavigationHome from './components/navigation/navigationHome.vue'
import NavigationSignin from './components/navigation/navigationSignin.vue'

export default {
  components: {
    NavigationHome,
    NavigationSignin,
  },
  name: 'App',

  computed:{
    isLoggedIn: function() {
      if (this.$store.getters.authStatus == "success" &&
          this.$store.getters.authStatus)
      {
        return true;
      }
        return false;
    }
  }
}
</script>

