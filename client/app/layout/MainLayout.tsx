import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Header from "~/components/Header";

type MainLayoutProps = {
  children: React.ReactNode;
};

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="min-h-screen font-nunito bg-gradient-to-br from-pink-100 via-purple-50 to-blue-100 relative overflow-hidden">
      <Navbar />
      <main>{children}</main>
      <Header />
      <Footer />
    </div>
  );
}

export default MainLayout;
