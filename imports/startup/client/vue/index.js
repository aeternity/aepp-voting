import { Meteor } from 'meteor/meteor';
import Vue from 'vue';
import VueRouter from 'vue-router';
import Vuex from 'vuex';
import VueClipboards from 'vue-clipboards';
import { sync } from 'vuex-router-sync';
import VueMeteorTracker from 'vue-meteor-tracker';
import { injectSupply } from 'vue-supply';
import VueAutosize from 'vue-autosize';
// eslint-disable-next-line import/no-unresolved
import createPersistedState from 'vuex-persistedstate';
import App from '../../../ui/App.vue';
import routes from './routes';
import voting from '../../../api/store/voting';
import web3SyncPlugin from '../../../api/store/web3SyncPlugin';
import syncAuthState from '../../../api/store/syncAuthState';

Vue.use(VueMeteorTracker);
Vue.use(VueRouter);
Vue.use(VueAutosize);
Vue.use(Vuex);
Vue.use(VueClipboards);

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
    syncAuthState,
  ],
};
const suppliedStoreOptions = injectSupply(storeOptions, supplyCache);
const store = new Vuex.Store(suppliedStoreOptions);

const router = new VueRouter({
  mode: 'history',
  routes,
});

sync(store, router);

Meteor.startup(() => {
  new Vue({
    router,
    store,
    supplyCache,
    render: h => h(App),
  }).$mount('#app');
});
