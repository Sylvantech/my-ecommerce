import React from "react";
import Navbar from "./Navbar";
import ProductCard from "../components/ProductCard";

type MainLayoutProps = {
  children: React.ReactNode;
};

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <ProductCard />
      <ProductCard />
      <ProductCard />
    </>
  );
}

export default MainLayout;
