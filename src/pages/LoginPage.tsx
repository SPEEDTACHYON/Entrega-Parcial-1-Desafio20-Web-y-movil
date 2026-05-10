import { IonContent, IonPage } from '@ionic/react';
import { useState } from "react";
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useAuth, type UserRole } from '../utils/AuthContext';

export default function Index() {
  const [showPassword, setShowPassword] = useState(false);

  // TODO: Eliminar la selección entre admin y user, temporal hasta que se implemente el backend en el siguiente entregable
  const [selectedRole, setSelectedRole] = useState<UserRole>('user');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = () => {
    login(selectedRole);
    navigate(selectedRole === 'admin' ? '/admin' : '/dashboard', { replace: true });
  };

  return (
    <IonPage>
      <IonContent fullscreen>
        <div className="min-h-screen flex items-center justify-center px-4 py-8" style={{ background: "linear-gradient(135deg, #EFF6FF 0%, #FAF5FF 50%, #FDF2F8 100%)" }}>
          <div className="w-full max-w-[448px] flex flex-col gap-6">
            {/* Card */}
            <div className="w-full rounded-2xl border border-[#F3E8FF] bg-white shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)] p-8 pb-10">
              {/* Header */}
              <div className="flex flex-col items-center gap-2 mb-8">
                <h1
                  className="text-[30px] font-medium leading-9 text-center"
                  style={{
                    background: "linear-gradient(90deg, #155DFC 0%, #9810FA 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  Bienvenido
                </h1>
                <p className="text-base font-normal text-[#4A5565] text-center leading-6">
                  Inicia sesión en tu cuenta
                </p>
              </div>

              {/* Form */}
              <div className="flex flex-col gap-5">
                {/* Email / RUT field */}
                <div className="flex flex-col gap-2">
                  <label className="text-base font-medium text-[#364153] leading-6">
                    Correo electrónico o RUT
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M16.6667 3.33334H3.33335C2.41288 3.33334 1.66669 4.07954 1.66669 5.00001V15C1.66669 15.9205 2.41288 16.6667 3.33335 16.6667H16.6667C17.5872 16.6667 18.3334 15.9205 18.3334 15V5.00001C18.3334 4.07954 17.5872 3.33334 16.6667 3.33334Z" stroke="#AD46FF" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M18.3334 5.83334L10.8584 10.5833C10.6011 10.7445 10.3036 10.83 10 10.83C9.69642 10.83 9.39896 10.7445 9.14169 10.5833L1.66669 5.83334" stroke="#AD46FF" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </span>
                    <input
                      type="text"
                      placeholder="correo@ejemplo.com o 12.345.678-9"
                      className="w-full h-[52px] pl-11 pr-4 rounded-[10px] border-2 border-[#E5E7EB] text-base font-normal text-[rgba(10,10,10,0.5)] placeholder:text-[rgba(10,10,10,0.5)] outline-none focus:border-[#AD46FF] transition-colors"
                      style={{ background: "linear-gradient(90deg, rgba(239,246,255,0.30) 0%, rgba(250,245,255,0.30) 100%)" }}
                    />
                  </div>
                </div>

                {/* Password field */}
                <div className="flex flex-col gap-2">
                  <label className="text-base font-medium text-[#364153] leading-6">
                    Contraseña
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M15.8333 9.16666H4.16667C3.24619 9.16666 2.5 9.91285 2.5 10.8333V16.6667C2.5 17.5871 3.24619 18.3333 4.16667 18.3333H15.8333C16.7538 18.3333 17.5 17.5871 17.5 16.6667V10.8333C17.5 9.91285 16.7538 9.16666 15.8333 9.16666Z" stroke="#AD46FF" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M5.83331 9.16666V5.83332C5.83331 4.72825 6.2723 3.66845 7.0537 2.88704C7.8351 2.10564 8.89491 1.66666 9.99998 1.66666C11.105 1.66666 12.1649 2.10564 12.9463 2.88704C13.7277 3.66845 14.1666 4.72825 14.1666 5.83332V9.16666" stroke="#AD46FF" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </span>
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      className="w-full h-[52px] pl-11 pr-12 rounded-[10px] border-2 border-[#E5E7EB] text-base font-normal text-[rgba(10,10,10,0.5)] placeholder:text-[rgba(10,10,10,0.5)] outline-none focus:border-[#AD46FF] transition-colors"
                      style={{ background: "linear-gradient(90deg, rgba(250,245,255,0.30) 0%, rgba(253,242,248,0.30) 100%)" }}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6A7282] hover:text-[#AD46FF] transition-colors"
                      aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                    >
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1.71835 10.29C1.6489 10.1029 1.6489 9.89709 1.71835 9.71C2.39476 8.06987 3.54294 6.66753 5.01732 5.68074C6.4917 4.69396 8.22588 4.16718 10 4.16718C11.7741 4.16718 13.5083 4.69396 14.9827 5.68074C16.4571 6.66753 17.6053 8.06987 18.2817 9.71C18.3511 9.89709 18.3511 10.1029 18.2817 10.29C17.6053 11.9301 16.4571 13.3325 14.9827 14.3192C13.5083 15.306 11.7741 15.8328 10 15.8328C8.22588 15.8328 6.4917 15.306 5.01732 14.3192C3.54294 13.3325 2.39476 11.9301 1.71835 10.29Z" stroke="#6A7282" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M10 12.5C11.3807 12.5 12.5 11.3807 12.5 10C12.5 8.61929 11.3807 7.5 10 7.5C8.61929 7.5 7.5 8.61929 7.5 10C7.5 11.3807 8.61929 12.5 10 12.5Z" stroke="#6A7282" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Forgot password */}
                <div className="flex justify-end">
                  <a href="#" className="text-sm font-normal text-[#9810FA] leading-5 hover:underline">
                    ¿Olvidé mi contraseña?
                  </a>
                </div>
                
                {/* TODO: Eliminar la selección entre admin y user, temporal hasta que se implemente el backend en el siguiente entregable */}
                <div className="flex flex-col gap-2">
                  <span className="text-base font-medium text-[#364153] leading-6">Entrar como</span>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setSelectedRole('user')}
                      className={`h-[44px] rounded-[10px] border text-sm font-medium transition-colors ${
                        selectedRole === 'user'
                          ? 'border-[#155DFC] bg-[#EFF6FF] text-[#155DFC]'
                          : 'border-[#E5E7EB] text-[#4A5565] hover:border-[#155DFC]'
                      }`}
                    >
                      Usuario
                    </button>
                    <button
                      type="button"
                      onClick={() => setSelectedRole('admin')}
                      className={`h-[44px] rounded-[10px] border text-sm font-medium transition-colors ${
                        selectedRole === 'admin'
                          ? 'border-[#9810FA] bg-[#FAF5FF] text-[#9810FA]'
                          : 'border-[#E5E7EB] text-[#4A5565] hover:border-[#9810FA]'
                      }`}
                    >
                      Admin
                    </button>
                  </div>
                </div>

                {/* Submit button */}
                <button
                  type="button"
                  onClick={handleLogin}
                  className="w-full h-[48px] rounded-[10px] text-base font-medium text-white leading-6 shadow-[0_10px_15px_-3px_rgba(0,0,0,0.10),0_4px_6px_-4px_rgba(0,0,0,0.10)] hover:opacity-90 transition-opacity"
                  style={{ background: "linear-gradient(90deg, #2B7FFF 0%, #9810FA 100%)" }}
                >
                  Iniciar sesión
                </button>
              </div>

              {/* Divider */}
              <div className="relative flex items-center my-6">
                <div className="flex-1 border-t border-[#E5E7EB]" />
                <span className="mx-4 bg-white text-sm text-[#6A7282] leading-5">o</span>
                <div className="flex-1 border-t border-[#E5E7EB]" />
              </div>

              {/* Register section */}
              <div className="flex flex-col items-center gap-4">
                <p className="text-base font-normal text-[#4A5565] leading-6 text-center">
                  ¿No tienes una cuenta?
                </p>
                <Link
                  to="/register"
                  className="w-[145px] h-[52px] rounded-[10px] border-2 border-[#AD46FF] text-base font-normal text-[#9810FA] leading-6 hover:bg-[#AD46FF]/5 transition-colors inline-flex items-center justify-center">
                  Registrarse
                </Link>
              </div>
            </div>

            {/* Footer text */}
            <p className="text-sm font-normal text-[#6A7282] leading-5 text-center">
              Al iniciar sesión, aceptas nuestros términos y condiciones
            </p>
          </div>
        </div>
      </IonContent>
    </IonPage>

  );
}
