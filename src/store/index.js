import { createStore } from 'vuex'

export default createStore({
  state: {
    is_loading: false,
    is_mobile: false,
  },
  mutations: {
    set_loading: (state,data) => {
      state.is_loading = data.is_loading
    },
    set_mobile: (state,data) => {
      state.is_mobile = data.is_mobile
    }
  },
  actions: {
  },
  modules: {
  }
})
