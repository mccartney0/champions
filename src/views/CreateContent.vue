<template>
  <div class="wrapper-create-content d-flex flex-column align-center">
    <span class="text-title">Content</span>

    <span class="text-subtitle text-center">
      <p>Share your social media contents, certifications or your articles.</p>
      <p>
        If you have certifications such as AWS, Google,
        Microsoft, or others, if so, please fill in the fields below.
      </p>
    </span>

    <v-form
      ref="form"
      v-model="valid"
      class="wrapper-form-create-content d-flex flex-column"
    >
      <span class="text-label">Type of sharing</span>

      <v-select
        dense
        outlined
        :items="types.contentType"
        append-icon="mdi-chevron-down"
        v-model="form.contentType"
        :rules="requiredRules"
      ></v-select>

      <span class="text-label">Title</span>

      <v-text-field
        dense
        outlined
        counter="60"
        v-model="form.title"
        :rules="titleRules"
      ></v-text-field>

      <template v-if="form.contentType === 'Event'">

      <span class="text-label">Activity name</span>

      <v-text-field
        dense
        outlined
        counter="60"
        v-model="form.activityName"
        :rules="titleRules"
      ></v-text-field>

      <span class="text-label">Activity type</span>

      <v-select
        dense
        outlined
        :items="types.activityType"
        append-icon="mdi-chevron-down"
        v-model="form.activityType"
        :rules="requiredRules"
      ></v-select>

        <span class="text-label">This activity was</span>

        <v-select
          dense
          outlined
          :items="types.internalType"
          append-icon="mdi-chevron-down"
          v-model="form.internalType"
          :rules="requiredRules"
        ></v-select>

        <span class="text-label">Ambassador type</span>

        <v-select
          dense
          outlined
          :items="types.ambassadorType"
          append-icon="mdi-chevron-down"
          v-model="form.ambassadorType"
          :rules="requiredRules"
        ></v-select>
      </template>

      <span class="text-label">
        Link
        <span v-if="form.contentType === 'Event'">
          or Address
        </span>
      </span>

      <v-text-field
        dense
        outlined
        v-model="form.url"
      ></v-text-field>

      <span class="text-label">Description</span>

      <v-textarea
        dense
        outlined
        no-resize
        counter="350"
        :rules="descriptionRules"
        v-model="form.description"
      ></v-textarea>

      <span class="text-label">Date</span>

      <v-menu
        :close-on-content-click="true"
        transition="scale-transition"
        offset-y
        min-width="auto"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
            v-model="form.publicationDate"
            dense
            outlined
            :rules="requiredRules"
            append-icon="mdi-calendar"
            readonly
            v-bind="attrs"
            v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker
          v-model="form.publicationDate"
          :max="today"
        ></v-date-picker>
      </v-menu>

      <span class="text-subtitle text-center">
        <p>
          Certifications prior to this fiscal year are <strong>not valid</strong>,
          only certifications from this fiscal year are valid.
        </p>
      </span>

      <div class="buttons-container d-flex justify-space-between">
        <v-btn @click="goToHome()">
          Cancel
        </v-btn>

        <v-btn
          class="send"
          :loading="sending"
          :disabled="!valid"
          @click="createContent()"
        >
          Save
        </v-btn>
      </div>
    </v-form>
  </div>
</template>

<script>
import { DateTime } from 'luxon';

export default {
  name: 'CreateContent',
  data: () => ({
    valid: true,
    requiredRules: [
      (value) => !!value || 'This field is required',
    ],
    titleRules: [
      (value) => !!value || 'This field is required',
      (value) => value.length <= 60 || 'This field must be at most 60 characters',
    ],
    descriptionRules: [
      (value) => value.length <= 350 || 'This field must be at most 350 characters',
    ],
    form: {
      contentType: '',
      internalType: '',
      activityType: '',
      ambassadorType: '',
      title: '',
      activityName: '',
      url: '',
      description: '',
      publicationDate: '',
    },
  }),
  computed: {
    types() {
      return this.$store.state.createContent.types;
    },
    sending() {
      return this.$store.state.createContent.sending;
    },
    today() {
      return DateTime.now().toFormat('yyyy-MM-dd');
    },
  },
  methods: {
    goToHome() {
      this.$router.push('/');
    },
    async createContent() {
      const hadSuccess = await this.$store.dispatch('createContent/sendRequestToCreateContent', this.form);

      if (hadSuccess) {
        this.goToHome();
      }
    },
  },
};
</script>

<style lang="scss" scoped>
  .wrapper-create-content {
    width: 100%;
    padding: 75px 300px;

    .text-title {
      font-size: 1.5rem;
      color: #222222;
    }

    .text-subtitle {
      font-size: 0.875rem;
      color: #222222;
    }

    .wrapper-form-create-content {
      width: 100%;
      padding: 50px;

      .buttons-container {
        margin-top: 32px;
        width: 100%;

        .v-btn {
          min-width: 150px;
          letter-spacing: normal;
          text-transform: capitalize;
          font-size: 0.875rem;
          color: #222222;
          background: #FFFFFF;
          box-shadow: 0 0 16px rgba($color: #000000, $alpha: 0.1);

          &.send {
            color: #FFFFFF;
            background: #3E968C;
          }
        }
      }
    }
  }
</style>
