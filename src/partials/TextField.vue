<template>
  <section class="text-field">
    <textarea
      v-model="source"
      :placeholder="placeholder"
      @input="
        updateString({
          path: path,
          value: source,
        })
      "
      spellcheck="false"
    ></textarea>
  </section>
</template>

<script>
export default {
  name: "TextField",
  props: ["source", "path", "placeholder", "updateBoolean", "updateInteger", "updateString"],
  data() {
    return {};
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
textarea {
  border: 1px solid #ddd;
  border-radius: 6px;
  width: 100%;
  padding: 4px 6px;
  font-size: .9rem;
}
</style>