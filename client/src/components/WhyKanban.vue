<template>
  <div class="my-home">
    <p
      style="
        margin: 0;
        padding-right: 3rem;
        font-size: 20px;
        text-align: justify;
      "
    >
      "Kang Bang has help thousands of people keep updated on their routines.
      Tight deadlines and upcoming interview were managed perfectly on schedule
      board. From a Big Boss Manager to a College Student, we need to manage our
      daily task. Get started for free!"
    </p>
    <a
      class="getting-started shadow-sm"
      @click="changePage('sign-in-page')"
      role="button"
      >Get Started</a
    >
    <p style="font-style: italic; color: gray; margin-bottom: 0.1rem">
      "Time is Money, dudes. Don't miss big opportunity right there"
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