// NotFoundPage.jsx
import React from "react";
import { Link } from "react-router-dom";

function NotFoundPage() {
    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "100vh",
            textAlign: "center"
        }}>
            <h1>404 - Halaman Tidak Ditemukan</h1>
            <p>Oops! Sepertinya alamat yang kamu tuju tidak tersedia.</p>
            <Link to="/" style={{
                marginTop: "20px",
                padding: "10px 20px",
                backgroundColor: "#007bff",
                color: "#fff",
                borderRadius: "5px",
                textDecoration: "none"
            }}>
                Kembali ke Beranda
            </Link>
        </div>
    );
}

export default NotFoundPage;