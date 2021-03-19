<template>
  <footer>
    <turning-selector
      :room="room"
      :turnBack="turnBack"
      :turnForward="turnForward"
    />
    <!-- <die-roller :rollDie="rollDie" /> -->
    <button type="button" class="button--text" @click="toggleSidebar">
      <i class="fas fa-comment"></i>
    </button>
  </footer>
</template>

<script>
// import DieRoller from "../partials/DieRoller.vue";
import TurningSelector from "../partials/TurningSelector.vue";
import { mutations } from "@/modules/Store.js";

export default {
  name: "AppFooter",
  props: ["turnBack", "turnForward", "room", "rollDie"],
  components: {
    TurningSelector,
    // DieRoller,
  },
  // computed: {
  //   isBurgerActive() {
  //     return store.isNavOpen;
  //   },
  // },
  methods: {
    toggleSidebar() {
      mutations.toggleSidebar();
    },
  },
};
</script>

<style scoped>
footer {
  grid-area: footer;
  border-top: 1px solid rgb(187, 186, 186);
  box-shadow: 0px -2px 5px rgba(0, 0, 0, 0.2);
  padding: 0.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>