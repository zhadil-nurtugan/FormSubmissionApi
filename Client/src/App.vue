<template>
  <div id="app">
    <div class="app-container">
      <Card class="main-card">
        <template #header>
          <div class="card-header">
            <h1>{{ $t('app.title') }}</h1>
            <SelectButton
              v-model="currentLocale"
              :options="locales"
              optionLabel="label"
              optionValue="value"
              @change="changeLocale"
            />
          </div>
        </template>
        <template #content>
          <TabView v-model:activeIndex="activeTabIndex" class="custom-tabview">
            <TabPanel>
              <template #header>
                <span class="flex align-items-center gap-2">
                  <i class="pi pi-file-edit"></i>
                  <span>{{ $t('app.submitForm') }}</span>
                </span>
              </template>
              <ContactForm @submitted="handleSubmission" />
            </TabPanel>
            <TabPanel>
              <template #header>
                <span class="flex align-items-center gap-2">
                  <i class="pi pi-list"></i>
                  <span>{{ $t('app.viewSubmissions') }}</span>
                </span>
              </template>
              <SubmissionsList ref="submissionsListRef" />
            </TabPanel>
            <TabPanel>
              <template #header>
                <span class="flex align-items-center gap-2">
                  <i class="pi pi-question-circle"></i>
                  <span>Part2</span>
                </span>
              </template>
                <div style="padding: 1rem; max-height: 600px; overflow:auto; white-space:pre-wrap;">
                  <h3>{{ $t('part2.title') }}</h3>
                  <ul>
                    <li>{{ $t('part2.storeFiles') }}</li>
                    <li>{{ $t('part2.multipart') }}</li>
                    <li>{{ $t('part2.queue') }}</li>
                  </ul>
                </div>
            </TabPanel>
          </TabView>
        </template>
      </Card>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import Card from 'primevue/card';
import TabView from 'primevue/tabview';
import TabPanel from 'primevue/tabpanel';
import SelectButton from 'primevue/selectbutton';
import ContactForm from './components/ContactForm.vue';
import SubmissionsList from './components/SubmissionsList.vue';

const { locale } = useI18n();
const activeTabIndex = ref(0);
const submissionsListRef = ref(null);

const locales = [
  { label: 'EN', value: 'en' },
  { label: 'RU', value: 'ru' },
  { label: 'KZ', value: 'kz' },
  { label: 'FU', value: 'fu' }
];

const currentLocale = ref(locale.value);

onMounted(() => {
  const savedLocale = localStorage.getItem('locale');
  if (savedLocale) {
    currentLocale.value = savedLocale;
    locale.value = savedLocale;
  }
});

const changeLocale = (event) => {
  const newLocale = event.value;
  locale.value = newLocale;
  localStorage.setItem('locale', newLocale);
};

const handleSubmission = () => {
  activeTabIndex.value = 1;
  if (submissionsListRef.value && typeof submissionsListRef.value.refresh === 'function') {
    submissionsListRef.value.refresh();
  }
};
</script>

<style scoped>
.app-container {
  min-height: 100vh;
  padding: 2rem 1rem;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  animation: fadeIn 0.6s ease-in;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.main-card {
  width: 100%;
  max-width: 1200px;
  animation: slideUp 0.6s ease-out;
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2rem;
  flex-wrap: wrap;
  gap: 1.5rem;
  position: relative;
}

.card-header::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: rgba(255, 255, 255, 0.2);
}

.card-header h1 {
  margin: 0;
  font-size: 2rem;
  font-weight: 700;
  letter-spacing: -0.5px;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.card-header h1::before {
  content: '📋';
  font-size: 1.5rem;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2));
}

:deep(.p-card-body) {
  padding: 0;
}

:deep(.p-card-content) {
  padding: 0;
  background: #fafafa;
}

:deep(.custom-tabview .p-tabview-panels) {
  padding: 3rem;
  background: white;
  border-radius: 0 0 20px 20px;
  min-height: 500px;
}

:deep(.custom-tabview .p-tabview-nav) {
  padding: 0 2rem;
  background: #fafafa;
  border-bottom: 2px solid #e0e0e0;
}

@media (max-width: 768px) {
  .app-container {
    padding: 1rem 0.5rem;
  }

  .card-header {
    flex-direction: column;
    align-items: stretch;
    padding: 1.5rem;
  }

  .card-header h1 {
    font-size: 1.5rem;
    text-align: center;
    justify-content: center;
  }

  :deep(.custom-tabview .p-tabview-panels) {
    padding: 1.5rem 1rem;
  }

  :deep(.custom-tabview .p-tabview-nav) {
    padding: 0 1rem;
  }
}
</style>
