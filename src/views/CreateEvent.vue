<template>
  <div class="wrapper-create-event d-flex">
    <div class="aside-navigation-container d-flex justify-end">
      <AsideNavigation />
    </div>

    <div class="content-container d-flex flex-column">
      <div class="breadcrumb-container d-flex align-center">
        <v-btn
          icon
          @click="setDisplayFormEvent()"
          v-if="!isFormEventActive"
        >
          <v-icon color="#222222">mdi-arrow-left</v-icon>
        </v-btn>

        <span class="text-breadcrumb">
          New event

          <span v-if="!isFormEventActive">
            <v-icon color="#222222">mdi-chevron-right</v-icon> New activity
          </span>
        </span>
      </div>

      <FormCreateEvent
        :edit="isEditEvent"
        v-if="isFormEventActive"
        @display-form-activity="displayFormActivity()"
        @close-form="openCancelModal()"
      />

      <FormCreateActivity :edit="isEditEvent" @close-form="openCancelModal()" v-else/>
    </div>

    <CancelEventCreateModal />
  </div>
</template>

<script>
import FormCreateEvent from '@/components/create-event/FormCreateEvent.vue';
import FormCreateActivity from '@/components/create-event/FormCreateActivity.vue';
import AsideNavigation from '@/components/create-event/AsideNavigation.vue';
import CancelEventCreateModal from '@/components/modal/CancelEventCreateModal.vue';

export default {
  name: 'CreateEvent',
  components: {
    FormCreateEvent,
    FormCreateActivity,
    AsideNavigation,
    CancelEventCreateModal,
  },
  computed: {
    isFormEventActive() {
      return this.$store.state.createEvent.eventDisplayedController;
    },
    isEditEvent() {
      return this.$store.state.createEvent.form.idEvent !== null
        && this.$store.state.createEvent.form.idEvent !== undefined;
    },
  },
  methods: {
    displayFormEvent() {
      this.$store.commit('createEvent/SET_EVENT_DISPLAYED_CONTROLLER', true);
    },
    displayFormActivity() {
      this.$store.commit('createEvent/SET_EVENT_DISPLAYED_CONTROLLER', false);
    },
    openCancelModal() {
      this.$store.dispatch('modalsController/show', 'CancelEventCreateModal');
    },
    setDisplayFormEvent() {
      this.$store.commit('createEvent/SET_EVENT_DISPLAYED_CONTROLLER', true);
    },
  },
};
</script>

<style lang="scss">
  .page--createevent, .page--editevent {

    .default-content-container {
      max-width: 100vw !important;

      .wrapper-create-event {
        width: 100%;
        min-height: calc(100vh - 56px);

        .aside-navigation-container {
          width: 27%;
          min-height: 100%;
          background: #38507E;
          box-shadow: 0 0 16px rgba($color: #000000, $alpha: 0.1);
          padding: 48px 24px;
        }

        .content-container {
          width: 73%;
          min-height: 100%;
          padding: 35px 0 35px 50px;

          .breadcrumb-container {
            margin: 25px 0;

            .v-btn {
              background: #FFFFFF;
              box-shadow: 0 0 16px rgba($color: #000000, $alpha: 0.1);
              min-width: 34px;
              width: 34px;
              min-height: 34px;
              height: 34px;
              margin-right: 14px;
            }

            .text-breadcrumb {
              font-size: 0.875rem;
              color: #222222;
              font-weight: 600;

              .v-icon {
                font-size: 1.25rem;
              }
            }
          }
        }
      }
    }
  }
</style>
