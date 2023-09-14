<template>
  <div class="wrapper-banner-introduction d-flex justify-center">

    <img
      class="background-image"
      src="@/assets/home-view/banner-introduction/waves.svg"
      alt="Background image gray waves"
    />

    <div class="content-container d-flex flex-column justify-center">
      <span class="text-title">Be an <strong>Ambassador</strong></span>

      <p class="text-description">
        One Oracle, Oracle values people who contribute to others and who
        share knowledge. Come to be an Ambassador, sign up to collaborate
        on events or share your content or certifications with us!
      </p>

      <v-btn to="#events">
        Discover events
      </v-btn>
    </div>

    <figure class="d-flex align-center justify-center">
      <img
        src="@/assets/home-view/banner-introduction/figure.svg"
        alt="Business man searching events"
      />
    </figure>

    <img
      class="scroll"
      src="@/assets/home-view/banner-introduction/scroll.svg"
      alt="scroll down to view events"
    />
  </div>
</template>

<script>
export default {
  name: 'BannerIntroduction',
};
</script>

<style lang="scss" scoped>
  .wrapper-banner-introduction {
    width: 100%;
    height: 100vh;
    max-height: 710px;
    padding: 0 10% 7.5%;
    position: relative;
    background: #F8F8F8;

    .background-image {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      object-fit: contain;
    }

    .content-container {
      width: 50%;
      max-width: 600px;

      .text-title {
        font-size: 3rem;
        font-weight: 700;
        color: #515151;

        strong {
          font-weight: 700;
          color: #3E968C;
        }
      }

      .text-description {
        width: 75%;
        margin: 30px 0 40px 0;
        color: #222222;
        font-size: 1rem;
      }

      .v-btn {
        min-height: 34px;
        height: 34px;
        min-width: 136px;
        width: 136px;
        background: #3E968C;
        border-radius: 6px;
        font-size: 0.75rem;
        text-transform: capitalize;
        letter-spacing: normal;
        color: #FFFFFF;
        box-shadow: unset;
      }
    }

    figure {
      width: 50%;
      max-width: 600px;

      img {
        width: 80%;
        object-fit: contain;
        object-position: center;
      }
    }

    .scroll {
      position: absolute;
      bottom: 12.5%;
    }
  }
</style>
