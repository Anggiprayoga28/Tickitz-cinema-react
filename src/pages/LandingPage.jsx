import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import MovieCard from '../components/MovieCard'
import { useDispatch, useSelector } from 'react-redux'
import { fetchMovies, fetchUpcoming } from '../redux/slice/movieSlice'

const SealIcon = () => (
	<svg
		className="w-6 h-6 text-blue-600"
		fill="currentColor"
		viewBox="0 0 20 20"
	>
		<path
			fillRule="evenodd"
			d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
			clipRule="evenodd"
		/>
	</svg>
)

const DollarIcon = () => (
	<svg
		className="w-6 h-6 text-blue-600"
		fill="none"
		stroke="currentColor"
		viewBox="0 0 24 24"
	>
		<path
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth="2"
			d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
		/>
	</svg>
)

const SupportIcon = () => (
	<svg
		className="w-6 h-6 text-blue-600"
		fill="none"
		stroke="currentColor"
		viewBox="0 0 24 24"
	>
		<path
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth="2"
			d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 12l.01.01M12 12l.01.01m-.01-.01l.01.01m-.01-.01L12 12l.01.01M12 12l.01.01"
		/>
	</svg>
)

const LandingPage = () => {
	const dispatch = useDispatch()

	// Selector untuk mengambil data dari Redux state
	const { popular, upcoming, genreMap, loading, error } = useSelector(
		(state) => state.movies
	)

	// Convert genreMap array back to Map
	const genreMapObj = new Map(genreMap)

	useEffect(() => {
		dispatch(fetchMovies())
		dispatch(fetchUpcoming())
	}, [dispatch])

	// Loading state
	if (loading.popular && popular.results.length === 0) {
		return (
			<div className="flex justify-center items-center min-h-screen">
				<div className="text-xl">Loading...</div>
			</div>
		)
	}

	// Error state
	if (error) {
		return (
			<div className="flex justify-center items-center min-h-screen">
				<div className="text-xl text-red-500">Error: {error}</div>
			</div>
		)
	}

	const popularMovies = popular.results || []
	const upcomingMovies = upcoming.results || []

	return (
		<main className={`font-sans px-4 py-8 md:px-8 lg:px-16 xl:px-32`}>
			{/* Hero Section */}
			<section className="flex flex-col lg:flex-row items-center gap-8 py-12">
				<div className="w-full lg:w-3/5 space-y-4">
					<h1 className="text-lg md:text-xl font-semibold text-blue-600">
						MOVIE TICKET PURCHASE #1
					</h1>
					<h2 className="text-2xl md:text-3xl lg:text-5xl font-bold text-gray-800 lg:py-8">
						Experience the Magic of Cinema: Book Your Tickets Today
					</h2>
					<p className="text-gray-600 text-lg">
						Sign up and get the ticket with a lot of discount
					</p>
				</div>

				<div className="w-full max-w-129 mt-8 lg:w-2/5 lg:mt-0 lg:max-w-[40%] grid grid-cols-2 gap-4">
					<div className="space-y-4">
						<img
							className="w-full h-auto aspect-[4/3] object-cover rounded-t-3xl shadow-lg"
							src={
								popularMovies[0]?.poster_path
									? `https://image.tmdb.org/t/p/w500${popularMovies[0].poster_path}`
									: 'https://i.pinimg.com/736x/7b/fd/48/7bfd489f68437bcb0c4f71e70316a603.jpg'
							}
							alt="Movie scene 1"
						/>
						<img
							className="w-full h-auto aspect-[3.7/4] object-cover rounded-b-3xl shadow-lg"
							src={
								popularMovies[2]?.poster_path
									? `https://image.tmdb.org/t/p/w500${popularMovies[2].poster_path}`
									: 'https://i.pinimg.com/736x/7b/fd/48/7bfd489f68437bcb0c4f71e70316a603.jpg'
							}
							alt="Movie scene 3"
						/>
					</div>
					<div className="space-y-4">
						<img
							className="w-full h-auto aspect-[3.7/4] object-cover rounded-t-3xl shadow-lg"
							src={
								popularMovies[1]?.poster_path
									? `https://image.tmdb.org/t/p/w500${popularMovies[1].poster_path}`
									: 'https://i.pinimg.com/736x/7b/fd/48/7bfd489f68437bcb0c4f71e70316a603.jpg'
							}
							alt="Movie scene 2"
						/>
						<img
							className="w-full h-auto aspect-[4/3] object-cover rounded-b-3xl shadow-lg"
							src={
								popularMovies[3]?.poster_path
									? `https://image.tmdb.org/t/p/w500${popularMovies[3].poster_path}`
									: 'https://i.pinimg.com/736x/7b/fd/48/7bfd489f68437bcb0c4f71e70316a603.jpg'
							}
							alt="Movie scene 4"
						/>
					</div>
				</div>
			</section>

			{/* Why Choose Us Section */}
			<section className="py-16 bg-white">
				<div className="text-center mb-12">
					<h2 className="text-blue-600 font-semibold mb-2">
						WHY CHOOSE US
					</h2>
					<h3 className="text-2xl md:text-3xl lg:text-4xl font-bold">
						Unleashing the Ultimate Movie Experience
					</h3>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					<div>
						<div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
							<SealIcon />
						</div>
						<h4 className="text-xl font-semibold mb-2">
							Guaranteed
						</h4>
						<p className="text-gray-600">
							Lorem ipsum, dolor sit amet consectetur adipisicing
							elit. Officia voluptatem quisquam rem iste a dicta
							sed ut, ullam, dolores natus obcaecati.
						</p>
					</div>

					<div>
						<div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
							<DollarIcon />
						</div>
						<h4 className="text-xl font-semibold mb-2">
							Affordable
						</h4>
						<p className="text-gray-600">
							Lorem ipsum, dolor sit amet consectetur adipisicing
							elit. Officia voluptatem quisquam rem iste a dicta
							sed ut, ullam, dolores natus obcaecati.
						</p>
					</div>

					<div>
						<div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
							<SupportIcon />
						</div>
						<h4 className="text-xl font-semibold mb-2">
							24/7 customer support
						</h4>
						<p className="text-gray-600">
							Lorem ipsum, dolor sit amet consectetur adipisicing
							elit. Officia voluptatem quisquam rem iste a dicta
							sed ut, ullam, dolores natus obcaecati.
						</p>
					</div>
				</div>
			</section>

			{/* Popular Movies Section */}
			<section className="py-12 bg-gray-50">
				<div className="text-center mb-12">
					<h2 className="text-blue-600 font-semibold mb-2">MOVIES</h2>
					<h3 className="text-2xl md:text-3xl lg:text-4xl font-bold">
						Exciting Movies That Should Be Watched Today
					</h3>
				</div>

				{/* Movie Grid */}
				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
					{popularMovies.slice(0, 8).map((movie) => (
						<MovieCard
							key={movie.id}
							movie={movie}
							genreMap={genreMapObj}
							untuk="landing"
						/>
					))}
				</div>

				<div className="text-center mt-8">
					<Link
						to="/movies"
						className="inline-flex items-center text-blue-700 font-semibold hover:text-blue-900 transition-colors"
					>
						View All
						<svg
							className="ml-2 w-5 h-5"
							viewBox="0 0 20 20"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M17.5 10L2.5 10"
								stroke="currentColor"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
							<path
								d="M12.5 5L17.5 10L12.5 15"
								stroke="currentColor"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
						</svg>
					</Link>
				</div>
			</section>

			{/* Upcoming Section */}
			<section className="py-16 bg-white">
				<div className="flex flex-col md:flex-row justify-between items-center mb-12">
					<div className="mb-6 md:mb-0">
						<h2 className="text-blue-600 font-semibold mb-2">
							UPCOMING
						</h2>
						<h3 className="text-2xl md:text-3xl lg:text-4xl font-bold">
							Exciting Movies Coming Soon
						</h3>
					</div>
				</div>

				{/* Upcoming Movies Grid */}
				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
					{upcomingMovies.slice(0, 8).map((movie) => (
						<MovieCard
							key={movie.id}
							movie={movie}
							genreMap={genreMapObj}
							untuk="landing"
						/>
					))}
				</div>

				<div className="text-center mt-8">
					<Link
						to="/movies"
						className="inline-flex items-center text-blue-700 font-semibold hover:text-blue-900 transition-colors"
					>
						View All
						<svg
							className="ml-2 w-5 h-5"
							viewBox="0 0 20 20"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M17.5 10L2.5 10"
								stroke="currentColor"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
							<path
								d="M12.5 5L17.5 10L12.5 15"
								stroke="currentColor"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
						</svg>
					</Link>
				</div>
			</section>

			{/* Newsletter Section */}
			<section className="relative my-16 rounded-2xl p-8 pb-16 bg-blue-700 text-white overflow-hidden">
				<div className="relative z-10 max-w-4xl mx-auto text-center">
					<h2 className="text-2xl md:text-3xl lg:text-4xl font-light mb-6">
						Subscribe to our newsletter
					</h2>

					<form className="flex flex-col sm:flex-row gap-4">
						<input
							type="text"
							placeholder="First Name"
							className="flex-grow px-4 py-3 rounded-md text-white bg-blue-600 border border-blue-400 focus:outline-none focus:ring-2 focus:ring-white placeholder-blue-200"
							required
						/>
						<input
							type="email"
							placeholder="Email Address"
							className="flex-grow px-4 py-3 rounded-md text-white bg-blue-600 border border-blue-400 focus:outline-none focus:ring-2 focus:ring-white placeholder-blue-200"
							required
						/>
						<button
							type="submit"
							className="px-6 py-3 bg-white text-blue-700 hover:bg-blue-50 rounded-md font-semibold transition-colors"
						>
							Subscribe Now
						</button>
					</form>
				</div>

				<div className="absolute -right-30 -bottom-50 w-60 h-60 rounded-full border-8 border-white opacity-20"></div>
			</section>
		</main>
	)
}

export default LandingPage
