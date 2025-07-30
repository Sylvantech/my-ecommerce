import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Header from "../components/Header";
import ProductsList from "../routes/products";

import { authService } from "../services/authService";
import { useCallback } from "react";

type MainLayoutProps = {
  children: React.ReactNode;
};

export function MainLayout({ children }: MainLayoutProps) {
  const handleGetUser = useCallback(() => {
    authService
      .getUser()
      .then(data => {
        console.log(data);
      })
      .catch(() => {
        // ignore l'erreur
      });
  }, []);

  return (
    <div className="min-h-screen font-nunito bg-gradient-to-br from-pink-100 via-purple-50 to-blue-100 relative overflow-hidden">
      <Navbar />
      <button
        onClick={handleGetUser}
        className="m-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Get User
      </button>
      <main>{children}</main>
      <Header />
      <ProductsList />
      <Footer />
    </div>
  );
}

export default MainLayout;
