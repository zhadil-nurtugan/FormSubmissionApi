import { createApp } from 'vue';
import PrimeVue from 'primevue/config';
import 'primevue/resources/themes/aura-light-blue/theme.css';
import 'primevue/resources/primevue.min.css';
import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';
import App from './App.vue';
import i18n from './i18n';
import './style.css';

const app = createApp(App);

app.use(PrimeVue);
app.use(i18n);

app.mount('#app');

