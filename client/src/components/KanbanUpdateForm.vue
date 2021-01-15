<template>
  <div class="card-body" :style="style">
    <form @submit.prevent="updateData(task.id)">
      <div class="form-floating mb-1">
        <input
          v-model="taskUpdated.title"
          type="text"
          class="form-control"
          id="floatingInput"
          :placeholder="task.title"
          required="required"
        />
        <label for="floatingInput">{{ task.title }}</label>
      </div>
      <div class="form-floating mb-1">
        <input
          v-model="taskUpdated.dueDate"
          type="datetime-local"
          class="form-control"
          required="required"
          id="floatingInput"
          :placeholder="task.dueDate"
        />
        <label for="floatingInput">{{ task.dueDate }}</label>
      </div>
      <div class="form-floating">
        <textarea
          v-model="taskUpdated.description"
          class="form-control"
          :placeholder="task.description"
          id="floatingTextarea2"
          style="height: 100px"
          required="required"
        ></textarea>
        <label for="floatingTextarea2">{{ task.description }}</label>
      </div>
      <button
        type="submit"
        class="btn btn-warning btn-sm"
        style="margin-top: 10px"
      >
        Edit Task
      </button>
      <a
        role="button"
        class="btn btn-danger btn-sm"
        style="margin-top: 10px"
        @click="hideUpdateForm"
        >Cancel</a
      >
    </form>
  </div>
</template>

<script>
export default {
  name: "KanbanUpdateForm",
  data() {
    return {
      style: `";
          background-color: grey;
        "`,
      taskUpdated: {
        title: "",
        dueDate: "",
        description: "",
        status: this.task.status,
      },
    };
  },
  props: ["task"],
  methods: {
    hideUpdateForm() {
      this.$emit("hideUpdateForm");
    },
    checkAuth() {
      this.$emit("checkAuth");
    },
    changeStyle() {
      if (this.task.status === "Backlog") {
        this.style = `";
          background-color: #174d65;
        "`;
      } else if (this.task.status === "Todo") {
        this.style = `";
          background-color: #8ed2db;
        "`;
      } else if (this.task.status === "Doing") {
        this.style = `";
          background-color: #e7d9bf;
        "`;
      } else if (this.task.status === "Done") {
        this.style = `";
          background-color: #2d5942;
        "`;
      }
    },
    updateData(value) {
      let obj = {
        params: +value,
        data: this.taskUpdated,
      };
      this.$emit("updateData", obj);
      this.checkAuth();
      this.hideUpdateForm();
    },
  },
  created: function () {
    this.changeStyle();
    this.checkAuth();
  },
};
</script>

<style>
</style>