<template>
  <div>
    <div class="header-row mb-5 p">
      <h2 class="text-2xl font-bold">{{ $t('list.title') }}</h2>
      <div class="header-actions">
        <span class="p-input-icon-left search-box">
          <InputText
            v-model="searchTerm"
            :placeholder="$t('list.search')"
            class="w-full"
            @input="searchSubmissions"
          />
        </span>
        <Button icon="pi pi-refresh" class="ml-3" @click="fetchSubmissions(searchTerm.value)" />
      </div>
    </div>

    <ProgressSpinner v-if="loading" class="flex justify-content-center" />

    <div v-else-if="submissions.length === 0" class="empty-state">
      <i class="pi pi-inbox empty-icon"></i>
      <p class="empty-text">{{ $t('list.empty') }}</p>
      <Button :label="$t('list.refresh')" icon="pi pi-refresh" class="mt-3" @click="fetchSubmissions()" />
    </div>

    <transition-group name="list" tag="div" class="grid gap-4">
      <div
        v-for="submission in submissions"
        :key="submission.id"
        class="col-12 md:col-6 lg:col-5"
      >
        <Card class="submission-card p-3">
          <template #header>
            <div class="submission-header">
              <div class="left">
                <div class="submission-id">
                  <i class="pi pi-id-card mr-2"></i>
                  <small>{{ submission.id.substring(0, 20) }}...</small>
                </div>
                <Tag :value="formatFieldName(submission.subject || '')" class="ml-3" />
              </div>
              <div class="right">
                <div class="submission-date">
                  <i class="pi pi-calendar mr-2"></i>
                  <small>{{ formatDate(submission.submittedAt) }}</small>
                </div>
              </div>
            </div>
          </template>
          <template #content>
            <div class="submission-fields">
              <div class="field" v-if="submission.name">
                <div class="field-label"><strong>{{ $t('form.fullName') }}</strong></div>
                <div class="field-value">{{ submission.name }}</div>
              </div>
              <div class="field">
                <div class="field-label"><strong>{{ $t('form.email') }}</strong></div>
                <div class="field-value">
                  <template v-if="submission.email">
                    <i class="pi pi-envelope mr-2"></i>{{ submission.email }}
                  </template>
                  <template v-else>-</template>
                </div>
              </div>
              <div class="field">
                <div class="field-label"><strong>{{ $t('form.phone') }}</strong></div>
                <div class="field-value">
                  <template v-if="submission.phone">
                    <i class="pi pi-phone mr-2"></i>{{ submission.phone }}
                  </template>
                  <template v-else>-</template>
                </div>
              </div>
              <div class="meta-row">
                <Tag v-if="submission.newsletter" severity="success" rounded>{{ $t('list.newsletter') }}</Tag>
                 <Tag v-if="submission.terms" rounded class="terms-tag">{{ $t('list.termsAccepted') }}</Tag>
              </div>
            </div>
          </template>
        </Card>
      </div>
    </transition-group>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import Card from 'primevue/card';
import InputText from 'primevue/inputtext';
import ProgressSpinner from 'primevue/progressspinner';
import Button from 'primevue/button';
import Tag from 'primevue/tag';

const { t } = useI18n();
const submissions = ref([]);
const loading = ref(false);
const searchTerm = ref('');

const formatDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleString();
};

const formatFieldName = (key) => {
  return key
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, str => str.toUpperCase())
    .trim();
};

const formatValue = (value) => {
  if (value === null || value === undefined) return 'N/A';
  if (typeof value === 'boolean') return value ? t('common.yes') : t('common.no');
  if (Array.isArray(value)) return value.join(', ');
  return String(value);
};

const fetchSubmissions = async (search = '') => {
  loading.value = true;
  try {
    const url = search
      ? `/api/submissions?search=${encodeURIComponent(search)}`
      : '/api/submissions';
    
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Failed to fetch submissions');
    }
    
    const data = await response.json();
    submissions.value = data;
  } catch (error) {
    console.error('Error fetching submissions:', error);
    alert('An error occurred while fetching submissions.');
  } finally {
    loading.value = false;
  }
};

const searchSubmissions = () => {
  fetchSubmissions(searchTerm.value);
};

const refresh = (search = '') => {
  fetchSubmissions(search);
};

defineExpose({ refresh });

onMounted(() => {
  fetchSubmissions();
});
</script>

<style scoped>
/* Header */
.header-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
}
.header-actions {
  display: flex;
  align-items: center;
}
.search-box {
  min-width: 220px;
}

/* Empty state */
.empty-state {
  text-align: center;
  padding: 3rem 1rem;
  color: var(--surface-500);
}
.empty-icon {
  font-size: 3.5rem;
  color: var(--surface-400);
}
.empty-text {
  margin-top: 1rem;
  font-size: 1.05rem;
}

/* Cards */
.submission-card {
  transition: transform 0.18s ease, box-shadow 0.18s ease;
  border-radius: 12px;
}
.submission-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 10px 30px rgba(0,0,0,0.08);
}
.submission-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.submission-header .left {
  display: flex;
  align-items: center;
}
.submission-id small {
  color: var(--surface-600);
}
.submission-fields {
  margin-top: 0.5rem;
}
.field {
  margin-bottom: 0.6rem;
}
.field-label {

  margin-bottom: 0.25rem;
}
.field-value {
  color: var(--surface-900);
}
.meta-row {
  margin-top: 0.6rem;
  display: flex;
  gap: 0.5rem;
}

/* List transition */
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateY(8px);
}
.list-enter-active,
.list-leave-active {
  transition: all 240ms ease;
}

.submission-card ::v-deep .p-card-content {
  background: #ffffff !important;
}
</style>
