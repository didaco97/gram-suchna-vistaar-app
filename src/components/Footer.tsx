
import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/context/LanguageContext';

const Footer = () => {
  const { t } = useLanguage();
  
  return (
    <footer className="border-t bg-white py-8">
      <div className="app-container">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div>
            <h3 className="mb-4 text-lg font-semibold text-gramsuchna-green">
              {t('nativeAppName')} ({t('appName')})
            </h3>
            <p className="text-sm text-gray-600">
              {t('footerText')}
            </p>
          </div>
          
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-500">
              {t('information')}
            </h4>
            <ul className="space-y-2">
              <li>
                <Link to="/agriculture" className="text-sm text-gray-600 hover:text-gramsuchna-green">
                  {t('agriculture')}
                </Link>
              </li>
              <li>
                <Link to="/healthcare" className="text-sm text-gray-600 hover:text-gramsuchna-green">
                  {t('healthcare')}
                </Link>
              </li>
              <li>
                <Link to="/education" className="text-sm text-gray-600 hover:text-gramsuchna-green">
                  {t('education')}
                </Link>
              </li>
              <li>
                <Link to="/news" className="text-sm text-gray-600 hover:text-gramsuchna-green">
                  {t('localNews')}
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-500">
              {t('account')}
            </h4>
            <ul className="space-y-2">
              <li>
                <Link to="/login" className="text-sm text-gray-600 hover:text-gramsuchna-green">
                  {t('login')}
                </Link>
              </li>
              <li>
                <Link to="/login" className="text-sm text-gray-600 hover:text-gramsuchna-green">
                  {t('register')}
                </Link>
              </li>
              <li>
                <Link to="/profile" className="text-sm text-gray-600 hover:text-gramsuchna-green">
                  {t('profile')}
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-500">
              {t('contact')}
            </h4>
            <ul className="space-y-2">
              <li className="flex items-start">
                <span className="mr-2 text-gramsuchna-green">{t('email')}</span>
                <a href="mailto:contact@gramsuchna.gov.in" className="text-sm text-gray-600 hover:text-gramsuchna-green">
                  contact@gramsuchna.gov.in
                </a>
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-gramsuchna-green">{t('phone')}</span>
                <a href="tel:1800-XXX-XXX" className="text-sm text-gray-600 hover:text-gramsuchna-green">
                  1800-XXX-XXX (Toll Free)
                </a>
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-gramsuchna-green">{t('helpline')}</span>
                <a href="tel:1800-XXX-XXX" className="text-sm text-gray-600 hover:text-gramsuchna-green">
                  1800-XXX-XXX
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 border-t border-gray-200 pt-8">
          <div className="flex flex-col items-center justify-between md:flex-row">
            <p className="text-sm text-gray-600">
              &copy; {new Date().getFullYear()} {t('nativeAppName')} ({t('appName')}). {t('allRightsReserved')}
            </p>
            <div className="mt-4 flex space-x-6 md:mt-0">
              <a href="#" className="text-gray-500 hover:text-gramsuchna-green">
                {t('termsOfService')}
              </a>
              <a href="#" className="text-gray-500 hover:text-gramsuchna-green">
                {t('privacyPolicy')}
              </a>
              <a href="#" className="text-gray-500 hover:text-gramsuchna-green">
                {t('accessibility')}
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
