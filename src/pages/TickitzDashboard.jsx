import React, { useEffect, useRef, useState } from 'react'
import { Chart } from 'chart.js/auto'

const TickitzDashboard = () => {
	const salesChartRef = useRef(null)
	const ticketSalesChartRef = useRef(null)
	const salesChartInstance = useRef(null)
	const ticketSalesChartInstance = useRef(null)

	// State for dropdown selections
	const [salesMovieFilter, setSalesMovieFilter] = useState('Avengers: End Game')
	const [salesPeriodFilter, setSalesPeriodFilter] = useState('Monthly')
	const [ticketCategoryFilter, setTicketCategoryFilter] = useState('Adventure')
	const [ticketLocationFilter, setTicketLocationFilter] = useState('Purwokerto')

	// Dummy data for different movies and periods
	const movieData = {
		'Avengers: End Game': {
			Monthly: {
				labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
				data: [1200, 1800, 2800, 2200, 1900, 2400]
			},
			Weekly: {
				labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
				data: [800, 1200, 950, 1100]
			},
			Yearly: {
				labels: ['2020', '2021', '2022', '2023', '2024'],
				data: [15000, 18000, 22000, 25000, 28000]
			}
		},
		'Spider-Man': {
			Monthly: {
				labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
				data: [900, 1400, 2100, 1800, 1600, 2000]
			},
			Weekly: {
				labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
				data: [600, 900, 750, 850]
			},
			Yearly: {
				labels: ['2020', '2021', '2022', '2023', '2024'],
				data: [12000, 15000, 18000, 20000, 23000]
			}
		},
		'Batman': {
			Monthly: {
				labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
				data: [700, 1100, 1600, 1400, 1200, 1500]
			},
			Weekly: {
				labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
				data: [450, 680, 560, 640]
			},
			Yearly: {
				labels: ['2020', '2021', '2022', '2023', '2024'],
				data: [9000, 11000, 13000, 15000, 17000]
			}
		}
	}

	// Dummy data for ticket sales by category and location
	const ticketData = {
		'Adventure': {
			'Purwokerto': {
				labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
				data: [800, 1200, 1800, 1500, 1300, 1600]
			},
			'Jakarta': {
				labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
				data: [1500, 2200, 3200, 2800, 2400, 3000]
			},
			'Bandung': {
				labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
				data: [600, 900, 1400, 1200, 1000, 1300]
			}
		},
		'Action': {
			'Purwokerto': {
				labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
				data: [900, 1300, 2000, 1700, 1400, 1800]
			},
			'Jakarta': {
				labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
				data: [1700, 2500, 3600, 3200, 2800, 3400]
			},
			'Bandung': {
				labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
				data: [700, 1000, 1600, 1400, 1200, 1500]
			}
		},
		'Drama': {
			'Purwokerto': {
				labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
				data: [400, 600, 900, 800, 700, 850]
			},
			'Jakarta': {
				labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
				data: [800, 1200, 1800, 1600, 1400, 1700]
			},
			'Bandung': {
				labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
				data: [300, 450, 700, 600, 500, 650]
			}
		}
	}

	// Get current data based on filters
	const getCurrentSalesData = () => {
		return movieData[salesMovieFilter]?.[salesPeriodFilter] || movieData['Avengers: End Game']['Monthly']
	}

	const getCurrentTicketData = () => {
		return ticketData[ticketCategoryFilter]?.[ticketLocationFilter] || ticketData['Adventure']['Purwokerto']
	}

	const chartOptions = {
		responsive: true,
		maintainAspectRatio: false,
		plugins: {
			legend: {
				display: false,
			},
			tooltip: {
				backgroundColor: '#1F2937',
				titleColor: '#fff',
				bodyColor: '#fff',
				borderColor: '#374151',
				borderWidth: 1,
				cornerRadius: 8,
				callbacks: {
					label: function(context) {
						return `Sales: ${context.parsed.y.toLocaleString()}`
					}
				}
			},
		},
		scales: {
			x: {
				grid: {
					display: false,
				},
				border: {
					display: false,
				},
				ticks: {
					color: '#9CA3AF',
				},
			},
			y: {
				grid: {
					color: '#F3F4F6',
					borderDash: [2, 2],
				},
				border: {
					display: false,
				},
				ticks: {
					color: '#9CA3AF',
					callback: function (value) {
						return value.toLocaleString()
					},
				},
			},
		},
		elements: {
			point: {
				hoverRadius: 6,
			},
		},
	}

	const updateSalesChart = () => {
		if (salesChartRef.current) {
			if (salesChartInstance.current) {
				salesChartInstance.current.destroy()
			}

			const currentData = getCurrentSalesData()
			const chartData = {
				labels: currentData.labels,
				datasets: [
					{
						data: currentData.data,
						borderColor: '#3B82F6',
						backgroundColor: 'rgba(59, 130, 246, 0.3)',
						fill: true,
						tension: 0.4,
						borderWidth: 2,
						pointBackgroundColor: '#3B82F6',
						pointBorderColor: '#fff',
						pointBorderWidth: 2,
						pointRadius: 4,
					},
				],
			}

			const ctx = salesChartRef.current.getContext('2d')
			salesChartInstance.current = new Chart(ctx, {
				type: 'line',
				data: chartData,
				options: chartOptions,
			})
		}
	}

	const updateTicketChart = () => {
		if (ticketSalesChartRef.current) {
			if (ticketSalesChartInstance.current) {
				ticketSalesChartInstance.current.destroy()
			}

			const currentData = getCurrentTicketData()
			const chartData = {
				labels: currentData.labels,
				datasets: [
					{
						data: currentData.data,
						borderColor: '#10B981',
						backgroundColor: 'rgba(16, 185, 129, 0.3)',
						fill: true,
						tension: 0.4,
						borderWidth: 2,
						pointBackgroundColor: '#10B981',
						pointBorderColor: '#fff',
						pointBorderWidth: 2,
						pointRadius: 4,
					},
				],
			}

			const ctx = ticketSalesChartRef.current.getContext('2d')
			ticketSalesChartInstance.current = new Chart(ctx, {
				type: 'line',
				data: chartData,
				options: chartOptions,
			})
		}
	}

	// Update charts when filters change
	useEffect(() => {
		updateSalesChart()
	}, [salesMovieFilter, salesPeriodFilter])

	useEffect(() => {
		updateTicketChart()
	}, [ticketCategoryFilter, ticketLocationFilter])

	// Initialize charts
	useEffect(() => {
		updateSalesChart()
		updateTicketChart()

		return () => {
			if (salesChartInstance.current) {
				salesChartInstance.current.destroy()
			}
			if (ticketSalesChartInstance.current) {
				ticketSalesChartInstance.current.destroy()
			}
		}
	}, [])

	const handleSalesFilter = () => {
		// Simulate filtering - in real app, this might trigger API calls
		updateSalesChart()
		console.log(`Sales filter applied: ${salesMovieFilter} - ${salesPeriodFilter}`)
	}

	const handleTicketFilter = () => {
		// Simulate filtering - in real app, this might trigger API calls
		updateTicketChart()
		console.log(`Ticket filter applied: ${ticketCategoryFilter} - ${ticketLocationFilter}`)
	}

	return (
		<div className="min-h-screen bg-gray-50">
			{/* Main Content */}
			<main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
				<div className="space-y-8">
					{/* Sales Chart Section */}
					<div className="bg-white rounded-md shadow-sm border border-gray-200 p-6">
						<div className="flex items-center justify-between mb-6">
							<h2 className="text-xl font-semibold text-gray-900">
								Sales Chart
							</h2>
							<div className="flex items-center space-x-4">
								<div className="relative">
									<select 
										value={salesMovieFilter}
										onChange={(e) => setSalesMovieFilter(e.target.value)}
										className="appearance-none bg-gray-100 border border-gray-300 rounded-md px-4 py-2 pr-8 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
									>
										<option value="Avengers: End Game">Avengers: End Game</option>
										<option value="Spider-Man">Spider-Man</option>
										<option value="Batman">Batman</option>
									</select>
									<svg
										className="absolute right-2 top-3 w-4 h-4 text-gray-400 pointer-events-none"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M19 9l-7 7-7-7"
										/>
									</svg>
								</div>
								<div className="relative">
									<select 
										value={salesPeriodFilter}
										onChange={(e) => setSalesPeriodFilter(e.target.value)}
										className="appearance-none bg-gray-100 border border-gray-300 rounded-md px-4 py-2 pr-8 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
									>
										<option value="Weekly">Weekly</option>
										<option value="Monthly">Monthly</option>
										<option value="Yearly">Yearly</option>
									</select>
									<svg
										className="absolute right-2 top-3 w-4 h-4 text-gray-400 pointer-events-none"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M19 9l-7 7-7-7"
										/>
									</svg>
								</div>
								<button 
									onClick={handleSalesFilter}
									className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md text-sm font-medium transition-colors duration-200"
								>
									Filter
								</button>
							</div>
						</div>
						<div className="mb-4">
							<p className="text-sm text-gray-600">
								{salesMovieFilter} - {salesPeriodFilter} View
							</p>
						</div>
						<div className="h-64">
							<canvas ref={salesChartRef}></canvas>
						</div>
					</div>

					{/* Ticket Sales Section */}
					<div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
						<div className="flex items-center justify-between mb-6">
							<h2 className="text-xl font-semibold text-gray-900">
								Ticket Sales
							</h2>
							<div className="flex items-center space-x-4">
								<div className="relative">
									<select 
										value={ticketCategoryFilter}
										onChange={(e) => setTicketCategoryFilter(e.target.value)}
										className="appearance-none bg-gray-100 border border-gray-300 rounded-md px-4 py-2 pr-8 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
									>
										<option value="Adventure">Adventure</option>
										<option value="Action">Action</option>
										<option value="Drama">Drama</option>
									</select>
									<svg
										className="absolute right-2 top-3 w-4 h-4 text-gray-400 pointer-events-none"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M19 9l-7 7-7-7"
										/>
									</svg>
								</div>
								<div className="relative">
									<select 
										value={ticketLocationFilter}
										onChange={(e) => setTicketLocationFilter(e.target.value)}
										className="appearance-none bg-gray-100 border border-gray-300 rounded-md px-4 py-2 pr-8 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
									>
										<option value="Jakarta">Jakarta</option>
										<option value="Bandung">Bandung</option>
										<option value="Purwokerto">Purwokerto</option>
									</select>
									<svg
										className="absolute right-2 top-3 w-4 h-4 text-gray-400 pointer-events-none"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M19 9l-7 7-7-7"
										/>
									</svg>
								</div>
								<button 
									onClick={handleTicketFilter}
									className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md text-sm font-medium transition-colors duration-200"
								>
									Filter
								</button>
							</div>
						</div>
						<div className="mb-4">
							<p className="text-sm text-gray-600">
								{ticketCategoryFilter}, {ticketLocationFilter}
							</p>
						</div>
						<div className="h-64">
							<canvas ref={ticketSalesChartRef}></canvas>
						</div>
					</div>
				</div>
			</main>
		</div>
	)
}

export default TickitzDashboard