<template>
  <div class="wrapper-aside-navigation d-flex flex-column">
    <span class="text-title">Create your event</span>

    <span class="text-title-section">Main event</span>

    <CardNavigationEvent />

    <span class="text-title-section d-flex">
      <v-icon color="#FFFFFF">mdi-alpha-l</v-icon>

      <span v-if="activities.length > 1">Activities</span>

      <span v-else>Activity</span>
    </span>

    <div class="activities-container d-flex flex-column">
      <CardNavigationActivity
        :key="index"
        v-for="(activity, index) in activities"
        :index="index"
        :activity="activity"
      />
    </div>

    <div class="button-container d-flex justify-center">
      <span class="text-disclaimer" v-if="activities.length === 0">
        When you create a new activity <br />
        it will be shown here
      </span>

      <v-btn @click="createNewActivity()" v-else right>
        <span>New activity</span>

        <v-icon color="#222222">mdi-plus</v-icon>
      </v-btn>
    </div>
  </div>
</template>

<script>
import CardNavigationEvent from '@/components/create-event/aside-navigation/CardNavigationEvent.vue';
import CardNavigationActivity from '@/components/create-event/aside-navigation/CardNavigationActivity.vue';

export default {
  name: 'AsideNavigation',
  components: {
    CardNavigationEvent,
    CardNavigationActivity,
  },
  computed: {
    activities() {
      return this.$store.state.createEvent.form.activities;
    },
  },
  methods: {
    createNewActivity() {
      this.$store.dispatch('createEvent/createNewActivity');
    },
  },
};
</script>

<style lang="scss" scoped>
  .wrapper-aside-navigation {
    max-width: 325px;
    width: 100%;

    .text-title {
      font-weight: 600;
      font-size: 1rem;
      color: #FFFFFF;
    }

    .text-title-section {
      font-size: 0.875rem;
      color: #FFFFFF;
      margin: 20px 0;

      .v-icon {
        font-size: 1.25rem;
        margin-right: 5px;
      }
    }

    .activities-container {
      width: 100%;
    }

    .button-container {
      width: 100%;
      margin: 34px 0;

      .text-disclaimer {
        width: 100%;
        text-align: center;
        color: rgba($color: #FFFFFF, $alpha: 0.65);
      }

      .v-btn {
        background: #FFFFFF;
        font-size: 0.875rem;
        color: #222222;
        letter-spacing: normal;
        text-transform: capitalize;
        min-width: 145px;
        width: 145px;
        min-height: 34px;
        height: 34px;

        span {
          margin-left: 10px;
        }

        .v-icon {
          margin-left: 8px;
        }
      }
    }
  }
</style>
