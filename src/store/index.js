// src/store/index.js
import { createStore } from 'vuex';
import axios from 'axios';

export default createStore({
  state: {
    isAuthenticated: false,
    user: null
  },
  mutations: {
    setAuthenticated(state, status) {
      state.isAuthenticated = status;
    },
    setUser(state, user) {
      state.user = user;
    }
  },
  actions: {
    async login({ commit }, credentials) {
      try {
        const response = await axios.post('http://127.0.0.1:5000/login', credentials);
        if (response.data.status === 'success') {
          commit('setAuthenticated', true);
          commit('setUser', credentials.username);
        } else {
          return response.data.msg
        }
      } catch (error) {
        throw new Error('Login failed');
      }
    },
    async register({ commit }, userData) {
      try {
        const response = await axios.post('http://127.0.0.1:5000/register', userData);
        console.log(response.status)
        if (response.data.status === 'success') {
          commit('setAuthenticated', true);
        } else {
          return response.data.msg
        }

      } catch (error) {
        throw new Error('Registration failed');
      }
    },
    logout({ commit }) {
      commit('setAuthenticated', false);
      commit('setUser', null);
    }
  },
  getters: {
    isAuthenticated: state => state.isAuthenticated,
    user: state => state.user
  }
});
