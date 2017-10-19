import Vue from 'vue';
import VueRouter from 'vue-router';
import Vuex from 'vuex';
import VueClipboards from 'vue-clipboards';
import { sync } from 'vuex-router-sync';
import VueMeteorTracker from 'vue-meteor-tracker';
import { injectSupply } from 'vue-supply';
import VueAutosize from 'vue-autosize';
import createPersistedState from 'vuex-persistedstate';

import MainLayout from '../../ui/layouts/MainLayout.vue';
import routes from './routes';
import * as filters from '../../api/helpers/filters';
import voting from '../../api/store/voting';
import web3SyncPlugin from '../../api/store/web3SyncPlugin';
import checkPossibleAdminPlugin from '../../api/store/checkPossibleAdminPlugin';
import syncAuthState from '../../api/store/syncAuthState';
import '../comments';

Vue.use(VueMeteorTracker);
Vue.use(VueRouter);
Vue.use(VueAutosize);
Vue.use(Vuex);
Vue.use(VueClipboards);

// Register filters, that can be accessed inside templates
for (const key in filters) {
  Vue.filter(key, filters[key]);
}

// Create store
const supplyCache = {};
const storeOptions = {
  modules: {
    voting,
  },
  plugins: [
    createPersistedState({
      paths: ['voting.accountId', 'voting.explanationBlockShown'],
    }),
    web3SyncPlugin,
    checkPossibleAdminPlugin,
    syncAuthState,
  ],
};
const suppliedStoreOptions = injectSupply(storeOptions, supplyCache);
const store = new Vuex.Store(suppliedStoreOptions);

// Initialize router
const router = new VueRouter({
  mode: 'history',
  routes,
});

// This makes the current router state available inside the store
sync(store, router);


// Initialize the app
Meteor.startup(() => {
  const app = new Vue({
    router,
    store,
    supplyCache,
    render: h => h(MainLayout),
  }).$mount('app');
});
