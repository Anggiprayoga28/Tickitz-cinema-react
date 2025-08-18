// ForgotPassword.jsx
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Eye, EyeOff } from 'lucide-react';
import { ToastContainer, toast } from 'react-toastify';

function ForgotPassword() {
  const [formData, setFormData] = useState({
    email: '',
    newPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});

  const navigate = useNavigate();
  
  // Get auth state and actions from Context
  const { error, loading, resetPassword, clearError } = useAuth();

  // Clear error when component unmounts
  useEffect(() => {
    return () => {
      clearError();
    };
  }, [clearError]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear validation errors when user starts typing
    if (validationErrors[name]) {
      setValidationErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
    
    // Clear Context error when user starts typing
    if (error) {
      clearError();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Email validation
    if (!formData.email.trim()) {
      toast('Email is required');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast('Please enter a valid email address');
      return;
    }

    // Password validation
    if (!formData.newPassword) {
      toast('New password is required');
      return;
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(formData.newPassword)) {
      toast('Password must contain at least 8 characters with uppercase, lowercase, number, and special character');
      return;
    }

    // Call reset password function from context
    resetPassword({
      email: formData.email.trim(),
      newPassword: formData.newPassword
    });
  };

  // Handle success
  useEffect(() => {
    if (!error && !loading) {
      // Check if password was reset successfully
      const timeoutId = setTimeout(() => {
        toast('Password berhasil direset! Silakan login dengan password baru.');
        navigate('/login');
      }, 100);

      return () => clearTimeout(timeoutId);
    }
  }, [error, loading, navigate]);

  return (
    <div className="min-h-screen w-screen" style={{
      backgroundImage: 'url(/background.svg)',
      backgroundSize: 'cover'
    }}>
      <ToastContainer />

      <div className="flex flex-col items-center justify-center px-5 pt-20">
        {/* Logo */}
        <div className="mb-6 z-50">
          <Link to="/">
            <img src="/logo-tickitz.png" alt="Logo Tickitz" />
          </Link>
        </div>

        <div className="bg-white backdrop-blur-md rounded-3xl p-8 max-w-md w-full">
          <h1 className="text-3xl text-gray-800 mb-2 font-semibold">
            Reset Password
            <span className="ml-2 text-3xl"></span>
          </h1>
          
          <p className="text-gray-600 text-sm mb-8 leading-relaxed">
            Enter your email and new password to<br />
            reset your account password
          </p>

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm">
              {error}
            </div>
          )}
          
          <form className="space-y-5" onSubmit={handleSubmit}>
            {/* Email field */}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter your email"
                className="w-full px-4 py-3 border border-gray-200 rounded-lg bg-gray-50 focus:outline-none focus:border-blue-500 focus:bg-white transition-all"
                disabled={loading}
              />
            </div>
            
            {/* Password field */}
            <div className="relative">
              <label className="block mb-2 text-sm font-medium text-gray-700">
                New Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="newPassword"
                  value={formData.newPassword}
                  onChange={handleInputChange}
                  placeholder="Enter new password"
                  className="w-full px-4 py-3 pr-12 border border-gray-200 rounded-lg bg-gray-50 focus:outline-none focus:border-blue-500 focus:bg-white transition-all"
                  disabled={loading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-blue-500 transition-colors"
                  disabled={loading}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
            
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-blue-500 text-white border-none rounded-md text-base font-semibold cursor-pointer transition-all duration-300 my-2 hover:bg-blue-600 hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:transform-none"
            >
              {loading ? 'Resetting Password...' : 'Reset Password'}
            </button>
          </form>
          
          <div className="flex items-center my-8 text-gray-600 text-sm">
            <div className="flex-1 h-px bg-gray-200"></div>
            <span className="mx-5">or</span>
            <div className="flex-1 h-px bg-gray-200"></div>
          </div>

          {/* Back to Login link */}
          <div className="text-center mt-6">
            <p className="text-gray-600 text-sm">
              Remember your password?{' '}
              <Link 
                to="/login" 
                className="text-blue-500 hover:text-blue-700 transition-colors"
              >
                Back to Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;