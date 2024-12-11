// src/store/index.js
import { createStore } from 'vuex';
import api from '@/api';

export default createStore({
  state: {
    isAuthenticated: sessionStorage.getItem('isAuthenticated') === 'true',
    user: sessionStorage.getItem('user') || null
  },
  mutations: {
    setAuthenticated(state, status) {
      state.isAuthenticated = status;
      sessionStorage.setItem('isAuthenticated', status);
    },
    setUser(state, user) {
      state.user = user;
      sessionStorage.setItem('user', user);
    },
    setToken(state, token) {
      state.token = token;
      sessionStorage.setItem('token', token);
    },
  },
  actions: {
    async login({ commit }, credentials) {
      try {
        const response = await api.login(credentials);
        if (response.data.status === 'success') {
          commit('setAuthenticated', true);
          commit('setUser', response.data.user);
          commit('setToken', response.data.token);
        } else {
          return response.data.msg
        }
      } 
      catch (error) {
        console.log(error);
        throw new Error(error);
      }
    },
    async register({ commit }, userData) {
      try {
        const response = await api.register(userData);
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
