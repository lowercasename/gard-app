<template>
  <spinner v-if="!room.id" />
  <main class="room-home" v-else>
    <input class="room-name" type="text" @input="updateString({ path: 'name', value: room.name})" v-model="room.name"/>
    <p>This is your Gard game room. It is updated live for anyone who has this page open. Manage characters, steadings, and notes using the sidebar to the left. Roll die pools and track the Turnings with the bar below.</p>
    <p>To share this room with other players, send them this link:<br><span style="user-select:all;"><strong>https://gard.raphaelkabo.com/room/{{ room.id }}</strong></span></p> 
  </main>
</template>

<script>
import Spinner from "@/partials/Spinner.vue";

export default {
  name: "RoomHome",
  components: {
    Spinner
  },
  props: {
    room: Object,
    updateBoolean: Function,
    updateInteger: Function,
    updateString: Function
  },
  methods: {
  }
};
</script>

<style scoped>
.room-home {
  padding: 1rem;
}
h2 {
  text-align: center;
  border-bottom: 1px solid #ddd;
}
.room-name {
  text-align: center;
  border: 0;
  border-bottom: 1px solid #ddd;
  width: 100%;
  margin-bottom: 1rem;
  font-family: "beowulf_modernregular", sans-serif;
  font-size: 2rem;
}
p {
  margin-bottom: 1rem;
}
</style>