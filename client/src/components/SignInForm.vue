<template>
  <div class="my-home-form">
    <form @submit.prevent="signin">
      <h1>Sign In</h1>
      <input
        v-model="user.email"
        type="email"
        class="form-control"
        required="required"
        id="email-signin"
        style="text-align: center; border: 2px solid #174d65"
        placeholder="Email Address"
      />
      <div id="help-signin" class="form-text">
        We'll never share your email with anyone else.
      </div>
      <input
        v-model="user.password"
        type="password"
        class="form-control"
        id="password-signin"
        required="required"
        placeholder="Password"
        style="
          border: 2px solid #174d65;
          text-align: center;
          margin-bottom: 30px;
        "
      />
      <div id="my-button-yes">
        <button class="btn btn-warning" id="open-signin" @click="signin()">
          Sign In
        </button>
      </div>
      <h5 style="margin-bottom: 20px; text-align: center">
        Or Sign In with Social Platforms
      </h5>
      <!-- <google
        style="margin-bottom: 50px"
        class="d-flex justify-content-center"
        @checkAuth="checkAuth"
        @click="checkAuth"
      ></google> -->
      <div class="row-5" style="text-align: center">
        <a
          class="btn btn-success"
          role="button"
          id="create-account"
          @click="changePage('sign-up-page')"
          >Create Account</a
        >
      </div>
    </form>
  </div>
</template>

<script>
// import Google from "./Google";

export default {
  name: "SignInForm",
  data() {
    return {
      user: {
        email: "",
        password: "",
      },
    };
  },
  components: {
    // Google,
  },
  methods: {
    signin() {
      axios({
        method: "POST",
        url: `http://localhost:3000/signin`,
        data: {
          email: this.user.email,
          password: this.user.password,
        },
      })
        .then((task) => {
          localStorage.setItem("access_token", task.data.access_token);
          this.checkAuth();
        })
        .catch((err) => {
          console.log(err, "ini error");
        });
    },
    changePage(value) {
      this.$emit("changePage", value);
    },
    checkAuth() {
      this.$emit("checkAuth");
    },
    changeMainPage(value) {
      this.$emit("changeMainPage", value);
    },
  },
  // created: function () {
  //   this.checkAuth();
  // },
};
</script>

<style>
</style>