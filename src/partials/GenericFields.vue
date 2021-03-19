<template>
  <section class="generic-fields" v-if="source">
    <div v-for="entry in source" :key="entry.id" class="entry__wrap">
      <div class="entry__content">
        <span class="entry__name">{{ entry.name }}</span>&nbsp;<span class="entry__text">{{ entry.text }}</span>
      </div>
      <div class="entry__controls">
        <button
          type="button"
          class="button--text"
          @click="editEntry(entry.id)"
        >
          <i class="fal fa-pen-square"></i>
        </button>
        <button
          type="button"
          class="button--text"
          @click="removeEntry(entry.id)"
        >
          <i class="fal fa-times-circle"></i>
        </button>
      </div>
    </div>
    <div class="generic-fields__editor">
      <input type="text" v-model="newEntryName" placeholder="Name" />
      <textarea v-model="newEntryText" placeholder="Description"></textarea>
      <button
        type="button"
        class=""
        @click="addNewEntry"
      >
        <i class="fal fa-plus-circle"></i> Add
      </button>
    </div>
  </section>
</template>

<script>
import { customAlphabet } from "nanoid";
const nanoid = customAlphabet('0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz', 22);

export default {
  name: "GenericFields",
  props: ["source", "path", "updateBoolean", "updateInteger", "updateString"],
  data() {
    return {
      newEntryName: "",
      newEntryText: "",
    };
  },
  methods: {
    addNewEntry() {
      if (this.newEntryName.trim() == "") {
        return false;
      }
      this.source.push({ name: this.newEntryName.trim(), text: this.newEntryText.trim(), id: nanoid() });
      this.updateString({ path: this.path, value: this.source });
      this.newEntryName = "";
      this.newEntryText = "";
    },
    removeEntry(entryId) {
      this.source = this.source.filter(o => o.id !== entryId);
      this.updateString({ path: this.path, value: this.source });
    },
    editEntry(entryId) {
      this.newEntryName = this.source.find(o => o.id === entryId).name;
      this.newEntryText = this.source.find(o => o.id === entryId).text;
      this.removeEntry(entryId);
    }
  },
};
</script>

<style lang="scss" scoped>
.generic-fields {
  font-size: .9rem;
  &__editor {
    input, textarea {
      width: 100%;
      resize: none;
      margin: 0;
      font-size: .8rem;
    }
    input {
      border-radius: 6px 6px 0 0;
      border: 1px solid #ddd;
      border-bottom: 0;
      padding: 4px 6px;
      font-style: italic;
    }
    textarea {
      border-radius: 0;
      border: 1px solid #ddd;
      border-top: 1px solid #eee;
      border-bottom: 1px solid #eee;
      padding: 4px 6px;
    }
    button {
      width: 100%;
      margin: 0;
      border-radius: 0 0 6px 6px;
      border: 1px solid #ddd;
      border-top: 0;
      position: relative;
      top: -3px;
    }
  }
}
.entry {
  &__wrap {
    margin-bottom: .5rem;
    display: flex;
  }
  &__content {
    margin-right: auto;
  }
  &__name {
    font-style: italic;
    font-weight: bold;
    // &::after {
    //   content: ':';
    // }
  }
  &__controls {
    min-width: 30px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-end;
  }
}
</style>