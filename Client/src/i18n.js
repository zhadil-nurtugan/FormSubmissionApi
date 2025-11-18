import { createI18n } from 'vue-i18n';

const messages = {
  en: {
    app: {
      title: 'Form Submission System',
      submitForm: 'Submit Form',
      viewSubmissions: 'View Submissions'
    },
    form: {
      title: 'Contact Form',
      fullName: 'Full Name',
      fullNameRequired: 'Full Name is required',
      fullNameMinLength: 'Full Name must be at least 2 characters',
      email: 'Email Address',
      emailRequired: 'Email is required',
      emailInvalid: 'Please enter a valid email address',
      subject: 'Subject',
      subjectRequired: 'Please select a subject',
      preferredContact: 'Preferred Contact Method',
      preferredContactRequired: 'Please select a contact method',
      phone: 'Phone Number',
      phoneRequired: 'Phone number is required',
      phoneInvalid: 'Please enter a valid phone number',
      country: 'Country',
      date: 'Preferred Contact Date',
      dateRequired: 'Please select a date',
      datePast: 'Date cannot be in the past',
      newsletter: 'Subscribe to newsletter',
      terms: 'I agree to the terms and conditions',
      termsRequired: 'You must agree to the terms and conditions',
      submit: 'Submit Form',
      submitting: 'Submitting...',
      success: 'Form submitted successfully!',
      error: 'An error occurred while submitting the form. Please try again.'
    },
    subjects: {
      general: 'General Inquiry',
      support: 'Technical Support',
      sales: 'Sales Question',
      feedback: 'Feedback'
    },
    contactMethods: {
      email: 'Email',
      phone: 'Phone',
      both: 'Both'
    },
    list: {
      title: 'Submissions',
      search: 'Search submissions...',
      loading: 'Loading submissions...',
      empty: 'No submissions found.',
      id: 'ID',
      submittedAt: 'Submitted At'
    },
    part2: {
      title: 'Overview: storing and downloading large attachments (~100MB)',
      storeFiles: 'Store files in S3-compatible object storage (e.g. MinIO)',
      multipart: 'Use multipart / chunked uploads from the frontend',
      queue: 'Use a processing queue for post-processing (RabbitMQ / SQS / Kafka)'
    },
    common: {
      yes: 'Yes',
      no: 'No'
    }
  },
  ru: {
    app: {
      title: 'Система отправки форм',
      submitForm: 'Отправить форму',
      viewSubmissions: 'Просмотр отправок'
    },
    form: {
      title: 'Контактная форма',
      fullName: 'Полное имя',
      fullNameRequired: 'Полное имя обязательно',
      fullNameMinLength: 'Полное имя должно содержать минимум 2 символа',
      email: 'Адрес электронной почты',
      emailRequired: 'Email обязателен',
      emailInvalid: 'Введите действительный адрес электронной почты',
      subject: 'Тема',
      subjectRequired: 'Выберите тему',
      preferredContact: 'Предпочтительный способ связи',
      preferredContactRequired: 'Выберите способ связи',
      phone: 'Номер телефона',
      phoneRequired: 'Номер телефона обязателен',
      phoneInvalid: 'Введите действительный номер телефона',
      country: 'Страна',
      date: 'Предпочтительная дата связи',
      dateRequired: 'Выберите дату',
      datePast: 'Дата не может быть в прошлом',
      newsletter: 'Подписаться на рассылку',
      terms: 'Я согласен с условиями использования',
      termsRequired: 'Вы должны согласиться с условиями',
      submit: 'Отправить форму',
      submitting: 'Отправка...',
      success: 'Форма успешно отправлена!',
      error: 'Произошла ошибка при отправке формы. Пожалуйста, попробуйте снова.'
    },
    subjects: {
      general: 'Общий запрос',
      support: 'Техническая поддержка',
      sales: 'Вопрос по продажам',
      feedback: 'Отзыв'
    },
    contactMethods: {
      email: 'Email',
      phone: 'Телефон',
      both: 'Оба'
    },
    list: {
      title: 'Отправки',
      search: 'Поиск отправок...',
      loading: 'Загрузка отправок...',
      empty: 'Отправки не найдены.',
      id: 'ID',
      submittedAt: 'Отправлено'
    },
    part2: {
      title: 'Обзор: хранение и скачивание больших вложений (~100MB)',
      storeFiles: 'Храните файлы в объектном хранилище, совместимом с S3 (например, MinIO)',
      multipart: 'Используйте multipart/покомпонентную загрузку с фронтента',
      queue: 'Используйте очередь обработки для постобработки (RabbitMQ / SQS / Kafka)'
    },
    common: {
      yes: 'Да',
      no: 'Нет'
    }
  },
  kz: {
    app: {
      title: 'Форма жіберу жүйесі',
      submitForm: 'Форманы жіберу',
      viewSubmissions: 'Жіберілгендерді көру'
    },
    form: {
      title: 'Байланыс формасы',
      fullName: 'Толық аты',
      fullNameRequired: 'Толық аты міндетті',
      fullNameMinLength: 'Толық аты кемінде 2 таңбадан тұруы керек',
      email: 'Электрондық пошта мекенжайы',
      emailRequired: 'Email міндетті',
      emailInvalid: 'Жарамды электрондық пошта мекенжайын енгізіңіз',
      subject: 'Тақырып',
      subjectRequired: 'Тақырыпты таңдаңыз',
      preferredContact: 'Байланыс әдісі',
      preferredContactRequired: 'Байланыс әдісін таңдаңыз',
      phone: 'Телефон нөмірі',
      phoneRequired: 'Телефон нөмірі міндетті',
      phoneInvalid: 'Жарамды телефон нөмірін енгізіңіз',
      country: 'Ел',
      date: 'Байланыс күні',
      dateRequired: 'Күнді таңдаңыз',
      datePast: 'Күн өткен болуы мүмкін емес',
      newsletter: 'Хабарландыруға жазылу',
      terms: 'Мен пайдалану шарттарымен келісемін',
      termsRequired: 'Сіз шарттармен келісуіңіз керек',
      submit: 'Форманы жіберу',
      submitting: 'Жіберілуде...',
      success: 'Форма сәтті жіберілді!',
      error: 'Форманы жіберу кезінде қате пайда болды. Қайталап көріңіз.'
    },
    subjects: {
      general: 'Жалпы сұрау',
      support: 'Техникалық қолдау',
      sales: 'Сату бойынша сұрақ',
      feedback: 'Пікір'
    },
    contactMethods: {
      email: 'Email',
      phone: 'Телефон',
      both: 'Екеуі де'
    },
    list: {
      title: 'Жіберілгендер',
      search: 'Жіберілгендерді іздеу...',
      loading: 'Жіберілгендерді жүктеу...',
      empty: 'Жіберілгендер табылмады.',
      id: 'ID',
      submittedAt: 'Жіберілген уақыт'
    },
    part2: {
      title: 'Overview: storing and downloading large attachments (~100MB)',
      storeFiles: 'Store files in S3-compatible object storage (e.g. MinIO)',
      multipart: 'Use multipart / chunked uploads from the frontend',
      queue: 'Use a processing queue for post-processing (RabbitMQ / SQS / Kafka)'
    },
    common: {
      yes: 'Иә',
      no: 'Жоқ'
    }
  },
  fu: {
    app: {
      title: 'Forma Yuborish Tizimi',
      submitForm: 'Formani Yuborish',
      viewSubmissions: 'Yuborilganlarni Ko\'rish'
    },
    form: {
      title: 'Aloqa Formasi',
      fullName: 'To\'liq Ism',
      fullNameRequired: 'To\'liq ism majburiy',
      fullNameMinLength: 'To\'liq ism kamida 2 belgidan iborat bo\'lishi kerak',
      email: 'Elektron pochta manzili',
      emailRequired: 'Email majburiy',
      emailInvalid: 'Yaroqli elektron pochta manzilini kiriting',
      subject: 'Mavzu',
      subjectRequired: 'Mavzuni tanlang',
      preferredContact: 'Aloqa usuli',
      preferredContactRequired: 'Aloqa usulini tanlang',
      phone: 'Telefon raqami',
      phoneRequired: 'Telefon raqami majburiy',
      phoneInvalid: 'Yaroqli telefon raqamini kiriting',
      country: 'Mamlakat',
      date: 'Aloqa sanasi',
      dateRequired: 'Sanani tanlang',
      datePast: 'Sana o\'tgan bo\'lishi mumkin emas',
      newsletter: 'Xabarnomalarga obuna bo\'lish',
      terms: 'Men foydalanish shartlari bilan roziman',
      termsRequired: 'Siz shartlar bilan rozilashingiz kerak',
      submit: 'Formani Yuborish',
      submitting: 'Yuborilmoqda...',
      success: 'Forma muvaffaqiyatli yuborildi!',
      error: 'Formani yuborishda xatolik yuz berdi. Iltimos, qayta urinib ko\'ring.'
    },
    subjects: {
      general: 'Umumiy so\'rov',
      support: 'Texnik yordam',
      sales: 'Sotish bo\'yicha savol',
      feedback: 'Fikr'
    },
    contactMethods: {
      email: 'Email',
      phone: 'Telefon',
      both: 'Ikkalasi ham'
    },
    list: {
      title: 'Yuborilganlar',
      search: 'Yuborilganlarni qidirish...',
      loading: 'Yuborilganlarni yuklash...',
      empty: 'Yuborilganlar topilmadi.',
      id: 'ID',
      submittedAt: 'Yuborilgan vaqt'
    },
    part2: {
      title: 'Overview: storing and downloading large attachments (~100MB)',
      storeFiles: 'Store files in S3-compatible object storage (e.g. MinIO)',
      multipart: 'Use multipart / chunked uploads from the frontend',
      queue: 'Use a processing queue for post-processing (RabbitMQ / SQS / Kafka)'
    },
    common: {
      yes: 'Ha',
      no: 'Yo\'q'
    }
  }
};

const i18n = createI18n({
  legacy: false,
  locale: localStorage.getItem('locale') || 'en',
  fallbackLocale: 'en',
  messages
});

export default i18n;

