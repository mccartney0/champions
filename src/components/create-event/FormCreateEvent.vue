<template>
  <v-form
    ref="form"
    v-model="valid"
    class="wrapper-form-create-event d-flex flex-column"
  >
    <span class="text-title-form-event d-flex align-center">
      Add information about your event

      <TooltipDefault
        :text="`This is the main event, add the general information about your event`"
      />
    </span>

    <span class="text-label">Event Name</span>

    <v-text-field
      dense
      outlined
      counter="60"
      v-model="eventName"
      :rules="eventNameRules"
    ></v-text-field>

    <div class="input-container d-flex justify-space-between">
      <div class="d-flex flex-column">
        <span class="text-label">Team</span>

        <v-select
          dense
          outlined
          :items="teams"
          append-icon="mdi-chevron-down"
          v-model="team"
          :rules="requiredRules"
        ></v-select>
      </div>

      <div class="d-flex flex-column">
        <span class="text-label">LOB</span>

        <v-select
          dense
          outlined
          :items="lobs"
          append-icon="mdi-chevron-down"
          v-model="lob"
          :rules="requiredRules"
        ></v-select>
      </div>
    </div>

    <span class="text-label">Description</span>

    <v-textarea
      dense
      outlined
      no-resize
      counter="350"
      v-model="description"
      :rules="descriptionRules"
    ></v-textarea>

    <span class="text-section-form-event d-flex align-center">
      Cover photo

      <TooltipDefault :text="`Choose a cover to show in this card event`" />
    </span>

    <div class="photos-container d-flex justify-space-between">
      <figure
        class="photo"
        :class="{'selected': isThatSelectedImage(image)}"
        :key="index"
        v-for="(image, index) in images"
        @click="setSelectedImage(image)"
        @keydown="setSelectedImage(image)"
      >
        <img class="photo-image" :src="getEventPicture(image)" :alt="`Image option ${index + 1}`" />
      </figure>
    </div>

    <span class="text-section-form-event d-flex align-center">
      Additional approvers

      <TooltipDefault
        :text="`This approvers can manage, approve or decline requests at this event`"
      />
    </span>

    <div class="approvers-container d-flex flex-wrap">
      <div
        class="approvers-input-container d-flex flex-column"
        :key="index"
        v-for="(approver, index) in approvers"
      >
        <span class="text-label">
          E-mail
        </span>

        <div class="d-flex align-start">
          <v-autocomplete
            dense
            outlined
            append-icon="mdi-chevron-down"
            v-model="approver.email"
            :search-input.sync="approver.searchTerm"
            :rules="requiredRules"
            :items="approver.emailList"
            :loading="approver.searching"
            @keydown="getEmailList(index)"
          ></v-autocomplete>

          <v-btn class="ml-2 remove-approver" @click="removeApproverByIndex(index)">
            <v-icon>mdi-trash-can-outline</v-icon>
          </v-btn>
        </div>
      </div>

      <div class="approvers-input-container d-flex align-center justify-start">
        <button class="button-add-approver d-flex align-center" @click.prevent="addApprover()">
          <v-icon color="#222222">mdi-plus</v-icon>

          <span>Add approver</span>
        </button>
      </div>
    </div>

    <div class="buttons-container d-flex justify-space-between">
      <v-btn class="error" @click="$emit('close-form')">
        Cancel
      </v-btn>

      <v-btn
        :disabled="!valid"
        @click="finishEventCreating()"
      >
        Next
      </v-btn>
    </div>
  </v-form>
</template>

<script>
import TooltipDefault from '@/components/shared/TooltipDefault.vue';
import getFormattedUrlFiles from '@/mixins/getFormattedUrlFiles';

