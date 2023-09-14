<template>
  <div class="wrapper-card-event-host d-flex align-center">
    <v-avatar size="46">
      <img
        v-if="host"
        :src="getUserPicture(host)"
        :alt="`${host} Photo`"
      />
    </v-avatar>

    <div class="email-container d-flex align-center">
      <a :href="`mailto:${host}`">
        {{ host }}
      </a>
    </div>

    <div class="connections-container d-flex align-center">
      <v-btn icon :href="`https://connections.oracle.com/profile?id=${host}`" target="_blank">
        <v-icon color="#222222">mdi-account-multiple-outline</v-icon>
      </v-btn>
    </div>
  </div>
</template>

<script>
import getFormattedUrlFiles from '@/mixins/getFormattedUrlFiles';

export default {
  name: 'CardEventHost',
  mixins: [getFormattedUrlFiles],
  props: {
    host: {
      type: String,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
  .wrapper-card-event-host {
    min-width: 308px;
    width: 308px;
    min-height: 78px;
    height: 78px;
    background: #F4F4F4;
    padding: 0 15px;
    border-radius: 12px;
    margin: 5px 0;

    .email-container {
      width: 174px;
      max-width: 174px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      margin: 0 10px;

      > a {
        font-size: 0.75rem;
        text-decoration: none;
      }
    }

    .connections-container {
      width: 36px;

      .v-btn {
        min-width: max-content;
        width: max-content;
        min-height: max-content;
        height: max-content;
        padding: 0;

        .v-icon {
          font-size: 1.375rem;
        }
      }
    }
  }
</style>
