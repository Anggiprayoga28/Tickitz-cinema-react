import React from 'react';

const kursiDipesan = ['C7', 'B3', 'F7', 'A5', 'D12', 'E4'];

const SeatGrid = ({ selectedSeats, setSelectedSeats }) => {
    const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
    const cols = Array.from({ length: 14 }, (_, i) => i + 1);

    const handleSeatClick = (row, col) => {
        const seatCode = `${row}${col}`;
        
  
        if (kursiDipesan.includes(seatCode)) {
            return;
        }
        let newSeats;
        if (selectedSeats.includes(seatCode)) {
            newSeats = selectedSeats.filter((seat) => seat !== seatCode);
        } else {
            newSeats = [...selectedSeats, seatCode];
        }
        
        setSelectedSeats(newSeats);
    };

    const getSeatStatus = (seatCode) => {
        if (kursiDipesan.includes(seatCode)) {
            return 'booked';
        }
        if (selectedSeats.includes(seatCode)) {
            return 'selected';
        }
        return 'available';
    };

    const getSeatClassName = (status) => {
        const baseClasses = 'size-10 rounded cursor-pointer transition-all duration-200';
        
        switch (status) {
            case 'selected':
                return `${baseClasses} bg-blue-600`;
            case 'booked':
                return `${baseClasses} bg-gray-500 cursor-not-allowed`;
            case 'available':
            default:
                return `${baseClasses} bg-gray-200 hover:bg-gray-300`;
        }
    };

    return (
        <div className="flex flex-col items-center gap-4">

            {/* Seat Grid */}
            <div className="flex flex-col gap-2">
                {rows.map((row) => (
                    <div key={row} className="flex items-center gap-2">
                        <span className="text-sm font-medium text-gray-600 w-4 text-center">{row}</span>
                        <div className="flex gap-1">
                            {cols.slice(0, 7).map((col) => {
                                const seatCode = `${row}${col}`;
                                const status = getSeatStatus(seatCode);

                                return (
                                    <div
                                        key={seatCode}
                                        onClick={() => handleSeatClick(row, col)}
                                        className={getSeatClassName(status)}
                                        title={`Seat ${seatCode}`}
                                    />
                                );
                            })}
                        </div>
                        
                        {/* Aisle gap */}
                        <div className="w-4"></div>
                        
                        <div className="flex gap-1">
                            {cols.slice(7).map((col) => {
                                const seatCode = `${row}${col}`;
                                const status = getSeatStatus(seatCode);

                                return (
                                    <div
                                        key={seatCode}
                                        onClick={() => handleSeatClick(row, col)}
                                        className={getSeatClassName(status)}
                                        title={`Seat ${seatCode}`}
                                    />
                                );
                            })}
                        </div>
                    </div>
                ))}
                
                {/* Column numbers */}
                <div className="flex w-full items-center gap-2 mt-2 mb-15">
                    <div className="w-4"></div>
                    <div className="flex gap-1">
                        {cols.slice(0, 7).map((col) => (
                            <span key={col} className="w-10 text-center text-xs text-gray-500">{col}</span>
                        ))}
                    </div>
                    <div className="w-4"></div>
                    <div className="flex gap-1">
                        {cols.slice(7).map((col) => (
                            <span key={col} className="w-10 text-center text-xs text-gray-500">{col}</span>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SeatGrid;