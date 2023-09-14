<template>
  <div class="wrapper-withdraw-user-request-modal">
    <v-dialog
      v-model="display"
      width="600"
    >
      <v-card class="card-withdraw-user-request-modal d-flex flex-column">
        <div class="d-flex justify-end">
          <v-btn icon @click="closeModal()">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </div>

        <div class="content-container d-flex">
          <span class="text-title d-flex flex-column justify-center">
            Do you really want to cancel <br />
            your subscription? <br />
            <strong>You can not undo this action</strong>
          </span>
        </div>

        <div class="buttons-container d-flex justify-space-between">
          <v-btn class="black--text" color="#CBCBCB" @click="closeModal()">
            No
          </v-btn>

          <v-btn
            :loading="sending"
            color="#FB6464"
            @click="withdrawRequest()"
          >
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
  name: 'WithdrawUserRequestModal',
  computed: {
    sending() {
      return this.$store.state.modalsController.sending;
    },
    display: {
      get() {
        return this.$store.state.modalsController.display.WithdrawUserRequestModal;
      },
      set(value) {
        const controller = { name: 'WithdrawUserRequestModal', value };
        this.$store.commit('modalsController/SET_DISPLAY_BY_MODAL_NAME', controller);
      },
    },
  },
  methods: {
    ...mapActions('withdrawUserRequest', [
      'closeModal',
      'withdrawRequest',
    ]),
  },
};
</script>

<style lang="scss" scoped>
  .card-withdraw-user-request-modal {
    padding: 16px 20px;
    border-radius: 12px !important;

    .content-container {
      padding: 86px 9px;

      .text-title {
        width: 100%;
        font-size: 1.625rem;
        line-height: 2rem;
        color: #222222;
        text-align: center;

        strong {
          margin-top: 15px;
          font-size: 1.25rem;
          color: #FB6464;
          font-weight: normal;
        }
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
        color: #FFFFFF;
      }
    }
  }
</style>
