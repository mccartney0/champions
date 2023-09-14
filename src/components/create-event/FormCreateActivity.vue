<template>
  <v-form
    ref="form-activity"
    v-model="valid"
    class="wrapper-form-create-activity d-flex flex-column"
  >

  <v-alert
    color="orange d-flex align-center"
    text
    dark
    dense
    v-if="isInactiveEvent"
  >
    <v-icon class="mr-3" size="28" color="#ECB22E">mdi-alert-box-outline</v-icon>

    Attention: This activity is outdated.
  </v-alert>

    <span class="text-title-form-activity">
      Add information about your activity
    </span>

    <span class="text-label">Activity name</span>

    <v-text-field
      dense
      outlined
      counter="60"
      v-model="name"
      :rules="nameRules"
      :append-icon="isInactiveEvent ? 'mdi-alert-box' : null"
    ></v-text-field>

    <div class="input-container d-flex justify-space-between">
      <div class="half-size d-flex flex-column">
        <span class="text-label">Activity category</span>

        <v-select
          dense
          outlined
          :items="formOptions.categories"
          v-model="category"
          :rules="requiredRules"
          :append-icon="isInactiveEvent ? 'mdi-alert-box' : 'mdi-chevron-down'"
        ></v-select>

        <span class="text-label">This activity is</span>

        <v-select
          dense
          outlined
          :items="formOptions.internalType"
          v-model="internalType"
          :rules="requiredRules"
          :append-icon="isInactiveEvent ? 'mdi-alert-box' : 'mdi-chevron-down'"
        ></v-select>
      </div>

      <div class="half-size d-flex flex-column">
        <span class="text-label">Activity description</span>

        <v-textarea
          dense
          outlined
          no-resize
          counter="350"
          v-model="description"
          :rules="descriptionRules"
          :append-icon="isInactiveEvent ? 'mdi-alert-box' : null"
        ></v-textarea>
      </div>
    </div>

    <div class="input-container d-flex justify-space-between">
      <div class="half-size d-flex flex-column">
        <span class="text-label">
          Select how people can collaborate with this event

          <TooltipDefault
            :text="`
              Select the type of profile <br />
              which people can register <br />
              to collaborate in this activity.
            `"
          />
        </span>

        <v-select
          dense
          outlined
          :items="formOptions.positions"
          v-model="position"
          :rules="requiredRules"
          :append-icon="isInactiveEvent ? 'mdi-alert-box' : 'mdi-chevron-down'"
        ></v-select>
      </div>

      <div class="half-size d-flex flex-column">
        <span class="text-label">Quantity positions</span>

        <v-text-field
          dense
          outlined
          type="number"
          v-model="qtyPosition"
          :rules="numberRules"
          :append-icon="isInactiveEvent ? 'mdi-alert-box' : null"
        ></v-text-field>
      </div>
    </div>

    <span class="text-section-form-activity d-flex align-center">
      <v-icon color="#222222">mdi-lightbulb</v-icon>

      If you want to select other collaboration, create another activity
    </span>

    <div class="input-container d-flex justify-space-between">
      <div class="half-size d-flex justify-space-between">
        <div class="half-size d-flex flex-column">
          <span class="text-label">
            Start date

            <TooltipDefault
              :text="`
                Select the start date<br />
                that this activity will occur
              `"
            />
          </span>

          <v-menu
            :close-on-content-click="true"
            transition="scale-transition"
            offset-y
            min-width="auto"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="startDate"
                dense
                outlined
                :rules="requiredRules"
                prepend-inner-icon="mdi-calendar"
                readonly
                v-bind="attrs"
                v-on="on"
                :append-icon="isInactiveEvent ? 'mdi-alert-box' : null"
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="startDate"
            ></v-date-picker>
          </v-menu>
        </div>

        <div class="half-size d-flex flex-column">
          <span class="text-label">
            Start time

            <TooltipDefault
              :text="`
                Select the start time <br />
                that this activity will occur
              `"
            />
          </span>

          <v-combobox
            v-model="startTime"
            :items="timeOptions"
            dense
            outlined
            hide-selected
            transition="scale-transition"
            prepend-inner-icon="mdi-calendar-clock"
            :hide-no-data="!searchStartTime"
            :search-input.sync="searchStartTime"
            :rules="timeRules"
            :mask="timeMask"
            :append-icon="isInactiveEvent ? 'mdi-alert-box' : mdi-chevron-down"
          >
            <template v-slot:no-data>
              <v-list-item>
                <span>{{ searchStartTime }}</span>
                <strong class="ml-1">Press enter</strong>
              </v-list-item>
            </template>
            <template v-slot:selection="{ attrs, item, selected }">
                <span v-bind="attrs" :input-value="selected">
                  {{ item }}
                </span>
            </template>
          </v-combobox>
        </div>
      </div>

      <div class="half-size d-flex justify-space-between">
        <div class="half-size d-flex flex-column">
          <span class="text-label">
            End date

            <TooltipDefault
              :text="`
                Select the end date <br />
                that this activity will occur
              `"
            />
          </span>

          <v-menu
            :close-on-content-click="true"
            transition="scale-transition"
            offset-y
            min-width="auto"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="endDate"
                dense
                outlined
                :rules="requiredRules"
                prepend-inner-icon="mdi-calendar"
                readonly
                :append-icon="isInactiveEvent ? 'mdi-alert-box' : null"
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="endDate"
            ></v-date-picker>
          </v-menu>
        </div>

        <div class="half-size d-flex flex-column">
          <span class="text-label">
            End time

            <TooltipDefault
              :text="`
                Select the end time <br />
                that this activity will occur
              `"
            />
          </span>

          <v-combobox
            v-model="endTime"
            :items="timeOptions"
            dense
            outlined
            hide-selected
            transition="scale-transition"
            prepend-inner-icon="mdi-calendar-clock"
            :hide-no-data="!searchEndTime"
            :search-input.sync="searchEndTime"
            :rules="timeRules"
            :mask="timeMask"
            :append-icon="isInactiveEvent ? 'mdi-alert-box' : null"
          >
            <template v-slot:no-data>
              <v-list-item>
                <span>{{ searchEndTime }}</span>
                <strong class="ml-1">Press enter</strong>
              </v-list-item>
            </template>
            <template v-slot:selection="{ attrs, item, selected }">
                <span v-bind="attrs" :input-value="selected">
                  {{ item }}
                </span>
            </template>
          </v-combobox>
        </div>
      </div>
    </div>

    <div class="input-container d-flex justify-space-between">
      <div class="half-size d-flex flex-column">
        <span class="text-label">
          Timezone
        </span>

        <v-autocomplete
          dense
          outlined
          :items="formOptions.timezones"
          v-model="timezone"
          label="Search and select a timezone"
          :rules="requiredRules"
          :append-icon="isInactiveEvent ? 'mdi-alert-box' : 'mdi-chevron-down'"
        ></v-autocomplete>
      </div>

      <div class="half-size d-flex flex-column">
        <span class="text-label">
          Language
        </span>

        <v-select
          dense
          outlined
          :items="formOptions.languages"
          multiple
          v-model="languages"
          :rules="requiredMultipleRules"
          :append-icon="isInactiveEvent ? 'mdi-alert-box' : 'mdi-chevron-down'"
        ></v-select>
      </div>
    </div>

    <span class="text-section-form-activity d-flex align-center mt-4 mb-6">
      Select your activity type and some tags
    </span>

    <div class="input-container d-flex flex-column">
      <span class="text-label">
        Choose if this activity will be online or in person

        <TooltipDefault
          :text="`
            Tell us if your activity will be <br />
            online or in person then fill <br />
            the fields below
          `"
        />
      </span>

      <v-select
        dense
        outlined
        :items="formOptions.eventType"
        v-model="activityType"
        :rules="requiredRules"
        :append-icon="isInactiveEvent ? 'mdi-alert-box' : 'mdi-chevron-down'"
      ></v-select>
    </div>

    <div class="input-container d-flex flex-column" v-if="activityType === 'Online'">
      <span class="text-label">
        Event link (zoom, other platforms, etc) <strong>(optional)</strong>
      </span>

      <v-text-field
        dense
        outlined
        v-model="link"
        :append-icon="isInactiveEvent ? 'mdi-alert-box' : null"
      ></v-text-field>
    </div>

    <div class="d-flex flex-column" v-if="activityType === 'In-Person'">
      <div class="input-container d-flex justify-space-between">
        <div class="half-size d-flex justify-space-between">
          <div class="half-size d-flex flex-column">
            <span class="text-label">
              Activity country
            </span>

            <v-autocomplete
              dense
              outlined
              :items="formOptions.countries"
              item-text="name"
              item-value="countryCode"
              v-model="country"
              :rules="requiredRules"
              :append-icon="isInactiveEvent ? 'mdi-alert-box' : 'mdi-chevron-down'"
            ></v-autocomplete>
          </div>

          <div class="half-size d-flex flex-column">
            <span class="text-label">
              Activity state
            </span>

            <v-autocomplete
              dense
              outlined
              :items="formattedStates"
              v-model="state"
              :rules="requiredRules"
              :append-icon="isInactiveEvent ? 'mdi-alert-box' : 'mdi-chevron-down'"
            ></v-autocomplete>
          </div>
        </div>

        <div class="half-size d-flex flex-column">
          <span class="text-label">
            Activity city
          </span>

          <v-text-field
            dense
            outlined
            v-model="city"
            :rules="requiredRules"
            :append-icon="isInactiveEvent ? 'mdi-alert-box' : null"
          ></v-text-field>
        </div>
      </div>

      <div class="input-container d-flex flex-column">
        <span class="text-label">
          Activity address <strong>(optional)</strong>
        </span>

        <v-text-field
          dense
          outlined
          v-model="address"
        ></v-text-field>
      </div>
    </div>

    <div class="input-container d-flex flex-column">
      <span class="text-label">
        Add tags <strong>(optional)</strong>
      </span>

      <v-combobox
        v-model="tags"
        label="Select 5"
        required
        :rules="maxFiveRules"
        hide-selected
        dense
        multiple
        persistent-hint
        small-chips
        deletable-chips
        outlined
        :append-icon="isInactiveEvent ? 'mdi-alert-box' : 'mdi-chevron-down'"
      >
        <template v-slot:no-data>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>
                Press <kbd>enter</kbd> to create a tag
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-combobox>
    </div>

    <v-alert
      color="orange d-flex align-center"
      text
      dark
      dense
      v-if="hasRequests && !isInactiveEvent"
    >
      <v-icon class="mr-3" size="28" color="#ECB22E">mdi-alert-box-outline</v-icon>
      Important: Please remember to notify approved contributors
      about any updates or changes made to this activity.
    </v-alert>

    <div class="buttons-container d-flex justify-space-between">
      <v-btn class="error" @click="$emit('close-form')">
        Cancel
      </v-btn>

      <v-btn
        class="save"
        :disabled="!valid"
        :loading="sending"
        @click="finishEventCreating()"
      >
        Save and close
      </v-btn>

      <v-btn
        :disabled="!valid"
        @click="createNewActivity()"
      >
        New activity
      </v-btn>
    </div>
  </v-form>
</template>

<script>
import TooltipDefault from '@/components/shared/TooltipDefault.vue';

const mapFields = function mapFields(options) {
  const object = {};

  for (let x = 0; x < options.fields.length; x += 1) {
    const field = [options.fields[x]];
    object[field] = {
      get() {
        return this.$store.getters['createEvent/getSelectedGeneration'][field];
      },
      set(value) {
        this.$store.commit('createEvent/SET_FORM_ACTIVITY_BY_FIELD_AND_INDEX', { field, value });
      },
    };
  }

  return object;
};

export default {
  name: 'FormCreateActivity',
  components: {
    TooltipDefault,
  },
  props: {
    edit: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  data: () => ({
    valid: true,
    searchStartTime: null,
    searchEndTime: null,
    timeMask: '##:##',
    timeOptions: [
      { header: 'Select an option or input one' },
      '00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00', '08:00', '08:15', '08:30', '08:45', '09:00', '09:15', '09:30', '09:45', '10:00', '10:15', '10:30', '10:45', '11:00', '11:15', '11:30', '11:45', '12:00', '12:15', '12:30', '12:45', '13:00', '13:15', '13:30', '13:45', '14:00', '14:15', '14:30', '14:45', '15:00', '15:15', '15:30', '15:45', '16:00', '16:15', '16:30', '16:45', '17:00', '17:15', '17:30', '17:45', '18:00', '18:15', '18:30', '18:45', '19:00', '19:15', '19:30', '19:45', '20:00', '20:15', '20:30', '20:45', '21:00', '21:15', '21:30', '21:45', '22:00', '22:15', '22:30', '22:45', '23:00', '23:15', '23:30', '23:45'],
    nameRules: [
      (value) => !!value || 'This field is required',
      (value) => value.length <= 60 || 'This field must be at most 60 characters',
    ],
    requiredRules: [
      (value) => !!value || 'This field is required',
    ],
    requiredMultipleRules: [
      (value) => value.length > 0 || 'This field is required',
    ],
    maxFiveRules: [
      (value) => value.length <= 5 || 'More than 5 tags is selected',
    ],
    numberRules: [
      (value) => !!value || 'This field is required',
      (value) => !Number.isNaN(parseFloat(value)) || 'This value is not a number',
      (value) => value > 0 || 'This value needs to be positive',
      (value) => value < 999 || 'This value is invalid',
    ],
    timeRules: [
      (value) => !!value || 'This field is required',
      (value) => {
        const timeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;
        if (!timeRegex.test(value)) {
          return 'Enter a valid time format e.g. 15:30';
        }
        return null;
      },
    ],
    descriptionRules: [
      (value) => !!value || 'This field is required',
      (value) => value.length >= 20 || 'This field need almost 20 characters',
      (value) => value.length <= 350 || 'This field must be at most 350 characters',
    ],
  }),
  computed: {
    sending() {
      return this.$store.state.createEvent.sending;
    },
    formattedStates() {
      const { countries } = this.$store.state.createEvent.formOptions;
      if (this.country) {
        return countries.find((country) => country.countryCode === this.country).stateProvince;
      }

      return [];
    },
    formOptions() {
      return this.$store.state.createEvent.formOptions;
    },
    isInactiveEvent() {
      return !this.$store.getters['createEvent/getSelectedGeneration'].active;
    },
    hasRequests() {
      return this.$store.getters['createEvent/getSelectedGeneration'].requests > 0;
    },
    startDate: {
      get() {
        return this.$store.getters['createEvent/getSelectedGeneration'].startDate;
      },
      set(value) {
        const fieldsToClear = ['endDate', 'endTime'];
        this.$store.commit('createEvent/SET_FORM_ACTIVITY_START_DATE_BY_INDEX', value);
        fieldsToClear.forEach((field) => {
          this.$store.commit('createEvent/SET_FORM_ACTIVITY_BY_FIELD_AND_INDEX', {
            field,
            value: '',
          });
        });
      },
    },
    activityType: {
      get() {
        return this.$store.getters['createEvent/getSelectedGeneration'].activityType;
      },
      set(value) {
        if (value === 'Online') {
          const fieldsToClear = ['country', 'state', 'city', 'address'];
          fieldsToClear.forEach((field) => {
            this.$store.commit('createEvent/SET_FORM_ACTIVITY_BY_FIELD_AND_INDEX', {
              field,
              value: '',
            });
          });
        } else {
          this.$store.commit('createEvent/SET_FORM_ACTIVITY_BY_FIELD_AND_INDEX', {
            field: 'link',
            value: '',
          });
        }

        this.$store.commit('createEvent/SET_FORM_ACTIVITY_ACTIVITY_TYPE_BY_INDEX', value);
      },
    },
    ...mapFields({
      fields: [
        'name',
        'category',
        'internalType',
        'description',
        'position',
        'qtyPosition',
        'startTime',
        'endDate',
        'endTime',
        'timezone',
        'languages',
        'link',
        'country',
        'state',
        'city',
        'address',
        'tags',
      ],
    }),
  },
  methods: {
    createNewActivity() {
      this.$store.dispatch('createEvent/createNewActivity');
    },
    async finishEventCreating() {
      const { form } = this.$store.state.createEvent;

      const formattedEvent = {
        ...form,
        approvers: form.approvers.map((approver) => approver.email),
        activities: form.activities.map((activity) => {
          const formattedActivity = {
            ...activity,
            startDateTime: `${activity.startDate}T${activity.startTime}:00`,
            endDateTime: `${activity.endDate}T${activity.endTime}:00`,
          };

          return formattedActivity;
        }),
      };

      let hadSuccess = false;

      if (this.edit) {
        hadSuccess = await this.$store.dispatch('createEvent/sendRequestToEditEvent', formattedEvent);
      } else {
        hadSuccess = await this.$store.dispatch('createEvent/sendRequestToCreateEvent', formattedEvent);
      }

      if (hadSuccess) {
        this.$router.push('/');
      }
    },
  },
};
</script>

<style lang="scss">
  .wrapper-form-create-activity {
    width: 100%;
    max-width: 800px;

    .text-title-form-activity {
      font-size: 1.25rem;
      color: #222222;
      margin-bottom: 20px;
    }

    .input-container {
      width: 100%;

      .text-label {
        font-size: 0.875rem;
        margin-bottom: 10px;

        strong {
          font-size: 0.75rem;
          font-weight: normal;
        }
      }

      .half-size {
        width: 46%;
      }
    }

    .text-section-form-activity {
      font-size: 1rem;
      color: #222222;
      margin: 10px 0 20px 0;
    }

    .v-alert__content {
      display: flex;
      align-items: center;
      font-size: 0.875rem;
    }

    .buttons-container {
      width: 100%;
      padding: 28px 0;
      border-top: 1px solid rgba($color: #222222, $alpha: 0.07);

      .v-btn {
        min-width: max-content;
        letter-spacing: normal;
        text-transform: capitalize;
        font-size: 0.875rem;
        color: #222222;
        background: #FFFFFF;

        &.error {
          color: #FFFFFF;
        }

        &.save {
          min-width: 200px;
          color: #FFFFFF;
          background: #3E968C;
        }
      }
    }
  }
</style>
