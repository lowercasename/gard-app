<template>
  <div class="sheet-field">
    <span class="sheet-field__heading">{{ label }}</span>
    <span class="sheet-field__wrap">
      <span class="sheet-field__tracker" aria-hidden="true">{{ source }}</span>
      <input
        class="sheet-field__input"
        v-model="source"
        @input="
          updateString({
            path: path,
            value: source,
          })
        "
        spellcheck="false"
      />
    </span>
  </div>
</template>

<script>
export default {
  name: "SheetField",
  props: ["source", "label", "path", "updateBoolean", "updateInteger", "updateString"],
  data() {
    return {};
  },
  methods: {},
};
</script>

<style scoped>
.sheet-field {
  margin-right: 1rem;
  margin-bottom: 1rem;
  display: flex;
}
.sheet-field__heading {
  color: #888;
  font-weight: 400;
  margin-right: 6px;
  font-variant: small-caps;
}
.sheet-field__input {
  position: absolute;
  width: 100%;
  left: 0;
  border: 0;
  font-family: inherit;
  font-size: inherit;
  font-weight: 600;
  padding: 0;
  margin: 0;
  border-bottom: 1px solid #bbb;
  min-width: 60px;
  white-space: nowrap;
  padding: 0 0px;
}

.sheet-field__wrap {
  position: relative;
  white-space: nowrap;
  padding: 0 3px;
  display: inline-block;
  min-width: 60px;
  max-width: 100%;
  overflow-x: hidden;
  height: 38px;
}

.sheet-field__tracker {
  min-width: 60px;
  display: inline-block;
}
</style>