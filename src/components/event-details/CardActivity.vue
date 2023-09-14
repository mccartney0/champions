<template>
  <div
    class="wrapper-card-activity d-flex flex-column"
    :class="{'disabled': !activity.active}"
  >
    <div class="button-container d-flex" v-if="activity.active">
      <v-tooltip top color="#222222">
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            @click="sendOutlookInvite()"
            :loading="sending"
            class="icon"
            v-bind="attrs"
            v-on="on"
          >
            <v-icon>mdi-calendar</v-icon>
          </v-btn>
        </template>

        <span>Add event to your outlook calendar</span>
      </v-tooltip>

      <v-btn @click="openAssociateEventModal()">
        Collaborate
      </v-btn>

      <v-btn v-if="isAdmin" @click="openAddExternalUserModal()">
        Add User
      </v-btn>
    </div>

    <div v-else-if="isAdmin && !activity.qtyViews" class="button-container d-flex justify-center">
      <v-btn @click="openInputViewsModal()">
        Input views
      </v-btn>
    </div>

    <div class="button-container d-flex justify-center" v-else-if="activity.qtyViews">
      {{ activity.qtyViews }} views
    </div>

    <span class="text-category d-flex align-center">
      {{ activity.category }} - {{ activity.type }} Event

      <img
        class="flag"
        v-if="activity.country"
        :src="getFlag(activity.country)"
        :alt="`Country ${activity.country}`"
      />
    </span>

    <span class="text-title d-flex">
      {{ activity.name }} <span class="text-languages">{{ activity.languages.join(', ') }}</span>
    </span>

    <span class="text-datetime d-flex">
      <span v-if="activity.formattedEndDateTime">Start time:</span>

      <strong>
        {{ activity.formattedStartDateTime }}
        {{ activity.timezone.split(' - ')[0] }}
      </strong>
    </span>

    <span class="text-datetime d-flex" v-if="activity.formattedEndDateTime">
      End time:

      <strong>
        {{ activity.formattedEndDateTime }}
        {{  activity.timezone.split(' - ')[0] }}
      </strong>
    </span>

    <span class="text-address d-flex" v-if="activity.type === 'In-Person'">
      <img
        src="@/assets/event-details/in-person.svg"
        :alt="`Activity in-person icon`"
      />

      Address:

      <span v-if="activity.formattedAddress">{{ activity.formattedAddress }}</span>

      <span v-else>Not defined Yet</span>
    </span>

    <span class="text-link d-flex" v-else>
      <img
        src="@/assets/event-details/online.svg"
        :alt="`Activity in-person icon`"
      />

      Link to access:

      <a target="_blank" :href="activity.link" v-if="activity.link">{{ activity.link }}</a>

      <span v-else>Not defined Yet</span>
    </span>

    <span class="text-position d-flex">
      {{ activity.position.users.length }}/{{ activity.position.qtyLimit }}

      {{ activity.position.name }}

      <span v-if="activity.position.users.length > 0">
        : <strong v-for="(user, index) in activity.position.users" :key="index">
          {{ user }}

          <v-icon
            v-if="externalUser(user)"
            small
          >
            mdi-account-voice
          </v-icon>

          •
        </strong>
      </span>
    </span>

    <p class="text-description">
      Description: {{ activity.description }}
    </p>
  </div>
</template>

<script>
import axios from 'axios';
import getFormattedUrlFiles from '@/mixins/getFormattedUrlFiles';
import externalUser from '@/mixins/externalUser';

export default {
  name: 'CardActivity',
  mixins: [getFormattedUrlFiles, externalUser],
  props: {
    activity: {
      type: Object,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  data: () => ({
    sending: false,
  }),
  methods: {
    openAssociateEventModal() {
      this.$store.dispatch('associateEvent/openModal', this.activity);
    },
    openInputViewsModal() {
      this.$store.dispatch('inputViews/openModal', this.activity.idActivity);
    },
    async sendOutlookInvite() {
      this.sending = true;

      try {
        await axios.post(`/activities/add-to-calendar/${this.activity.idActivity}`, {});

        const successMessage = 'This event has been added to your calendar!';
        this.$store.dispatch('alertMessage/createAlertMessage', { type: 'success', message: successMessage });
      } catch ({ response }) {
        const errorMessage = response.data.message || 'Error adding this event to your calendar!';
        this.$store.dispatch('alertMessage/createAlertMessage', { type: 'error', message: errorMessage });
      } finally {
        this.sending = false;
      }
    },
    openAddExternalUserModal() {
      this.$store.commit('associateEvent/SET_ACTIVITY', this.activity);
      this.$store.dispatch('modalsController/show', 'AddExternalUserModal', '');
    },
  },
};
</script>

<style lang="scss" scoped>
  @mixin text-default-layout{
    font-size: 0.875rem;
    color: #222222;
  }

  .wrapper-card-activity {
    margin-top: 15px;
    padding: 20px 28px 13px 28px;
    border: 1px solid #3D958B;
    border-radius: 4px;
    position: relative;

    .button-container {
      position: absolute;
      top: 10px;
      right: 23px;
      height: 34px;

      .v-btn {
        text-transform: capitalize;
        letter-spacing: normal;
        margin-left: 7px;
        min-width: max-content;
        height: 100%;
        border: 1px solid #F1F1F1;
        box-shadow: 0 0 16px rgba($color: #000000, $alpha: 0.1);
        transition: all 0.25s ease;
        background: #3D958B;
        color: #FFFFFF;
        font-size: 0.875rem;

        &.icon {
          min-width: 38px;
          width: 38px;
          background: #FFFFFF;
          color: #222222;
        }

        &:hover {
          box-shadow: unset;
        }

        &::before {
          display: none;
        }
      }
    }

    .text-category {
      @include text-default-layout;

      img {
        width: 25px;
        height: 13px;
        border-radius: 10px;
        margin-left: 10px;
      }
    }

    .text-title {
      line-height: 1.75rem;
      font-size: 1.5rem;
      color: #222222;
      font-weight: bold;
      margin: 6px 0 12px 0;

      .text-languages {
        line-height: 1.25rem;
        margin: 8px 0 0 16px;
        font-size: 1rem;
        font-weight: normal;
      }
    }

    .text-datetime {
      font-size: 0.875rem;
      color: #222222;

      strong {
        margin-left: 5px;
        font-weight: normal;
        color: #3D958B;
      }
    }

    .text-address {
      @include text-default-layout;
      margin: 15px 0;
      white-space: nowrap;

      img {
        margin-right: 10px;
        height: 18px;
      }

      span {
        margin-left: 5px;
        white-space: normal;
        word-break: break-all;
      }
    }

    .text-link {
      @include text-default-layout;
      margin: 15px 0;
      white-space: nowrap;

      img {
        margin-right: 10px;
        height: 18px;
      }

      span, a {
        color: #222222;
        margin-left: 6px;
        white-space: normal;
        word-break: break-all;
      }
    }

    .text-position {
      @include text-default-layout;
      margin-bottom: 10px;
    }

    .text-description {
      @include text-default-layout;
      line-height: 1.15rem;
    }

    &.disabled {
      border: 1px solid #F1F1F1;

      .text-datetime {
        color: #9B9B9A;

        strong {
          color: #9B9B9A;
        }
      }
    }
  }
</style>
