
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthForms from '@/components/AuthForms';
import { useAuth } from '@/context/AuthContext';

const Login = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

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
          <h1 className="text-3xl font-bold text-gramsuchna-green">Welcome to ग्राम सूचना</h1>
          <p className="mt-2 text-muted-foreground">
            Sign in or create an account to access personalized information
          </p>
        </div>
        <AuthForms />
      </div>
    </div>
  );
};

export default Login;
