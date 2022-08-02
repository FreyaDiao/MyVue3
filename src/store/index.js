import { createStore } from 'vuex'
import login from './modules/login'

const store = createStore({
    state() {
        return {
            count: 1,
            loginStatus: false
        }
    },
     /* STORE.commit([mutationName]) */
    mutations: {
        increment(state) {
            state.count += 1
        },
        changeStatus(state, data) {
            state.loginStatus = data;
        }
    },
    /* STORE.dispatch([actionName]) */
    actions: {
        increment(context) {
            context.commit('increment')
        },
        changeStatus({ commit }, params = {}) {
            commit('changeStatus', params)
        }
    },
    getters: {
        doubleCount(state) {
            return state.count * 2
        },
        isValid(state) {
            return !!state.loginStatus
        }
    },
    modules: {
        login
    }
})

export default store