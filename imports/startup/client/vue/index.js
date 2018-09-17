import { Meteor } from 'meteor/meteor';
import Vue from 'vue';
import VueRouter from 'vue-router';
import Vuex from 'vuex';
import VueClipboards from 'vue-clipboards';
import { sync } from 'vuex-router-sync';
import VueMeteorTracker from 'vue-meteor-tracker';
import { injectSupply } from 'vue-supply';
import App from '../../../ui/App.vue';
import routes from './routes';
import storeOptions from '../../../api/store';

Vue.use(VueMeteorTracker);
Vue.use(VueRouter);
Vue.use(Vuex);
Vue.use(VueClipboards);

const supplyCache = {};
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
