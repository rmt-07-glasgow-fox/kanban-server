<template>
  <div id="my-kanban-app">
    <section id="my-home-page" v-if="mainPage === 'home-page'">
      <nav-welcome
        @changePage="changePage"
        @checkAuth="checkAuth"
      ></nav-welcome>

      <div id="start-container">
        <div class="my-container">
          <sign-in-form
            v-if="page === 'sign-in-page'"
            @checkAuth="checkAuth"
            @changePage="changePage"
          >
          </sign-in-form>
          <sign-up-form
            v-else-if="page === 'sign-up-page'"
            @changePage="changePage"
            @checkAuth="checkAuth"
          ></sign-up-form>
          <get-started
            v-else-if="page === 'get-started-page'"
            @changePage="changePage"
          ></get-started>
          <why-kanban
            v-else-if="page === 'why-kanban-page'"
            @changePage="changePage"
          ></why-kanban>
          <about-us
            v-else-if="page === 'about-us-page'"
            @changePage="changePage"
          ></about-us>
          <wallpaper></wallpaper>
        </div>
      </div>
    </section>

    <section id="my-kanban-board" v-if="mainPage !== 'home-page'">
      <nav-kanban
        :profilName="profilName"
        @signOut="signOut"
        :categoryList="category"
        :memberList="member"
        @deleteCategoryList="deleteCategoryList"
        @addCategory="addCategory"
        @addMember="addMember"
        @getDataCategory="getDataCategory"
      ></nav-kanban>

      <div
        class="my-container"
        style="
          overflow-x: scroll;
          overflow-y: hidden;
          height: 80vh;
          margin-bottom: 50px;
          margin-top: 50px;
          margin-left: 50px;
          margin-right: 50px;
        "
      >
        <kanban-category
          v-for="(cardCategory, idx) in category"
          :key="idx"
          :cardCategory="cardCategory"
          :formTask="formTask"
          @getData="getData"
          :taskList="taskList"
          @showCreateForm="showCreateForm"
          @hideCreateForm="hideCreateForm"
          @createData="createData"
          @deleteData="deleteData"
          @updateData="updateData"
          @checkAuth="checkAuth"
        >
        </kanban-category>
      </div>
      <kanban-footer></kanban-footer>
    </section>
  </div>
</template>

<script>
import NavWelcome from "./components/NavWelcome";
import WhyKanban from "./components/WhyKanban";
import GetStarted from "./components/GetStarted";
import SignInForm from "./components/SignInForm";
import SignUpForm from "./components/SignUpForm";
import Wallpaper from "./components/Wallpaper";
import KanbanCategory from "./components/KanbanCategory";
import KanbanFooter from "./components/KanbanFooter";
import NavKanban from "./components/NavKanban";
import AboutUs from "./components/AboutUs.vue";

