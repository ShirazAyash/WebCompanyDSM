import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './index.css'


// import 'bootstrap/dist/css/bootstrap.min.css'
import './assets/main.css'///assets/main.css'
//import Vue from 'vue'
// import { BootstrapVue } from 'bootstrap-vue'

import GAuth from 'vue3-google-oauth2'
import VueGoogleMaps from "@fawmi/vue-google-maps";

const app = createApp(App)
app.use(VueGoogleMaps, {
  load: {
    key: "AIzaSyDB68uZ8fUXV8ldaevGTEGGJzo22QDfvg0"
  }
});

app.use(router).mount('#app')

const gauthOption = {
    clientId: '888330668226-3vlji3kfopq4q79a0ddetdf7rtd7ldnr.apps.googleusercontent.com',
    scope: 'profile email',
    prompt: 'consent',
    fetch_basic_profile: true
  }
app.use(GAuth, gauthOption);


//app.config.productionTip = false

//    Vue.use(BootstrapVue);