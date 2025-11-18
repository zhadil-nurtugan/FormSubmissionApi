<template>
  <div>
    <h2 class="text-2xl font-bold mb-5 pb-3 border-bottom-2 surface-border">{{ $t('form.title') }}</h2>
    
    <Message v-if="successMessage" severity="success" :closable="false" class="mb-5">
      {{ successMessage }}
    </Message>

    <form @submit.prevent="submitForm">
      <div class="grid">
        <!-- Full Name -->
        <div class="col-12 md:col-6 mb-4">
          <FloatLabel>
            <InputText
              id="name"
              v-model="formData.name"
              :class="{ 'p-invalid': errors.name }"
              class="w-full"
            />
            <label for="name">{{ $t('form.fullName') }} *</label>
          </FloatLabel>
          <small v-if="errors.name" class="p-error block mt-2">{{ errors.name }}</small>
        </div>

        <!-- Subject -->
        <div class="col-12 md:col-6 mb-4">
          <FloatLabel>
            <Dropdown
              id="subject"
              v-model="formData.subject"
              :options="subjectOptions"
              optionLabel="label"
              optionValue="value"
              :class="{ 'p-invalid': errors.subject }"
              class="w-full"
              :placeholder="$t('form.subject')"
            />
            <label for="subject">{{ $t('form.subject') }} *</label>
          </FloatLabel>
          <small v-if="errors.subject" class="p-error block mt-2">{{ errors.subject }}</small>
        </div>

        <!-- Preferred Contact Method -->
        <div class="col-12 mb-4">
          <label class="block mb-3 text-base font-semibold">{{ $t('form.preferredContact') }} *</label>
          <div class="flex flex-wrap gap-3 p-4 surface-50 border-round">
            <div class="flex align-items-center">
              <RadioButton
                id="contact-email"
                v-model="formData.preferredContact"
                value="email"
                inputId="contact-email"
              />
              <label for="contact-email" class="ml-2">{{ $t('contactMethods.email') }}</label>
            </div>
            <div class="flex align-items-center">
              <RadioButton
                id="contact-phone"
                v-model="formData.preferredContact"
                value="phone"
                inputId="contact-phone"
              />
              <label for="contact-phone" class="ml-2">{{ $t('contactMethods.phone') }}</label>
            </div>
            <div class="flex align-items-center">
              <RadioButton
                id="contact-both"
                v-model="formData.preferredContact"
                value="both"
                inputId="contact-both"
              />
              <label for="contact-both" class="ml-2">{{ $t('contactMethods.both') }}</label>
            </div>
          </div>
          <small v-if="errors.preferredContact" class="p-error block mt-2">{{ errors.preferredContact }}</small>
        </div>

        <!-- Email Field (shown when email or both selected) -->
        <div v-if="showEmail" class="col-12 md:col-6 mb-4">
          <FloatLabel>
            <InputText
              id="email"
              v-model="formData.email"
              type="email"
              :class="{ 'p-invalid': errors.email }"
              class="w-full"
            />
            <label for="email">{{ $t('form.email') }} *</label>
          </FloatLabel>
          <small v-if="errors.email" class="p-error block mt-2">{{ errors.email }}</small>
        </div>

        <!-- Phone Field (shown when phone or both selected) -->
        <template v-if="showPhone">
          <div class="col-12 md:col-3 mb-4">
            <FloatLabel>
              <Dropdown
                id="country"
                v-model="formData.country"
                :options="countries"
                optionLabel="name"
                optionValue="code"
                class="w-full"
                :placeholder="$t('form.country')"
              />
              <label for="country">{{ $t('form.country') }}</label>
            </FloatLabel>
          </div>
          <div class="col-12 md:col-3 mb-4">
            <FloatLabel>
              <InputText
                id="phone"
                v-model="formData.phone"
                :class="{ 'p-invalid': errors.phone }"
                class="w-full"
                :placeholder="phonePlaceholder"
              />
              <label for="phone">{{ $t('form.phone') }} *</label>
            </FloatLabel>
            <small v-if="errors.phone" class="p-error block mt-2">{{ errors.phone }}</small>
          </div>
        </template>

        <!-- Preferred Contact Date -->
        <div class="col-12 md:col-6 mb-4">
          <FloatLabel>
            <Calendar
              id="date"
              v-model="formData.date"
              :class="{ 'p-invalid': errors.date }"
              class="w-full"
              :minDate="minDate"
              dateFormat="yy-mm-dd"
            />
            <label for="date">{{ $t('form.date') }} *</label>
          </FloatLabel>
          <small v-if="errors.date" class="p-error block mt-2">{{ errors.date }}</small>
        </div>

        <!-- Newsletter Checkbox -->
        <div class="col-12 mb-4 py-3">
          <div class="flex align-items-center">
            <Checkbox
              id="newsletter"
              v-model="formData.newsletter"
              :binary="true"
              inputId="newsletter"
            />
            <label for="newsletter" class="ml-2">{{ $t('form.newsletter') }}</label>
          </div>
        </div>

        <!-- Terms Checkbox -->
        <div class="col-12 mb-4 py-3">
          <div class="flex align-items-center">
            <Checkbox
              id="terms"
              v-model="formData.terms"
              :binary="true"
              :class="{ 'p-invalid': errors.terms }"
              inputId="terms"
            />
            <label for="terms" class="ml-2">{{ $t('form.terms') }} *</label>
          </div>
          <small v-if="errors.terms" class="p-error block mt-2">{{ errors.terms }}</small>
        </div>
      </div>

      <div class="flex justify-content-end mt-5 pt-4 border-top-1 surface-border">
        <Button
          type="submit"
          :label="isSubmitting ? $t('form.submitting') : $t('form.submit')"
          :disabled="isSubmitting"
          icon="pi pi-send"
          :loading="isSubmitting"
        />
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, reactive, computed, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { parsePhoneNumber, isValidPhoneNumber, AsYouType } from 'libphonenumber-js';
import InputText from 'primevue/inputtext';
import FloatLabel from 'primevue/floatlabel';
import Dropdown from 'primevue/dropdown';
import RadioButton from 'primevue/radiobutton';
import Checkbox from 'primevue/checkbox';
import Calendar from 'primevue/calendar';
import Button from 'primevue/button';
import Message from 'primevue/message';

