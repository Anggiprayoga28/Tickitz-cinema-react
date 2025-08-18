// Register.jsx
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Eye, EyeOff } from 'lucide-react';
import { ToastContainer, toast } from 'react-toastify';

function RegistrasiPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    terms: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});

  const navigate = useNavigate();
  
  // Get auth state and actions from Context
  const { error, loading, isAuthenticated, registerUser, clearError } = useAuth();

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  // Clear error when component unmounts
  useEffect(() => {
    return () => {
      clearError();
    };
  }, [clearError]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
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

  const validateForm = () => {
    const errors = {};

    // Email validation
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        errors.email = 'Please enter a valid email address';
      }
    }

    // Password validation
    if (!formData.password) {
      errors.password = 'Password is required';
    } else {
      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      if (!passwordRegex.test(formData.password)) {
        errors.password = 'Password must contain at least 8 characters with uppercase, lowercase, number, and special character';
      }
    }

    // Terms validation
    if (!formData.terms) {
      errors.terms = 'You must accept the terms and conditions';
    }

    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate form
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }

    // Call register function from context
    registerUser({
      email: formData.email.trim(),
      password: formData.password
    });
  };

  // Show success message and redirect when registration is successful
  useEffect(() => {
    if (isAuthenticated && !error) {
      toast('Registrasi berhasil!');
      navigate('/');
    }
  }, [isAuthenticated, error, navigate]);

  return (
    <div className="bg-[url('/background.svg')] h-screen w-screen bg-center bg-cover flex flex-col justify-center items-center bg-black/60 bg-blend-darken backdrop-brightness-75 px-6">
      <ToastContainer />
      <img src="/logo-tickitz.png" alt="Logo Tickitz" className="w-[40%] md:w-[10%] mb-9 mt-9 scale-300" />
      
      <section className="bg-white w-[90vw] max-w-[600px] mx-auto rounded-2xl min-h-44 px-8 py-16 shadow-lg md:px-18">
        <div className="form-wrapper space-y-6">
          {/* Step Indicator */}
          <div className="steps items-center px-8 gap-4 justify-around text-gray-700 text-sm hidden md:flex">
            <section className="active flex flex-col gap-5 items-center space-x-2">
              <div className="stepNumber bg-blue-600 text-white w-12 h-12 flex items-center justify-center rounded-full">1</div>
              <div className="step">Fill Form</div>
            </section>
            <div className="border-t border-dashed flex-1 border-gray-400 h-[24px]"></div>
            <section className="flex flex-col gap-5 items-center space-x-2">
              <div className="stepNumber bg-gray-300 text-black w-12 h-12 flex items-center justify-center rounded-full">2</div>
              <div className="step">Activate</div>
            </section>
            <div className="border-t border-dashed flex-1 border-gray-400 h-[24px]"></div>
            <section className="flex flex-col gap-5 items-center space-x-2">
              <div className="stepNumber bg-gray-300 text-black w-12 h-12 flex items-center justify-center rounded-full">3</div>
              <div className="step">Done</div>
            </section>
          </div>

          {/* Error Message from Context */}
          {error && (
            <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm">
              {error}
            </div>
          )}

          {/* Form */}
          <form className="space-y-4" onSubmit={handleSubmit}>
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-lg font-extralight text-gray-700">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                className="mt-1 w-full px-3 py-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.email}
                onChange={handleInputChange}
                disabled={loading}
              />
              {validationErrors.email && <div className="text-xs text-red-500 mt-1">{validationErrors.email}</div>}
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-lg font-extralight text-gray-700">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  placeholder="Enter your password"
                  className="mt-1 w-full px-3 py-4 pr-12 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.password}
                  onChange={handleInputChange}
                  disabled={loading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-blue-500 transition-colors"
                  disabled={loading}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {validationErrors.password && <div className="text-xs text-red-500 mt-1">{validationErrors.password}</div>}
            </div>

            {/* Terms Checkbox */}
            <div className="checkbox flex items-start space-x-2">
              <input 
                type="checkbox" 
                id="terms" 
                name="terms"
                checked={formData.terms}
                onChange={handleInputChange}
                className="form-checkbox h-4 w-4 text-blue-600 mt-1"
                disabled={loading}
              />
              <label htmlFor="terms" className="text-sm text-gray-700">
                I agree to the terms & conditions and privacy policy
              </label>
            </div>
            {validationErrors.terms && <div className="text-xs text-red-500">{validationErrors.terms}</div>}

            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-blue-600 text-xl hover:bg-blue-700 text-white py-4 rounded-md transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Creating Account...' : 'Join For Free Now'}
            </button>
          </form>

          {/* Login Link */}
          <p className="text-center text-sm text-gray-600">
            Already have an account? <Link to="/login" className="text-blue-600 hover:underline">Log in</Link>
          </p>

          {/* Divider */}
          <div className="flex items-center space-x-2">
            <hr className="flex-grow border-t-2 border-gray-200" />
            <div className="px-4 text-gray-500">or</div>
            <hr className="flex-grow border-t-2 border-gray-200" />
          </div>

          {/* Social Buttons */}
          <div className="flex gap-12 justify-center">
            <button 
              onClick={() => toast('Google registration coming soon!')}
              className="flex items-center justify-center gap-2 shadow-md px-6 py-6 rounded-md hover:bg-gray-100 transition"
              disabled={loading}
            >
              <img src="https://img.icons8.com/?size=100&id=17949&format=png&color=000000" alt="google icon" className="w-7 h-7" />
              <span className="text-sm hidden md:block">Google</span>
            </button>
            <button 
              onClick={() => toast('Facebook registration coming soon!')}
              className="flex items-center justify-center gap-2 shadow-md px-6 py-6 rounded-md hover:bg-gray-100 transition"
              disabled={loading}
            >
              <img src="https://img.icons8.com/?size=100&id=118497&format=png&color=000000" alt="facebook icon" className="w-7 h-7" />
              <span className="text-sm hidden md:block">Facebook</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default RegistrasiPage;