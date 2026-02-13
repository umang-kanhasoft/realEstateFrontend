'use client';

import { useAuthModal } from '@/context/AuthModalContext';
import { Close as CloseIcon } from '@mui/icons-material';
import {
  Dialog,
  DialogContent,
  IconButton,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import ForgotPasswordForm from './ForgotPasswordForm';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

export default function AuthModal() {
  const { isOpen, view, closeModal, toggleView, openLogin } = useAuthModal();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Dialog
      open={isOpen}
      onClose={closeModal}
      maxWidth="sm"
      fullWidth
      fullScreen={isMobile}
      PaperProps={{
        sx: {
          borderRadius: isMobile ? 0 : 3,
          overflow: 'hidden',
          backgroundColor: '#fff',
        },
      }}
    >
      <DialogContent sx={{ p: 0, overflow: 'hidden' }}>
        <div className="relative flex h-full flex-col md:flex-row">
          {/* Close Button */}
          <div className="absolute right-4 top-4 z-50">
            <IconButton
              onClick={closeModal}
              size="small"
              sx={{
                backgroundColor: 'rgba(255,255,255,0.8)',
                '&:hover': { backgroundColor: '#fff' },
              }}
            >
              <CloseIcon />
            </IconButton>
          </div>

          {/* Right Side: Form */}
          <div
            className={`max-h-[90vh] w-full overflow-y-auto p-6 md:w-full md:p-10`}
          >
            {view !== 'forgot-password' && (
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  {view === 'login' ? 'Sign In' : 'Create Account'}
                </h2>
                <p className="mt-1 text-sm text-gray-500">
                  {view === 'login'
                    ? 'Enter your details to proceed'
                    : 'Join us to explore premium properties'}
                </p>
              </div>
            )}

            {view === 'login' ? (
              <LoginForm
                onSuccess={closeModal}
                onRegisterClick={toggleView}
                isModal
              />
            ) : view === 'register' ? (
              <RegisterForm
                onSuccess={closeModal}
                onLoginClick={toggleView}
                isModal
              />
            ) : (
              <ForgotPasswordForm onBackToLogin={openLogin} />
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
