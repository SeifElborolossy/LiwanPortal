import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import '../../components/ui/i18n'; // Import i18n config
import ThemeSwitcher from '../../components/ui/ThemeSwitcher';

const LoginPage = () => {
    const { t, i18n } = useTranslation();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [loginMethod, setLoginMethod] = useState('email'); // Choose email/phone
  
    const onSubmit = (data) => {
      console.log('Login Data:', data);
    };
  
    useEffect(() => {
      const root = document.documentElement;
      root.dir = i18n.language === 'ar' ? 'rtl' : 'ltr'; // Set text direction
    }, [i18n.language]);
  
    return (


        
      <div className="min-h-screen flex items-center justify-center p-4 bg-background text-foreground transition-colors">
        {/* Theme switcher */}
        <ThemeSwitcher />
        


        {/* Language toggle */}
        <div className="absolute top-4 left-4">
          <button
            className="px-4 py-2 border rounded-md"
            onClick={() => i18n.changeLanguage(i18n.language === 'en' ? 'ar' : 'en')}
          >
            {i18n.language === 'en' ? 'عربي' : 'English'}
          </button>
        </div>
  
        <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md space-y-6 bg-input shadow-black shadow-sm dark:bg-gray-800 p-6 rounded-lg">
          
          
          {/* Welcome Back message */}
          <h2 className="text-3xl font-bold text-center mb-10">
            {i18n.language === 'en' ? 'Welcome Back!' : 'مرحبا بعودتك!'}
          </h2>
  
          
          
          {/* "Login with" label */}
          <div className="mb-4">
            <label className="block text-black dark:text-white text-xl mb-4 font-bold">{t('loginWith')}:</label>
            <div className={`flex ${i18n.language === 'en' ? 'ar' : 'en'} space-x-4`}>
              <div className="flex  space-x-2">
                <input
                  type="radio"
                  id="emailOption"
                  value="email"
                  checked={loginMethod === 'email'}
                  onChange={() => setLoginMethod('email')}
                  className="hidden peer"
                />
                <label
                  htmlFor="emailOption"
                  className="cursor-pointer px-4 py-2 flex items-center border border-gray-300 rounded-full transition-all peer-checked:bg-[#EDCEA2] peer-checked:text-white peer-checked:border-blue-500"
                >
                  {t('email')}
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="radio"
                  id="phoneOption"
                  value="phone"
                  checked={loginMethod === 'phone'}
                  onChange={() => setLoginMethod('phone')}
                  className="hidden peer"
                />
                <label
                  htmlFor="phoneOption"
                  className="cursor-pointer px-4 py-2 flex items-center border border-gray-300 rounded-full transition-all peer-checked:bg-[#EDCEA2] peer-checked:text-white peer-checked:border-blue-500"
                >
                  {t('phone')}
                </label>
              </div>
            </div>
          </div>
  
  
          {/* Conditional rendering based on login method */}
          {loginMethod === 'email' ? (
            <div>
              <label htmlFor="email" className="block mb-1 font-bold">{t('email')}</label>
              <input
                id="email"
                type="email"
                {...register('email', {
                  required: t('required'),
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/i,
                    message: t('invalidEmail'),
                  },
                })}
                className={`w-full px-4 py-2 border  rounded-md bg-white dark:bg-gray-800 text-black dark:text-white transition-colors ${i18n.language === 'ar' ? 'text-right' : 'text-left'}`}
                placeholder={t('enterEmail')}
              />
              <p className="text-red-500 h-3">{errors.email && errors.email.message}</p>
            </div>
          ) : (
            <div>
              <label htmlFor="phone" className="block mb-1 font-bold">{t('phone')+':'}</label>
              <input
                id="phone"
                type="tel"
                {...register('phone', { 
                  required: t('required'), 
                  pattern: { 
                    value: /^[0-9]+$/, 
                    message: t('invalidPhoneNumber') 
                  } 
                })}
                className={`w-full px-4 py-2 border rounded-md bg-white dark:bg-gray-800 text-black dark:text-white transition-colors ${i18n.language === 'ar' ? 'text-right' : 'text-left'}`}
                placeholder={t('enterPhone')}
              />
              <p className="text-red-500 h-3">{errors.phone && errors.phone.message}</p>
            </div>
          )}
  
          <div>
            <label htmlFor="password" className="block mb-1 font-bold">{t('password')+':'}</label>
            <input
              id="password"
              type="password"
              {...register('password', { required: t('required') })}
              className={`w-full px-4 py-2 border rounded-md bg-white dark:bg-gray-800 text-black dark:text-white transition-colors ${i18n.language === 'ar' ? 'text-right' : 'text-left'}`}
              placeholder={t('enterPassword')}
            />
            <p className="text-red-500 h-3">{errors.password && errors.password.message}</p>
          </div>
  

          {/* Login button */}
            <div className='flex-direction:column '>
          <button
            type="submit"
            className="w-full mb-1 py-3 bg-[#EDCEA2] text-black rounded-md transition-colors hover:bg-[#e1c590] dark:bg-[#EDCEA2] dark:text-black dark:hover:bg-[#d4b581]"
          >
            {t('login')}
          </button>
        
          <a href="/forgot-password" className="text-blue-500 hover:underline ">{t('forgotPassword')}</a>
        </div>
        </form>
      </div>
    );
};

export default LoginPage;