import { createStore } from "vuex";
import axiosClient from "@/plugins/axios.js";
import traders from "@/store/modules/traders.js";
import projects from "@/store/modules/projects.js";

const store = createStore({
  state: {
    user: {
      data: {},
      token: sessionStorage.getItem("TOKEN"),
    },
    sidebarOpen: false,
    notification: {
      show: false,
      type: "success",
      title: "",
      message: "",
    },
  },
  actions: {
    sidebarToggle({ commit }, flag) {
      commit("setSidebarToggle", flag);
    },
    register({ commit }, user) {
      return axiosClient.post("/register", user).then(({ data }) => {
        commit("setUser", data.user);
        commit("setToken", data.token);
        return data;
      });
    },
    login({ commit }, user) {
      return axiosClient.post("/login", user).then(({ data }) => {
        commit("setUser", data.user);
        commit("setToken", data.token);
        return data;
      });
    },
    logout({ commit }) {
      return axiosClient.post("/logout").then((response) => {
        commit("logout");
        return response;
      });
    },
  },
  mutations: {
    setSidebarToggle: (state, flag) => {
      state.sidebarOpen = flag;
    },
    logout: (state) => {
      state.user.token = null;
      state.user.data = {};
    },
    setUser: (state, userData) => {
      state.user.token = userData.token;
      state.user.data = userData.user;
      sessionStorage.setItem("TOKEN", userData.token);
    },
    setToken: (state, token) => {
      state.user.token = token;
      sessionStorage.setItem("TOKEN", token);
    },
    logout: (state) => {
      state.user.token = null;
      state.user.data = {};
      sessionStorage.removeItem("TOKEN");
    },
    notify: (state, { title, message, type }) => {
      state.notification.show = true;
      state.notification.type = type;
      state.notification.message = message;
      state.notification.title = title;
      setTimeout(() => {
        state.notification.show = false;
      }, 5000);
    },
  },
  getters: {},
  modules: {
    traders,
    projects,
  },
});

export default store;
