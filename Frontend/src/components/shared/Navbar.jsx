import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "@/redux/authSlice"; 
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constants";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post(
        `${USER_API_END_POINT}/logout`,
        {},
        { withCredentials: true }
      );
      dispatch(setUser(null));
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <nav className="bg-white border-b shadow-sm sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between px-4 py-3">
        {/* Logo */}
        <Link to="/" className="text-xl font-bold text-blue-600">
          ResQ
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          <Link to="/" className="hover:text-blue-600">Home</Link>
          <Link to="/disasters" className="hover:text-blue-600">Disasters</Link>
          <Link to="/alerts" className="hover:text-blue-600">Alerts</Link>
          <Link to="/about" className="hover:text-blue-600">About</Link>
          {user && (
            <>
              <Link to="/resources" className="hover:text-blue-600">Resources</Link>
              {user?.role !== "user" && (
                <Link to="/volunteers" className="hover:text-blue-600">Volunteers</Link>
              )}
              <Link to="/donate" className="hover:text-blue-600">Donation</Link>
            </>
          )}
        </div>

        {/* CTA Buttons */}
        <div className="hidden md:flex items-center gap-3">
          {user ? (
            <Button
              onClick={handleLogout}
              className="border border-red-500 text-red-500 font-semibold py-2 px-6 rounded-lg hover:bg-red-50 transition-colors duration-300"
            >
              Logout
            </Button>
          ) : (
            <div className="flex gap-4">
              <Link
                to="/login"
                className="border border-blue-600 text-blue-600 font-semibold py-2 px-6 rounded-lg hover:bg-blue-50 transition-colors duration-300"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="border border-green-600 text-green-600 font-semibold py-2 px-6 rounded-lg hover:bg-green-50 transition-colors duration-300"
              >
                Signup
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          <Menu className="h-6 w-6" />
        </button>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-white border-t shadow-md px-4 py-3 space-y-3">
          <Link to="/disasters" className="block">Disasters</Link>
          <Link to="/alerts" className="block">Alerts</Link>
          <Link to="/about" className="block">About</Link>

          {user ? (
            <>
              <Link to="/resources" className="block">Resources</Link>
              {user?.role !== "user" && (
                <Link to="/volunteers" className="block">Volunteers</Link>
              )}
              <Link to="/donate" className="block">Donation</Link>
              <Link to="/request-help">
                <Button className="w-full" variant="destructive">Request Help</Button>
              </Link>
              <Button onClick={handleLogout} className="w-full" variant="outline">
                Logout
              </Button>
            </>
          ) : (
            <div className="flex flex-col gap-2">
              <Link to="/login">
                <Button className="w-full" variant="outline">Login</Button>
              </Link>
              <Link to="/signup">
                <Button className="w-full" variant="outline">Signup</Button>
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}
