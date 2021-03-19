<template>
  <spinner v-if="loading" />
  <div class="note-sheet" v-else>
    <div class="row">
      <div class="col-12 col-md-8">
        <sheet-field
          label="Title"
          :path="`notes.${noteId}.name`"
          :source="note.name"
          :updateString="updateString"
        />
      </div>
      <div class="col-12 col-md-4" style="text-align: right;">
        <button
          type="button"
          class="button--danger"
          @click="deleteNote(noteId)"
        >
          <i class="fal fa-trash-alt"></i> Delete Note
        </button>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <text-field
          :source="note.content ? note.content : []"
          :path="`notes.${noteId}.content`"
          :updateString="updateString"
          placeholder="Add notes here."
        />
      </div>
    </div>
  </div>
</template>


<script>
import SheetField from "@/partials/SheetField.vue";
import Spinner from "@/partials/Spinner.vue";
import TextField from "../partials/TextField.vue";
import db from "@/modules/FirebaseDatabase";

export default {
  name: "NoteSheet",
  components: {
    SheetField,
    Spinner,
    TextField,
  },
  props: {
    noteId: String,
    updateBoolean: Function,
    updateInteger: Function,
    updateString: Function,
    deleteNote: Function,
  },
  data() {
    return {
      loading: true,
      note: {},
    };
  },
  methods: {
    fetchNote(noteId) {
      this.loading = true;
      const noteRef = db.ref(
        "rooms/" + this.$route.params.roomId + "/notes/" + noteId
      );
      noteRef.on("value", (snapshot) => {
        this.note = snapshot.val();
        this.loading = false;
      });
    },
  },
  mounted() {
    this.fetchNote(this.$route.params.noteId);
  },
  watch: {
    $route(to) {
      this.fetchNote(to.params.noteId);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/scss/_variables.scss";
.note-sheet {
  width: 100%;
  padding: 1rem;
  max-width: 720px;
}
</style>