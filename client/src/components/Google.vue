<template>
  <div id="google-signin-button"></div>
</template>

<script>
export default {
  mounted() {
    gapi.signin2.render("google-signin-button", {
      onsuccess: this.onSignIn,
    });
    console.log("MOUNTED EUY");
  },
  methods: {
    onSignIn(user) {
      const token = user.Bc.access_token;
      localStorage.setItem("access_token", token);
      const profile = user.getBasicProfile();
      console.log(profile);
      axios({
        method: "POST",
        url: `http://localhost:3000/google`,
        data: {
          name: profile.Ed,
          email: profile.tu,
          password: token,
        },
      })
        .then((task) => {
          this.changeMainPage("home-page");
          this.checkAuth();
        })
        .catch((err) => {
          console.log(err, "ini err");
        });
    },
    changePage(value) {
      this.$emit("changePage", value);
    },
    checkAuth() {
      this.$emit("checkAuth");
    },
    changeMainPage(value) {
      this.$emit("changePage", value);
    },
  },
};
</script>