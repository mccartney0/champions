<template>
  <div class="wrapper-aside-event-details">
    <div class="aside-event-details-container d-flex flex-column">
      <span v-if="event.hosts" class="text-title">
        Hosts of this event {{ event.hosts.length }}
      </span>

      <CardEventHost :host="host" v-for="host in event.hosts" :key="host" />

      <span class="text-title details">Details</span>

      <div class="details-list-container d-flex flex-column">
        <div class="detail-container d-flex align-center">
          <figure class="icon-container d-flex justify-center align-center">
            <img
              v-if="event.eventType"
              :src="require(
                `@/assets/event-details/${event.eventType.toLowerCase()}.svg`
              )"
              alt="Event type icon"
            />
          </figure>

          <span class="line-text">{{ event.eventType }}</span>
        </div>

        <div class="detail-container d-flex align-center">
          <figure class="icon-container d-flex justify-center align-center">
            <img
              src="@/assets/event-details/aside-event-details/event-category.svg"
              alt="Event category icon"
            />
          </figure>

          <span v-if="event.categories" class="line-text">{{ event.categories.join(', ') }}</span>
        </div>

        <div class="detail-container d-flex align-start">
          <figure class="icon-container d-flex justify-center align-center">
            <img
              src="@/assets/event-details/aside-event-details/event-people.svg"
              alt="People list event icon"
            />
          </figure>

          <ul class="people-list">
            <span v-if="event.contributors" class="list-title">
              Confirmed People: {{ event.contributors.length }}
            </span>

            <li
              v-for="(contributor, index) in event.contributors"
              :key="index"
              class="list-item"
            >
              {{ contributor }}
            </li>
          </ul>
        </div>

        <v-btn
          v-if="event.admin"
          class="button-edit"
          left
          :to="`/edit/event/${event.slug}`"
        >
          <v-icon>mdi-pencil-outline</v-icon> Edit
        </v-btn>
      </div>
    </div>
  </div>
</template>

<script>
import CardEventHost from '@/components/event-details/CardEventHost.vue';

export default {
  name: 'AsideEventDetails',
  components: {
    CardEventHost,
  },
  props: {
    event: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
  .wrapper-aside-event-details {
    width: 342px;
    max-width: 342px;
    max-height: max-content;
    padding: 23px 16px;
    border-radius: 30px;
    border: 1px solid #EEEEEE;
    position: fixed;

    .aside-event-details-container {
      max-height: 75vh;
      overflow-x: hidden;
      overflow-y: auto;

      .text-title {
        margin: 0 0 16px 12px;
        font-weight: bold;
        color: #222222;
      }

      .details {
        margin-top: 16px;
      }

      .detail-container {
        min-height: 30px;
        height: max-content;
        width: 100%;
        margin-bottom: 8px;

        .icon-container {
          width: 30px;
          margin-right: 6px;

          img {
            height: 20px;
          }
        }

        .line-text {
          max-width: 262px;
          font-size: 0.875rem;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .people-list {
          font-size: 0.875rem;
          list-style: none;
          padding: 0;
        }
      }

      .button-edit {
        margin: 50px;
        background: #ECB22E;
        color: #222222;
        text-transform: capitalize;
        letter-spacing: normal;
        font-size: 0.875rem;

        .v-icon {
          font-size: 1rem;
          margin-right: 5px;
          margin-left: -5px;
        }
      }
    }
  }
</style>
