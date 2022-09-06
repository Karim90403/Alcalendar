import { createApp } from 'vue'
import 'v-calendar/dist/style.css';
import './index.css'
import App from './App.vue'
import VCalendar from 'v-calendar';


createApp(App)
    .use(VCalendar, {})
    .mount('#app')