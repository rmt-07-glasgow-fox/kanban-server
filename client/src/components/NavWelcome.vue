<template>
  <div id="start-navbar">
    <nav>
      <ul>
        <a role="button"
          ><img
            src="../assets/img/logocopy.png"
            style="
              margin-top: 5px;
              width: 80%;
              height: auto;
              box-sizing: border-box;
            "
            @click="changePage('get-started-page')"
        /></a>
        <li>
          <a role="button" @click="changePage('why-kanban-page')"
            >Why Kang Bang?</a
          >
        </li>
        <li><a role="button" @click="changePage('about-us-page')">About</a></li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  name: "NavWelcome",
  methods: {
    changePage(value) {
      this.$emit("changePage", value);
    },
  },
};
</script>

<style>
</style>