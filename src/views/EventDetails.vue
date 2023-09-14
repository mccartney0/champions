<template>
  <div class="wrapper-event-details d-flex">
    <div class="back-button-container d-flex justify-center">
      <v-btn icon @click="validateGoBack()">
        <v-icon color="#222222">mdi-arrow-left</v-icon>
      </v-btn>
    </div>

    <div class="content-container d-flex flex-column">
      <ContentEventDetails :event="event" />

      <span class="text-title-activity d-flex align-center">
        Activities <div class="line"></div>
      </span>

      <CardActivity
        :isAdmin="event.admin"
        :key="activity.idActivity"
        v-for="activity in event.activities"
        :activity="activity"
      />
    </div>

    <div class="profile-container d-flex justify-center">
      <AsideEventDetails :event="event" />
    </div>

    <ReferFriendModal />

    <AssociateEventModal :eventName="event.eventName" />

    <InputViewsModal />

    <AddExternalUserModal />
  </div>
</template>

<script>
import AsideEventDetails from '@/components/event-details/AsideEventDetails.vue';
import ContentEventDetails from '@/components/event-details/ContentEventDetails.vue';
import CardActivity from '@/components/event-details/CardActivity.vue';
import ReferFriendModal from '@/components/modal/ReferFriendModal.vue';
import AssociateEventModal from '@/components/modal/AssociateEventModal.vue';
import InputViewsModal from '@/components/modal/InputViewsModal.vue';
import AddExternalUserModal from '@/components/modal/AddExternalUserModal.vue';

export default {
  name: 'EventDetails',
  components: {
    AsideEventDetails,
    ContentEventDetails,
    CardActivity,
    ReferFriendModal,
    AssociateEventModal,
    InputViewsModal,
    AddExternalUserModal,
  },
  computed: {
    event() {
      return this.$store.state.eventSearch.selectedEventDetails;
    },
  },
  methods: {
    validateGoBack() {
      if (window.history.length > 2) {
        this.$router.go(-1);
      } else {
        this.$router.go('/');
      }
    },
  },
};
</script>

<style lang="scss" scoped>
  .wrapper-event-details {
    width: 100%;
    min-height: calc(100vh - 56px);
    height: max-content;
    padding: 30px 6%;

    .back-button-container {
      width: 6%;

      .v-btn {
        position: fixed;
        background: #F1F1F1;
      }
    }

    .content-container {
      width: 60%;
      padding: 0 40px;

      .text-title-activity {
        font-size: 1rem;
        color: #222222;
        font-weight: 600;
        margin-bottom: 15px;

        .line {
          width: 100%;
          height: 1px;
          background: #F1F1F1;
          margin-left: 15px ;
        }
      }
    }

    .profile-container {
      width: 34%;
    }
  }
</style>
