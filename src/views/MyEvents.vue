<template>
  <div class="wrapper-my-events d-flex flex-column align-center">
    <span class="text-title">Managing events</span>

    <div class="buttons-container d-flex justify-center">
      <v-btn
        :key="filter.value"
        v-for="filter in filters"
        :class="{'active': isSelectedFilter(filter.value)}"
        @click="setSelectedFilter(filter.value)"
      >
        {{ filter.label }}
      </v-btn>
    </div>

    <span class="text-section-title d-flex align-center">
      {{ events.length }} results found <div class="line"></div>
    </span>

    <div class="loading-container d-flex align-center justify-center" v-if="searching">
      <v-icon class="mr-4 mdi-spin" color="#000000">mdi-loading</v-icon> Loading
    </div>

    <CollapseEventCard
      :selectedFilterValue="selectedFilterValue"
      :events="events"
      @reload-events="getEvents"
      v-else
    />
  </div>
</template>

<script>
import CollapseEventCard from '@/components/my-events/CollapseEventCard.vue';

export default {
  name: 'MyEvents',
  components: {
    CollapseEventCard,
  },
  data: () => ({
    selectedFilterValue: '',
  }),
  computed: {
    filters() {
      return this.$store.state.myEvents.filters;
    },
    hasRequests() {
      return this.$store.state.userProfile.user.qtyPendingRequests > 0;
    },
    events() {
      return this.$store.state.myEvents.events;
    },
    searching() {
      return this.$store.state.myEvents.searching;
    },
  },
  methods: {
    isSelectedFilter(filterValue) {
      return filterValue === this.selectedFilterValue;
    },
    setSelectedFilter(filterValue) {
      this.selectedFilterValue = filterValue;
      this.getEvents();
    },
    getEvents() {
      this.$store.dispatch('myEvents/getEvents', this.selectedFilterValue);
    },
  },
  created() {
    this.setSelectedFilter(this.filters[0].value);

    if (this.hasRequests) {
      this.setSelectedFilter('Pending');
      this.getEvents();
    }
  },
};
</script>

<style lang="scss" scoped>
  .wrapper-my-events {
    width: 100%;
    padding: 40px 85px;

    .text-title {
      font-size: 1.5rem;
      color: #222222;
      font-weight: 700;
    }

    .buttons-container {
      width: 100%;
      margin: 40px 0 18px 0;

      .v-btn {
        min-width: 100px;
        width: max-content;
        padding: 0 5px;
        min-height: 34px;
        height: 34px;
        border-radius: 4px;
        background: #FFFFFF;
        color: #222222;
        box-shadow: unset;
        text-transform: capitalize;
        letter-spacing: normal;
        font-size: 0.75rem;
        font-weight: 700;
        border: 1px solid #F1F1F1;
        transition: all 0.25s ease;
        margin: 0 18px;

        &:hover {
          box-shadow: 0 0 16px rgba($color: #000000, $alpha: 0.1);
        }

        &.active {
          background: #3E968C;
          color: #FFFFFF;

        }

        &::before {
          display: none !important;
        }
      }
    }

    .text-section-title {
      width: 100%;
      font-size: 1.25rem;
      line-height: 1.25rem;
      white-space: nowrap;
      font-weight: 300;
      color: #222222;
      margin-bottom: 50px;

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
  }
</style>
