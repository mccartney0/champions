<template>
  <v-snackbar
    :key="key"
    :value="display"
    :timeout="timeout"
    :color="type"
    class="popup"
    fixed
    top
    right
  >
    <div class="d-flex align-center">
      <v-icon @click="close()">mdi-close</v-icon>

      <span class="ml-4" v-html="message"></span>
    </div>
  </v-snackbar>
</template>
<script>
import { mapState } from 'vuex';

export default {
  name: 'AlertMessage',
  computed: {
    ...mapState('alertMessage', [
      'type',
      'message',
      'timeout',
      'key',
      'display',
    ]),
  },
  methods: {
    close() {
      this.$store.dispatch('alertMessage/closeAlertMessage');
    },
  },
};
</script>
<style lang="scss" scoped>
 .popup {
   top: 10%;
 }
</style>
