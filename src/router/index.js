import Vue from 'vue';
import VueRouter from 'vue-router';
import goTo from 'vuetify/es5/services/goto';
import axios from 'axios';

import store from '@/store';
import $eventHub from '@/config/eventHub';
import { getUserInfo } from '../plugins/user-info';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import(/* webpackChunkName: "home" */ '../views/HomeView.vue'),
    beforeEnter: (async (to, from, next) => {
      await store.dispatch('eventSearch/getSearchFilters');
      next();
    }),
  },
  {
    path: '/my-activities',
    name: 'Activities',
    component: () => import(/* webpackChunkName: "my-activities" */ '../views/MyActivities.vue'),
    beforeEnter: (async (to, from, next) => {
      await store.dispatch('myActivities/getMyActivities');
      next();
    }),
  },
  {
    path: '/content',
    name: 'Content',
    component: () => import(/* webpackChunkName: "create-content" */ '../views/CreateContent.vue'),
    beforeEnter: (async (to, from, next) => {
      await store.dispatch('createContent/getContentTypes');
      next();
    }),
  },
  {
    path: '/event/create',
    name: 'CreateEvent',
    component: () => import(/* webpackChunkName: "create-event" */ '../views/CreateEvent.vue'),
    beforeEnter: (async (to, from, next) => {
      await store.dispatch('userProfile/searchUser');
      if (store.state.userProfile.user.admin) {
        await store.dispatch('createEvent/getFormOptions');
        await store.dispatch('createEvent/resetForm');
        next();
      } else {
        next(from.path);
      }
    }),
  },
  {
    path: '/edit/event/:slug',
    name: 'EditEvent',
    component: () => import(/* webpackChunkName: "edit-event" */ '../views/CreateEvent.vue'),
    beforeEnter: (async (to, from, next) => {
      if (!store.state.eventSearch.selectedEventDetails.slug) {
        await store.dispatch('eventSearch/searchSpecificEventDetails', to.params.slug);
      }

      if (store.state.eventSearch.selectedEventDetails.admin
        && store.state.eventSearch.selectedEventDetails.active) {
        await store.dispatch('createEvent/getFormOptions');
        await store.dispatch('createEvent/resetForm');

        await store.dispatch('createEvent/formatEventToEditForm', store.state.eventSearch.selectedEventDetails);
        next();
      } else {
        next(from.path);
      }
    }),
  },
  {
    path: '/event/details/:slug',
    name: 'EventDetails',
    component: () => import(/* webpackChunkName: "event-details" */ '../views/EventDetails.vue'),
    beforeEnter: (async (to, from, next) => {
      await store.dispatch('eventSearch/searchSpecificEventDetails', to.params.slug);
      next();
    }),
  },
  {
    path: '/event/my-events',
    name: 'MyEvents',
    component: () => import(/* webpackChunkName: "my-events" */ '../views/MyEvents.vue'),
  },
];

const router = new VueRouter({
  scrollBehavior(to) {
    let scrollTo = 0;

    if (to.hash) {
      scrollTo = to.hash;
    }

    return goTo(scrollTo, { offset: 0 });
  },
  mode: 'history',
  base: process.env.VUE_APP_HOME_DIR,
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.name) {
    const body = document.getElementsByTagName('body')[0];

    if (from && from.name) {
      body.classList.remove(`page--${from.name.toLowerCase()}`);
    }
    body.classList.add(`page--${to.name.toLowerCase()}`);
    body.classList.add('loading-page');

    $eventHub.$emit('asyncComponentLoading');
  }

  next();
});

router.afterEach((to) => {
  let page = process.env.VUE_APP_HOME_DIR + to.fullPath;
  page = page.replace('//', '/');

  axios
    .post('../smo-server/page-view', {
      page,
      pageUrl: window.location.href,
      details: getUserInfo,
    })
    .catch((error) => {
      console.error('[CHAMPIONS] Failed to log user page view', error);
    });

  const body = document.getElementsByTagName('body')[0];
  body.classList.remove('loading-page');
  $eventHub.$emit('asyncComponentLoaded');
});

export default router;
