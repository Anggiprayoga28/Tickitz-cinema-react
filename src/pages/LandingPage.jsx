import React, { useState } from 'react';
import MainLayout from '../layouts/MainLayout';

const TickitzHomepage = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    email: ''
  });

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (formData.firstName && formData.email) {
      alert(`Subscription successful for ${formData.firstName} (${formData.email})`);
      setFormData({ firstName: '', email: '' });
    } else {
      alert('Please fill in all fields');
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Movie data
  const currentMovies = [
    { 
      title: 'Black Widow', 
      genres: ['Action', 'Adventure'], 
      image: '/black-widow.png',
      recommended: false 
    },
    { 
      title: 'The Witches', 
      genres: ['Comedy', 'Adventure'], 
      image: '/witches.png',
      recommended: true 
    },
    { 
      title: 'Tenet', 
      genres: ['Action', 'Sci-Fi'], 
      image: '/tenet.png',
      recommended: true 
    },
    { 
      title: 'Spiderman', 
      genres: ['Action', 'Adventure'], 
      image: '/spiderposter.svg',
      recommended: false 
    }
  ];

  const upcomingMovies = [
    { 
      title: 'Black Widow', 
      date: 'December 2024', 
      genres: ['Action', 'Adventure'], 
      image: '/black-widow.png'
    },
    { 
      title: 'The Witches', 
      date: 'January 2025', 
      genres: ['Comedy', 'Adventure'], 
      image: '/witches.png'
    },
    { 
      title: 'Tenet', 
      date: 'June 2025', 
      genres: ['Action', 'Sci-Fi'], 
      image: '/tenet.png'
    },
    { 
      title: 'Spiderman', 
      date: 'March 2025', 
      genres: ['Action', 'Adventure'], 
      image: '/spiderposter.svg'
    }
  ];

  const features = [
    {
      title: 'Guaranteed',
      description: 'Lorem ipsum dolor sit amet, consectetur adipis elit. Sit enim nec, proin faucibus nibh et sagittis a.',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-blue-600">
          <path fillRule="evenodd" clipRule="evenodd" d="M11.7281 21.9137C11.8388 21.9715 11.9627 22.0009 12.0865 22C12.2103 21.999 12.3331 21.9686 12.4449 21.9097L16.0128 20.0025C17.0245 19.4631 17.8168 18.8601 18.435 18.1579C19.779 16.6282 20.5129 14.6758 20.4998 12.6626L20.4575 6.02198C20.4535 5.25711 19.9511 4.57461 19.2082 4.32652L12.5707 2.09956C12.1711 1.96424 11.7331 1.96718 11.3405 2.10643L4.72824 4.41281C3.9893 4.67071 3.496 5.35811 3.50002 6.12397L3.54231 12.7597C3.5554 14.7758 4.31448 16.7194 5.68062 18.2335C6.3048 18.9258 7.10415 19.52 8.12699 20.0505L11.7281 21.9137ZM10.7836 14.1089C10.9326 14.2521 11.1259 14.3227 11.3192 14.3207C11.5125 14.3198 11.7047 14.2472 11.8517 14.1021L15.7508 10.2581C16.0438 9.96882 16.0408 9.50401 15.7448 9.21866C15.4478 8.9333 14.9696 8.93526 14.6766 9.22454L11.3081 12.5449L9.92885 11.2191C9.63186 10.9337 9.15467 10.9367 8.8607 11.226C8.56774 11.5152 8.57076 11.98 8.86775 12.2654L10.7836 14.1089Z" fill="currentColor"/>
        </svg>
      )
    },
    {
      title: 'Affordable',
      description: 'Lorem ipsum dolor sit amet, consectetur adipis elit. Sit enim nec, proin faucibus nibh et sagittis a.',
      icon: (
        <svg width="22" height="21" viewBox="0 0 22 21" fill="none" className="text-blue-600">
          <path fillRule="evenodd" clipRule="evenodd" d="M11.2002 21C16.9992 21 21.7002 16.299 21.7002 10.5C21.7002 4.70101 16.9992 0 11.2002 0C5.4012 0 0.700195 4.70101 0.700195 10.5C0.700195 16.299 5.4012 21 11.2002 21ZM16.1618 8.24293C16.5463 7.85852 16.5463 7.23523 16.1618 6.85082C15.7774 6.4664 15.1542 6.4664 14.7698 6.85082L9.55957 12.061L7.63063 10.1321C7.24621 9.74765 6.62293 9.74765 6.23851 10.1321C5.85409 10.5165 5.85409 11.1398 6.23851 11.5242L8.86351 14.1491C9.24793 14.5336 9.87121 14.5336 10.2556 14.1491L16.1618 8.24293Z" fill="currentColor"/>
        </svg>
      )
    },
    {
      title: '24/7 Customer Support',
      description: 'Lorem ipsum dolor sit amet, consectetur adipis elit. Sit enim nec, proin faucibus nibh et sagittis a.',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-blue-600">
          <path d="M7.5 4C6.1 4 5 5.0438 5 6.3195V16.2362L7.7878 13.757H16.1511C17.5399 13.757 18.6762 12.7132 18.6762 11.4375V6.3195C18.6762 5.0438 17.5399 4 16.1511 4H7.5ZM19.2014 9.7986V11.4375C19.2014 13.9959 16.9363 16.0764 16.1511 16.0764H10.5755V16.2362C10.5755 17.5119 11.7119 18.5556 13.1007 18.5556H20.464L22.2518 20.0348V12.1181C22.2518 10.8424 21.1154 9.7986 19.7266 9.7986H19.2014Z" fill="currentColor"/>
        </svg>
      )
    }
  ];

  const SectionBadge = ({ children }) => (
    <div className="inline-block bg-blue-600 text-white px-4 py-2 rounded-full text-xs font-bold mb-6">
      {children}
    </div>
  );

  const SectionTitle = ({ children, className = "" }) => (
    <h2 className={`text-3xl lg:text-4xl font-bold text-gray-900 mb-8 ${className}`}>
      {children}
    </h2>
  );

  const MovieCard = ({ movie, showOverlay = false, showDate = false }) => (
    <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group relative">
      {movie.recommended && (
        <div className="absolute top-3 right-3 bg-blue-600 text-white px-2 py-1 rounded text-xs font-bold z-10">
          Recommended
        </div>
      )}
      
      <div className="relative overflow-hidden">
        <img 
          src={`${movie.image}`} 
          alt={movie.title} 
          className="w-full h-72 object-cover"
        />
        {showOverlay && (
          <div className="absolute inset-0 bg-black bg-opacity-80 flex flex-col justify-center items-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button className="bg-transparent border border-white text-white px-5 py-2 rounded hover:bg-white hover:text-gray-900 transition-colors">
              Details
            </button>
            <button className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700 transition-colors">
              Buy Ticket
            </button>
          </div>
        )}
      </div>
      
      <div className="p-5">
        <h3 className="text-lg font-bold text-gray-900 mb-2">{movie.title}</h3>
        {showDate && (
          <p className="text-blue-600 font-bold mb-3">{movie.date}</p>
        )}
        <div className="flex flex-wrap gap-2">
          {movie.genres.map((genre, i) => (
            <span key={i} className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">
              {genre}
            </span>
          ))}
        </div>
      </div>
    </div>
  );

  const FeatureCard = ({ feature }) => (
    <div className="text-center">
      <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
        {feature.icon}
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-4">{feature.title}</h3>
      <p className="text-gray-600 leading-relaxed">{feature.description}</p>
    </div>
  );

  return (
    <MainLayout>
    <div className="min-h-screen bg-blue-50 font-sans">
      <main className="max-w-6xl mx-auto px-5 py-10 space-y-20">
        
        {/* Hero Section */}
        <section className="flex flex-col lg:flex-row items-center gap-10">
          <div className="flex-1 text-center lg:text-left">
            <SectionBadge>MOVIE TICKET PURCHASES #1 IN INDONESIA</SectionBadge>
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              Experience the Magic of Cinema: Book Your Tickets Today
            </h1>
            <p className="text-gray-600 text-lg mb-8">
              Sign up and get the ticket with a lot of discount
            </p>
          </div>
          
          <div className="flex-1 grid grid-cols-2 gap-4 max-w-sm">
            <div className="rounded-lg overflow-hidden shadow-lg">
              <img 
                src="./public/rectangle.png" 
                alt="Movie 1" 
                className="w-full h-36 object-cover" 
              />
            </div>
            <div className="rounded-lg overflow-hidden shadow-lg row-span-2">
              <img 
                src="/lion-king.png" 
                alt="Lion King" 
                className="w-full h-full object-cover" 
              />
            </div>
            <div className="rounded-lg overflow-hidden shadow-lg row-span-2">
              <img 
                src="/spiderposter.svg" 
                alt="Spider-Man" 
                className="w-full h-full object-cover" 
              />
            </div>
            <div className="rounded-lg overflow-hidden shadow-lg">
              <img 
                src="/roblox.jpg" 
                alt="Roblox" 
                className="w-full h-36 object-cover" 
              />
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section>
          <div className="text-center mb-12">
            <SectionBadge>WHY CHOOSE US</SectionBadge>
            <SectionTitle>Unleashing the Ultimate Movie Experience</SectionTitle>
          </div>
          
          <div className="grid md:grid-cols-3 gap-10">
            {features.map((feature, index) => (
              <FeatureCard key={index} feature={feature} />
            ))}
          </div>
        </section>

        {/* Current Movies Section */}
        <section>
          <div className="text-center mb-12">
            <SectionBadge>MOVIES</SectionBadge>
            <SectionTitle>Exciting Movies That Should Be Watched Today</SectionTitle>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
            {currentMovies.map((movie, index) => (
              <MovieCard key={index} movie={movie} showOverlay={true} />
            ))}
          </div>
          
          <div className="text-center">
            <a 
              href="/movie" 
              className="text-blue-600 font-bold text-lg hover:text-blue-700 transition-colors inline-flex items-center gap-2"
            >
              View All 
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </section>

        {/* Upcoming Movies Section */}
        <section>
          <div className="text-center mb-12">
            <SectionBadge>UPCOMING MOVIES</SectionBadge>
            <SectionTitle>Exciting Movie Coming Soon</SectionTitle>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {upcomingMovies.map((movie, index) => (
              <MovieCard key={index} movie={movie} showDate={true} />
            ))}
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl p-12 text-center text-white">
          <h2 className="text-3xl font-bold mb-8">Subscribe to our newsletter</h2>
          <form className="flex flex-col max-w-md mx-auto gap-4" onSubmit={handleNewsletterSubmit}>
            <input 
              type="text" 
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              className="px-4 py-4 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50" 
              placeholder="First name"
              required
            />
            <input 
              type="email" 
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="px-4 py-4 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50" 
              placeholder="Email address"
              required
            />
            <button 
              type="submit" 
              className="bg-white text-blue-600 px-4 py-4 rounded-lg font-bold hover:bg-gray-100 transition-colors"
            >
              Subscribe Now
            </button>
          </form>
        </section>

      </main>
    </div>
    </MainLayout>
  );
};

export default TickitzHomepage;