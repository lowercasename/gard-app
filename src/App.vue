<template>
  <div id="app">
    <app-header />
    <router-view />
  </div>
</template>

<script>
import AppHeader from "./components/AppHeader.vue";
// import db from '@/modules/FirebaseDatabase';

export default {
  name: "App",
  components: {
    AppHeader,
  },
  // methods: {
  //   updateCharacter(field, value) {
  //     if (typeof value === 'string') {
  //       this.character[field] = value.trim();
  //     } else {
  //       this.character[field] = value;
  //     }
  //     localStorage.setItem('character', JSON.stringify(this.character));
  //   }
  // },
  // mounted() {
  //   const roomRef = db.ref('rooms/foo');
  //   roomRef.on('value', snapshot => {
  //     console.log(snapshot.val());
  //   })
  // }
};
</script>

<style lang="scss">
@import "@/scss/_variables.scss";

html {
  font-size: 1.25rem;
}

h1,
h2,
h3,
h4,
h5 {
  margin-top: 0;
  margin-bottom: 1rem;
}
h1,
h2 {
  font-family: "beowulf_modernregular", sans-serif;
}
h1 {
  text-transform: uppercase;
  font-size: 2rem;
}
h2 {
  font-size: 1.35rem;
}

h3 {
  font-size: 1.15rem;
  font-weight: 600;
  font-variant: small-caps;
  color: #888;
  font-family: "Lora", sans-serif;
  margin-bottom: 0.25rem;
}

button {
  border: 1px solid #cfcfcf;
  border-radius: 6px;
  outline: 0;
  padding: .15rem .5rem;
  margin: 0;
  background: none;
  cursor: pointer;
  transition: .15s ease-out;
  &:hover {
    background: #eee;
  }
  &.button--text {
    border: 0;
    border-radius: 0;
    padding: 0;
    background: transparent;
    &:hover {
      opacity: .6;
      background: transparent;
    }
  }
  &.button--danger {
    background: $red;
    border: 1px solid $red;
    color: #fff;
    &:hover {
      background: darken($red, 10%);
      border: 1px solid darken($red, 10%);
    }
  }
}

.icon-muted {
  color: #ddd;
}

#app {
  font-family: "Lora", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #313131;
  display: grid;
  grid-template-rows: auto 1fr 60px;
  grid-template-columns: auto 1fr;
  grid-template-areas: "header header" "sidebar main" "footer footer";
  height: 100vh;
  overflow: hidden;
}
main {
  grid-area: main;
  overflow-y: auto;
}
</style>
