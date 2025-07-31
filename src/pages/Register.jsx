import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

const TickitzRegister = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    terms: false
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  function handleSubmit(e) {
    e.preventDefault();
    if (!formData.terms) {
      alert('Please agree to terms & conditions');
    } else {
      if (formData.email === null || formData.email === '') {
        alert('Email is required');
      }else {

          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        alert('Please enter a valid email address');
      } else {
        console.log('Form submitted:', formData);
        // alert('Registration successful!');
      }
        }
      }

      const passwordRegex = /^(?=.*[a-z])(?=.+[A-Z])(?=.+[!@#$%^&*/><]).{8,}$/;
      if (!passwordRegex.test(formData.password)) {
        alert('Enter at least one number, one capital letter, one symbol, and at least 8 characters');
      }else {
        console.log('Form submitted:', formData);
        alert('Registration successful!');
      }
    
  }

  return (
    <div className=" w-screen h-screen bg-cover bg-center relative" 
         style={{ backgroundImage: 'url(../../public/background.svg)' }}>
      
      {/* Blue section */}
      <div className="w-screen "></div>
      
      {/* Main container */}
      <div className="relative -mt-32 flex flex-col items-center justify-center px-5">
        {/* Logo */}
        <div className="mb-5">
          <img 
            src="../../public/logo-tickitz.png" 
            alt="Logo Tickitz" 
            className="w-64 h-auto"
          />
        </div>
        
        {/* Login container */}
        <div className="bg-white backdrop-blur-sm rounded-3xl p-3 shadow-2xl relative max-w-md w-full">
          <div className="bg-white rounded-xl p-8 relative z-10">
            
            {/* Progress steps */}
            <div className="flex justify-center items-center mb-6">
              <div className="w-7 h-7 rounded-full bg-blue-500 flex items-center justify-center text-white text-sm font-bold">
                1
              </div>
              <div className="w-8 h-px bg-gray-300 mx-2"></div>
              <div className="w-7 h-7 rounded-full bg-gray-300 flex items-center justify-center text-white text-sm font-bold">
                2
              </div>
              <div className="w-8 h-px bg-gray-300 mx-2"></div>
              <div className="w-7 h-7 rounded-full bg-gray-300 flex items-center justify-center text-white text-sm font-bold">
                3
              </div>
            </div>
            
            {/* Registration form */}
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
                  required
                />
              </div>
              
              {/* Password field */}
              <div className="relative">
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="Password"
                    className="w-full px-4 py-3 pr-12 border border-gray-200 rounded-lg bg-gray-50 focus:outline-none focus:border-blue-500 focus:bg-white transition-all"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-blue-500 transition-colors"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>
              
              {/* Terms checkbox */}
              <div className="flex items-start space-x-3">
                <input
                  type="checkbox"
                  name="terms"
                  id="terms"
                  checked={formData.terms}
                  onChange={handleInputChange}
                  className="w-4 h-4 mt-1 text-blue-600 rounded focus:ring-blue-500"
                />
                <label htmlFor="terms" className="text-sm text-gray-600 leading-5 cursor-pointer">
                  I agree to terms & conditions
                </label>
              </div>
              
              {/* Submit button */}
              <button
                onClick={handleSubmit}
                className="w-full py-4 bg-blue-600 text-black font-medium rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Join For Free Now
              </button>
              

              {/* Login link */}
              <div className="text-center">
                <a 
                  href="/index/login.html" 
                  className="text-blue-500 text-sm hover:text-blue-600 transition-colors"
                >
                  Already have an account?
                </a>
              </div>
              
              {/* Social buttons */}
              <div className="flex space-x-4">
                <button
                  type="button"
                  className="flex-1 py-3 px-4 border-2 border-gray-200 rounded-xl bg-white text-gray-600 font-medium hover:border-red-500 hover:text-red-500 transition-all hover:-translate-y-1 hover:shadow-lg flex items-center justify-center space-x-2"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  <span>Google</span>
                </button>
                
                <button
                  type="button"
                  className="flex-1 py-3 px-4 border-2 border-gray-200 rounded-xl bg-white text-gray-600 font-medium hover:border-blue-800 hover:text-blue-800 transition-all hover:-translate-y-1 hover:shadow-lg flex items-center justify-center space-x-2"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                  <span>Facebook</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};


export default TickitzRegister;