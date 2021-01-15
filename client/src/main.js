// import GAuth from 'vue-google-oauth2'
// const gauthOption = {
//     clientId: '1005501449202-75837aem8g5hbo5eo5l2n085c9b57hgo.apps.googleusercontent.com',
//     scope: 'profile email',
//     prompt: 'select_account'
// }

import Vue from "vue"
import App from "./App.vue"

new Vue({
    render: h => h(App)
}).$mount("#app")
// Vue.use(GAuth, gauthOption)