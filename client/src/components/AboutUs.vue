<template>
  <div class="my-home">
    <p style="margin: 0; padding-right: 3rem; font-size: 20px">
      <a
        ><img
          src="../assets/img/logo_kangbang.png"
          style="
            margin-top: 5px;
            width: 90%;
            height: auto;
            box-sizing: border-box;
          "
          @click="changePage('get-started-page')"
      /></a>
    </p>

    <a
      class="getting-started shadow-sm"
      @click="changePage('sign-in-page')"
      role="button"
      style="text-align: center; margin-left: 10vh"
      >Get Started</a
    >
    <p style="font-style: italic; color: gray; margin-bottom: 0.1rem">
      "All Rights Reserved by Gian Marvin Corps Copyright 2020."
    </p>
  </div>
</template>

<script>
export default {
  name: "WhayKanban",
  methods: {
    changePage(value) {
      this.$emit("changePage", value);
    },
  },
};
</script>

<style>
</style>