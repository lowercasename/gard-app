import Vue from "vue";

export const store = Vue.observable({
  isSidebarOpen: false
});

// We call toggleSidebar anywhere we need it in our app
export const mutations = {
  toggleSidebar() {
    store.isSidebarOpen = !store.isSidebarOpen
  }
};