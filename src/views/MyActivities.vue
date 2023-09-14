<template>
  <div class="wrapper-my-activities d-flex flex-column align-center">
    <span class="text-title">My activities</span>

    <span class="text-section-title d-flex align-center">
      {{ activities.length }} subscriptions found <div class="line"></div>
    </span>

    <div class="loading-container d-flex align-center justify-center" v-if="searching">
      <v-icon class="mr-4 mdi-spin" color="#000000">mdi-loading</v-icon> Loading
    </div>

    <div class="content-container" v-else-if="activities.length > 0">
      <ListMyActivities :activities="activities" />
    </div>

    <div class="not-found-container d-flex flex-column align-center" v-else>
      <img
        src="@/assets/my-activities/background-cards.svg"
        alt="Activities redwood image"
      />

      <span class="text-title-not-found">Nothing to see here!</span>

      <span class="text-subtitle-not-found">
        When you register for an event, it will appear here
      </span>

      <v-btn left to="/">
        <v-icon>mdi-arrow-left</v-icon> Discover events
      </v-btn>
    </div>

    <WithdrawUserRequestModal />
  </div>
</template>

<script>
import ListMyActivities from '@/components/my-activities/ListMyActivities.vue';
import WithdrawUserRequestModal from '@/components/modal/WithdrawUserRequestModal.vue';

export default {
  name: 'MyActivities',
  components: {
    ListMyActivities,
    WithdrawUserRequestModal,
  },
  computed: {
    activities() {
      return this.$store.state.myActivities.activities;
    },
    searching() {
      return this.$store.state.myActivities.searching;
    },
  },
};
</script>

<style lang="scss" scoped>
  @mixin text-default {
    font-size: 1.5rem;
    color: #222222;
    font-weight: 700;
  }

  .wrapper-my-activities {
    width: 100%;
    padding: 40px 85px;

    .text-title {
      @include text-default;
    }

    .text-section-title {
      width: 100%;
      font-size: 1.25rem;
      line-height: 1.25rem;
      white-space: nowrap;
      font-weight: 300;
      color: #222222;
      margin: 40px 0;

      .line {
        width: 100%;
        height: 1px;
        background: #F1F1F1;
        margin-left: 15px;
      }
    }

    .loading-container {
      width: 100%;
      margin-top: 3.5%;
      font-size: 1.5rem;
    }

    .content-container {
      width: 100%;
    }

    .not-found-container {
      margin-top: 15vh;
      width: 100%;

      img {
        height: 50px;
        object-fit: contain;
        object-position: center;
        margin-bottom: 36px;
      }

      .text-title-not-found {
        @include text-default;
      }

      .text-subtitle-not-found {
        font-size: 1.5rem;
        color: #8E8E8E;
      }

      .v-btn {
        margin-top: 30px;
        min-width: 150px;
        width: max-content;
        min-height: 34px;
        height: 34px;
        background: #FFFFFF;
        border-radius: 4px;
        box-shadow: 0 0 16px rgba($color: #000000, $alpha: 0.1);
        text-transform: capitalize;
        letter-spacing: normal;
        font-size: 0.875rem;

        .v-icon {
          font-size: 1rem;
          margin-right: 5px;
        }
      }
    }
  }
</style>
