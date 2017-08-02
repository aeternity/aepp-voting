import Vue from 'vue';
import VueRouter from 'vue-router';
import Vuex from 'vuex';
import { sync } from 'vuex-router-sync';
import VueMeteorTracker from 'vue-meteor-tracker';
import { injectSupply } from 'vue-supply';
import MainLayout from '../../ui/layouts/MainLayout.vue';
import routes from './routes';
import * as filters from '../../api/helpers/filters';
import voting from '../../../voting/api/store/voting_store';
import core from '../../api/store/core_store';

Vue.use(VueMeteorTracker);
Vue.use(infiniteScroll);
Vue.use(VueRouter);
Vue.use(Vuex);

// Register filters, that can be accessed inside templates
for (const key in filters) {
  Vue.filter(key, filters[key]);
}

// Create store
const supplyCache = {};
const storeOptions = {
  modules: {
    voting,
    core,
  },
};
const suppliedStoreOptions = injectSupply(storeOptions, supplyCache)
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
