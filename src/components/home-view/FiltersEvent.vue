<template>
  <div class="wrapper-filters-event d-flex flex-column align-center">
    <span class="text-title">Discover Events</span>

    <div class="search-bar-container">
      <v-text-field
        class="search-text-field"
        solo
        v-model="searchTerm"
        append-icon="mdi-magnify"
        label="Search events by title"
        @keypress.enter="search()"
        @click:append="search()"
      >
      </v-text-field>
    </div>

    <div class="filter-container d-flex">
      <!--Category filter-->
      <v-select
        class="filter-select-field"
        v-model="selectedFilters.categories"
        :items="categories"
        multiple
        append-icon="mdi-chevron-down"
        solo
        label="Category"
        @change="search()"
      >
        <template v-slot:selection="{index}">
          <div v-if="index === 0">
            <v-badge
              v-show="selectedFilters.categories.length"
              color="#FFFFFF"
              :light="true"
              :content="selectedFilters.categories.length"
              inline
            />
            <span v-if="selectedFilters.categories.length <= 1">Category Selected</span>

            <span v-else>Categories Selected</span>
          </div>
        </template>
      </v-select>

      <!--Activity filter-->
      <v-select
        class="filter-select-field"
        v-model="selectedFilters.positions"
        :items="positions"
        multiple
        append-icon="mdi-chevron-down"
        solo
        label="Position"
        @change="search()"
      >
        <template v-slot:selection="{index}">
          <div v-if="index === 0">
            <v-badge
              v-show="selectedFilters.positions.length"
              color="#FFFFFF"
              :light="true"
              :content="selectedFilters.positions.length"
              inline
            />
            <span v-if="selectedFilters.positions.length <= 1">Position Selected</span>

            <span v-else>Positions Selected</span>
          </div>
        </template>
      </v-select>

      <!--Language filter-->
      <v-select
        class="filter-select-field"
        v-model="selectedFilters.languages"
        :items="languages"
        multiple
        append-icon="mdi-chevron-down"
        solo
        label="Language"
        @change="search()"
      >
        <template v-slot:selection="{index}">
          <div v-if="index === 0">
            <v-badge
              v-show="selectedFilters.languages.length"
              color="#FFFFFF"
              :light="true"
              :content="selectedFilters.languages.length"
              inline
            />
            <span v-if="selectedFilters.languages.length <= 1">Language Selected</span>

            <span v-else>Languages Selected</span>
          </div>
        </template>
      </v-select>

      <!--LOB filter-->
      <v-select
        class="filter-select-field"
        v-model="selectedFilters.lobs"
        :items="lobs"
        multiple
        append-icon="mdi-chevron-down"
        solo
        label="LOB"
        @change="search()"
      >
        <template v-slot:selection="{index}">
          <div v-if="index === 0">
            <v-badge
              v-show="selectedFilters.lobs.length"
              color="#FFFFFF"
              :light="true"
              :content="selectedFilters.lobs.length"
              inline
            />
            <span v-if="selectedFilters.lobs.length <= 1">LOB Selected</span>

            <span v-else>LOBs Selected</span>
          </div>
        </template>
      </v-select>

      <v-btn class="clear-button" @click="$store.dispatch('eventSearch/resetSearchParams')">
        <v-icon>mdi-trash-can-outline</v-icon>
      </v-btn>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

const DEFAULT_REQUEST_DELAY_TIME = 800;

export default {
  name: 'FiltersEvent',
  computed: {
    categories() {
      return this.$store.state.eventSearch.filters.categories;
    },
    positions() {
      return this.$store.state.eventSearch.filters.positions;
    },
    languages() {
      return this.$store.state.eventSearch.filters.languages;
    },
    lobs() {
      return this.$store.state.eventSearch.filters.lobs;
    },
    searchTerm: {
      get() {
        return this.$store.state.eventSearch.searchTerm;
      },
      set(value) {
        this.$store.commit('eventSearch/SET_SEARCH_TERM', value);
      },
    },
    ...mapState('eventSearch', [
      'selectedFilters',
    ]),
  },
  methods: {
    search() {
      clearTimeout(this.debounce);
      this.debounce = setTimeout(() => {
        this.$store.dispatch('eventSearch/searchEvents');
      }, DEFAULT_REQUEST_DELAY_TIME);
    },
  },
};
</script>

