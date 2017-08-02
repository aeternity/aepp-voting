import Vue from 'vue';
import VueRouter from 'vue-router';

import VueMeteorTracker from 'vue-meteor-tracker';

import MainLayout from '../../ui/layouts/MainLayout.vue';
import routes from './routes';

Vue.use(VueMeteorTracker);
Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  routes,
});

Meteor.startup(() => {
  const app = new Vue({
    router,
    render: h => h(MainLayout),
  }).$mount('app');
});
