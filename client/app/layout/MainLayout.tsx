import React from "react";
import Navbar from "./Navbar";

type MainLayoutProps = {
  children: React.ReactNode;
};

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <>
      <Navbar />
      <main>
        {children}
      </main>
    </>
  );
}

export default MainLayout;