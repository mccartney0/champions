<template>
  <div class="wrapper-associate-event-modal" v-if="activity.idActivity">
    <v-dialog
      v-model="display"
      width="600"
    >
      <v-card class="card-associate-event-modal d-flex flex-column">
        <div class="d-flex justify-end">
          <v-btn icon @click="closeModal()">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </div>

        <div class="content-container d-flex">
          <span class="text-title">
            You are registering in the {{ eventName }} - {{ activity.name }}
            activity to be a <strong>{{ activity.position.name }}</strong> and need
            an <strong>authorization</strong> by the <strong>host</strong>
          </span>
        </div>

        <div class="buttons-container d-flex justify-space-between">
          <v-btn color="#CBCBCB" @click="closeModal()">
            No
          </v-btn>

          <v-btn class="send" color="#3E968C" @click="sendRequest()" :loading="sending">
            Yes
          </v-btn>
        </div>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'AssociateEventModal',
  props: {
    eventName: {
      type: String,
      default: '',
      required: true,
    },
  },
  computed: {
    sending() {
      return this.$store.state.modalsController.sending;
    },
    display: {
      get() {
        return this.$store.state.modalsController.display.AssociateEventModal;
      },
      set(value) {
        const controller = { name: 'AssociateEventModal', value };
        this.$store.commit('modalsController/SET_DISPLAY_BY_MODAL_NAME', controller);
      },
    },
    activity() {
      return this.$store.state.associateEvent.activity;
    },
  },
  methods: {
    ...mapActions('associateEvent', [
      'closeModal',
      'sendRequest',
    ]),
  },
};
</script>

<style lang="scss" scoped>
  .card-associate-event-modal {
    padding: 16px 20px;
    border-radius: 12px !important;

    .content-container {
      padding: 86px 9px;

      .text-title {
        font-size: 1.5rem;
        color: #222222;
        text-align: center;
      }
    }

    .buttons-container {
      margin: 0 88px 50px;

      .v-btn {
        min-width: 144px;
        width: 144px;
        min-height: 34px;
        height: 34px;
        text-transform: capitalize;
        letter-spacing: normal;
        font-size: 0.875rem;

        &.send {
          color: #FFFFFF;
        }
      }
    }
  }
</style>
