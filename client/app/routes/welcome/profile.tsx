import Profile from "../../components/Profile";
import { useLocation, Routes, Route } from "react-router";

export default function Auth() {
    return (
        <Routes>
        <Route path="/profile" element={<Profile />} />

        </Routes>
    );
}
