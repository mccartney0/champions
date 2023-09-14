<template>
  <div
    class="wrapper-card-navigation-event d-flex"
    @click="setDisplayFormEvent()"
    @keydown="setDisplayFormEvent()"
  >
    <figure class="image-container">
      <img
        v-if="image"
        :src="getEventPicture(image)"
        alt="Event image"
      />
    </figure>

    <div class="card-content-container d-flex flex-column justify-center">
      <span class="text-lob">
        <span v-if="lob">{{ lob }}</span>

        <span v-else>LOB</span>
      </span>

      <span class="text-event-name">
        <span v-if="eventName">{{ eventName }}</span>

        <span v-else>Event Name</span>
      </span>

      <div class="tooltip-container">
        <TooltipDefault
          :text="`
            This is the main event, add the <br />
            general information about <br />
            your event
          `"
        />
      </div>
    </div>
  </div>
</template>

<script>
import TooltipDefault from '@/components/shared/TooltipDefault.vue';
import getFormattedUrlFiles from '@/mixins/getFormattedUrlFiles';

export default {
  name: 'CardNavigationEvent',
  components: {
    TooltipDefault,
  },
  mixins: [getFormattedUrlFiles],
  computed: {
    eventName() {
      return this.$store.state.createEvent.form.eventName;
    },
    lob() {
      return this.$store.state.createEvent.form.lob;
    },
    image() {
      return this.$store.state.createEvent.form.image;
    },
  },
  methods: {
    setDisplayFormEvent() {
      this.$store.commit('createEvent/SET_EVENT_DISPLAYED_CONTROLLER', true);
    },
  },
};
</script>

<style lang="scss" scoped>
  .wrapper-card-navigation-event {
    width: 100%;
    max-width: 320px;
    height: 98px;
    position: relative;
    cursor: pointer;

    .image-container {
      border-top-left-radius: 8px;
      border-bottom-left-radius: 8px;
      background: #404040;
      width: 60px;
      height: 100%;
      overflow: hidden;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }

    .card-content-container {
      width: calc(100% - 60px);
      background: #FFFFFF;
      border-top-right-radius: 8px;
      border-bottom-right-radius: 8px;
      padding: 5px 20px;

      .text-lob {
        font-size: 0.875rem;
        margin-bottom: 3px;
        color: #222222;
        text-transform: capitalize;
      }

      .text-event-name {
        font-size: 1rem;
        line-height: 1.25rem;
        color: #222222;
        font-weight: 600;
      }
    }

    .tooltip-container {
      position: absolute;
      top: 5px;
      right: 5px;
      width: min-content;
      height: min-content;
    }
  }
</style>