export default {
  name: 'FormCreateEvent',
  components: {
    TooltipDefault,
  },
  mixins: [getFormattedUrlFiles],
  props: {
    edit: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  data: () => ({
    valid: true,
    eventNameRules: [
      (value) => !!value || 'This field is required',
      (value) => value.length <= 60 || 'This field must be at most 60 characters',
    ],
    descriptionRules: [
      (value) => !!value || 'This field is required',
      (value) => value.length >= 20 || 'This field need almost 20 characters',
      (value) => value.length <= 350 || 'This field must be at most 350 characters',
    ],
    requiredRules: [
      (value) => !!value || 'This field is required',
    ],
  }),
  computed: {
    teams() {
      return this.$store.state.createEvent.formOptions.teams;
    },
    lobs() {
      return this.$store.state.createEvent.formOptions.lobs;
    },
    images() {
      return this.$store.state.createEvent.formOptions.coverPhotos;
    },
    eventName: {
      get() {
        return this.$store.state.createEvent.form.eventName;
      },
      set(value) {
        this.$store.commit('createEvent/SET_FORM_EVENT_NAME', value);
      },
    },
    team: {
      get() {
        return this.$store.state.createEvent.form.team;
      },
      set(value) {
        this.$store.commit('createEvent/SET_FORM_TEAM', value);
      },
    },
    lob: {
      get() {
        return this.$store.state.createEvent.form.lob;
      },
      set(value) {
        this.$store.commit('createEvent/SET_FORM_LOB', value);
      },
    },
    description: {
      get() {
        return this.$store.state.createEvent.form.description;
      },
      set(value) {
        this.$store.commit('createEvent/SET_FORM_DESCRIPTION', value);
      },
    },
    approvers: {
      get() {
        return this.$store.state.createEvent.form.approvers;
      },
      set(value) {
        this.$store.commit('createEvent/SET_FORM_APPROVERS', value);
      },
    },
  },
  methods: {
    getEmailList(listIndex) {
      this.$store.dispatch('createEvent/searchEmails', listIndex);
    },
    setSelectedImage(image) {
      this.$store.commit('createEvent/SET_FORM_IMAGE', image);
    },
    isThatSelectedImage(image) {
      return this.$store.state.createEvent.form.image === image;
    },
    addApprover() {
      this.$store.dispatch('createEvent/addApprover');
    },
    removeApproverByIndex(index) {
      this.$store.dispatch('createEvent/removeApproverByIndex', index);
    },
    validateForm() {
      return this.$refs.form.validate() && this.$store.state.createEvent.form.image;
    },
    finishEventCreating() {
      if (this.validateForm()) {
        if (this.$store.state.createEvent.form.activities.length === 0) {
          this.$store.dispatch('createEvent/createNewActivity');
          this.$store.commit('createEvent/SET_SELECTED_ACTIVITY_INDEX', 0);
        }

        this.$emit('display-form-activity');
      } else {
        this.$store.dispatch('alertMessage/createAlertMessage', { type: 'error', message: 'Please, select a cover photo' });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
  .wrapper-form-create-event {
    width: 100%;
    max-width: 800px;

    .text-title-form-event {
      font-size: 1.25rem;
      color: #222222;
      margin-bottom: 20px;
    }

    .input-container {
      width: 100%;

      .text-label {
        font-size: 0.875rem;
        margin-bottom: 10px;
      }

      > div {
        width: 46%;
      }
    }

    .text-section-form-event {
      font-size: 1rem;
      color: #222222;
    }

    .photos-container {
      width: 100%;
      padding: 20px 0;
      border-bottom: 1px solid #FAFAFA;
      margin-bottom: 15px;

      .photo {
        width: 100px;
        height: 50px;
        border-radius: 6px;
        overflow: hidden;
        border: 2px solid #FAFAFA;
        cursor: pointer;
        transition: all 0.25s ease;

        &.selected {
          border: 2px solid #3E968C;
        }

        .photo-image {
          width: 100px;
          max-width: 100px;
          height: 50px;
          max-height: 50px;
        }
      }
    }

    .approvers-container {
      width: 100%;
      padding: 25px 0;

      .approvers-input-container {
        width: 46%;
        margin: 0 4% 0 0;

        &:nth-of-type(even) {
          margin: 0 0 0 4%;
        }

        .text-label {
          font-size: 0.875rem;
          margin-bottom: 10px;
        }

        .v-btn.remove-approver {
          min-height: 40px;
          height: 40px;
          min-width: 40px;
          width: 40px;
          box-shadow: 0 0 16px rgba($color: #000000, $alpha: 0.1);
        }
      }

      .button-add-approver {
        width: 100%;
        margin-top: 3px;
        min-height: 40px;
        height: 40px;
        padding: 0 10px;
        box-shadow: 0 0 16px rgba($color: #000000, $alpha: 0.1);
        background: #FFFFFF;
        color: #222222;
        border-radius: 5px;
        transition: all 0.25s ease;

        .v-icon {
          margin-right: 5px;
        }

        &:hover {
          background: #F0F0F0;
        }
      }
    }

    .buttons-container {
      width: 100%;
      padding: 28px 0;
      border-top: 1px solid rgba($color: #222222, $alpha: 0.07);

      .v-btn {
        min-width: 200px;
        letter-spacing: normal;
        text-transform: capitalize;
        font-size: 0.875rem;
        color: #FFFFFF;
        background: #3E968C;

        &.error {
          min-width: max-content;
        }
      }
    }
  }
</style>
