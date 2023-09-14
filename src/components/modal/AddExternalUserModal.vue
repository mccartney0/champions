<template>
  <div class="wrapper-add-user-modal">
    <v-dialog
      v-model="display"
      width="600"
      @keydown.esc="closeModal"
      @click:outside="closeModal"
    >
      <v-card class="card-add-user-modal d-flex flex-column">
        <div class="d-flex justify-end">
          <v-btn icon @click="closeModal">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </div>

        <v-form v-model="valid" class="form-container d-flex flex-column">
          <div class="content-container d-flex flex-column">
            <span class="text-title">
              Please, enter the user e-mail to add in this activity,
              this action will be automatically approved.
            </span>

            <span class="text-input-label">
              User e-mail
            </span>

            <v-text-field
              dense
              solo
              v-model="email"
              :rules="emailRules"
            ></v-text-field>
          </div>

          <div class="buttons-container d-flex justify-space-between">
            <v-btn color="#CBCBCB" @click="closeModal">
              Cancel
            </v-btn>

            <v-btn
              :loading="sending"
              :disabled="!valid"
              class="send"
              color="#3E968C"
              @click="addExternalUser(email)"
            >
              Save
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
  name: 'AddExternalUserModal',
  data: () => ({
    email: '',
    emailRules: [
      (value) => !(value).includes('@oracle.com') || 'It must be an external e-mail',
      (value) => !!(value) || 'E-mail is required',
      (value) => /.+@.+\..+/.test(value) || 'E-mail must be valid',
    ],
    valid: true,
  }),
  computed: {
    sending() {
      return this.$store.state.modalsController.sending;
    },
    display() {
      return this.$store.state.modalsController.display.AddExternalUserModal;
    },
  },
  methods: {
    ...mapActions('associateEvent', ['addExternalUser']),
    closeModal() {
      this.$store.dispatch('modalsController/hide', 'AddExternalUserModal');
      this.email = '';
    },
  },
};
</script>

<style lang="scss" scoped>
  .card-add-user-modal {
    padding: 16px 20px;
    border-radius: 12px !important;

    .form-container {
      padding: 26px 65px;

      .content-container {
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
