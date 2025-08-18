import React, { useState } from 'react';
import { Eye, Edit, Trash2, Plus, Search, MapPin, User, Calendar, X, Upload } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const MovieApp = () => {
  const [selectedMonth, setSelectedMonth] = useState('November 2023');
  const [currentPage, setCurrentPage] = useState(1);
  const [currentView, setCurrentView] = useState('list'); // 'list', 'add', 'edit', 'view'
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [uploadedImage, setUploadedImage] = useState(null);
  const navigate = useNavigate();
  const [movies, setMovies] = useState([
  ]);

  const [movieForm, setMovieForm] = useState({
    name: '',
    category: '',
    releaseDate: '',
    directorName: '',
    cast: '',
    synopsis: '',
    location: '',
    date: '',
    duration: { hours: 2, minutes: 0 },
    showTimes: ['08:30am']
  });

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [movieToDelete, setMovieToDelete] = useState(null);

  const resetForm = () => {
    setMovieForm({
      name: '',
      category: '',
      releaseDate: '',
      directorName: '',
      cast: '',
      synopsis: '',
      location: '',
      date: '',
      duration: { hours: 2, minutes: 0 },
      showTimes: ['08:30am']
    });
    setUploadedImage(null);
  };

  const handleInputChange = (field, value) => {
    setMovieForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleDurationChange = (type, value) => {
    setMovieForm(prev => ({
      ...prev,
      duration: {
        ...prev.duration,
        [type]: parseInt(value) || 0
      }
    }));
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const addShowTime = () => {
    setMovieForm(prev => ({
      ...prev,
      showTimes: [...prev.showTimes, '12:00pm']
    }));
  };

  const removeShowTime = (index) => {
    setMovieForm(prev => ({
      ...prev,
      showTimes: prev.showTimes.filter((_, i) => i !== index)
    }));
  };

  const updateShowTime = (index, value) => {
    setMovieForm(prev => ({
      ...prev,
      showTimes: prev.showTimes.map((time, i) => i === index ? value : time)
    }));
  };

  const handleSaveMovie = () => {
    const durationString = `${movieForm.duration.hours} Hours ${movieForm.duration.minutes} Minute`;
    
    if (currentView === 'edit') {
      // Update existing movie
      setMovies(prev => prev.map(movie => 
        movie.id === selectedMovie.id 
          ? {
              ...movie,
              ...movieForm,
              duration: durationString,
              thumbnail: uploadedImage || movie.thumbnail
            }
          : movie
      ));
    } else {
      // Add new movie
      const newMovie = {
        id: Date.now(),
        ...movieForm,
        duration: durationString,
        thumbnail: uploadedImage || '/api/placeholder/60/80'
      };
      setMovies(prev => [...prev, newMovie]);
    }
    
    setCurrentView('list');
    resetForm();
    setSelectedMovie(null);
  };

  const handleEditMovie = (movie) => {
    setSelectedMovie(movie);
    setMovieForm({
      name: movie.name,
      category: movie.category,
      releaseDate: movie.releaseDate,
      directorName: movie.directorName,
      cast: movie.cast,
      synopsis: movie.synopsis,
      location: movie.location,
      date: movie.releaseDate,
      duration: {
        hours: parseInt(movie.duration.split(' ')[0]) || 2,
        minutes: parseInt(movie.duration.split(' ')[2]) || 0
      },
      showTimes: movie.showTimes || ['08:30am']
    });
    setUploadedImage(movie.thumbnail);
    setCurrentView('edit');
  };

  const handleViewMovie = (movie) => {
    setSelectedMovie(movie);
    setCurrentView('view');
  };

  const confirmDelete = (movie) => {
    setMovieToDelete(movie);
    setShowDeleteModal(true);
  };

  const handleDeleteMovie = () => {
    setMovies(prev => prev.filter(movie => movie.id !== movieToDelete.id));
    setShowDeleteModal(false);
    setMovieToDelete(null);
  };

  const ActionButton = ({ icon: Icon, className, onClick }) => (
    <button
      onClick={onClick}
      className={`p-2 rounded-md transition-colors ${className}`}
    >
      <Icon size={16} />
    </button>
  );

  const MovieThumbnail = ({ movie }) => (
    <div className="w-12 h-16 bg-gradient-to-br from-red-500 to-blue-600 rounded-md flex items-center justify-center overflow-hidden">
      {movie.thumbnail && movie.thumbnail.startsWith('data:') ? (
        <img src={movie.thumbnail} alt={movie.name} className="w-full h-full object-cover" />
      ) : movie.name.includes('Spiderman') ? (
        <div className="w-full h-full bg-gradient-to-br from-red-600 to-blue-800 flex items-center justify-center">
          <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
            <div className="w-6 h-6 bg-red-500 rounded-full"></div>
          </div>
        </div>
      ) : (
        <div className="w-full h-full bg-gradient-to-br from-yellow-400 to-red-600 flex items-center justify-center">
          <div className="text-white font-bold text-xs">A</div>
        </div>
      )}
    </div>
  );

  // Delete Confirmation Modal
  const DeleteModal = () => (
    showDeleteModal && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 max-w-md mx-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Confirm Delete
          </h3>
          <p className="text-gray-600 mb-6">
            Are you sure you want to delete "{movieToDelete?.name}"? This action cannot be undone.
          </p>
          <div className="flex justify-end space-x-3">
            <button
              onClick={() => setShowDeleteModal(false)}
              className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={handleDeleteMovie}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    )
  );

  // View Movie Component
  if (currentView === 'view' && selectedMovie) {
    return (
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center">
                <img src="/tickitz-blu.svg" alt="" />
              </div>
              <nav className="hidden md:flex space-x-8">
                <button 
                  onClick={() => setCurrentView('list')}
                  className="text-gray-600 hover:text-blue-600 px-3 py-2 font-medium"
                >
                  Dashboard
                </button>
                <a href="#" className="text-blue-600 border-b-2 border-blue-600 px-3 py-2 font-medium">
                  Movie
                </a>
              </nav>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 text-gray-600">
                  <MapPin size={18} />
                  <span className="text-sm">Location</span>
                </div>
                <button className="p-2 text-gray-600 hover:text-blue-600">
                  <Search size={20} />
                </button>
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                  <User size={18} className="text-white" />
                </div>
              </div>
            </div>
          </div>
        </header>

        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white rounded-lg shadow-sm p-8">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900">Movie Details</h2>
              <button 
                onClick={() => setCurrentView('list')}
                className="p-2 text-gray-400 hover:text-gray-600"
              >
                <X size={24} />
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="w-48 h-72 bg-gray-100 rounded-lg overflow-hidden">
                  {selectedMovie.thumbnail && selectedMovie.thumbnail.startsWith('data:') ? (
                    <img src={selectedMovie.thumbnail} alt={selectedMovie.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                      <span className="text-white text-4xl font-bold">
                        {selectedMovie.name.charAt(0)}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">{selectedMovie.name}</h3>
                  <p className="text-gray-600">{selectedMovie.category}</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium text-gray-700">Release Date:</span>
                    <p className="text-gray-600">{selectedMovie.releaseDate}</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Duration:</span>
                    <p className="text-gray-600">{selectedMovie.duration}</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Director:</span>
                    <p className="text-gray-600">{selectedMovie.directorName}</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Location:</span>
                    <p className="text-gray-600">{selectedMovie.location}</p>
                  </div>
                </div>

                <div>
                  <span className="font-medium text-gray-700">Cast:</span>
                  <p className="text-gray-600">{selectedMovie.cast}</p>
                </div>

                <div>
                  <span className="font-medium text-gray-700">Synopsis:</span>
                  <p className="text-gray-600 leading-relaxed">{selectedMovie.synopsis}</p>
                </div>

                <div>
                  <span className="font-medium text-gray-700">Show Times:</span>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {selectedMovie.showTimes?.map((time, index) => (
                      <span key={index} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                        {time}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex space-x-3 pt-4">
                  <button
                    onClick={() => handleEditMovie(selectedMovie)}
                    className="bg-yellow-600 hover:bg-yellow-700 text-white px-6 py-2 rounded-lg flex items-center gap-2 transition-colors"
                  >
                    <Edit size={18} />
                    Edit Movie
                  </button>
                  <button
                    onClick={() => confirmDelete(selectedMovie)}
                    className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg flex items-center gap-2 transition-colors"
                  >
                    <Trash2 size={18} />
                    Delete Movie
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
        <DeleteModal />
      </div>
    );
  }

  // Add/Edit Movie Form
  if (currentView === 'add' || currentView === 'edit') {
    return (
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center">
                <img src="/tickitz-blu.svg" alt="" />
              </div>
              <nav className="hidden md:flex space-x-8">
                <button 
                  onClick={() => setCurrentView('list')}
                  className="text-gray-600 hover:text-blue-600 px-3 py-2 font-medium"
                >
                  Dashboard
                </button>
                <a href="#" className="text-blue-600 border-b-2 border-blue-600 px-3 py-2 font-medium">
                  Movie
                </a>
              </nav>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 text-gray-600">
                  <MapPin size={18} />
                  <span className="text-sm">Location</span>
                </div>
                <button className="p-2 text-gray-600 hover:text-blue-600">
                  <Search size={20} />
                </button>
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                  <User size={18} className="text-white" />
                </div>
              </div>
            </div>
          </div>
        </header>

        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white rounded-lg shadow-sm p-8">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900">
                {currentView === 'edit' ? 'Edit Movie' : 'Add New Movie'}
              </h2>
              <button 
                onClick={() => {
                  setCurrentView('list');
                  resetForm();
                  setSelectedMovie(null);
                }}
                className="p-2 text-gray-400 hover:text-gray-600"
              >
                <X size={24} />
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Left Column */}
              <div className="space-y-6">
                {/* Upload Image */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Upload Image
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
                    {uploadedImage ? (
                      <div className="space-y-4">
                        <img 
                          src={uploadedImage} 
                          alt="Preview" 
                          className="w-32 h-48 mx-auto object-cover rounded-lg"
                        />
                        <label className="cursor-pointer bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors inline-block">
                          <Upload className="inline mr-2" size={16} />
                          Change Image
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="hidden"
                          />
                        </label>
                      </div>
                    ) : (
                      <div>
                        <div className="w-16 h-16 mx-auto mb-4 bg-blue-100 rounded-lg flex items-center justify-center">
                          <Upload className="text-blue-600" size={24} />
                        </div>
                        <label className="cursor-pointer bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors inline-block">
                          Upload
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="hidden"
                          />
                        </label>
                      </div>
                    )}
                  </div>
                </div>

                {/* Movie Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Movie Name
                  </label>
                  <input
                    type="text"
                    value={movieForm.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    placeholder="Spider-Man: Homecoming"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  />
                </div>

                {/* Category */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category
                  </label>
                  <input
                    type="text"
                    value={movieForm.category}
                    onChange={(e) => handleInputChange('category', e.target.value)}
                    placeholder="Action, Adventure, Sci-Fi"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  />
                </div>

                {/* Release Date & Duration */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Release date
                    </label>
                    <input
                      type="date"
                      value={movieForm.releaseDate}
                      onChange={(e) => handleInputChange('releaseDate', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Duration (Hour | Minute)
                    </label>
                    <div className="flex space-x-2">
                      <input
                        type="number"
                        value={movieForm.duration.hours}
                        onChange={(e) => handleDurationChange('hours', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                      />
                      <input
                        type="number"
                        value={movieForm.duration.minutes}
                        onChange={(e) => handleDurationChange('minutes', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                      />
                    </div>
                  </div>
                </div>

                {/* Director Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Director Name
                  </label>
                  <input
                    type="text"
                    value={movieForm.directorName}
                    onChange={(e) => handleInputChange('directorName', e.target.value)}
                    placeholder="Jon Watts"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  />
                </div>

                {/* Cast */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Cast
                  </label>
                  <input
                    type="text"
                    value={movieForm.cast}
                    onChange={(e) => handleInputChange('cast', e.target.value)}
                    placeholder="Tom Holland, Michael Keaton, Robert Downey Jr."
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  />
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                {/* Synopsis */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Synopsis
                  </label>
                  <textarea
                    value={movieForm.synopsis}
                    onChange={(e) => handleInputChange('synopsis', e.target.value)}
                    placeholder="Thrilled by his experience with the Avengers, Peter returns home, where he lives with his Aunt May..."
                    rows={6}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none"
                  />
                </div>

                {/* Add Location */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Add Location
                  </label>
                  <input
                    type="text"
                    value={movieForm.location}
                    onChange={(e) => handleInputChange('location', e.target.value)}
                    placeholder="Purwokerto, Bandung, Bekasi"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  />
                </div>

                {/* Set Date & Time */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Set Date & Time
                  </label>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Calendar size={18} className="text-gray-400" />
                      <input
                        type="date"
                        value={movieForm.date}
                        onChange={(e) => handleInputChange('date', e.target.value)}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                      />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <button 
                          onClick={addShowTime}
                          className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                        >
                          <Plus size={16} className="text-gray-600" />
                        </button>
                        <span className="text-sm text-gray-600">Add show time</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {movieForm.showTimes.map((time, index) => (
                          <div key={index} className="flex items-center space-x-1">
                            <input
                              type="time"
                              value={time.replace('am', '').replace('pm', '')}
                              onChange={(e) => updateShowTime(index, e.target.value)}
                              className="px-2 py-1 border border-gray-300 rounded text-sm"
                            />
                            {movieForm.showTimes.length > 1 && (
                              <button
                                onClick={() => removeShowTime(index)}
                                className="p-1 text-red-500 hover:bg-red-50 rounded"
                              >
                                <X size={14} />
                              </button>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Save Button */}
            <div className="mt-8 flex justify-end space-x-3">
              <button
                onClick={() => {
                  setCurrentView('list');
                  resetForm();
                  setSelectedMovie(null);
                }}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveMovie}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition-colors"
              >
                {currentView === 'edit' ? 'Update Movie' : 'Save Movie'}
              </button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  // Main List View
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <h2 className="text-2xl font-bold text-gray-900">List Movie</h2>
          
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Month Selector */}
            <select 
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            >
              <option>November 2023</option>
              <option>December 2023</option>
              <option>January 2024</option>
            </select>
            
            {/* Add Movie Button */}
            <button 
              onClick={() => {
                resetForm();
                setCurrentView('add');
              }}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md flex items-center gap-2 transition-colors"
            >
              <Plus size={18} />
              Add Movies
            </button>
          </div>
        </div>

        {/* Movie Table */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    No
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Thumbnail
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Movie Name
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Released Date
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Duration
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {movies.map((movie, index) => (
                  <tr key={movie.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {index + 1}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <MovieThumbnail movie={movie} />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button 
                        onClick={() => handleViewMovie(movie)}
                        className="text-blue-600 hover:text-blue-800 font-medium transition-colors"
                      >
                        {movie.name}
                      </button>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {movie.category}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {movie.releaseDate}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {movie.duration}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex space-x-2">
                        <ActionButton
                          icon={Eye}
                          className="bg-blue-100 text-blue-600 hover:bg-blue-200"
                          onClick={() => handleViewMovie(movie)}
                        />
                        <ActionButton
                          icon={Edit}
                          className="bg-yellow-100 text-yellow-600 hover:bg-yellow-200"
                          onClick={() => handleEditMovie(movie)}
                        />
                        <ActionButton
                          icon={Trash2}
                          className="bg-red-100 text-red-600 hover:bg-red-200"
                          onClick={() => confirmDelete(movie)}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-8">
          <nav className="flex space-x-2">
            {[1, 2, 3, 4].map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                  currentPage === page
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
                }`}
              >
                {page}
              </button>
            ))}
          </nav>
        </div>
      </main>

      {/* Delete Confirmation Modal */}
      <DeleteModal />
    </div>
  );
};

export default MovieApp;