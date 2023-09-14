<template>
  <div class="header d-flex">
    <div class="menu-container d-flex align-center">
      <template v-for="(menuItem, index) in filteredMenuItems">
        <a v-if="menuItem.name === 'FAQ'"
          :key="index"
          class="menu-item d-flex align-center justify-center"
          :href="menuItem.path"
          target="_blank"
        >
          {{ menuItem.label }}
        </a>
        <router-link v-else
          :key="index"
          class="menu-item d-flex align-center justify-center"
          :to="menuItem.path"
        >
          {{ menuItem.label }}

          <v-badge
            inline
            v-if="menuItem.name === 'MyEvents' && user.qtyPendingRequests > 0"
            color="#FB6464"
            :content="`${user.qtyPendingRequests}`"
          ></v-badge>
        </router-link>
      </template>
    </div>

    <div class="logo-container d-flex align-center justify-center">
      <router-link
        class="logo"
        to="/"
      >
        <img src="@/assets/logo.svg" alt="Application Logo" />
      </router-link>
    </div>

    <div class="profile-container d-flex align-center justify-end">
      <v-menu offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            v-bind="attrs"
            v-on="on"
          >
            Create <v-icon>mdi-chevron-down</v-icon>
          </v-btn>
        </template>
        <v-list elevation="1">
          <v-list-item
            v-for="(item, index) in filteredDropDownMenuItems"
            :key="index"
          >
            <router-link class="list-item" :to="item.path">
              <v-list-item-title class="d-flex align-center justify-center">
                {{ item.label }}
              </v-list-item-title>
            </router-link>
          </v-list-item>
        </v-list>
      </v-menu>

      <div class="profile d-flex align-center">
        <v-avatar size="35">
          <img
            v-if="user.email"
            :src="getUserPicture(user.email)"
            :alt="`${user.firstName} Photo`"
          />
        </v-avatar>

        <span class="text-name">{{ user.firstName }} {{ user.lastName }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import getFormattedUrlFiles from '@/mixins/getFormattedUrlFiles';

export default {
  name: 'HeaderMenu',
  data: () => ({
    menuItems: [
      {
        label: 'Events',
        name: 'home',
        path: '/',
        publicPage: true,
      },
      {
        label: 'My events',
        name: 'MyEvents',
        path: '/event/my-events',
        publicPage: false,
      },
      {
        label: 'My activities',
        name: 'MyActivities',
        path: '/my-activities',
        publicPage: true,
      },
      {
        label: 'FAQ',
        name: 'FAQ',
        path: 'https://oradocs.oracle.com/documents/link/LF8100BA3F69E2DC1EADFDF7B37083CD460A49674CD8/folder/F57FE7803D582556D95C73324261E90275FB7B0080CA/_FAQ',
        publicPage: true,
      },
    ],
    dropDownMenuItems: [
      {
        label: 'A content',
        name: 'Content',
        path: '/content',
        publicPage: true,
      },
      {
        label: 'An event',
        name: 'CreateEvent',
        path: '/event/create',
        publicPage: false,
      },
    ],
  }),
  mixins: [getFormattedUrlFiles],
  computed: {
    filteredMenuItems() {
      return this.filterPagesByRole(this.menuItems);
    },
    filteredDropDownMenuItems() {
      return this.filterPagesByRole(this.dropDownMenuItems);
    },
    user() {
      return this.$store.state.userProfile.user;
    },
  },
  methods: {
    filterPagesByRole(routes) {
      return routes.filter((route) => route.publicPage || this.user.admin);
    },
  },
};
</script>

<style lang="scss" scoped>
  @mixin reset-list {
    margin: 0;
    padding: 0;
  }

  @mixin button-default-layout {
    min-width: 100px;
    width: max-content;
    max-width: max-content;
    min-height: 35px;
    height: 35px;
    font-size: 0.8rem;
    text-decoration: none;
    color: #404040;
    text-transform: capitalize;
    letter-spacing: normal;
    background: #FFFFFF;
    box-shadow: 0px 0px 16px rgba($color: #000000, $alpha: 0.1);
    font-weight: bold;
    transition: all 0.25s ease;
    border-radius: 6px;
  }

  @mixin button-default-layout-hover {
    background: #3E968C;
    color: #FFFFFF;
  }

  .header {
    grid-area: header;
    position: sticky;
    top: 0;
    left: 0;
    z-index: 99;
    height: 56px;
    width: 100%;
    background: #FFFFFF;
    padding: 0 3.5%;
    box-shadow: 0 0 16px rgba($color: #000000, $alpha: 0.1);

    .menu-container {
      z-index: 1;
      width: 30%;
      height: 100%;

      .menu-item {
        @include button-default-layout;
        margin: 0 5% 0 0;

        &.router-link-exact-active {
          @include button-default-layout-hover;
        }

        &:hover {
          @include button-default-layout-hover;
          box-shadow: 0 0 0 rgba($color: #000000, $alpha: 0.1);
        }
      }
    }

    .logo-container {
      width: 40%;
      height: 100%;

      .logo {
        text-decoration: none;

        img {
          height: 21px;
          object-fit: contain;
          transition: all 0.25s ease;
        }

        &:hover {
          img {
            transform: scale(115%);
          }
        }
      }
    }

    .profile-container {
      width: 30%;
      height: 100%;

      .v-btn {
        @include button-default-layout;
      }

      .profile {
        min-width: 175px;
        width: max-content;
        height: 35px;
        margin: 0 0 0 5%;

        .text-name {
          margin: 0 0 0 15px;
          font-size: 0.85rem;
          color: #000000;
          font-weight: bold;
        }
      }
    }
  }

  .v-list {
    @include reset-list;

    .v-list-item {
      @include reset-list;
      min-height: max-content;

      .list-item {
        width: 100%;
        height: max-content;
        padding: 12.5% 0;
        text-decoration: none;
        background: #FFFFFF;
        border-bottom: 1px solid #EEEEEE;
        transition: all 0.25s ease;
        position: relative;

        &:hover, &.router-link-exact-active {
          background: #3E968C;
          border-bottom: 1px solid #3E968C;

          .v-list-item__title {
            color: #FFFFFF;
          }
        }

        .v-list-item__title {
          font-size: 0.8rem;
          color: #404040;
          font-weight: bold;
        }
      }
    }
  }
</style>
