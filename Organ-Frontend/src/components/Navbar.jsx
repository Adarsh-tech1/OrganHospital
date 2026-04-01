import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Heart, Link as LinkIcon } from "lucide-react";

function Navbar() {
  const navigate = useNavigate();
  const { isAuthenticated, user, logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="flex justify-between items-center p-4 bg-gray-900 text-white">
      <h1 className="text-2xl font-bold text-blue-500 flex items-center gap-1">
        <Heart className="w-6 h-6 text-red-500 fill-red-500" />
        OrganHub
      </h1>

      <div className="space-x-4 flex items-center">
        <Link to="/" className="hover:text-blue-400">
          Home
        </Link>

        {!isAuthenticated ? (
          <>
            <Link to="/login" className="hover:text-blue-400">
              Login
            </Link>
            <Link to="/register" className="hover:text-green-400">
              Register
            </Link>
          </>
        ) : (
          <>
            <Link to="/dashboard" className="hover:text-blue-400">
              Dashboard
            </Link>
            <Link
              to="/matches"
              className="hover:text-green-400 font-bold text-green-400 px-3 py-1 rounded-lg border border-green-400 transition flex items-center gap-1"
            >
              <LinkIcon className="w-4 h-4" />
              Matches
            </Link>
            <Link to="/add-donor" className="hover:text-blue-400">
              Add Donor
            </Link>
            <Link to="/request-organ" className="hover:text-blue-400">
              Request Organ
            </Link>
            <span className="text-gray-400">({user?.name})</span>
            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default Navbar;
