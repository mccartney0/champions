<template>
  <v-expansion-panels multiple flat :readonly="unselectedFilter">
    <v-expansion-panel
      :key="event.idEvent"
      v-for="event in events"
      class="wrapper-collapse-event-card"
      :class="{'disabled': event.alreadyHappened}"
    >
      <v-expansion-panel-header :v-ripple="false" class="d-flex justify-space-between">
        <div class="text-container d-flex flex-column">
          <span class="text-lob">{{ event.lob }}</span>

          <span class="text-title">{{ event.eventName }}</span>
        </div>

        <template v-slot:actions>
          <span
            class="text-views mt-2 mr-6"
            v-if="!event.allActivityViewsFilled && unselectedFilter"
          >
            Need to input views
          </span>

          <v-btn class="button-event-details" :to="`/event/details/${event.slug}`">
            Event detail
          </v-btn>

          <v-icon color="#222222" v-if="!unselectedFilter">
            mdi-chevron-down
          </v-icon>
        </template>
      </v-expansion-panel-header>

      <v-expansion-panel-content v-if="!unselectedFilter && event.requests">
         <v-data-table
          dense
          :headers="headers"
          :items="event.requests"
          :disable-pagination="true"
        >
          <template v-slot:[`item.email`]="{ item }">
            <div class="d-flex align-center py-2">
              <v-avatar color="#222222" size="34">
                <img
                  v-if="item.email"
                  :src="getUserPicture(item.email)"
                  :alt="`${item.firstName} Photo`"
                />
              </v-avatar>

              <span class="text-email-title mx-4">
                {{ item.email.replace(/@.*/, '').replaceAll('.', ' ') }}
              </span>

              <v-icon
                v-if="externalUser(item.email)"
                small
              >
                mdi-account-voice
              </v-icon>
            </div>
          </template>

          <template v-slot:[`item.createdOn`]="{ item }">
            <span class="text-created-on-title">
              {{ item.createdOn }}
            </span>
          </template>

          <template v-slot:[`item.position`]="{ item }">
            <span class="text-position-title">
              {{ item.position }}
            </span>
          </template>

          <template v-slot:[`item.activityName`]="{ item }">
            <div class="container-activity-name d-flex flex-column py-2">
              <span class="text-activity-name-text">
                {{ item.activityName }}
              </span>

              <span class="text-date-time-title d-flex align-center">
                {{ item.activityStartDateTime }}
                <v-icon color="#BABABA">mdi-chevron-right</v-icon>
                {{ item.activityEndDateTime }}
              </span>
            </div>
          </template>

          <template v-slot:[`item.action`]="{ item }">
            <div v-if="!event.alreadyHappened" class="buttons-container d-flex py-2">
              <v-btn
                class="button-approve"
                v-if="!isFilterApprovedSelected"
                :loading="sending"
                @click="approveRequest(item.idRequest)"
              >
                Approve
              </v-btn>

              <v-btn
                class="button-reject"
                v-if="!isFilterRejectSelected"
                :loading="sending"
                @click="rejectRequest(item.idRequest)"
              >
                Reject
              </v-btn>
            </div>
          </template>
        </v-data-table>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script>
import getFormattedUrlFiles from '@/mixins/getFormattedUrlFiles';
import externalUser from '@/mixins/externalUser';

export default {
  name: 'CollapseEventCard',
  mixins: [getFormattedUrlFiles, externalUser],
  props: {
    selectedFilterValue: {
      type: String,
      required: true,
    },
    events: {
      type: Array,
      required: true,
    },
  },
  computed: {
    sending() {
      return this.$store.state.myEvents.sending;
    },
    unselectedFilter() {
      return this.selectedFilterValue === '';
    },
    isFilterApprovedSelected() {
      return this.selectedFilterValue === 'Approved';
    },
    isFilterRejectSelected() {
      return this.selectedFilterValue === 'Rejected';
    },
    headers() {
      return [
        {
          text: 'Name',
          sortable: true,
          value: 'email',
        },
        {
          text: 'Subscribed on',
          sortable: true,
          value: 'createdOn',
        },
        {
          text: 'Position',
          sortable: true,
          value: 'position',
        },
        {
          text: 'Activity name',
          sortable: true,
          value: 'activityName',
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
    async approveRequest(idRequest) {
      await this.$store.dispatch('myEvents/updateRequestStatus', { idRequest, status: 'Approved' });
      await this.$store.dispatch('userProfile/searchUser', true);
      this.$emit('reload-events');
    },
    async rejectRequest(idRequest) {
      await this.$store.dispatch('myEvents/updateRequestStatus', { idRequest, status: 'Rejected' });
      await this.$store.dispatch('userProfile/searchUser', true);
      this.$emit('reload-events');
    },
  },
};
</script>

<style lang="scss">
  .wrapper-collapse-event-card {
    width: 100%;
    margin: 12px 0;
    padding: 5px;
    background: #FFFFFF;
    box-shadow: unset;
    border-radius: 6px;
    border: 1px solid #3E968C;
    transition: all 0.25s ease;

    &:hover {
      box-shadow: 0 0 16px rgba($color: #000000, $alpha: 0.1);
    }

    &.disabled {
      border: 1px solid #F1F1F1;
    }

    &.v-expansion-panel--active {
      background: #FCFCFC !important;
    }

    .v-expansion-panel-header {

      .text-container {
        width: max-content;
        height: 100%;

        .text-lob {
          font-size: 0.875rem;
          line-height: 1rem;
          color: #222222;
        }

        .text-title {
          font-size: 1rem;
          color: #222222;
          font-weight: 600;
        }
      }

      .text-views {
        font-weight: 600;
        color: #FB6464;
        font-size: 0.875rem;
      }

      .button-event-details {
        text-transform: capitalize;
        letter-spacing: normal;
        color: #222222;
        background: #FFFFFF;
        border: 1px solid #F1F1F1;
        min-height: 34px;
        height: 34px;
        transition: all 0.25s ease;
        box-shadow: unset;
        margin-right: 15px;

        &:hover {
          box-shadow:  0 0 16px rgba($color: #000000, $alpha: 0.1);
        }

        &::before {
          display: none !important;
        }
      }
    }

    .v-expansion-panel-content {

      .v-data-table {
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

          .text-email-title, .text-position-title {
            font-size: #222222;
            font-size: 0.875rem;
            text-transform: capitalize;
            white-space: nowrap;
          }

          .text-created-on-title {
            color: #222222;
            font-size: 0.75rem;
          }

          .container-activity-name {

            .text-activity-name-text {
              font-size: 0.75rem;
              color: #222222;
            }

            .text-date-time-title {
              font-size: 0.75rem;
              color: #3E968C;
              font-weight: 600;
              white-space: nowrap;

              .v-icon {
                font-size: 1rem;
              }
            }
          }

          .buttons-container {

            .v-btn {
              min-width: 80px;
              width: 80px;
              min-height: 34px;
              height: 34px;
              font-size: 0.75rem;
              color: #FFFFFF;
              box-shadow: unset;
              text-transform: capitalize;
              letter-spacing: normal;
              margin: 0 5px;

              &.button-approve {
                background: #3E968C;
              }

              &.button-reject {
                background: #FB6464;
              }
            }
          }
        }

        .v-data-footer {
          display: none;
        }
      }
    }
  }
</style>
