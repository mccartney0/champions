<template>
  <div class="wrapper-input-views-modal">
    <v-dialog
      v-model="display"
      width="600"
    >
      <v-card class="card-input-views-modal d-flex flex-column">
        <div class="d-flex justify-end">
          <v-btn icon @click="closeModal()">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </div>

        <v-form v-model="valid" class="form-container d-flex flex-column">
          <div class="content-container d-flex flex-column">
            <span class="text-title">
              Please, enter the number of views
              that this activity had
            </span>

            <span class="text-input-label">
              Number of views
            </span>

            <v-text-field
              dense
              solo
              v-model="views"
              type="number"
              :rules="numberRules"
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
              @click="sendRequest(views)"
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
  name: 'InputViewsModal',
  data: () => ({
    views: 0,
    numberRules: [
      (value) => !!value || 'This field is required',
      (value) => !Number.isNaN(parseFloat(value)) || 'This value is not a number',
      (value) => value > 0 || 'This value needs to be positive',
    ],
    valid: true,
  }),
  computed: {
    sending() {
      return this.$store.state.modalsController.sending;
    },
    display: {
      get() {
        return this.$store.state.modalsController.display.InputViewsModal;
      },
      set(value) {
        const controller = { name: 'InputViewsModal', value };
        this.$store.commit('modalsController/SET_DISPLAY_BY_MODAL_NAME', controller);
      },
    },
  },
  watch: {
    display() {
      this.views = 0;
    },
  },
  methods: {
    ...mapActions('inputViews', [
      'closeModal',
      'sendRequest',
    ]),
  },
};
</script>

<style lang="scss" scoped>
  .card-input-views-modal {
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
