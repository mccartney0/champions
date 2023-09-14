<template>
  <div class="wrapper-content-event-details d-flex flex-column">
    <div class="header-container d-flex">
      <figure class="icon-container d-flex align-center justify-center">
        <img
          src="@/assets/event-details/content-event-details/calendar.svg"
          alt="Calendar icon"
          v-if="!eventIsFinished"
        />

        <img
          src="@/assets/event-details/content-event-details/calendar-disabled.svg"
          alt="Calendar disabled icon"
          v-else
        />
      </figure>

      <div class="header-text-container d-flex flex-column">
        <div class="d-flex" :class="{'justify-space-between': event.qtyViews}">
          <span class="text-title-description d-flex align-center">
            {{ event.eventType }} Event - {{ event.lob }}
          </span>

          <span class="text-view" v-if="event.qtyViews">
            Total: {{ event.qtyViews }} views
          </span>
        </div>

        <span class="text-title">{{ event.eventName }}</span>

        <span
          class="text-title-datetime"
          :class="{'disabled': eventIsFinished}"
        >
          Start time:

          <strong>{{ event.formattedStartDateTime }}</strong>
        </span>

        <span
          class="text-title-datetime"
          :class="{'disabled': eventIsFinished}"
        >
          End time:

            <strong>{{ event.formattedEndDateTime }}</strong>
        </span>
      </div>
    </div>

    <p class="text-description">{{ event.description }}</p>

    <div v-if="event.active" class="button-container d-flex align-center justify-center">
      <v-btn @click="openModal()">
        Refer a friend
      </v-btn>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ContentEventDetails',
  props: {
    event: {
      type: Object,
      required: true,
    },
  },
  computed: {
    eventIsFinished() {
      return !this.event.active && this.event.qtyViews;
    },
  },
  methods: {
    openModal() {
      this.$store.dispatch('referFriend/openModal', this.event);
    },
  },
};
</script>

<style lang="scss" scoped>
  .wrapper-content-event-details {
    width: 100%;
    margin-bottom: 40px;

    .header-container {
      width: 100%;
      height: 95px;
      margin-bottom: 25px;

      .icon-container {
        width: 115px;
        height: 100%;

        img {
          width: 95px;
          height: 92px;
        }
      }

      .header-text-container {

        .text-title-description {
          text-transform: capitalize;
          font-weight: 600;
          color: #222222;

          img {
            margin-left: 18px;
            height: 13px;
            border-radius: 2px;
          }
        }

        .text-title {
          font-size: 1.5rem;
          line-height: 2rem;
          font-weight: 700;
          color: #222222;
        }

        .text-title-datetime {
          font-size: 1rem;
          line-height: 1.25rem;
          color: #222222;

          strong {
            font-weight: 600;
            color: #3D958B;
          }

          &.disabled {
            color: #9B9B9A;
            font-weight: 600;

            strong {
              color: #9B9B9A;
            }
          }
        }
      }
    }

    .text-description {
      font-size: 0.875rem;
      margin-bottom: 35px;
    }

    .button-container {
      width: 100%;
      height: 65px;
      background: #3E968C;
      border-radius: 4px;

      .v-btn {
        text-transform: capitalize;
        letter-spacing: normal;
        font-size: 0.875rem;
        color: #222222;
        min-width: 135px;
        min-height: 35px;
        height: 35px;
        box-shadow: 0 0 16px rgba($color: #000000, $alpha: 0.1);
        background: #FFFFFF;
      }
    }
  }
</style>
