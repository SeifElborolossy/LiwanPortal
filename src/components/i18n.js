import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      loginWith: "Login with",
      email: "Email",
      password: "Password",
      phone: "Phone",
      phoneRequired:"please enter a valid phone number",
      enterPhone: "Enter your phone number",
      login: "Login",
      forgotPassword: "Forgot Password?",
      enterEmail: "Enter your email",
      enterPassword: "Enter your password",
      required: "This field is required",
      invalidEmail: "Invalid email format",
    },
  },
  ar: {
    translation: {
      loginWith: "تسجيل الدخول بواسطة",
      email: "البريد الإلكتروني",
      password: "كلمة المرور",
      phoneRequired:"please enter a valid phone number",
      phone: "رقم الهاتف",
      enterPhone: "ادخل رقم الهاتف",
      login: "تسجيل الدخول",
      forgotPassword: "هل نسيت كلمة المرور؟",
      enterEmail: "أدخل بريدك الإلكتروني",
      enterPassword: "أدخل كلمة المرور",
      required: "هذا الحقل مطلوب",
      invalidEmail: "تنسيق البريد الإلكتروني غير صالح",
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'en', // Default language
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
