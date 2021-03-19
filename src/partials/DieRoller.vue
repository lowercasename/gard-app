<template>
  <div class="die-roller">
    <div class="die-pool-size">
      <span>
        <strong> <i class="fas fa-dice-d6"></i> {{ poolSize }} </strong>
      </span>
      <button
        type="button"
        class="button--text"
        @click="poolSize > 1 && poolSize--"
      >
        <i class="fal fa-minus-circle"></i>
      </button>
      <button type="button" class="button--text" @click="poolSize++">
        <i class="fal fa-plus-circle"></i>
      </button>
    </div>
    <button type="button" class="roll-button button" @click="rollDice">
      Roll
    </button>
  </div>
</template>

<script>
export default {
  name: "DieRoller",
  props: ["sendMessage"],
  data: () => ({
    poolSize: 1,
  }),
  methods: {
    rollDice() {
      let rolls = [];
      for (let i = 0; i < this.poolSize; i++) {
        rolls.push(this.rolld6());
      }
      let max = Math.max(...rolls);
      let min = Math.min(...rolls);
      console.log(rolls);
      this.sendMessage(`<strong>Rolling ${this.poolSize}d6:</strong> ${rolls.join(', ')}<br><strong>Highest die:</strong> ${max}<br><strong>Lowest die:</strong> ${min}<br>`);
    },
    rolld6() {
      return Math.floor(Math.random() * 6) + 1;
    },
  },
};
</script>

<style lang="scss" scoped>
.die-roller {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid #ddd;
  border-radius: 6px 6px 0 0;
  position: relative;
  top: 2px;
  border-bottom: none;
  padding-left: 5px;
}
.roll-button {
  border-top: none;
  border-right: none;
  border-bottom: none;
  border-radius: 0;
  font-variant: small-caps;
  font-size: 0.9rem;
  padding-top: 6px;
  padding-bottom: 6px;
}
.die-pool-size > * {
  margin-right: 5px;
}
</style>