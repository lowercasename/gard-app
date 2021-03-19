<template>
  <spinner v-if="loading" />
  <div class="character-sheet" v-else>
    <div class="character-sheet__box">
      <div class="row">
        <div class="col">
          <sheet-field
            label="Name"
            :path="`characters.${characterId}.name`"
            :source="character.name"
            :updateString="updateString"
          />
        </div>
        <div class="col">
          <sheet-field
            label="Age"
            :path="`characters.${characterId}.age`"
            :source="character.age"
            :updateString="updateString"
          />
        </div>
        <div class="col">
          <sheet-field
            label="Calling"
            :path="`characters.${characterId}.calling`"
            :source="character.calling"
            :updateString="updateString"
          />
        </div>
      </div>
      <div class="row" style="margin-bottom: -1rem">
        <div class="col">
          <sheet-field
            label="Appearance"
            :path="`characters.${characterId}.appearance`"
            :source="character.appearance"
            :updateString="updateString"
          />
        </div>
        <div class="col">
          <sheet-field
            label="Player"
            :path="`characters.${characterId}.player`"
            :source="character.player"
            :updateString="updateString"
          />
        </div>
        <div class="col">
          <sheet-field
            label="Beliefs"
            :path="`characters.${characterId}.beliefs`"
            :source="character.beliefs"
            :updateString="updateString"
          />
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-12 col-md-6">
        <div class="character-sheet__box">
          <domain-selector
            :character="character"
            :updateString="updateString"
          />
        </div>
        <div class="character-sheet__box">
          <h3>Actions & Talents</h3>
          <generic-fields
            :source="character.abilities ? character.abilities : []"
            :path="`characters.${characterId}.abilities`"
            :updateString="updateString"
          />
        </div>
      </div>
      <div class="col-12 col-md-6">
        <div class="character-sheet__flex-row character-sheet__box">
          <h3><i class="fas fa-fw fa-sparkles"></i> Wyrd Die</h3>
          <button
            type="button"
            class="button--text"
            @click="
              updateBoolean({
                path: `characters.${character.id}.wyrdDie`,
                value: !character.wyrdDie,
              })
            "
          >
            <i
              :class="
                'fas fa-dice-d6 ' +
                (character.wyrdDie === true ? '' : 'icon-muted')
              "
            ></i>
          </button>
        </div>
        <div class="character-sheet__flex-row character-sheet__box">
          <h3><i class="fas fa-fw fa-tint"></i> Harm</h3>
          <span>
            <strong>
              {{ character.harm ? character.harm : 0 }}
            </strong>
          </span>
          <button
            type="button"
            class="button--text"
            @click="
              updateInteger({
                path: `characters.${character.id}.harm`,
                direction: 'decrease',
              })
            "
          >
            <i class="fal fa-minus-circle"></i>
          </button>
          <button
            type="button"
            class="button--text"
            @click="
              updateInteger({
                path: `characters.${character.id}.harm`,
                direction: 'increase',
              })
            "
          >
            <i class="fal fa-plus-circle"></i>
          </button>
        </div>
        <div class="character-sheet__flex-row character-sheet__box">
          <h3><i class="fas fa-fw fa-crown"></i> Renown</h3>
          <span>
            <strong>
              {{ character.renown ? character.renown : 0 }}
            </strong>
          </span>
          <button
            type="button"
            class="button--text"
            @click="
              updateInteger({
                path: `characters.${character.id}.renown`,
                direction: 'decrease',
                allowNegative: true,
              })
            "
          >
            <i class="fal fa-minus-circle"></i>
          </button>
          <button
            type="button"
            class="button--text"
            @click="
              updateInteger({
                path: `characters.${character.id}.renown`,
                direction: 'increase',
              })
            "
          >
            <i class="fal fa-plus-circle"></i>
          </button>
        </div>
        <div class="character-sheet__flex-row character-sheet__box">
          <h3><i class="fas fa-fw fa-coins"></i> Coin</h3>
          <span>
            <strong>
              {{ character.coin ? character.coin : 0 }}
            </strong>
          </span>
          <button
            type="button"
            class="button--text"
            @click="
              updateInteger({
                path: `characters.${character.id}.coin`,
                direction: 'decrease',
              })
            "
          >
            <i class="fal fa-minus-circle"></i>
          </button>
          <button
            type="button"
            class="button--text"
            @click="
              updateInteger({
                path: `characters.${character.id}.coin`,
                direction: 'increase',
              })
            "
          >
            <i class="fal fa-plus-circle"></i>
          </button>
        </div>
        <div class="character-sheet__box">
          <h3>Equipment</h3>
          <generic-fields
            :source="character.equipment ? character.equipment : []"
            :path="`characters.${characterId}.equipment`"
            :updateString="updateString"
          />
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <div class="character-sheet__box">
          <h3>Notes</h3>
          <text-field
            :source="character.notes ? character.notes : []"
            :path="`characters.${characterId}.notes`"
            :updateString="updateString"
            placeholder="Add notes here."
          />
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <button
          type="button"
          class="button--danger"
          @click="deleteCharacter(characterId)"
        >
          <i class="fal fa-trash-alt"></i> Delete Character
        </button>
      </div>
    </div>
  </div>
</template>


<script>
import SheetField from "@/partials/SheetField.vue";
import Spinner from "@/partials/Spinner.vue";
import DomainSelector from "@/partials/DomainSelector.vue";
import db from "@/modules/FirebaseDatabase";
import GenericFields from "../partials/GenericFields.vue";
import TextField from "../partials/TextField.vue";

export default {
  name: "CharacterSheet",
  components: {
    SheetField,
    DomainSelector,
    GenericFields,
    Spinner,
    TextField,
  },
  props: {
    characterId: String,
    updateBoolean: Function,
    updateInteger: Function,
    updateString: Function,
    deleteCharacter: Function,
  },
  data() {
    return {
      loading: true,
      character: {},
    };
  },
  methods: {
    fetchCharacter(characterId) {
      this.loading = true;
      const characterRef = db.ref(
        "rooms/" + this.$route.params.roomId + "/characters/" + characterId
      );
      characterRef.on("value", (snapshot) => {
        this.character = snapshot.val();
        this.loading = false;
      });
    },
  },
  mounted() {
    this.fetchCharacter(this.$route.params.characterId);
  },
  watch: {
    $route(to) {
      this.fetchCharacter(to.params.characterId);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/scss/_variables.scss";

.character-sheet {
  width: 100%;
  padding: 1rem;
  max-width: 720px;
  &__box {
    border-radius: 6px;
    border: 1px solid rgb(209, 209, 209);
    padding: 0.5rem;
    margin-bottom: 1rem;
  }
  &__flex-row {
    display: flex;
    align-items: baseline;
    strong {
      // color: $red;
    }
    & > * {
      margin-right: 10px;
    }
    button:hover {
      opacity: 1;
      i {
        font-weight: 700;
      }
    }
  }
}
</style>