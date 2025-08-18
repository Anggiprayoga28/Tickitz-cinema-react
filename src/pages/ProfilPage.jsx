// pages/ProfilPage.jsx - Based on provided code with Redux integration
import { useState, useEffect } from "react";
import {
  Eye,
  EyeOff,
  Search,
  Menu,
  X,
  MoreHorizontal,
  Star,
} from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { updateUserProfile, resetPassword } from '../redux/slice/authSlice';
import { ToastContainer, toast } from 'react-toastify';

const ProfilePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  // Get auth state from Redux
  const { 
    loggedInUser, 
    isAuthenticated, 
    loading 
  } = useSelector(state => state.auth);

  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    newPassword: "",
    confirmPassword: "",
  });

  // Redirect if not authenticated
 
    if (!isAuthenticated) {
      navigate('/login');
    }
  

  // Initialize form data with user information
  useEffect(() => {
    if (loggedInUser) {
      const nameParts = (loggedInUser.name || '').split(' ');
      setFormData(prev => ({
        ...prev,
        firstName: nameParts[0] || '',
        lastName: nameParts.slice(1).join(' ') || '',
        email: loggedInUser.email || '',
        phone: loggedInUser.phoneNumber || '',
      }));
    }
  }, [loggedInUser]);

  const togglePassword = (field) => {
    if (field === "newPassword") {
      setShowNewPassword(!showNewPassword);
    } else {
      setShowConfirmPassword(!showConfirmPassword);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    console.log("Form submitted:", formData);
    
    // Add validation here if needed
    if (
      formData.newPassword &&
      formData.newPassword !== formData.confirmPassword
    ) {
      toast("Passwords do not match!");
      return;
    }

    // Update profile using Redux
    const updateData = {
      name: `${formData.firstName} ${formData.lastName}`.trim(),
      phoneNumber: formData.phone,
    };

    dispatch(updateUserProfile(updateData));

    // If password is being changed
    if (formData.newPassword) {
      dispatch(resetPassword({
        email: loggedInUser.email,
        newPassword: formData.newPassword
      }));
    }

    toast("Profile updated successfully!");
    
    // Clear password fields
    setFormData(prev => ({
      ...prev,
      newPassword: '',
      confirmPassword: ''
    }));
  };

  const openMobileMenu = () => {
    setIsMobileMenuOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    document.body.style.overflow = "auto";
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768 && isMobileMenuOpen) {
        closeMobileMenu();
      }
    };

    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isMobileMenuOpen) {
        closeMobileMenu();
      }
    };

    window.addEventListener("resize", handleResize);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "auto";
    };
  }, [isMobileMenuOpen]);

  if (!loggedInUser) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="font-sans bg-gray-50 overflow-x-hidden min-h-screen">
      <ToastContainer />
      {/* Main Container */}
      <div className="max-w-6xl mx-auto px-5 py-10 grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-10">
        {/* Sidebar */}
       <aside className="bg-white rounded-3xl p-8 self-start h-max">
					{/* Info Header */}
					<div className="flex justify-between items-center mb-6">
						<h2 className="text-base font-semibold text-gray-600">
							INFO
						</h2>
						<div className="w-6 h-6 rounded-full">
							<MoreHorizontal className="w-6 h-6 text-gray-400" />
						</div>
					</div>

					{/* User Profile */}
					<div className="flex flex-col items-center mb-6">
						<img
							className="w-36 h-36 rounded-full mb-5 object-cover"
							src="/FotoProfil.png"
							alt="profile"
						/>
						<h3 className="text-lg font-semibold mb-1">
							Jonas El Rodriguez
						</h3>
						<p className="text-sm text-gray-500">Moviegoers</p>
					</div>

					<hr className="border-gray-200 my-6" />

					{/* Loyalty Card */}
					<div
						className="bg-gradient-to-br from-blue-500 to-indigo-500 rounded-3xl p-5 text-white relative overflow-hidden mb-4"
						style={{
							boxShadow: '0px 6px 0px 0px rgba(29, 78, 216, 0.5)',
						}}
					>
						{/* Background decorations */}
						<div className="absolute -top-20 -right-15 w-36 h-36 bg-[#FFFFFF4D] rounded-full"></div>
						<div className="absolute -top-15 -right-20 w-36 h-36 bg-[#FFFFFF4D] rounded-full"></div>

						<div className="flex items-center gap-2 mb-2 font-medium relative z-10">
							<span>Moviegoers</span>
							<Star className="w-11 h-11 absolute -right-3 -top-5 text-yellow-300 fill-current" />
						</div>

						<div className="text-3xl font-normal mb-1 relative z-10">
							320{' '}
							<span className="text-xs opacity-90">points</span>
						</div>
					</div>

					{/* Progress Section */}
					<div className="mt-4">
						<div className="text-xs mb-2 text-gray-600">
							180 points become a master
						</div>
						<div className="w-full h-4 bg-gray-100 rounded-full overflow-hidden shadow-inner">
							<div className="w-2/5 h-full bg-blue-600 rounded-full"></div>
						</div>
					</div>
				</aside>

        {/* Main Content */}
        <main className="flex flex-col gap-5">
          {/* Tabs */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="grid grid-cols-2">
              <Link
                to="/profile"
                className="p-5 text-center text-gray-800 font-medium relative"
              >
                Account Settings
                <span className="absolute bottom-0 left-1/4 w-1/2 h-1 bg-blue-600 rounded-t"></span>
              </Link>
              <Link
                to="/order-history"
                className="p-5 text-center text-gray-600 font-medium hover:text-gray-700 transition-colors"
              >
                Order History
              </Link>
            </div>
          </div>

          {/* Details Information */}
          <section className="bg-white rounded-3xl p-8 mb-5">
            <h2 className="text-lg font-semibold mb-6 text-gray-800 border-b border-gray-200 pb-3">
              Details Information
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
              <div className="flex flex-col">
                <label
                  htmlFor="firstName"
                  className="font-medium mb-2 text-gray-800"
                >
                  First Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="px-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-blue-500 transition-colors"
                  disabled={loading}
                />
              </div>
              <div className="flex flex-col">
                <label
                  htmlFor="lastName"
                  className="font-medium mb-2 text-gray-800"
                >
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="px-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-blue-500 transition-colors"
                  disabled={loading}
                />
              </div>
              <div className="flex flex-col">
                <label
                  htmlFor="email"
                  className="font-medium mb-2 text-gray-800"
                >
                  E-mail
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="px-4 py-3 border border-gray-300 rounded-lg text-sm bg-gray-100 cursor-not-allowed"
                  disabled
                />
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-2 font-medium">
                  Phone Number
                </label>
                <div className="flex gap-2">
                  <select
                    name="countryCode"
                    value={formData.countryCode}
                    onChange={handleInputChange}
                    className="w-20 px-3 py-3 border border-gray-300 rounded-lg text-sm bg-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  >
                    <option value="+62">+62</option>
                    <option value="+1">+1</option>
                    <option value="+44">+44</option>
                    <option value="+81">+81</option>
                  </select>
                  <input
                    type="text"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg text-sm bg-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    placeholder="Enter your phone number"
                  />
                </div>
                </div>
            </div>
          </section>

          {/* Account and Privacy */}
          <section className="bg-white rounded-3xl p-8 mb-5">
            <h2 className="text-lg font-semibold mb-6 text-gray-800 border-b border-gray-200 pb-3">
              Account and Privacy
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
              <div className="flex flex-col">
                <label
                  htmlFor="newPassword"
                  className="font-medium mb-2 text-gray-800"
                >
                  New Password
                </label>
                <div className="relative">
                  <input
                    type={showNewPassword ? "text" : "password"}
                    id="newPassword"
                    name="newPassword"
                    value={formData.newPassword}
                    onChange={handleInputChange}
                    placeholder="Write your password"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-blue-500 transition-colors pr-12"
                    disabled={loading}
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    onClick={() => togglePassword("newPassword")}
                    disabled={loading}
                  >
                    {showNewPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>
              <div className="flex flex-col">
                <label
                  htmlFor="confirmPassword"
                  className="font-medium mb-2 text-gray-800"
                >
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    placeholder="Confirm your password"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-blue-500 transition-colors pr-12"
                    disabled={loading}
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    onClick={() => togglePassword("confirmPassword")}
                    disabled={loading}
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* Update Button */}
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="self-end bg-blue-500 hover:bg-blue-600 text-white px-10 py-4 rounded-lg text-base font-semibold transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Updating...' : 'Update changes'}
          </button>
        </main>
      </div>
    </div>
  );
};

export default ProfilePage;