
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// English translations
const enTranslations = {
  welcome_to_gram_suchna: 'Welcome to Gram Suchna',
  sign_in_or_create_account: 'Sign in to your account or create a new one',
  login: 'Login',
  register: 'Register',
  email: 'Email',
  password: 'Password',
  confirm_password: 'Confirm Password',
  forgot_password: 'Forgot Password?',
  access_account: 'Access your account',
  create_account: 'Create Account',
  join_gram_suchna: 'Join Gram Suchna community',
  logging_in: 'Logging in...',
  creating_account: 'Creating account...',
  error: 'Error',
  passwords_dont_match: 'Passwords don\'t match'
};

// Hindi translations
const hiTranslations = {
  welcome_to_gram_suchna: 'ग्राम सूचना में आपका स्वागत है',
  sign_in_or_create_account: 'अपने खाते में साइन इन करें या एक नया बनाएं',
  login: 'लॉग इन',
  register: 'पंजीकरण',
  email: 'ईमेल',
  password: 'पासवर्ड',
  confirm_password: 'पासवर्ड की पुष्टि करें',
  forgot_password: 'पासवर्ड भूल गए?',
  access_account: 'अपने खाते तक पहुंचें',
  create_account: 'खाता बनाएं',
  join_gram_suchna: 'ग्राम सूचना समुदाय से जुड़ें',
  logging_in: 'लॉग इन हो रहा है...',
  creating_account: 'खाता बनाया जा रहा है...',
  error: 'त्रुटि',
  passwords_dont_match: 'पासवर्ड मेल नहीं खाते'
};

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: enTranslations
      },
      hi: {
        translation: hiTranslations
      }
    },
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
