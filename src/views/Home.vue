<template>
  <main class="home">
    <p>Welcome to Gard.</p>
    <button type="button" @click="handleClick">Create a new room</button>
  </main>
</template>

<script>
import { customAlphabet } from "nanoid";
const nanoid = customAlphabet('0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz', 22);
import db from '@/modules/FirebaseDatabase';
import turningsDictionary from "@/data/turnings.js";

export default {
  name: "Home",
  methods: {
    handleClick() {
      console.log(turningsDictionary.find(o => o.name === "Frost"));
      // Instantiate a new room in Firebase
      const roomId = nanoid();
      db.ref("rooms/" + roomId).set({
        id: roomId,
        name: 'Untitled Game',
        turning: turningsDictionary.find(o => o.name === "Frost")
      })
      .then(() => {
        this.$router.push('/room/' + roomId);
      })
    },
  },
};
</script>