const { t } = useI18n();
const emit = defineEmits(['submitted']);

const formData = reactive({
  name: '',
  email: '',
  phone: '',
  country: 'US',
  subject: '',
  preferredContact: '',
  date: null,
  newsletter: false,
  terms: false
});

const errors = reactive({});
const isSubmitting = ref(false);
const successMessage = ref('');

const minDate = new Date();

const subjectOptions = computed(() => [
  { label: t('subjects.general'), value: 'general' },
  { label: t('subjects.support'), value: 'support' },
  { label: t('subjects.sales'), value: 'sales' },
  { label: t('subjects.feedback'), value: 'feedback' }
]);

const countries = [
  { name: 'United States', code: 'US', dialCode: '+1' },
  { name: 'Kazakhstan', code: 'KZ', dialCode: '+7' },
  { name: 'Russia', code: 'RU', dialCode: '+7' },
  { name: 'Uzbekistan', code: 'UZ', dialCode: '+998' },
  { name: 'United Kingdom', code: 'GB', dialCode: '+44' },
  { name: 'Germany', code: 'DE', dialCode: '+49' },
  { name: 'France', code: 'FR', dialCode: '+33' }
];

const phonePlaceholder = computed(() => {
  const country = countries.find(c => c.code === formData.country);
  return country ? `${country.dialCode} (XXX) XXX-XXXX` : '';
});

const showEmail = computed(() => {
  return formData.preferredContact === 'email' || formData.preferredContact === 'both';
});

const showPhone = computed(() => {
  return formData.preferredContact === 'phone' || formData.preferredContact === 'both';
});

// Note: Phone formatting is handled by the placeholder and validation
// Automatic formatting during input can interfere with user experience

const validateForm = () => {
  Object.keys(errors).forEach(key => delete errors[key]);
  
  let isValid = true;

  // Full Name validation
  if (!formData.name.trim()) {
    errors.name = t('form.fullNameRequired');
    isValid = false;
  } else if (formData.name.trim().length < 2) {
    errors.name = t('form.fullNameMinLength');
    isValid = false;
  }

  // Email validation (if email or both selected)
  if (showEmail.value) {
    if (!formData.email.trim()) {
      errors.email = t('form.emailRequired');
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = t('form.emailInvalid');
      isValid = false;
    }
  }

  // Phone validation (if phone or both selected)
  if (showPhone.value) {
    if (!formData.phone.trim()) {
      errors.phone = t('form.phoneRequired');
      isValid = false;
    } else {
      try {
        const phoneNumber = parsePhoneNumber(formData.phone, formData.country);
        if (!phoneNumber || !phoneNumber.isValid()) {
          errors.phone = t('form.phoneInvalid');
          isValid = false;
        }
      } catch (e) {
        errors.phone = t('form.phoneInvalid');
        isValid = false;
      }
    }
  }

  if (!formData.subject) {
    errors.subject = t('form.subjectRequired');
    isValid = false;
  }

  if (!formData.preferredContact) {
    errors.preferredContact = t('form.preferredContactRequired');
    isValid = false;
  }

  if (!formData.date) {
    errors.date = t('form.dateRequired');
    isValid = false;
  } else {
    const selectedDate = new Date(formData.date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (selectedDate < today) {
      errors.date = t('form.datePast');
      isValid = false;
    }
  }

  if (!formData.terms) {
    errors.terms = t('form.termsRequired');
    isValid = false;
  }

  return isValid;
};

const submitForm = async () => {
  if (!validateForm()) {
    return;
  }

  isSubmitting.value = true;
  successMessage.value = '';

  try {
    // Prepare data for submission
    const submitData = {
      name: formData.name,
      subject: formData.subject,
      preferredContact: formData.preferredContact,
      date: formData.date ? new Date(formData.date).toISOString().split('T')[0] : '',
      newsletter: formData.newsletter,
      terms: formData.terms
    };

    if (showEmail.value) {
      submitData.email = formData.email;
    }

    if (showPhone.value) {
      submitData.phone = formData.phone;
      submitData.country = formData.country;
    }

    const response = await fetch('/api/submissions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(submitData),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      const errorMessage = errorData.error || errorData.details || `HTTP ${response.status}: ${response.statusText}`;
      console.error('Server error:', errorMessage, errorData);
      throw new Error(errorMessage);
    }

    const result = await response.json();
    successMessage.value = t('form.success');
    
    // Reset form
    Object.keys(formData).forEach(key => {
      if (typeof formData[key] === 'boolean') {
        formData[key] = false;
      } else if (key === 'country') {
        formData[key] = 'US';
      } else if (key === 'date') {
        formData[key] = null;
      } else {
        formData[key] = '';
      }
    });

    emit('submitted', result);

    setTimeout(() => {
      successMessage.value = '';
    }, 3000);
  } catch (error) {
    console.error('Error submitting form:', error);
    const errorMessage = error.message || t('form.error');
    alert(errorMessage);
  } finally {
    isSubmitting.value = false;
  }
};
</script>

<style scoped>
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}


</style>
