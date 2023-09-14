<template>
  <v-data-table
    dense
    :headers="headers"
    :items="activities"
    :disable-pagination="true"
    :item-class="getClassBasedStatus"
    class="my-activity-list"
  >
    <template v-slot:[`item.action`]="{ item }">
      <div class="d-flex align-center">
        <v-btn
          v-if="isApprovedOrParticipatedEvent(item.status)"
          :to="`/event/details/${item.slug}`"
        >
          View event
        </v-btn>

        <v-btn
          v-if="isRejectedEvent(item.status)"
          :href="`mailto:${item.admins.join(';')}`"
        >
          Contact
        </v-btn>

        <v-btn
          v-if="isPendingEvent(item.status)"
          @click="openWithdrawUserRequestModal(item.idRequest)"
        >
          Withdraw
        </v-btn>
      </div>
    </template>
  </v-data-table>
</template>

<script>
export default {
  name: 'ListMyActivities',
  props: {
    activities: {
      type: Array,
      required: true,
    },
  },
  computed: {
    headers() {
      return [
        {
          text: 'Event name',
          sortable: true,
          value: 'eventName',
          cellClass: 'text-container text-event-title',
        },
        {
          text: 'Activity name',
          sortable: false,
          value: 'activityName',
          cellClass: 'text-container text-regular-title',
        },
        {
          text: 'Activity date',
          sortable: true,
          value: 'formattedStartDateTime',
          cellClass: 'text-regular-title',
        },
        {
          text: 'Position',
          sortable: false,
          value: 'position',
          cellClass: 'text-regular-title',
        },
        {
          text: 'Status',
          sortable: true,
          value: 'status',
        },
        {
          text: 'Action',
          sortable: false,
          value: 'action',
        },
      ];
    },
  },
  methods: {
    getClassBasedStatus(item) {
      return item.status.toLowerCase();
    },
    isApprovedOrParticipatedEvent(status) {
      return status === 'Approved' || status === 'Participated';
    },
    isRejectedEvent(status) {
      return status === 'Rejected';
    },
    isPendingEvent(status) {
      return status === 'Pending';
    },
    openWithdrawUserRequestModal(idRequest) {
      this.$store.dispatch('withdrawUserRequest/openModal', idRequest);
    },
  },
};
</script>

<style lang="scss">
  .v-data-table.my-activity-list {
    margin-top: 15px;

    .v-data-table-header {
      box-shadow: 0 0 16px rgba($color: #000000, $alpha: 0.1) !important;

      tr {
        th {
          border-bottom: 1px solid #FFFFFF !important;
          background: #FFFFFF;
          font-size: 0.875rem;
          color: #222222;
          font-weight: normal;
          white-space: nowrap;

          &:nth-of-type(1){
            border-top-left-radius: 6px !important;
            border-bottom-left-radius: 6px !important;
          }

          &:nth-of-type(5){
            border-top-right-radius: 6px !important;
            border-bottom-right-radius: 6px !important;
          }
        }
      }
    }

    tbody {
      .approved {
        color: #3E968C;
      }

      .pending {
        color: #ECB22E;
      }

      .rejected {
        color: #FB6464;
      }

      .participated {
        color: #38507E;
      }

      .text-container {
        padding-top: 18px;
        padding-bottom: 18px;
        width: 275px;
        max-width: 275px;

        &.text-event-title {
          font-size: 1rem;
          color: #222222;
          font-weight: 600;
        }
      }

      .text-regular-title {
        font-size: 0.875rem;
        color: #222222;
      }

      .v-btn {
        min-width: 90px;
        width: 90px;
        min-height: 34px;
        height: 34px;
        background: #FFFFFF;
        border-radius: 4px;
        box-shadow: 0 0 16px rgba($color: #000000, $alpha: 0.1);
        text-transform: capitalize;
        letter-spacing: normal;
        font-size: 0.75rem;
        color: #222222;
        font-weight: 600;
      }
    }

    .v-data-footer {
      display: none;
    }
  }
</style>
