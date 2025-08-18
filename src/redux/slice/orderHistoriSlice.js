import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  orders: [
    {
      id: 1,
      date: "Tuesday, 07 July 2020 - 04:30pm",
      movie: { title: "Spider-Man: Homecoming", poster: "/spiderposter.svg" },
      cinema: { name: "CineOne21", logo: "/CineOne21 2.svg" },
      status: "active",
      paymentStatus: "not-paid",
      virtualAccount: "12321328913829724",
      totalPrice: 30,
      dueDate: "June 23, 2023",
      category: "PG-13",
      time: "4:30pm",
      seats: ["C4", "C5", "C6"],
      count: "3 pcs",
      paymentMethod: "bca"
    },
    {
      id: 2,
      date: "Monday, 14 June 2020 - 02:00pm",
      movie: { title: "Avengers: End Game", poster: "/avengers-poster.svg" },
      cinema: { name: "EBV.ID", logo: "/ebv.id 2.svg" },
      status: "used",
      paymentStatus: "paid",
      category: "PG-13",
      time: "2:00pm",
      seats: ["C4", "C5", "C6"],
      count: "3 pcs",
      totalPrice: 30,
      paymentMethod: "visa"
    },
  ],
  expandedOrders: {},
};

const orderHistorySlice = createSlice({
  name: 'orderHistory',
  initialState,
  reducers: {
    addOrder: (state, action) => {
      // Add new order at the beginning of the array (newest first)
      state.orders.unshift({
        ...action.payload,
        // Ensure required fields have default values
        id: action.payload.id || Date.now(),
        status: action.payload.status || "active",
        paymentStatus: action.payload.paymentStatus || "not-paid",
        category: action.payload.category || "PG-13",
        seats: action.payload.seats || [],
        count: action.payload.count || "0 pcs",
      });
    },
    updateOrderStatus: (state, action) => {
      const { orderId, status, paymentStatus } = action.payload;
      const order = state.orders.find(order => order.id === orderId);
      if (order) {
        if (status) order.status = status;
        if (paymentStatus) order.paymentStatus = paymentStatus;
        
        // When payment is confirmed, remove virtual account and due date
        if (paymentStatus === 'paid') {
          delete order.virtualAccount;
          delete order.dueDate;
        }
      }
    },
    toggleOrderExpansion: (state, action) => {
      const orderId = action.payload;
      state.expandedOrders[orderId] = !state.expandedOrders[orderId];
    },
    removeOrder: (state, action) => {
      const orderId = action.payload;
      state.orders = state.orders.filter(order => order.id !== orderId);
    }
  },
});

export const {
  addOrder,
  updateOrderStatus,
  toggleOrderExpansion,
  removeOrder,
} = orderHistorySlice.actions;

export default orderHistorySlice.reducer;