<template>
  <div
    class="wrapper-card-navigation-activity d-flex"
    @click="setSelectedActivityIndex(index)"
    @keydown="setSelectedActivityIndex(index)"
  >
    <div
      class="position-container d-flex"
      :class="{'active': selectedActivityIndex === index && isFormActivityActive}"
    >
      <span class="text-number-index">{{ index + 1 }}</span>
    </div>

    <div class="card-content-container d-flex flex-column">
      <div class="type-container d-flex align-center">
        <img
          v-if="activity.activityType"
          :src="require(`@/assets/event-details/${activity.activityType.toLowerCase()}.svg`)"
          :alt="`${activity.activityType} activity icon`"
        />

        Activity
      </div>

      <span class="text-title-activity" v-if="activity.name">{{ activity.name }}</span>

      <span class="text-title-activity" v-else>Activity name</span>
    </div>

    <div class="card-buttons-container d-flex flex-column justify-space-between align-end">
      <TooltipDefault
        :text="`
          This is an activity, select it and <br />
          fill up all the fields on <br />
          the right
        `"
      />

      <div class="buttons-container d-flex justify-end">
        <v-btn
          v-if="index !== 0"
          @click="removeActivityByIndex(index)"
        >
          <v-icon color="#222222">mdi-trash-can-outline</v-icon>
        </v-btn>

        <v-btn @click="duplicateActivityByIndex(index)">
          <v-icon color="#222222">mdi-content-duplicate</v-icon>
        </v-btn>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import TooltipDefault from '@/components/shared/TooltipDefault.vue';

export default {
  name: 'CardNavigationActivity',
  components: {
    TooltipDefault,
  },
  props: {
    index: {
      type: Number,
      required: true,
    },
    activity: {
      type: Object,
      required: true,
    },
  },
  computed: {
    selectedActivityIndex() {
      return this.$store.state.createEvent.selectedActivityIndex;
    },
    isFormActivityActive() {
      return !this.$store.state.createEvent.eventDisplayedController;
    },
  },
  methods: {
    setSelectedActivityIndex(index) {
      if (index !== this.selectedActivityIndex) {
        this.$store.commit('createEvent/SET_SELECTED_ACTIVITY_INDEX', index);
      }
      this.$store.commit('createEvent/SET_EVENT_DISPLAYED_CONTROLLER', false);
    },
    ...mapActions('createEvent', [
      'removeActivityByIndex',
      'duplicateActivityByIndex',
    ]),
  },
};
</script>

<style lang="scss" scoped>
  .wrapper-card-navigation-activity {
    width: 100%;
    max-width: 320px;
    height: 98px;
    margin: 10px 0;
    position: relative;
    cursor: pointer;

    .position-container {
      width: 10%;
      max-width: 32px;
      height: 100%;
      border-top-left-radius: 8px;
      border-bottom-left-radius: 8px;
      background: #FFFFFF;
      padding: 10px;

      .text-number-index {
        font-size: 0.75rem;
        color: #222222;
      }

      &.active {
        background: #3E968C;

        .text-number-index {
          font-size: 0.75rem;
          color: #FFFFFF;
        }
      }
    }

    .card-content-container {
      width: 62.5%;
      max-width: 200px;
      height: 100%;
      background: #FFFFFF;
      padding: 5px 0 5px 8px;

      .type-container {
        width: 100%;
        height: 26px;
        max-height: 26px;
        margin-bottom: 5px;
        font-size: 0.75rem;
        color: #222222;

        img {
          height: 16px;
          margin-right: 4px;
        }
      }

      .text-title-activity {
        font-size: 0.875rem;
        line-height: 0.875rem;
        font-weight: 700;
      }
    }

    .card-buttons-container {
      width: 27.5%;
      max-width: 88px;
      height: 100%;
      background: #FFFFFF;
      border-top-right-radius: 8px;
      border-bottom-right-radius: 8px;
      padding: 5px 5px 5px 0;

      .v-icon {
        font-size: 1.25rem;
        margin-right: 5px;
      }

      .buttons-container {
        width: 100%;

        .v-btn {
          min-width: 34px;
          width: 34px;
          min-height: 34px;
          height: 34px;
          background: #FFFFFF;
          box-shadow: 0 0 16px rgba($color: #000000, $alpha: 0.1);
          margin-left: 5px;

          .v-icon {
            margin: 0;
          }
        }
      }
    }
  }
</style>
