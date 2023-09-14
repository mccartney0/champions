<template>
  <v-tooltip top color="#222222">
    <template v-slot:activator="{ on, attrs }">
      <v-icon
        v-bind="attrs"
        v-on="on"
        color="#222222"
        class="ml-2"
      >
        mdi-help-circle
      </v-icon>
    </template>

    <span v-html="text"></span>
  </v-tooltip>
</template>

<script>
export default {
  name: 'TooltipDefault',
  props: {
    text: {
      type: String,
      required: true,
      default: 'Not defined',
    },
  },
};
</script>