export default {
  name: "App",
  data() {
    return {
      message: "Hello Vue",
      page: "get-started-page",
      mainPage: "home-page",
      profilName: "",
      formTask: "",
      taskList: [],
      task: {
        title: "",
        description: "",
        status: "",
        dueDate: "",
      },
      server: "http://localhost:3000",
      category: [],
      member: [],
    };
  },
  components: {
    NavWelcome,
    SignInForm,
    SignUpForm,
    GetStarted,
    WhyKanban,
    Wallpaper,
    NavKanban,
    KanbanCategory,
    KanbanFooter,
    AboutUs,
  },
  methods: {
    checkAuth() {
      if (localStorage.access_token) {
        this.changeMainPage("kanban-page");
      } else {
        this.changeMainPage("home-page");
        this.page = "get-started-page";
        this.user = {
          name: "",
          email: "",
          password: "",
        };
      }
    },
    changePage(pageName) {
      this.page = pageName;
      this.user = {
        name: "",
        email: "",
        password: "",
      };
    },
    changeMainPage(mainPageName) {
      if (this.mainPageName === "kanban-page") {
        this.page = "";
      }
      this.mainPage = mainPageName;
    },
    signOut() {
      localStorage.clear();
      this.checkAuth();
      this.taskList = [];
    },
    deleteCategoryList(text) {
      this.category = this.category.filter((item) => item !== text);
      axios({
        method: "DELETE",
        url: `${this.server}/category/${text}`,
        data: {},
        headers: { access_token: localStorage.getItem("access_token") },
      })
        .then((task) => {
          this.getData();
        })
        .catch((err) => {
          console.log(err, "DIA ERROR");
        });
    },
    addCategory(text) {
      this.category.push(text);
      console.log(this.category, "HELLLLL");
      this.createDataCategory();
    },
    addMember(text) {
      axios({
        method: "POST",
        url: "http://localhost:3000/member/" + text,
        headers: { access_token: localStorage.getItem("access_token") },
      })
        .then((user) => {
          this.member.push(user.data);
        })
        .catch((err) => {});
    },
    getData() {
      axios({
        method: "GET",
        url: "http://localhost:3000",
        headers: { access_token: localStorage.getItem("access_token") },
      })
        .then((task) => {
          this.taskList = task.data;
        })
        .catch((err) => {});
    },
    getDataUser() {
      console.log("MASUK GET DATA User");
      axios({
        method: "GET",
        url: `${this.server}/user`,
        headers: { access_token: localStorage.getItem("access_token") },
      })
        .then((task) => {
          console.log(task);
          this.profilName = `Hi, ${task.data.user.name}`;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getDataCategory() {
      axios({
        method: "GET",
        url: `${this.server}/category`,
        headers: { access_token: localStorage.getItem("access_token") },
      })
        .then((categoryList) => {
          console.log(categoryList, "JJJ");
          if (categoryList.data.length === 0) {
            console.log("MASUK SINI GA");
            this.category = ["Backlog", "Todo", "Doing", "Done"];
            this.createDataCategory();
          } else {
            let temp = [];
            console.log("CATEGORY ADA YOGA");
            for (let i = 0; i < categoryList.data.length; i++) {
              let check = categoryList.data[i].name;
              this.category.push(check);
            }
          }
        })
        .catch((err) => {});
    },
    createDataCategory() {
      this.category.forEach((el) => {
        axios({
          method: "POST",
          url: `${this.server}/category`,
          data: {
            category: el,
          },
          headers: { access_token: localStorage.getItem("access_token") },
        })
          .then((category) => {
            console.log("berhasil");
            this.checkAuth();
          })
          .catch((err) => {
            console.log("gagals");
          });
      });
    },
    showCreateForm(text) {
      // console.log("masuk show create");
      this.formTask = text;
      this.task.status = text;
      this.task.title = "";
      this.task.description = "";
      this.task.dueDate = "";
    },
    hideCreateForm() {
      console.log("masuk hide");
      this.formTask = "";
      this.task.status = "";
      this.task.title = "";
      this.task.description = "";
      this.task.dueDate = "";
    },
    createData(value) {
      axios({
        method: "POST",
        url: "http://localhost:3000",
        data: {
          value,
        },
        headers: { access_token: localStorage.getItem("access_token") },
      })
        .then((task) => {
          this.hideCreateForm();
          this.getData();
        })
        .catch((err) => {
          console.log(err, "GAGAL");
        });
    },
    updateData(temp) {
      axios({
        method: "PUT",
        url: `${this.server}/${temp.params}`,
        data: {
          data: temp.data,
        },
        headers: { access_token: localStorage.getItem("access_token") },
      })
        .then((task) => {
          this.getData();
        })
        .catch((err) => {
          console.log(err, "GAGAL");
        });
    },
    patchData() {
      axios({
        method: "PATCH",
        url: this.server,
        data: {
          title: this.task.title,
          description: this.task.description,
          status: this.task.status,
          dueDate: this.task.dueDate,
        },
        headers: { access_token: localStorage.getItem("access_token") },
      })
        .then((task) => {})
        .catch((err) => {});
    },
    deleteData(num) {
      console.log(num);
      axios({
        method: "DELETE",
        url: `${this.server}/${num}`,
        data: {},
        headers: { access_token: localStorage.getItem("access_token") },
      })
        .then((task) => {
          this.getData();
        })
        .catch((err) => {
          console.log(err, "DIA ERROR");
        });
    },
  },
  created: function () {
    this.getData();
    this.getDataUser();
    this.getDataCategory();
    this.checkAuth();
  },
};
</script>

<style>
</style>