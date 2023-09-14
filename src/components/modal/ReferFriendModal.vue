<template>
  <div class="wrapper-popup-container">
    <v-dialog
      v-model="display"
      width="600"
    >
      <v-card class="card-refer-friend-modal d-flex flex-column">
        <div class="d-flex justify-end">
          <v-btn icon @click="closeModal()">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </div>

        <v-form v-model="valid" class="form-container d-flex flex-column">
          <div class="content-container d-flex flex-column">
            <span class="text-title">
              Refer a friend to participate in this event!
            </span>

            <span class="text-input-label">
              E-mail
            </span>

            <v-text-field
              dense
              solo
              v-model="email"
              :rules="emailRules"
            ></v-text-field>
          </div>

          <div class="buttons-container d-flex justify-space-between">
            <v-btn color="#CBCBCB" @click="closeModal()">
              Cancel
            </v-btn>

            <v-btn
              :loading="sending"
              :disabled="!valid"
              class="send"
              color="#3E968C"
              @click="sendRequest(email)"
            >
              Send
            </v-btn>
          </div>
        </v-form>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'ReferFriendModal',
  data: () => ({
    email: '',
    emailRules: [
      (value) => !!value || 'This field is required',
      (value) => value.slice((value.length - 11), value.length).toLowerCase() === '@oracle.com' || 'Use your Oracle corporate email',
    ],
    valid: true,
  }),
  computed: {
    sending() {
      return this.$store.state.modalsController.sending;
    },
    display: {
      get() {
        return this.$store.state.modalsController.display.ReferFriendModal;
      },
      set(value) {
        const controller = { name: 'ReferFriendModal', value };
        this.$store.commit('modalsController/SET_DISPLAY_BY_MODAL_NAME', controller);
      },
    },
  },
  watch: {
    display() {
      this.email = '';
    },
  },
  methods: {
    ...mapActions('referFriend', [
      'closeModal',
      'sendRequest',
    ]),
  },
};
</script>

<style lang="scss">

  .card-refer-friend-modal {
    padding: 16px 20px;
    border-radius: 12px !important;

    .form-container {
      padding: 26px 65px;

      .content-container {
        padding: 0 48px 34px 48px;

        .text-title {
          font-size: 1.5rem;
          color: #222222;
          text-align: center;
        }

        .text-input-label {
          font-size: 1rem;
          color: #222222;
          margin: 40px 0 5px 0;
        }

        .v-input {

          .v-input__control {

            .v-input__slot {
              box-shadow: 0 0 16px rgba($color: #000000, $alpha: 0.1);
            }
          }
        }
      }

      .buttons-container {
        margin: 16px 0;

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
  }
</style>
