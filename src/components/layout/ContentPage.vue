<template>
  <div class="wrapper-container d-flex justify-center">
    <div class="default-content-container">
      <v-main>
        <router-view></router-view>
      </v-main>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ContentPage',
};
</script>

<style lang="scss" scoped>
  .wrapper-container {
    grid-area: content;
    background-color: #fff;
    position: relative;
    padding: 0;
    min-width: 100vw;
    min-height: calc(100vh - 56px);

    .default-content-container {
      width: 100%;
      max-width: 1200px;
    }
  }
</style>
