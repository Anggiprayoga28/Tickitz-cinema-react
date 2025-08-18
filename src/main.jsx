// src/main.jsx - Hybrid Redux + Context
import { StrictMode } from 'react';
import { createRoot } from "react-dom/client";
import "./index.css";
import Router from './pages/Router.jsx';
import { Provider } from 'react-redux';
import { store, persistor } from "./redux/store.js";
import { PersistGate } from 'redux-persist/integration/react';
import { AuthProvider } from './context/AuthContext.jsx';

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={<div>Loading...</div>} persistor={persistor}>
        <AuthProvider>
          <Router />
        </AuthProvider>
      </PersistGate>
    </Provider>
  </StrictMode>
);