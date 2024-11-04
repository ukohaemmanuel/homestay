import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/auth';
import { authApi } from '../../lib/api/auth';

declare global {
  interface Window {
    google?: {
      accounts: {
        id: {
          initialize: (config: any) => void;
          renderButton: (element: HTMLElement, config: any) => void;
          prompt: () => void;
        };
      };
    };
  }
}

export default function GoogleSignIn() {
  const navigate = useNavigate();
  const { login } = useAuthStore();
  const buttonRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (window.google && buttonRef.current) {
      window.google.accounts.id.initialize({
        client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
        callback: async (response) => {
          try {
            const { user, token } = await authApi.googleLogin(response.credential);
            login(user, token);
            navigate('/dashboard');
          } catch (error) {
            console.error('Google sign-in failed:', error);
          }
        },
      });

      window.google.accounts.id.renderButton(buttonRef.current, {
        theme: 'outline',
        size: 'large',
        width: '100%',
      });
    }
  }, [login, navigate]);

  return <div ref={buttonRef} className="w-full" />;
}