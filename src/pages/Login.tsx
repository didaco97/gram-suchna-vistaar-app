
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthForms from '@/components/AuthForms';
import { useAuth } from '@/context/AuthContext';
import { useTranslation } from 'react-i18next';

const Login = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    // Redirect to home if already logged in
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  return (
    <div className="app-container flex min-h-[80vh] flex-col items-center justify-center py-12">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gramsuchna-green">{t('welcome_to_gram_suchna')}</h1>
          <p className="mt-2 text-muted-foreground">
            {t('sign_in_or_create_account')}
          </p>
        </div>
        <AuthForms />
      </div>
    </div>
  );
};

export default Login;
