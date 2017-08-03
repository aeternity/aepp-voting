export default {
  namespaced: true,

  state: () => ({
    filter: 'all',
    proposalModalShown: false,
    newsList: [],
  }),

  getters: {
    filter: state => state.filter,
  },

  mutations: {
    setFilter: (state, value) => {
      state.filter = value;
    },
    toggleProposalModal: (state) => {
      state.proposalModalShown = !state.proposalModalShown;
    },
    fetchedNewsList: (state, value) => {
      state.newsList = value;
    },
  },

  actions: {
    doSomething({ commit }, value) {
      console.log('Async stuff');
    },
    fetchNewsList({ commit }) {
      getJSONData('https://widgets.bitcoin.com/news.json', (err, res) => {
        if (err) {
          console.error(err)
        } else {
          commit('fetchedNewsList', res);
        }
      })
    }
  },
}
