<template>
  <div class="card-event-container">
    <router-link
      class="wrapper-card-event d-flex flex-column"
      :to="`/event/details/${event.slug}`"
    >
      <figure class="image-container">
        <img
          class="background"
          :src="getEventPicture(event.image)"
          alt="Redwood event image"
        />

        <span class="lob d-flex align-center">{{ event.lob }}</span>

        <img
          v-if="event.featured"
          class="star"
          src="@/assets/home-view/star.svg"
          alt="Star Featured Event"
        />
      </figure>

      <div class="content-container d-flex flex-column">
        <span class="text-date d-flex align-center justify-space-between">
          {{ event.formattedStartDateTime }}

          <v-icon color="#BABABA">mdi-chevron-right</v-icon>

          {{ event.formattedEndDateTime }}
        </span>

        <div class="text-title-card">
          <span>
            {{ event.eventName }}
          </span>
        </div>

        <div class="divisor"></div>

        <div class="details-container d-flex justify-space-between">
          <span>Activities: {{ event.qtyActivities }}</span>

          <span>{{ event.eventType }}</span>
        </div>

        <div class="details-container d-flex justify-space-between mt-1">
          <span>Languages: {{ event.languages.join(', ') }}</span>
        </div>

        <span class="activities-list">
          {{ event.categories.join(', ') }}
        </span>
      </div>
    </router-link>
  </div>
</template>

<script>
import getFormattedUrlFiles from '@/mixins/getFormattedUrlFiles';

export default {
  name: 'CardEvent',
  mixins: [getFormattedUrlFiles],
  props: {
    event: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>

  .card-event-container {
    box-sizing: border-box;
    width: 240px;
    height: 315px;
    background: #FFFFFF;
    border-radius: 12px;
    box-shadow: unset;
    border: 1px solid #F1F1F1;
    transition: all 0.25s ease;
    overflow: hidden;
    margin: 1.5% 2.5%;

    .wrapper-card-event {
      text-decoration: none;
      color: #404040;
      width: 100%;
      height: 100%;

      .image-container {
        position: relative;
        width: 100%;
        height: 100px;
        background: #404040;

        .background {
          width: calc(100% + 2px);
          height: 100%;
          position: absolute;
          top: 0;
          left: 0;
          object-fit: cover;
        }

        .lob {
          position: absolute;
          bottom: 7.5%;
          left: 3.25%;
          height: 20px;
          padding: 0 2%;
          background: #FFFFFF;
          border-radius: 2px;
          padding: 0.5% 2.5%;
          font-size: 0.75rem;
        }

        .star {
          position: absolute;
          bottom: 7.5%;
          right: 3.25%;
          height: 20px;
          width: 20px;
        }
      }

      .content-container {
        padding: 3.25%;

        .text-date {
          color: #3E968C;
          font-weight: bold;
          font-size: 0.75rem;

          .v-icon {
            font-size: 0.75rem;
          }
        }

        .text-title-card {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          text-overflow: ellipsis;
          line-height: 1rem;
          overflow: hidden;
          width: 100%;
          min-height: 45px;
          height: 45px;
          max-height: 45px;
          margin: 5% 0 0 0;

          span {
            font-size: 0.9rem;
            font-weight: bold;
          }
        }

        .divisor {
          width: 100%;
          height: 1px;
          background: #F5F5F5;
          margin: 2.5% 0;
        }

        .details-container {
          width: 100%;
          margin: 0 0 1% 0;

          span {
            font-size: 0.9rem;
          }
        }

        .activities-list {
          margin-top: 5%;
          font-size: 0.8rem;
        }
      }
    }

    &:hover {
      box-shadow: 0 0 16px rgba($color: #000000, $alpha: 0.1);
    }
  }
</style>
