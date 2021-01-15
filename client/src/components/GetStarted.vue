<template>
  <div class="my-home">
    <h1 style="margin: 0">Keep Your</h1>
    <h1 style="margin: 0">Daily Tasks On Track</h1>
    <h1 style="margin: 0">
      with <span class="kang-bang-text">Kang Bang!</span>
    </h1>
    <a
      class="getting-started shadow-sm"
      @click="changePage('sign-in-page')"
      role="button"
      >Get Started</a
    >
    <p style="font-style: italic; color: gray; margin-bottom: 0.1rem">
      "Your future is created by what you do today,
    </p>
    <p style="font-style: italic; color: gray">not tomorrow..."</p>
  </div>
</template>

<script>
export default {
  name: "GetStarted",
  methods: {
    changePage(value) {
      this.$emit("changePage", value);
    },
  },
};
</script>

<style>
</style>