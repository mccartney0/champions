<template>
  <div class="footer d-flex align-center justify-center">
    <img src="@/assets/rgo-black-logo.svg" alt="RGO Logo">
  </div>
</template>

<script>
export default {
  name: 'FooterLogo',
};
</script>

<style lang="scss" scoped>
  .footer {
    grid-area: footer;
    width: 100%;
    padding: 100px 0 25px 0;
    background: #FFFFFF;

    img {
      width: max-content;
      height: 48px;
    }
  }
</style>
