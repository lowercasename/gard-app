<template>
  <spinner v-if="loading" />
  <div class="character-sheet" v-else>
    <div class="character-sheet__box">
      <div class="row">
        <div class="col">
          <sheet-field
            label="Name"
            :path="`steadings.${steadingId}.name`"
            :source="steading.name"
            :updateString="updateString"
          />
        </div>
        <div class="col">
          <sheet-field
            label="Specialty"
            :path="`steadings.${steadingId}.specialty`"
            :source="steading.specialty"
            :updateString="updateString"
          />
        </div>
        <div class="col">
          <sheet-field
            label="Size"
            :path="`steadings.${steadingId}.size`"
            :source="steading.size"
            :updateString="updateString"
          />
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-12 col-md-6">
        <div class="character-sheet__box">
          <h3>Abundances</h3>
          <generic-fields
            :source="steading.abundances ? steading.abundances : []"
            :path="`steadings.${steadingId}.abundances`"
            :updateString="updateString"
          />
        </div>
        <div class="character-sheet__box">
          <h3>Improvements</h3>
          <generic-fields
            :source="steading.improvements ? steading.improvements : []"
            :path="`steadings.${steadingId}.improvements`"
            :updateString="updateString"
          />
        </div>
      </div>
      <div class="col-12 col-md-6">
        <div class="character-sheet__flex-row character-sheet__box">
          <h3><i class="fas fa-fw fa-apple-alt"></i> Supply</h3>
          <span>
            <strong>
              {{ steading.supply ? steading.supply : 0 }}
            </strong>
          </span>
          <button
            type="button"
            class="button--text"
            @click="
              updateInteger({
                path: `steadings.${steading.id}.supply`,
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
                path: `steadings.${steading.id}.supply`,
                direction: 'increase',
              })
            "
          >
            <i class="fal fa-plus-circle"></i>
          </button>
        </div>
        <div class="character-sheet__flex-row character-sheet__box">
          <h3><i class="fas fa-fw fa-sack"></i> Surplus</h3>
          <span>
            <strong>
              {{ steading.surplus ? steading.surplus : 0 }}
            </strong>
          </span>
          <button
            type="button"
            class="button--text"
            @click="
              updateInteger({
                path: `steadings.${steading.id}.surplus`,
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
                path: `steadings.${steading.id}.surplus`,
                direction: 'increase',
              })
            "
          >
            <i class="fal fa-plus-circle"></i>
          </button>
        </div>
        <div class="character-sheet__flex-row character-sheet__box">
          <h3><i class="fas fa-fw fa-coins"></i> Wealth</h3>
          <span>
            <strong>
              {{ steading.wealth ? steading.wealth : 0 }}
            </strong>
          </span>
          <button
            type="button"
            class="button--text"
            @click="
              updateInteger({
                path: `steadings.${steading.id}.wealth`,
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
                path: `steadings.${steading.id}.wealth`,
                direction: 'increase',
              })
            "
          >
            <i class="fal fa-plus-circle"></i>
          </button>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <div class="character-sheet__box">
          <h3>Notes</h3>
          <text-field
            :source="steading.notes ? steading.notes : []"
            :path="`steadings.${steadingId}.notes`"
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
          @click="deleteSteading(steadingId)"
        >
          <i class="fal fa-trash-alt"></i> Delete Steading
        </button>
      </div>
    </div>
  </div>
</template>


<script>
import SheetField from "@/partials/SheetField.vue";
import Spinner from "@/partials/Spinner.vue";
import GenericFields from "../partials/GenericFields.vue";
import TextField from "../partials/TextField.vue";
import db from "@/modules/FirebaseDatabase";

export default {
  name: "SteadingSheet",
  components: {
    SheetField,
    GenericFields,
    Spinner,
    TextField,
  },
  props: {
    steadingId: String,
    updateBoolean: Function,
    updateInteger: Function,
    updateString: Function,
    deleteSteading: Function
  },
  data() {
    return {
      loading: true,
      steading: {},
    };
  },
  methods: {
    fetchSteading(steadingId) {
      this.loading = true;
      const steadingRef = db.ref(
        "rooms/" + this.$route.params.roomId + "/steadings/" + steadingId
      );
      steadingRef.on("value", (snapshot) => {
        this.steading = snapshot.val();
        this.loading = false;
      });
    },
  },
  mounted() {
    this.fetchSteading(this.$route.params.steadingId);
  },
  watch: {
    $route(to) {
      this.fetchSteading(to.params.steadingId);
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