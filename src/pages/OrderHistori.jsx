import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {
	toggleOrderExpansion,
	updateOrderStatus,
} from '../redux/slice/orderHistoriSlice'
import { ArrowLeft, ChevronDown, Copy, Download, X, Star, Menu, MoreHorizontal } from 'lucide-react'
import { Link } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';


const OrderHistoryPage = () => {
	const navigate = useNavigate()
	const dispatch = useDispatch()

	const { orders, expandedOrders } = useSelector(
		(state) => state.orderHistory
	)

	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
	const [selectedLocation, setSelectedLocation] = useState('Location')
	const [showTicketResult, setShowTicketResult] = useState(null)

	const toggleMobileMenu = () => {
		setIsMobileMenuOpen(!isMobileMenuOpen)
	}

	const toggleOrderDetails = (orderId) => {
		dispatch(toggleOrderExpansion(orderId))
	}

	const copyToClipboard = (text) => {
		navigator.clipboard
			.writeText(text)
			.then(() => {
				toast('Virtual account copied to clipboard!')
			})
			.catch(() => {
				toast('Failed to copy to clipboard')
			})
	}

	const handleCheckPayment = (orderId) => {
		dispatch(
			updateOrderStatus({
				orderId,
				status: 'used',
				paymentStatus: 'paid',
			})
		)
		toast('Payment confirmed! Order status updated.')
	}

	const handleBack = () => {
		navigate('/movies')
	}

	const getStatusBadge = (status) => {
		const baseClasses =
			'px-6 py-3 rounded-md text-sm font-bold tracking-wider text-center w-52 h-12 flex items-center justify-center'

		switch (status) {
			case 'active':
				return `${baseClasses} bg-green-100 text-green-600 border-2 border-green-200`
			case 'used':
				return `${baseClasses} bg-gray-100 text-gray-500 border-2 border-gray-200`
			default:
				return baseClasses
		}
	}

	const getPaymentBadge = (paymentStatus) => {
		const baseClasses =
			'px-6 py-3 rounded-md font-bold text-sm tracking-wider text-center w-52 h-12 flex items-center justify-center'

		switch (paymentStatus) {
			case 'paid':
				return `${baseClasses} bg-blue-100 text-blue-600 border-2 border-blue-200`
			case 'not-paid':
				return `${baseClasses} bg-red-100 text-red-600 border-2 border-red-200`
			default:
				return baseClasses
		}
	}

	// Ticket Result Modal Component
	const TicketResultModal = ({ order, onClose }) => (
		<div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
			<div className="bg-white rounded-3xl max-w-5xl w-full max-h-[90vh] overflow-y-auto">
				<div className="flex">
					{/* Left Section */}
					<div className="flex-1 bg-gradient-to-br from-slate-800 to-slate-900 p-20 flex flex-col justify-center text-white relative overflow-hidden">
						<div className="absolute inset-0 bg-black bg-opacity-40"></div>
						<div className="relative z-10">
							<div className="mb-10">
								<img
									src="/asset/icon/logo Tickitz.png"
									alt="Tickitz"
									className="w-72"
									onError={(e) => {
										e.target.style.display = 'none'
										e.target.nextSibling.style.display =
											'block'
									}}
								/>
								<div className="hidden text-5xl text-white">
									TICKITZ
								</div>
							</div>
							<h1 className="text-5xl mb-8 leading-tight">
								Thank you For Purchasing
							</h1>
							<p className="text-xl leading-relaxed mb-12 opacity-90">
								Lorem ipsum dolor sit amet consectetur. Quam
								pretium pretium tempor integer sed magna et.
							</p>
							<a
								href="#"
								className="inline-flex items-center text-xl font-semibold hover:translate-x-2 transition-transform"
							>
								Please Download Your Ticket
								<span className="ml-6 text-2xl">→</span>
							</a>
						</div>
					</div>

					{/* Right Section - Ticket */}
					<div className="flex-none w-96 bg-gray-50 p-8 flex flex-col justify-between relative">
						<button
							onClick={onClose}
							className="absolute top-6 right-6 text-gray-500 hover:text-gray-700 bg-white rounded-full p-2"
						>
							<X className="w-6 h-6" />
						</button>

						{/* QR Code */}
						<div className="w-36 h-36 bg-white border-2 border-gray-200 rounded-xl mx-auto mb-10 flex items-center justify-center">
							<img
								src="/QR-code.svg"
								alt="QR Code"
								className="w-full h-full object-contain p-4"
							/>
						</div>

						{/* Dots */}
						<div className="relative mb-10">
							<div className="absolute -left-10 w-10 h-10 bg-gray-100 rounded-full"></div>
							<div className="absolute -right-10 w-10 h-10 bg-gray-100 rounded-full"></div>
							<div className="border-t-4 border-dashed border-gray-300"></div>
						</div>

						{/* Ticket Details */}
						<div className="flex-grow grid grid-cols-2 gap-8 mb-10">
							<div className="space-y-8">
								<div className="text-center">
									<div className="text-sm text-gray-500 uppercase tracking-wider mb-2">
										Movie
									</div>
									<div className=" text-gray-900 text-lg">
										{order.movie?.title?.split(':')[0] ||
											order.movie}
										:..
									</div>
								</div>
								<div className="text-center">
									<div className="text-sm  text-gray-500 uppercase tracking-wider mb-2">
										Category
									</div>
									<div className=" text-gray-900 text-lg">
										{order.category}
									</div>
								</div>
								<div className="text-center">
									<div className="text-sm  text-gray-500 uppercase tracking-wider mb-2">
										Date
									</div>
									<div className=" text-gray-900 text-lg">
										07 Jul
									</div>
								</div>
							</div>

							<div className="space-y-8">
								<div className="text-center">
									<div className="text-sm  text-gray-500 uppercase tracking-wider mb-2">
										Time
									</div>
									<div className=" text-gray-900 text-lg">
										{order.time}
									</div>
								</div>
								<div className="text-center">
									<div className="text-sm  text-gray-500 uppercase tracking-wider mb-2">
										Count
									</div>
									<div className=" text-gray-900 text-lg">
										{order.count}
									</div>
								</div>
								<div className="text-center">
									<div className="text-sm  text-gray-500 uppercase tracking-wider mb-2">
										Seats
									</div>
									<div className=" text-gray-900 text-lg">
										{Array.isArray(order.seats)
											? order.seats.join(', ')
											: order.seats}
									</div>
								</div>
							</div>
						</div>

						{/* Total */}
						<div className="border-2 border-gray-300 rounded-xl p-8 mb-10 bg-white">
							<div className="flex justify-between items-center">
								<span className="text-xl  text-gray-900 uppercase tracking-wider">
									Total
								</span>
								<span className="text-3xl  text-blue-600">
									${order.totalPrice}
								</span>
							</div>
						</div>

						{/* Buttons */}
						<div className="space-y-5">
							<button className="w-full flex items-center justify-center gap-4 py-5 bg-white text-blue-600 border-3 border-blue-600 rounded-2xl  hover:bg-blue-600 hover:text-white transition-all text-lg">
								<Download className="w-6 h-6" />
								Download
							</button>
							<button
								onClick={onClose}
								className="w-full py-5 bg-blue-600 text-white rounded-2xl  hover:bg-blue-700 transition-all text-lg"
							>
								Done
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	)

	if (showTicketResult) {
		return (
			<TicketResultModal
				order={showTicketResult}
				onClose={() => setShowTicketResult(null)}
			/>
		)
	}

	return (
		<div className="min-h-screen bg-gray-50 font-sans">
			<ToastContainer />
			{/* Main Content */}
			<main className="max-w-6xl mx-auto px-5 py-8">
				<div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-10">
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
					<section className="space-y-6">
						{/* Tabs Navigation */}
						<nav className="bg-white rounded-2xl overflow-hidden">
							<div className="grid grid-cols-2">
								<Link
									to="/profile"
									className="p-6 text-center text-gray-500 font-semibold transition-colors hover:text-gray-700 text-lg"
								>
									Account Settings
								</Link>
								<Link
									to="/order-history"
									className="p-6 text-center text-gray-800 font-semibold relative text-lg"
								>
									Order History
									<span className="absolute bottom-0 left-1/4 w-1/2 h-1 bg-blue-600 rounded-t"></span>
								</Link>
							</div>
						</nav>

						{/* Order History List */}
						<div className="space-y-6">
							{orders.length === 0 ? (
								<div className="bg-white rounded-2xl p-12 text-center">
									<div className="text-6xl mb-6">🎬</div>
									<p className="text-gray-500 text-xl">
										No orders found
									</p>
									<button
										onClick={() => navigate('/movies')}
										className="mt-6 px-8 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-semibold"
									>
										Browse Movies
									</button>
								</div>
							) : (
								orders.map((order) => (
									<article
										key={order.id}
										className="bg-white rounded-2xl p-8"
									>
										<div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-6 mb-6">
											<div>
												<p className="text-sm text-gray-400 mb-3">
													{order.date}
												</p>
												<h3 className="text-2xl  leading-relaxed tracking-wide">
													{order.movie?.title ||
														order.movie}
												</h3>
											</div>
											<img
												src={
													order.cinema?.logo ||
													order.cinemaLogo
												}
												alt={
													order.cinema?.name ||
													order.cinema
												}
												className="w-28 h-12 rounded self-center justify-self-start lg:justify-self-end"
											/>
										</div>

										<hr className="border-gray-200 my-10" />

										<div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-6 items-center mb-6">
											<div className="flex flex-col lg:flex-row gap-4">
												<span
													className={getStatusBadge(
														order.status
													)}
												>
													{order.status === 'active'
														? 'Ticket in active'
														: 'Ticket used'}
												</span>
												<span
													className={getPaymentBadge(
														order.paymentStatus
													)}
												>
													{order.paymentStatus ===
													'paid'
														? 'Paid'
														: 'Not Paid'}
												</span>
											</div>

											<button
												onClick={() =>
													toggleOrderDetails(order.id)
												}
												className="flex items-center gap-3 text-gray-400 text-base justify-self-end hover:text-gray-600 font-medium"
											>
												Show Details
												<ChevronDown
													className={`w-5 h-5 transition-transform ${
														expandedOrders[order.id]
															? 'rotate-180'
															: ''
													}`}
												/>
											</button>
										</div>

										{/* Expanded Details */}
										{expandedOrders[order.id] && (
											<div className="mt-8 border-t border-gray-200 pt-8">
												{order.paymentStatus ===
												'not-paid' ? (
													// Unpaid ticket details
													<div className="space-y-8">
														<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
															<div>
																<h4 className="text-sm  text-gray-500 uppercase tracking-wider mb-3">
																	No. Rekening
																	Virtual
																</h4>
																<div className="flex items-center gap-3">
																	<p className="font-mono text-xl  text-gray-900">
																		{
																			order.virtualAccount
																		}
																	</p>
																	<button
																		onClick={() =>
																			copyToClipboard(
																				order.virtualAccount
																			)
																		}
																		className="px-4 py-2 bg-gray-100 border-2 border-gray-300 text-blue-600 text-sm hover:bg-gray-200 transition-colors font-semibold"
																	>
																		<label>Copy</label>
																	</button>
																</div>
															</div>
															<div>
																<h4 className="text-sm  text-gray-500 uppercase tracking-wider mb-3">
																	Total
																	Payment
																</h4>
																<p className="text-2xl  text-blue-600">
																	$
																	{
																		order.totalPrice
																	}
																</p>
															</div>
														</div>

														<div className="">
															<p className="text-base text-gray-700 mb-6">
																Pay this payment
																bill before it
																is due, on{' '}
																<span className=" text-red-600">
																	{
																		order.dueDate
																	}
																</span>
																. If the bill
																has not been
																paid by the
																specified time,
																it will be
																forfeited
															</p>
															<button
																onClick={() =>
																	handleCheckPayment(
																		order.id
																	)
																}
																className="bg-blue-700 text-white px-8 py-4 rounded-md  hover:bg-blue-500 transition-colors text-lg"
															>
																Check Payment
															</button>
														</div>
													</div>
												) : (
													// Paid ticket details - show ticket information inline
													<div className="space-y-8">
														<h3 className="text-xl  text-gray-900 mb-6">
															Ticket Information
														</h3>

														<div className="grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-10">
															{/* QR Code */}
															<div className="flex justify-center lg:justify-start">
																<div className="w-56 h-56 bg-white p-6 flex items-center justify-center">
																	<img
																		src="/QR-code.svg"
																		alt="QR Code"
																		className="w-full h-full object-contain"
																	/>
																</div>
															</div>

															{/* Ticket Details Grid */}
															<div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
																<div>
																	<div className="text-sm  text-gray-500 uppercase tracking-wider mb-3">
																		Category
																	</div>
																	<div className=" text-gray-900 text-lg">
																		{
																			order.category
																		}
																	</div>
																</div>

																<div>
																	<div className="text-sm  text-gray-500 uppercase tracking-wider mb-3">
																		Time
																	</div>
																	<div className=" text-gray-900 text-lg">
																		{
																			order.time
																		}
																	</div>
																</div>

																<div>
																	<div className="text-sm  text-gray-500 uppercase tracking-wider mb-3">
																		Seats
																	</div>
																	<div className=" text-gray-900 text-lg">
																		{Array.isArray(
																			order.seats
																		)
																			? order.seats.join(
																					', '
																			  )
																			: order.seats}
																	</div>
																</div>

																<div>
																	<div className="text-sm  text-gray-500 uppercase tracking-wider mb-3">
																		Total
																	</div>
																	<div className=" text-2xl text-gray-900">
																		$
																		{
																			order.totalPrice
																		}
																	</div>
																</div>

																<div>
																	<div className="text-sm  text-gray-500 uppercase tracking-wider mb-3">
																		Movie
																	</div>
																	<div className=" text-gray-900 text-lg">
																		{(
																			order
																				.movie
																				?.title ||
																			order.movie
																		)
																			.length >
																		15
																			? (
																					order
																						.movie
																						?.title ||
																					order.movie
																			  ).substring(
																					0,
																					15
																			  ) +
																			  '..'
																			: order
																					.movie
																					?.title ||
																			  order.movie}
																	</div>
																</div>

																<div>
																	<div className="text-sm  text-gray-500 uppercase tracking-wider mb-3">
																		Date
																	</div>
																	<div className=" text-gray-900 text-lg">
																		07 Jul
																	</div>
																</div>

																<div>
																	<div className="text-sm  text-gray-500 uppercase tracking-wider mb-3">
																		Count
																	</div>
																	<div className=" text-gray-900 text-lg">
																		{
																			order.count
																		}
																	</div>
																</div>
															</div>
														</div>
													</div>
												)}
											</div>
										)}
									</article>
								))
							)}
						</div>
					</section>
				</div>
			</main>
		</div>
	)
}

export default OrderHistoryPage
