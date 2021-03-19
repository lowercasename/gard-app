<template>
  <fragment>
    <app-sidebar
      :room="room"
      :addNewCharacter="addNewCharacter"
      :addNewSteading="addNewSteading"
      :addNewNote="addNewNote"
    />
    <main class="room">
      <router-view
        v-if="room"
        :room="room"
        :updateInteger="updateInteger"
        :updateString="updateString"
        :updateBoolean="updateBoolean"
        :deleteSteading="deleteSteading"
        :deleteCharacter="deleteCharacter"
        :deleteNote="deleteNote"
      />
    </main>
    <app-footer :room="room" :turnBack="turnBack" :turnForward="turnForward" :rollDie="rollDie"/>
    <chat :room="room" :sendMessage="sendMessage" />
  </fragment>
</template>

<script>
import db from "@/modules/FirebaseDatabase";
import turningsDictionary from "@/data/turnings.js";
import AppSidebar from "../components/AppSidebar.vue";
import AppFooter from "../components/AppFooter.vue";
import generateName from "@/data/names";
import Chat from '../partials/Chat.vue';

// Resolve an object path by string
const getPath = (object, path, defaultValue) =>
  path.split(".").reduce((o, p) => (o ? o[p] : defaultValue), object);

// Set an object path by string
const setPath = (object, path, value) =>
  path
    .split(".")
    .reduce(
      (o, p, i) => (o[p] = path.split(".").length === ++i ? value : o[p] || {}),
      object
    );

export default {
  name: "Room",
  components: {
    AppSidebar,
    AppFooter,
    Chat,
  },
  data() {
    return {
      room: {},
    };
  },
  methods: {
    addNewCharacter() {
      const roomRef = db.ref("rooms/" + this.$route.params.roomId);
      const charactersRef = roomRef.child("characters");
      const newCharacter = charactersRef.push();
      newCharacter
        .set({
          id: newCharacter.key,
          name: generateName(),
          age: "",
          calling: "",
          appearance: "",
          player: "",
          wyrdDie: true,
        })
        .then(() => {
          this.$router.push(
            "/room/" +
              this.$route.params.roomId +
              "/character-sheet/" +
              newCharacter.key
          );
        });
    },
    addNewSteading() {
      const roomRef = db.ref("rooms/" + this.$route.params.roomId);
      const steadingsRef = roomRef.child("steadings");
      const newSteading = steadingsRef.push();
      newSteading
        .set({
          id: newSteading.key,
          name: "Place McDuck",
          size: "Hamlet (2)",
          supply: 0,
          surplus: 0,
          wealth: 0,
        })
        .then(() => {
          this.$router.push(
            "/room/" +
              this.$route.params.roomId +
              "/steading/" +
              newSteading.key
          );
        });
    },
    addNewNote() {
      const roomRef = db.ref("rooms/" + this.$route.params.roomId);
      const notesRef = roomRef.child("notes");
      const newNote = notesRef.push();
      var todayDate = new Date().toLocaleDateString("en-GB");
      newNote
        .set({
          id: newNote.key,
          name: `${todayDate}`,
          content: "",
        })
        .then(() => {
          this.$router.push(
            "/room/" + this.$route.params.roomId + "/note/" + newNote.key
          );
        });
    },
    deleteSteading(steadingId) {
      const steadingRef = db.ref(
        "rooms/" + this.$route.params.roomId + "/steadings/" + steadingId
      );
      steadingRef.remove().then(() => {
        this.$router.push("/room/" + this.$route.params.roomId);
      });
    },
    deleteCharacter(characterId) {
      const characterRef = db.ref(
        "rooms/" + this.$route.params.roomId + "/characters/" + characterId
      );
      characterRef.remove().then(() => {
        this.$router.push("/room/" + this.$route.params.roomId);
      });
    },
    deleteNote(noteId) {
      const noteRef = db.ref(
        "rooms/" + this.$route.params.roomId + "/notes/" + noteId
      );
      noteRef.remove().then(() => {
        this.$router.push("/room/" + this.$route.params.roomId);
      });
    },
    turnBack() {
      const currentIndex = turningsDictionary.find(
        (o) => o.name === this.room.turning.name
      ).position;
      const newIndex =
        currentIndex === 0 ? turningsDictionary.length - 1 : currentIndex - 1;
      const newTurning = turningsDictionary[newIndex];
      this.room.turning = newTurning;
      this.doUpdate();
    },
    turnForward() {
      const currentIndex = turningsDictionary.find(
        (o) => o.name === this.room.turning.name
      ).position;
      const newIndex =
        currentIndex + 1 >= turningsDictionary.length ? 0 : currentIndex + 1;
      const newTurning = turningsDictionary[newIndex];
      this.room.turning = newTurning;
      this.doUpdate();
    },
    doUpdate() {
      const roomRef = db.ref("rooms/" + this.$route.params.roomId);
      roomRef.update(this.room);
    },
    updateInteger({ path, direction, allowNegative }) {
      switch (direction) {
        case "increase":
          if (getPath(this.room, path)) {
            setPath(this.room, path, getPath(this.room, path) + 1);
          } else {
            setPath(this.room, path, 1);
          }
          break;
        case "decrease":
          if (getPath(this.room, path)) {
            setPath(this.room, path, getPath(this.room, path) - 1);
          } else {
            setPath(this.room, path, -1);
          }
          if (!allowNegative && getPath(this.room, path) < 0) {
            setPath(this.room, path, 0);
          }
          break;
      }
      this.doUpdate();
    },
    updateString({ path, value }) {
      setPath(this.room, path, value);
      this.doUpdate();
    },
    updateBoolean({ path, value }) {
      setPath(this.room, path, value);
      this.doUpdate();
    },
    rollDie() {
      console.log('Roll');
      this.notify({ content: 'Roll!' });
    },
    sendMessage({ content }) {
      const roomRef = db.ref("rooms/" + this.$route.params.roomId);
      const messageRef = roomRef.child("messages");
      const newMessage = messageRef.push();
      newMessage
        .set({
          name: 'Foo',
          content,
          timestamp: Date.now()
        });
    }
  },
  beforeMount() {
    const roomRef = db.ref("rooms/" + this.$route.params.roomId);
    roomRef.on("value", (snapshot) => {
      this.room = snapshot.val();
      console.log(snapshot.val());
    });
  },
};
</script>
