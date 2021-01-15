const app = new Vue({
    el: '#app',
    data: {
        message: 'Hello Vue!',
        page: "get-started-page",
        mainPage: "home-page",
        profilName: "",
        formTask: "",
        user: {
            name: "",
            email: "",
            password: ""
        },
        taskList: [],
        task: {
            title: "",
            description: "",
            status: "",
            dueDate: ""
        },
        server: "http://localhost:3000"
    },
    methods: {
        changePage(pageName) {
            this.page = pageName
            this.user = {
                name: "",
                email: "",
                password: ""
            }
        },
        changeMainPage(mainPageName) {
            if (this.mainPageName === "kanban-page") {
                this.page = ""
            }
            this.mainPage = mainPageName
        },
        signup() {
            console.log(axios())
            console.log(this.user.email)
            console.log(this.user.name)
            console.log(this.user.password)
            axios({
                method: 'POST',
                url: `http://localhost:3000/signup`,
                data: {
                    name: this.user.name,
                    email: this.user.email,
                    password: this.user.password
                }
            })
                .then(task => {
                    localStorage.setItem('access_token', task.data.access_token)
                    this.checkAuth()
                })
                .catch(err => {
                    console.log(err, "ini err")
                })

        },
        signin() {
            console.log("masuk signin")
            axios({
                method: 'POST',
                url: `${this.server}/signin`,
                data: {
                    email: this.user.email,
                    password: this.user.password
                }
            })
                .then(task => {
                    localStorage.setItem('access_token', task.data.access_token)
                    this.checkAuth()
                })
                .catch(err => {
                    console.log(err, "ini error")
                })

        },
        logout() {
            localStorage.clear()
            this.checkAuth()
        },
        getData() {
            console.log("MASUK GET DATA")
            axios({
                method: 'GET',
                url: this.server,
                headers: { access_token: localStorage.getItem('access_token') }
            })
                .then(task => {
                    this.taskList = task.data
                })
                .catch(err => {

                })
        },
        getDataUser() {
            console.log("MASUK GET DATA User")
            axios({
                method: 'GET',
                url: `${this.server}/user`,
                headers: { access_token: localStorage.getItem('access_token') }
            })
                .then(task => {
                    this.profilName = `Hi, ${task.data.user.name}`
                    console.log(this.profilName)
                })
                .catch(err => {

                })
        },
        showCreateFormBacklog() {
            this.formTask = "show-create-form-backlog"
            this.task.status = "Backlog"
            this.task.title = ""
            this.task.description = ""
            this.task.dueDate = ""
        },
        showCreateFormTodo() {
            this.formTask = "show-create-form-todo"
            this.task.status = "Todo"
            this.task.title = ""
            this.task.description = ""
            this.task.dueDate = ""
        },
        showCreateFormDoing() {
            this.formTask = "show-create-form-doing"
            this.task.status = "Doing"
            this.task.title = ""
            this.task.description = ""
            this.task.dueDate = ""
        },
        showCreateFormDone() {
            this.formTask = "show-create-form-done"
            this.task.status = "Done"
            this.task.title = ""
            this.task.description = ""
            this.task.dueDate = ""
        },
        hideCreateForm() {
            this.formTask = ""
            this.task.status = ""
            this.task.title = ""
            this.task.description = ""
            this.task.dueDate = ""
        },
        createData() {
            axios({
                method: 'POST',
                url: this.server,
                data: {
                    title: this.task.title,
                    description: this.task.description,
                    status: this.task.status,
                    dueDate: this.task.dueDate
                },
                headers: { access_token: localStorage.getItem('access_token') }
            })
                .then(task => {
                    this.formTask = ""
                    this.getData()
                })
                .catch(err => {
                    console.log("GAGAL")
                })
        },
        putData() {
            axios({
                method: 'PUT',
                url: this.server,
                data: {
                    title: this.task.title,
                    description: this.task.description,
                    status: this.task.status,
                    dueDate: this.task.dueDate
                },
                headers: { access_token: localStorage.getItem('access_token') }
            })
                .then(task => {

                })
                .catch(err => {

                })
        },
        patchData() {
            axios({
                method: 'PATCH',
                url: this.server,
                data: {
                    title: this.task.title,
                    description: this.task.description,
                    status: this.task.status,
                    dueDate: this.task.dueDate
                },
                headers: { access_token: localStorage.getItem('access_token') }
            })
                .then(task => {

                })
                .catch(err => {

                })
        },
        deleteData(num) {
            console.log(num)
            axios({
                method: 'DELETE',
                url: `${this.server}/${num}`,
                data: {},
                headers: { access_token: localStorage.getItem('access_token') }
            })
                .then(task => {
                    this.getData()
                })
                .catch(err => {
                    console.log(err, "DIA ERROR")
                })
        },
        checkAuth() {
            if (localStorage.access_token) {
                this.mainPage = "kanban-page"
                this.page = ""
                this.getData()
                this.getDataUser()

            } else {
                this.mainPage = "home-page"
                this.page = 'get-started-page'
                this.user = {
                    name: "",
                    email: "",
                    password: ""
                }
            }
        }

    },
    created: function () {
        this.checkAuth()
    },
    mounted: function () {
        this.checkAuth()
    }
})