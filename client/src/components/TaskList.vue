<template>
  <div v-if="task.Task.status === cardCategory" :id="id">
    <div
      class="card"
      style="
        width: 17rem;
        margin-left: auto;
        margin-right: auto;
        margin-bottom: 16px;
      "
    >
      <div class="card-body">
        <p class="card-title" style="font-size: 14px; font-weight: 800">
          {{ task.Task.title }}
        </p>
        <p style="margin: 0; font-size: 12px">
          Deadline: {{ task.Task.dueDate.slice(0, 10) }}
        </p>
        <hr style="margin-top: 0.5rem; margin-bottom: 0.5rem" />
        <p class="card-text" style="font-size: 13px; margin-bottom: 0.5rem">
          {{ task.Task.description }}
        </p>
        <div style="display: inline-block; width: 100%; text-align: right">
          <button
            style="
              background-color: white;
              border-radius: 5px;
              padding: 1px 3px;
            "
            @click="showUpdateForm(task.id)"
          >
            <i class="fas fa-edit"></i>
          </button>
          <button
            style="
              background-color: white;
              border-radius: 5px;
              padding: 1px 4px;
            "
            @click="deleteData(task.Task.id)"
          >
            <i class="fas fa-trash-alt"></i>
          </button>
          <kanban-update-form
            :task="task.Task"
            @updateData="updateData"
            @checkAuth="checkAuth"
            @hideUpdateForm="hideUpdateForm"
            v-if="updateForm === true"
          ></kanban-update-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import KanbanUpdateForm from "./KanbanUpdateForm.vue";

export default {
  name: "TaskList",
  data() {
    return {
      updateForm: false,
    };
  },
  components: {
    KanbanUpdateForm,
  },
  props: ["task", "cardCategory", "id", "draggable"],
  methods: {
    checkAuth() {
      this.$emit("checkAuth");
    },
    updateData(value) {
      this.$emit("updateData", value);
    },
    deleteData(value) {
      this.$emit("deleteData", value);
    },
    showUpdateForm(value) {
      this.updateForm = true;
    },
    hideUpdateForm() {
      this.updateForm = false;
    },
  },
};
</script>

<style>
</style>