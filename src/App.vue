<template>
  <v-app>
    <LoadingScreen />
    <HeaderMenu />
    <ContentPage />
    <FooterLogo />

    <!--alert Popup-->
    <AlertMessage />
  </v-app>
</template>

<script>

import HeaderMenu from '@/components/layout/HeaderMenu.vue';
import ContentPage from '@/components/layout/ContentPage.vue';
import FooterLogo from '@/components/layout/FooterLogo.vue';
import LoadingScreen from '@/components/layout/LoadingScreen.vue';
import AlertMessage from '@/components/layout/AlertMessage.vue';

export default {
  name: 'App',
  components: {
    HeaderMenu,
    ContentPage,
    FooterLogo,
    LoadingScreen,
    AlertMessage,
  },
  created() {
    this.$store.dispatch('userProfile/searchUser');
  },
};
</script>

<style lang="scss">
  * {
    outline: none;
    box-sizing: border-box !important;
    padding: 0;
    margin: 0;
    border: 0;

    font-family: Oracle Sans, -apple-system, BlinkMacSystemFont, Segoe UI,
      Helvetica Neue, Arial, sans-serif !important;
  }

  // #region SCROLLBAR
  ::-webkit-scrollbar {
    width: 6px !important;
    height: 6px !important;
    background: rgba(37, 39, 42, 1);
  }

  /* Track */
  ::-webkit-scrollbar-track {
    background: #c5c5c5;
    border-radius: 15px !important;
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: #E3A665;
    -webkit-border-radius: 15px !important;
    border-radius: 15px !important;
    border: 0;
    border-style: solid;
    border-color: #9C9C9C;
  }

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: #E3A665;
  }
  // #endregion SCROLLBAR

  #app {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;

    display: grid;
    grid-template-columns: 100vw;
    grid-template-areas:
      "header"
      "content"
      "footer";
    font-family: Oracle Sans, -apple-system, BlinkMacSystemFont, Segoe UI,
      Helvetica Neue, Arial, sans-serif;
  }
</style>
