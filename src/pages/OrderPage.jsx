import React, { useEffect, useState } from 'react'
import SeatGrid from '../components/SeatGrid'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { ToastContainer, toast } from 'react-toastify'
import {
	selectCurrentBooking,
	selectMovieDetails,
	selectBookingDateTime,
	selectCinemaDetails,
	setSelectedSeats,
} from '../redux/slice/bookingSlice'

const Sponsor = [
	{
		name: 'Sponsor 1',
		img:'/CineOne21 2.svg'
	},
	{
		name: 'Sponsor 2',
		img: '/ebv.id 2.svg'
	},
	{
		name: 'Hiflix',
		img: '/hiflix 2.svg'
	},
]

function OrderPage() {
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const { id } = useParams()

	// Get data from Redux store
	const currentBooking = useSelector(selectCurrentBooking)
	const movieDetails = useSelector(selectMovieDetails)
	const bookingDateTime = useSelector(selectBookingDateTime)
	const cinemaDetails = useSelector(selectCinemaDetails)

	const [selectedSeats, setSelectedSeatsState] = useState([])
	const [isLoading, setIsLoading] = useState(false)

	// Format date for display
	const formatDate = (dateString) => {
		if (!dateString) return 'Today'
		try {
			return new Date(dateString).toLocaleDateString('en-US', {
				weekday: 'long',
				year: 'numeric',
				month: 'long',
				day: 'numeric',
			})
		} catch {
			return dateString
		}
	}

	// Format time for display
	const formatTime = (timeString) => {
		if (!timeString) return '13:00'
		return timeString
	}

	// Check if we have required booking data
	useEffect(() => {
		if (!movieDetails) {
			// If no movie details in Redux, redirect back to movies
			console.warn(
				'No movie details found in booking. Redirecting to movies page.'
			)
			navigate('/movies')
			return
		}

		// Log the current booking state for debugging
		console.log('Current booking state:', currentBooking)
	}, [movieDetails, navigate, currentBooking])

	const handleSeatSelection = (seats) => {
		setSelectedSeatsState(seats)

		// Update Redux store with selected seats
		dispatch(setSelectedSeats(seats))
	}

	// Handle checkout navigation
	const handleCheckout = () => {
		if (selectedSeats.length === 0) {
			toast('Please select at least one seat')
			return
		}

		// Navigate to payment page
		navigate('/payment')
	}

	// Show loading if no movie details
	if (!movieDetails) {
		return (
			<div className="min-h-screen bg-gray-200 flex items-center justify-center">
				<div className="text-center">
					<div className="inline-block w-12 h-12 border-4 border-gray-500 border-t-transparent rounded-full animate-spin"></div>
					<p className="mt-6 text-gray-600 text-lg">
						Loading booking details...
					</p>
				</div>
			</div>
		)
	}

	const posterUrl = movieDetails.backdrop
		? `https://image.tmdb.org/t/p/w500${movieDetails.backdrop}`
		: movieDetails.poster
		? `https://image.tmdb.org/t/p/w500${movieDetails.poster}`
		: '/placeholder-poster.jpg'

	return (
		<main className="bg-gray-200 flex flex-col items-center py-18 gap-12 px-[10vw] lg:px-[5vw]">
			<ToastContainer />
			{/* Progress Navigation */}
			<nav className="hidden lg:flex items-center">
				<div className="flex flex-col items-center gap-4">
					<svg
						width="48"
						height="47"
						viewBox="0 0 48 47"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<circle cx="24" cy="23.5" r="23.5" fill="#008000" />
						<path
							d="M17 23L22 28L32 18"
							stroke="white"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
						/>
					</svg>
					<p>Dates And Time</p>
				</div>
				<div className="w-22 h-[50%] border-b border-dashed"></div>
				<div className="flex flex-col items-center w-22 gap-4">
					<svg
						width="48"
						height="47"
						viewBox="0 0 48 47"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<circle cx="24" cy="23.5" r="23.5" fill="#1D4ED8" />
						<path
							d="M20.86 29V27.896L24.796 23.768C25.308 23.2453 25.6867 22.744 25.932 22.264C26.188 21.784 26.316 21.288 26.316 20.776C26.316 20.1467 26.1187 19.672 25.724 19.352C25.34 19.0213 24.7747 18.856 24.028 18.856C23.452 18.856 22.908 18.9627 22.396 19.176C21.8947 19.3787 21.4147 19.6933 20.956 20.12L20.428 18.984C20.8653 18.5573 21.4147 18.216 22.076 17.96C22.748 17.704 23.452 17.576 24.188 17.576C24.956 17.576 25.6067 17.6987 26.14 17.944C26.684 18.1787 27.0947 18.5253 27.372 18.984C27.66 19.432 27.804 19.9813 27.804 20.632C27.804 21.3467 27.628 22.0293 27.276 22.68C26.9347 23.32 26.428 23.9813 25.756 24.664L22.316 28.152V27.736H28.268V29H20.86Z"
							fill="white"
						/>
					</svg>
					<p>Seat</p>
				</div>
				<div className="w-22 h-[50%] border-b border-dashed"></div>
				<div className="flex flex-col items-center w-22 gap-4">
					<svg
						width="47"
						height="47"
						viewBox="0 0 47 47"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<circle cx="23.5" cy="23.5" r="23.5" fill="#A0A3BD" />
						<path
							d="M23.72 29.144C22.952 29.144 22.216 29.0267 21.512 28.792C20.8187 28.5573 20.2373 28.2267 19.768 27.8L20.296 26.648C20.8187 27.0747 21.3573 27.384 21.912 27.576C22.4667 27.768 23.0533 27.864 23.672 27.864C24.4933 27.864 25.1173 27.6933 25.544 27.352C25.9707 27 26.184 26.4987 26.184 25.848C26.184 25.208 25.9653 24.7227 25.528 24.392C25.1013 24.0613 24.472 23.896 23.64 23.896H21.912V22.664H23.528C24.232 22.664 24.7973 22.4827 25.224 22.12C25.6507 21.7573 25.864 21.2613 25.864 20.632C25.864 20.056 25.6667 19.6187 25.272 19.32C24.888 19.0107 24.3387 18.856 23.624 18.856C23.016 18.856 22.456 18.9627 21.944 19.176C21.432 19.3787 20.9467 19.6933 20.488 20.12L19.96 18.984C20.408 18.536 20.9627 18.1893 21.624 17.944C22.2853 17.6987 22.984 17.576 23.72 17.576C24.84 17.576 25.72 17.832 26.36 18.344C27 18.856 27.32 19.5707 27.32 20.488C27.32 21.1813 27.1227 21.7787 26.728 22.28C26.344 22.7707 25.816 23.096 25.144 23.256V23.08C25.9333 23.2187 26.5467 23.544 26.984 24.056C27.4213 24.5573 27.64 25.1867 27.64 25.944C27.64 26.936 27.288 27.72 26.584 28.296C25.8907 28.8613 24.936 29.144 23.72 29.144Z"
							fill="white"
						/>
					</svg>
					<p>Payment</p>
				</div>
			</nav>

			{/* Main Content */}
			<nav className="p-4 lg:grid-cols-3 lg:grid gap-6">
				<div className="bg-white md:p-4 rounded-2xl lg:col-span-2 p-1 lg:p-8">
					<section>
						{/* Movie Info Card */}
						<nav className="border m-4 border-gray-400 lg:h-fit rounded-2xl p-4 lg:p-8 flex flex-col lg:flex-row items-center lg:items-stretch text-center">
							<div className="max-w-max w-[50%]">
								<img
									src={posterUrl}
									alt={movieDetails.title}
									className="w-full aspect-[4/3] object-cover rounded-lg max-w-max"
									onError={(e) => {
										e.target.src = '/placeholder-poster.jpg'
									}}
								/>
							</div>
							<div className="lg:w-full lg:text-left lg:ml-4 lg:h-auto relative lg:flex lg:flex-col lg:justify-between">
								<h1 className="text-2xl lg:text-[2vw] font-semibold tracking-widest my-3 lg:mb-0">
									{movieDetails.title}
								</h1>
								<div className="movie-categories flex flex-wrap gap-2 justify-center lg:justify-start">
									{movieDetails.genres?.map((genre) => (
										<span
											key={genre.id}
											className="lg:text-xl lg:my-2 lg:text-[1vw] bg-gray-100 text-gray-600 rounded-full px-2 py-1 lg:py-2 lg:px-6"
										>
											{genre.name}
										</span>
									))}
								</div>
								<p className="my-2 lg:text-[1vw]">
									Regular - {formatTime(bookingDateTime.time)}{' '}
									| {formatDate(bookingDateTime.date)}
								</p>
								<button
									onClick={() =>
										navigate(`/movie/${movieDetails.id}`)
									}
									className="bg-blue-500 px-8 lg:absolute lg:right-0 lg:bottom-0 lg:mb-0 lg:text-[1vw] py-2 mb-6 tracking-widest text-white"
								>
									Change
								</button>
							</div>
						</nav>

						{/* Seat Selection */}
						<h1 className="my-10 text-2xl tracking-wider">
							Choose Your Seat
						</h1>
						<nav className="justify-center">
							<div className="text-center">Screen</div>
							<div className=" mb-8"></div>
							<section className="w-full">
								<SeatGrid
									selectedSeats={selectedSeats}
									setSelectedSeats={handleSeatSelection}
								/>
							</section>
						</nav>

						{/* Seating Key */}
						<nav className="grid grid-cols-2 w-full gap-4 px-3 lg:grid-cols-4">
							<div className="items-center flex w-full lg:col-start-1">
								<div className="w-9 rounded-lg aspect-square bg-gray-200"></div>
								<p className="lg:text-[1.3vw] w-full ml-3 text-gray-600">
									Available
								</p>
							</div>
							<div className="items-center flex w-full">
								<div className="w-9 rounded-lg aspect-square bg-[#1D4ED8]"></div>
								<p className="lg:text-[1.3vw] w-full ml-3 text-gray-600">
									Selected
								</p>
							</div>
							<div className="items-center flex w-full">
								<div className="w-9 rounded-lg aspect-square bg-[#F589D7]"></div>
								<p className="lg:text-[1.3vw] w-full ml-3 text-gray-600">
									Love Seat
								</p>
							</div>
							<div className="items-center flex w-full">
								<div className="w-9 rounded-lg aspect-square bg-[#6E7191]"></div>
								<p className="lg:text-[1.3vw] w-full ml-3 text-gray-600">
									Solid
								</p>
							</div>
						</nav>
					</section>

					{/* Mobile Seat Selection Form */}
					<form className="lg:hidden">
						<div className="flex justify-around">
							<select
								className="w-[50%] bg-blue-900/10 rounded-2xl p-6 text-2xl"
								name="row"
								id="row"
							>
								<option value="A">A</option>
								<option value="B">B</option>
								<option value="C">C</option>
								<option value="D">D</option>
								<option value="E">E</option>
								<option value="F">F</option>
								<option value="G">G</option>
							</select>
							<select
								className="w-[50%] bg-blue-900/10 rounded-2xl p-6 text-2xl"
								name="col"
								id="col"
							>
								<option value="1">1</option>
								<option value="3">3</option>
								<option value="4">4</option>
								<option value="5">5</option>
								<option value="6">6</option>
								<option value="7">7</option>
								<option value="8">8</option>
								<option value="9">9</option>
								<option value="10">10</option>
								<option value="11">11</option>
								<option value="12">12</option>
								<option value="13">13</option>
								<option value="14">14</option>
							</select>
						</div>
						<button
							type="button"
							className="border-blue-700 border-2 my-8 w-full rounded-2xl py-4 text-blue-700 text-center text-xl"
						>
							Add new seat
						</button>
					</form>
				</div>

				{/* Mobile Submit Button */}
				<button
					onClick={handleCheckout}
					className="bg-blue-700 w-full rounded-lg py-4 mt-8 text-white text-center text-xl lg:hidden"
					disabled={selectedSeats.length === 0}
				>
					Submit
				</button>

				{/* Desktop Sidebar */}
				<section className="hidden lg:col-span-1 bg-white rounded-xl p-4 h-fit justify-items-center lg:p-8 lg:block relative">
					{/* Cinema Logo */}
					<nav className="justify-items-center space-y-4 mb-8">
						<img src={cinemaDetails?.logo} alt={cinemaDetails?.name} />
						<h2 className="lg:text-[1.3vw] mt-4">
							{cinemaDetails?.name || 'Cinema'}
						</h2>
					</nav>

					{/* Booking Summary */}
					<nav className="w-full flex flex-col">
						<div className="flex gap-5 my-3">
							<p className="text-gray-400">Movie selected</p>
							<p className="text-right flex-1">
								{movieDetails.title}
							</p>
						</div>
						<div className="flex gap-5 my-3">
							<p className="text-gray-400">
								{formatDate(bookingDateTime.date)}
							</p>
							<p className="text-right flex-1">
								{formatTime(bookingDateTime.time)}
							</p>
						</div>
						<div className="flex gap-5 my-3">
							<p className="text-gray-400">One ticket price</p>
							<p className="text-right flex-1">
								${currentBooking.ticketPrice || 10}
							</p>
						</div>
						<div className="flex gap-5 my-3">
							<p className="text-gray-400">Seat choosed</p>
							<p className="text-right flex-1">
								{console.log(
									selectedSeats.slice().sort().join(', ')
								)}
								{selectedSeats.length > 0
									? selectedSeats.slice().sort().join(', ')
									: 'None'}
							</p>
						</div>
					</nav>

					<hr className="border border-gray-400 w-full my-8" />

					{/* Total Payment */}
					<div className="flex gap-5 my-3 justify-between w-full text-3xl">
						<h2 className="text-black">Total Payment</h2>
						<span className="text-right flex-1 text-blue-700 font-bold">
							$
							{selectedSeats.length *
								(currentBooking.ticketPrice || 10)}
						</span>
					</div>

					{/* Checkout Button */}
					<button
						onClick={handleCheckout}
						disabled={selectedSeats.length === 0}
						className="absolute -bottom-40 left-0 right-0 bg-blue-700 py-8 text-center text-3xl rounded-md text-white w-full disabled:bg-gray-400 disabled:cursor-not-allowed"
					>
						Checkout Now
					</button>
				</section>
			</nav>
		</main>
	)
}

export default OrderPage
