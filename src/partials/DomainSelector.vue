<template>
  <section class="skill-selector" v-if="domainsDictionary">
    <h3>Skills</h3>
    <div v-for="skill in domainsDictionary" :key="skill.name" class="skill__wrap">
      <span class="skill__name">
        <div class="skill__buttons">
          <button type="button" class="button--text" @click="increaseSkill(skill.name)"><i class="fal fa-caret-up"></i></button>
          <button type="button" class="button--text"  @click="decreaseSkill(skill.name)"><i class="fal fa-caret-down"></i></button>   
        </div>
        <span class="skill__label">
        {{ skill.name }}</span>
        <span class="skill__dice" v-if="character.skills && character.skills.find(o => o.name === skill.name)">
          <i v-for="i in character.skills.find(o => o.name === skill.name).points" class="fas fa-dice-six" :key="i"></i>
        </span>
      </span>
    </div>
  </section>
</template>

<script>
import domainsDictionary from "../data/domains";

export default {
  name: 'SkillSelector',
  props: {
    character: Object,
    updateBoolean: Function,
    updateInteger: Function,
    updateString: Function,
  },
  data() {
    return {
      domainsDictionary,
    }
  },
  methods: {
    increaseSkill(skillName) {
      // Create skills entry if it doesn't exist
      if (!this.character.skills) {
        this.character.skills = [];
      }
      if (this.character.skills.find(o => o.name === skillName)) {
        // Entry exists, need to increment
        this.character.skills.map(o => {
          if (o.name === skillName) {
            o.points = o.points + 1;
          }
        });
      } else {
        // Need to create new entry
        this.character.skills.push({ ...domainsDictionary.find(o => o.name === skillName), points: 1 })
      }
      this.updateString({ path: `characters.${this.character.id}.skills`, value: this.character.skills });
    }, 
    decreaseSkill(skillName) {
      // Create skills entry if it doesn't exist
      if (!this.character.skills) {
        this.character.skills = [];
      }
      if (this.character.skills.find(o => o.name === skillName)) {
        // Entry exists, need to increment
        this.character.skills.map(o => {
          if (o.name === skillName) {
            o.points = o.points - 1;
            if (o.points < 0) {
              o.points = 0;
            }
          }
        });
      } else {
        // Need to create new entry
        this.character.skills.push({ ...domainsDictionary.find(o => o.name === skillName), points: 0 })
      }
      this.updateString({ path: `characters.${this.character.id}.skills`, value: this.character.skills });
    },
  }
}
</script>

<style lang="scss" scoped>
.skill__wrap {
  font-size: .9rem;
}
.skill__name {
  height: 25px;
  margin-bottom: 5px;
  display: flex;
  align-items: center;
  & > * {
    margin-right: 5px;
  }
}
.skill__buttons {
  display: inline-flex;
  flex-direction: column;
  height: 25px;
  button {
    height: 12px;
    display: flex;
    align-items: center;
    &:hover {
      opacity: 1;
      i {
        font-weight: 700;
      }
    }
  }
}
.skill__dice {
    i {
      margin-right: 3px;
    }
  }
</style>