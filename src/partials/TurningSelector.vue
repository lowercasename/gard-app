<template>
  <div class="turning-selector" v-if="room.turning">
    <button type="button" class="button--text" @click="turnBack">
      <i class="fas fa-hand-point-left"></i>
    </button>
    <span class="current-turning">{{ room.turning.name }} ({{ room.turning.season }})</span>
    <button type="button" class="button--text" @click="turnForward">
      <i class="fas fa-hand-point-right"></i>
    </button>
  </div>
</template>

<script>

export default {
  name: "TurningSelector",
  props: ["turnBack", "turnForward", "room"]
};
</script>

<style lang="scss" scoped>
.current-turning {
  padding: 0 .5rem;
  font-variant: small-caps;
  font-size: .9rem;
}
</style>