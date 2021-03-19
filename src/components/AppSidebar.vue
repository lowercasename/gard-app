<template>
  <nav>
    <ul id="main-nav">
      <li>
        <router-link :to="'/room/' + $route.params.roomId">
          <i class="fas fa-fw fa-dice-d6"></i>Game
        </router-link>
      </li>
      <li>
        <i class="fas fa-fw fa-sword"></i>Characters
        <ul>
          <li v-for="character in room.characters" :key="character.id">
            <router-link :to="{ name: 'CharacterSheet', params: { characterId: character.id, character }}">{{ character.name }}</router-link>
          </li>
          <li>
            <button type="button" class="button--text" @click="addNewCharacter">
              <i class="fal fa-plus-square"></i> Add New
            </button>
          </li>
        </ul>
      </li>
      <li>
        <i class="fas fa-fw fa-house"></i>Steadings
        <ul>
          <li v-for="steading in room.steadings" :key="steading.id">
            <router-link :to="{ name: 'SteadingSheet', params: { steadingId: steading.id, steading }}">{{ steading.name }}</router-link>
          </li>
          <li>
            <button type="button" class="button--text" @click="addNewSteading">
              <i class="fal fa-plus-square"></i> Add New
            </button>
          </li>
        </ul>
      </li>
      <li>
        <i class="fas fa-fw fa-file-alt"></i>Notes
        <ul>
          <li v-for="note in room.notes" :key="note.id">
            <router-link :to="{ name: 'NoteSheet', params: { noteId: note.id, note }}">{{ note.name }}</router-link>
          </li>
          <li>
            <button type="button" class="button--text" @click="addNewNote">
              <i class="fal fa-plus-square"></i> Add New
            </button>
          </li>
        </ul>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: "AppSidebar",
  props: {
    room: Object,
    addNewCharacter: Function,
    addNewSteading: Function,
    addNewNote: Function,
  },
};
</script>

<style lang="scss" scoped>
nav {
  grid-area: sidebar;
  border-right: 1px solid #bababa;
  padding: 0.5rem;
  max-width: 240px;
  min-width: 180px;
}
ul#main-nav {
  list-style-type: none;
  margin: 0;
  padding: 0;
  font-variant: small-caps;
  font-size: 0.9rem;
  font-weight: 600;
  ul {
    list-style-type: none;
    padding: 0 0 0 1.2rem;
    font-variant: normal;
    font-weight: normal
  }
}
li {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  transition: 0.15s;
  i {
    margin-right: 5px;
  }
  a {
    text-decoration: none;
    color: #1b1b1b;
    &:hover {
      opacity: 0.6;
    }
    &.router-link-exact-active {
      color: rgb(189, 72, 72);
    }
  }
}
</style>