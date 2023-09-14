<template>
  <div class="wrapper-home d-flex flex-column align-center">
    <BannerIntroduction />

    <div class="max-width-content-container d-flex flex-column">

      <FiltersEvent id="events" />

      <div v-if="searching" class="search-container d-flex align-center justify-center">
        <v-icon class="mr-2 mdi-spin" color="#000000">mdi-loading</v-icon> Loading
      </div>

      <div v-else class="search-container d-flex flex-column">
        <span class="text-title">{{ formattedTextTitle }}</span>

        <div class="card-container d-flex flex-wrap"  v-if="events.length > 0">
          <CardEvent :event="event" :key="index" v-for="(event, index) in events" />
        </div>

        <div
          class="not-found-container d-flex flex-column align-center"
          v-else
        >
          <img src="@/assets/home-view/background-cards.svg" alt="" />

          <span class="message-text-title">Nothing to see here!</span>

          <span class="message-text-description">Your search is empty, try with other filters</span>

          <v-btn class="clear-button" @click="$store.dispatch('eventSearch/resetSearchParams')">
            clear filter <v-icon>mdi-trash-can-outline</v-icon>
          </v-btn>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BannerIntroduction from '@/components/home-view/BannerIntroduction.vue';
import FiltersEvent from '@/components/home-view/FiltersEvent.vue';
import CardEvent from '@/components/home-view/CardEvent.vue';

export default {
  name: 'HomeView',
  components: {
    BannerIntroduction,
    FiltersEvent,
    CardEvent,
  },
  computed: {
    searching() {
      return this.$store.state.eventSearch.searching;
    },
    events() {
      return this.$store.state.eventSearch.events;
    },
    formattedTextTitle() {
      let textTitle = `${this.events.length} results found`;
      if (this.events.length === 1) {
        textTitle = `${this.events.length} result found`;
      }
      return textTitle;
    },
  },
  created() {
    this.$store.dispatch('eventSearch/searchEvents');
  },
};
</script>

<style lang="scss">
  .page--home {

    .default-content-container {
      max-width: 100% !important;

      .wrapper-home {
        width: 100%;

        .max-width-content-container{
          max-width: 1200px;
          padding: 2.5% 0;

          .search-container {
            width: 100%;
            margin-top: 3.5%;
            font-size: 1.5rem;

            .v-icon {
              font-size: 2rem;
            }

            .text-title {
              margin-left: 2.5%;
              font-size: 1.25rem;
              color: #222222;
            }

            .card-container {
              margin-top: 2.5%;
              width: 100%;
            }

            .not-found-container {
              margin-top: 2.5%;
              width: 100%;

              .message-text-title {
                margin-top: 2.5%;
                font-size: 1.5rem;
                line-height: 1rem;
                color: #222222;
                font-weight: bold;
              }

              .message-text-description {
                margin: 1% 0 1.5% 0;
                font-size: 1.5rem;
                color: #8E8E8E;
              }

              .clear-button {
                min-width: 100px;
                width: max-content;
                max-width: max-content;
                min-height: 35px;
                height: 35px;
                font-size: 0.9rem;
                color: #222222;
                text-transform: capitalize;
                letter-spacing: normal;
                background: #FFFFFF;
                box-shadow: 0px 0px 16px rgba($color: #000000, $alpha: 0.1);
                transition: all 0.25s ease;
                border-radius: 6px;

                .v-icon {
                  margin-left: 5%;
                  font-size: 1.5rem;
                }

                &:hover {
                  background: #3E968C;
                  color: #FFFFFF;
                }
              }
            }
          }
        }
      }
    }
  }
</style>
