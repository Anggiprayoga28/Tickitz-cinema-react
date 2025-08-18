import React from 'react'
import { Link } from 'react-router-dom'

/**
 * MovieCard Component
 * @param {Object} props
 * @param {Object} props.movie - Movie object containing movie data
 * @param {string} props.movie.poster_path - Movie poster path
 * @param {string} props.movie.title - Movie title
 * @param {number} props.movie.id - Movie ID
 * @param {Array} props.movie.genre_ids - Array of genre IDs
 * @param {Map} props.genreMap - Map object containing genre ID to name mapping
 * @param {string} props.untuk - Usage context (determines styling)
 * @returns {JSX.Element} MovieCard component
 */
const MovieCard = ({ movie, genreMap, untuk }) => {
	// Fallback untuk movie data
	if (!movie) {
		return null
	}

	const {
		id,
		poster_path,
		title = 'No Title Available',
		genre_ids = [],
	} = movie

	return (
		<div
			className={`bg-white h-full rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 ${
				untuk === 'landing' ? '' : 'w-[22vw]'
			}`}
		>
			<div className="relative group">
				<img
					className="w-full object-cover aspect-[2/3] group-hover:brightness-50 transition-all duration-300"
					src={
						poster_path
							? `https://image.tmdb.org/t/p/w500${poster_path}`
							: 'https://i.pinimg.com/736x/7b/fd/48/7bfd489f68437bcb0c4f71e70316a603.jpg'
					}
					alt={title}
					loading="lazy"
				/>

				{/* Hover Overlay */}
				<div className="absolute inset-0 bg-black/70 flex-col justify-center items-center text-center hidden group-hover:flex transition-opacity duration-300 p-4 space-y-3">
					<Link
						to={`/movie/${id}`}
						className="rounded-lg border-2 border-white w-full py-2 text-sm hover:bg-blue-600 transition-colors duration-200 text-white font-medium"
					>
						Detail
					</Link>

					<Link
						to={`/order/${id}`}
						className="rounded-lg bg-blue-600 w-full py-2 text-sm hover:bg-blue-700 transition-colors duration-200 text-white font-medium"
					>
						Buy Ticket
					</Link>
				</div>
			</div>

			{/* Movie Info */}
			<div className="p-4 bg-white">
				<h3
					className={`font-bold text-gray-800 mb-2 line-clamp-2 ${
						untuk === 'landing' ? 'text-base md:text-lg' : 'text-lg'
					}`}
				>
					{title}
				</h3>

				{/* Genres */}
				<div
					className={`flex flex-wrap gap-2 ${
						untuk === 'landing' ? 'min-h-8' : ''
					}`}
				>
					{genre_ids.length > 0 ? (
						genre_ids.map((genreId) => (
							<span
								key={genreId}
								className="text-xs bg-gray-100 text-gray-600 rounded-full px-2 py-1"
							>
								{genreMap?.get(genreId) || 'Unknown Genre'}
							</span>
						))
					) : (
						<span className="text-xs bg-gray-100 text-gray-600 rounded-full px-2 py-1">
							No Genres
						</span>
					)}
				</div>
			</div>
		</div>
	)
}

export default MovieCard
