import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { adminService } from "~/services/adminService";
import { CookieHelper } from "~/utils/cookieHelper";

export default function useAdminHook() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const checkAdminAccess = async () => {
      try {
        const token = CookieHelper.getToken("AccesToken");
        if (!token) {
          navigate("/login");
          return;
        }

        await adminService.authenticated(token);
        setIsAuthorized(true);
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : "Erreur inconnue";
        console.error("Accès admin refusé:", errorMessage);

        if (
          errorMessage.includes("Token invalide") ||
          errorMessage.includes("expiré")
        ) {
          navigate("/login");
        } else if (errorMessage.includes("Droits administrateur")) {
          navigate("/");
        } else {
          navigate("/login");
        }
      } finally {
        setIsLoading(false);
      }
    };

    checkAdminAccess();
  }, [navigate]);

  return { isLoading, isAuthorized };
}
