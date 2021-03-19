<template>
  <div>
    <transition name="slide">
      <div
        v-if="isSidebarOpen"
        class="sidebar"
        id="chat-sidebar"
        :class="isSidebarOpen ? 'open' : ''"
      >
        <div class="chat-controls">
          <button type="button" class="button--text" @click="closeSidebar">
            <i class="fal fa-times"></i>
          </button>
        </div>
        <div class="chat-history">
          <div
            class="chat-message"
            v-for="message in room.messages"
            :key="message.id"
          >
            <div class="chat-message__timestamp">{{ new Date(message.timestamp).toLocaleTimeString('en-GB') + ' ' + new Date(message.timestamp).toLocaleDateString('en-GB') }}</div>
            <div class="chat-message__content" v-html="message.content"></div>
          </div>
        </div>
        <div class="chat-message-fields">
          <die-roller :sendMessage="handleDieRoll" />
          <textarea
            v-model="newMessage"
            placeholder="Press Enter to send."
            @keyup.enter.prevent="handleEnter"
          ></textarea>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { store, mutations } from "@/modules/Store.js";
import DieRoller from "./DieRoller.vue";

export default {
  components: { DieRoller },
  name: "Chat",
  props: ["room", "sendMessage"],
  methods: {
    closeSidebar: mutations.toggleSidebar,
    handleEnter() {
      if (this.newMessage !== "") {
        let message = this.newMessage.trim().substr(0, 240);
        this.sendMessage({ content: message });
        this.newMessage = "";
      }
    },
    handleDieRoll(message) {
      this.sendMessage({ content: message });
    },
    scrollToBottom() {
      const el = this.$el.getElementsByClassName("chat-message")[
        this.$el.getElementsByClassName("chat-message").length - 1
      ];

      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    },
  },
  data: () => ({
    newMessage: "",
  }),
  computed: {
    isSidebarOpen() {
      return store.isSidebarOpen;
    },
  },
  updated() {
    this.scrollToBottom();
  },
};
</script>

<style lang="scss" scoped>
.slide-enter,
.slide-leave-active {
  right: -100%;
}

.sidebar {
  overflow-y: auto;
  overflow-x: hidden;
  background-color: #fff;
  border-left: 1px solid rgb(187, 186, 186);
  box-shadow: -2px 0px 5px rgba(0, 0, 0, 0.2);
  position: fixed;
  display: flex;
  flex-direction: column;
  right: -100%;
  top: 0;
  height: 100vh;
  z-index: 999;
  padding: 1rem;
  width: 300px;
  &.open {
    right: 0;
  }
}
.chat-history {
  margin-bottom: auto;
  overflow-x: auto;
}
.chat-message {
  font-size: 0.8rem;
  border-radius: 6px;
  padding: 0.5rem;
  background: #efefef;
  margin-bottom: 0.5rem;
  &__timestamp {
    color: #999;
    font-size: smaller;
    margin-bottom: 5px;
  }
}
.chat-controls {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 0.5rem;
}
textarea {
  font-size: 0.8rem;
  border: 1px solid #ddd;
  padding: 4px 6px;
  border-radius: 0 0 6px 6px;
  resize: none;
  width: 100%;
}
</style>