<template>
  <div class="navbar navbar-light bg-light" style="padding: 0 !important">
    <div class="col-4 d-flex justify-content-start">
      <li
        class="nav-item dropdown d-flex my-nav-hover"
        style="margin-left: 5vh"
      >
        <a
          class="nav-link"
          style="text-decoration: none; color: #174d65"
          id="navbarDropdownMenuLink"
          role="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          Board
        </a>
      </li>
      <li
        class="nav-item dropdown d-flex my-nav-hover"
        style="margin-left: 5vh"
      >
        <a
          class="nav-link"
          style="text-decoration: none; color: #174d65"
          role="button"
          data-bs-toggle="modal"
          data-bs-target="#memberModal"
          aria-expanded="false"
        >
          Member
        </a>
        <div
          class="modal fade"
          id="memberModal"
          tabindex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">
                  Manage Member
                </h5>
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div class="modal-body">
                <form class="row g-3" @submit.prevent="addMember(newMember)">
                  <div class="col-auto">
                    <label for="inputMember" class="visually-hidden"
                      >Member</label
                    >
                    <input
                      v-model="newMember"
                      type="text"
                      class="form-control"
                      id="inputMember"
                      placeholder="Colleagues email..."
                      required="required"
                    />
                  </div>
                  <div class="col-auto">
                    <button type="submit" class="btn btn-primary mb-3">
                      Add Member
                    </button>
                  </div>
                </form>
                <h5>Member List</h5>
                <div
                  class="d-flex justify-content-between"
                  v-for="(member, idx) in memberList"
                  :key="idx"
                >
                  {{ member }}
                  <button
                    style="
                      background-color: white;
                      border-radius: 5px;
                      padding: 1px 4px;
                    "
                    @click="deleteMemberList(member)"
                  >
                    <i class="fas fa-trash-alt"></i>
                  </button>
                </div>
              </div>
              <div class="modal-footer">
                <p style="font-style: italic; color: grey; font-size: 11px">
                  Invite friends, families, and colleagues to collaborate on
                  task!
                </p>
              </div>
            </div>
          </div>
        </div>
      </li>
      <li
        class="nav-item dropdown d-flex my-nav-hover"
        style="margin-left: 5vh"
      >
        <a
          class="nav-link"
          style="text-decoration: none; color: #174d65"
          role="button"
          data-bs-toggle="modal"
          data-bs-target="#memberCategory"
          aria-expanded="false"
        >
          Category
        </a>
        <div
          class="modal fade"
          id="memberCategory"
          tabindex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Category</h5>
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div class="modal-body">
                <form
                  class="row g-3"
                  @submit.prevent="addCategory(newCategory)"
                >
                  <div class="col-auto">
                    <label for="inputCategory" class="visually-hidden"
                      >category</label
                    >
                    <input
                      v-model="newCategory"
                      type="text"
                      class="form-control"
                      id="inputCategory"
                      placeholder="Category Name..."
                      required="required"
                    />
                  </div>
                  <div class="col-auto">
                    <button type="submit" class="btn btn-primary mb-3">
                      Add Category
                    </button>
                  </div>
                </form>
                <h5>Category List</h5>
                <div v-for="(item, idx) in categoryList" :key="idx">
                  <div
                    class="d-flex justify-content-between"
                    v-if="
                      item !== 'Backlog' &&
                      item !== 'Todo' &&
                      item !== 'Doing' &&
                      item !== 'Done'
                    "
                  >
                    {{ item }}
                    <button
                      style="
                        background-color: white;
                        border-radius: 5px;
                        padding: 1px 4px;
                      "
                      data-bs-dismiss="modal"
                      @click="deleteCategoryList(item)"
                    >
                      <i class="fas fa-trash-alt"></i>
                    </button>
                  </div>
                  <div class="d-flex justify-content-between" v-else>
                    {{ item }}
                  </div>
                </div>
              </div>
              <div class="modal-footer">
                <p style="font-style: italic; color: grey; font-size: 11px">
                  *scroll board to see new added category
                </p>
              </div>
            </div>
          </div>
        </div>
      </li>
    </div>
    <div class="col-4 d-flex justify-content-center">
      <img src="../assets/img/logocopy.png" style="width: 80px" />
    </div>
    <div class="col-4 d-flex justify-content-end">
      <li
        class="nav-item dropdown d-flex my-nav-hover"
        style="margin-right: 5vh"
      >
        <a
          class="nav-link dropdown-toggle"
          style="text-decoration: none; color: #174d65"
          id="navbarDropdownMenuLink"
          role="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
          v-text="profilName"
        ></a>
        <ul
          class="dropdown-menu"
          aria-labelledby="navbarDropdownMenuLink"
          style="min-width: 6rem; margin: 0; padding: 0"
        >
          <li
            style="
              background-color: #f8f9fa;
              border: 1px solid #174d65;
              padding: 0.1rem 0;
            "
          >
            <a class="dropdown-item" role="button" @click="signOut()"
              >Sign Out</a
            >
          </li>
        </ul>
      </li>
    </div>
  </div>
</template>

<script>
export default {
  name: "NavKanban",
  data() {
    return {
      category: false,
      newCategory: "",
      newMember: "",
    };
  },
  props: ["profilName", "categoryList", "memberList"],
  methods: {
    signOut() {
      // this.$gAuth.signOut();
      this.$emit("signOut");
    },
    checkAuth() {
      this.$emit("checkAuth");
    },
    deleteCategoryList(text) {
      this.checkAuth();
      this.$emit("deleteCategoryList", text);
    },
    addCategory(text) {
      this.$emit("addCategory", text);
    },
    addMember(text) {
      this.$emit("addMember", text);
      newMember = "";
    },
  },
};
</script>

<style>
</style>