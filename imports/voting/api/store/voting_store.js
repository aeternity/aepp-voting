export default {
  namespaced: true,

  state: () => ({
    filter: 'all',
    limit: 10,
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
    incrementLimit: (state) => {
      console.log('incrementing');
      state.limit = state.limit + 10;
    },
    toggleSubmitProposalModal: (state) => {
      state.submitProposalModalShown = !state.submitProposalModalShown;
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
