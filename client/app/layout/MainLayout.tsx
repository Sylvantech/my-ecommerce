import { useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Outlet } from "react-router";
import { AnonymousHelper } from "~/utils/anonymousHelper";
import { CookieHelper } from "~/utils/cookieHelper";

export function meta() {
  return [
    { title: "E-commerce" },
    { name: "description", content: "Site d'e-commerce de chaussette" },
  ];
}

export function MainLayout() {
  useEffect(() => {
    const accessToken = CookieHelper.getToken("AccesToken");
    if (!accessToken && !AnonymousHelper.hasAnonymousId()) {
      AnonymousHelper.getAnonymousId();
    }
  }, []);

  return (
    <div className="min-h-screen font-nunito bg-gradient-to-br from-pink-100 via-purple-50 to-blue-100 relative overflow-hidden">
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default MainLayout;