<style lang="scss">
  @mixin max-size-default{
    width: 100%;
    height: 100%;
  }

  @mixin button-default-colors {
    background: #3E968C;
    color: #FFFFFF !important;
  }

  .wrapper-filters-event {
    width: 100%;
    box-sizing: border-box;

    .text-title {
      font-size: 1.5rem;
      color: #222222;
      font-weight: bold;
    }

    .search-bar-container {
      min-width: 315px;
      width: 315px;
      max-width: 315px;
      margin-top: 5%;

      .search-text-field {
        min-width: 100%;
        width: 100%;
        max-width: 100%;

        .v-input__control {

          .v-input__slot {
            min-height: 35px;
            height: 35px;
            max-height: 35px;
            padding: 0 0 0 0!important;
            overflow: hidden;
            box-shadow: 0 0 6px rgba($color: #000000, $alpha: 0.2) !important;

            input {
              margin: 0 10px;
            }

            .v-text-field__slot {
              @include max-size-default;

              label {
                color: #000;
                margin-left: 10px;
              }
            }

            .v-input__append-inner {
              width: 50px;
              height: 35px;
              padding: 0;

              .v-input__icon {
                @include max-size-default;

                .v-icon {
                  @include max-size-default;
                  @include button-default-colors;
                  border-left: 1px solid #F5F5F5;
                }
              }
            }
          }
        }
      }
    }

    .filter-container {
      margin-top: 2.5%;

      .clear-button {
        min-width: 35px;
        width: 35px;
        max-width: 35px;
        min-height: 35px;
        height: 35px;
        max-height: 35px;
        background: #FFFFFF;
        color: #000000;
        margin: 0 10px;
        box-shadow: 0 0 6px rgba($color: #000000, $alpha: 0.2) !important;

        &:hover {
          @include button-default-colors;
        }

        &::before {
          display: none;
        }
      }

      .filter-select-field {
        min-width: 220px;
        width: 220px;
        max-width: 220px;
        margin: 0 10px !important;

        .v-input__control {

          .v-input__slot {
            min-height: 35px;
            height: 35px;
            max-height: 35px;
            padding: 0 0 0 0!important;
            overflow: hidden;
            border: 1px solid #F1F1F1;
            box-shadow: unset !important;

            .v-select__slot {
              @include max-size-default;

              label {
                margin-left: 10px;
                color: #000000;
              }

              .v-select__selections {
                @include max-size-default;

                input[readonly] {
                  display: none !important;
                }

                .v-badge {
                  margin-left: 5px;

                  span {
                    font-weight: bold;
                    color: #3E968C;
                    font-size: 1rem;
                  }
                }
              }
            }

            input {
              margin: 0 10px;
            }

            .v-input__append-inner {
              padding: 0;

              .v-input__icon {
                @include max-size-default;

                .v-icon {
                  @include max-size-default;
                  color: #000000 !important;
                }
              }
            }
          }
        }

        &:hover{
          .v-input__control {

            .v-input__slot {
              min-height: 35px;
              height: 35px;
              max-height: 35px;
              padding: 0 0 0 0!important;
              overflow: hidden;
              box-shadow: 0 0 6px rgba($color: #000000, $alpha: 0.2) !important;
            }
          }
        }
      }

      .v-input--is-label-active {

        .v-input__control {

          .v-input__slot {
            box-shadow: unset !important;
            border: 1px solid #3E968C;
          }
        }
      }
    }
  }
</style>
