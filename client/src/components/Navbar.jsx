import React, { useContext } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../App";

export default function Navbar() {
  const { isAuth, user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className="bg-neutral-900 border-b border-neutral-700 shadow-2xl backdrop-blur-sm bg-opacity-95">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center group">
              <span className="text-xl font-bold bg-gradient-to-r from-neutral-100 to-neutral-300 bg-clip-text text-transparent group-hover:from-neutral-300 group-hover:to-neutral-100 transition-all duration-300">
                Arvyax
              </span>
            </Link>
            
            <div className="hidden sm:ml-8 sm:flex sm:space-x-6">
              <Link 
                to="/" 
                className={`relative inline-flex items-center px-3 py-2 text-sm font-medium transition-all duration-300 group ${
                  isActive('/') 
                    ? 'text-neutral-100' 
                    : 'text-neutral-400 hover:text-neutral-200'
                }`}
              >
                Home
                {isActive('/') && (
                  <span className="absolute inset-x-0 -bottom-0.5 h-0.5 bg-gradient-to-r from-neutral-100 to-neutral-400 rounded-full" />
                )}
              </Link>
              
              {isAuth && (
                <>
                  <Link 
                    to="/my-sessions" 
                    className={`relative inline-flex items-center px-3 py-2 text-sm font-medium transition-all duration-300 group ${
                      isActive('/my-sessions') 
                        ? 'text-neutral-100' 
                        : 'text-neutral-400 hover:text-neutral-200'
                    }`}
                  >
                    My Sessions
                    {isActive('/my-sessions') && (
                      <span className="absolute inset-x-0 -bottom-0.5 h-0.5 bg-gradient-to-r from-neutral-100 to-neutral-400 rounded-full" />
                    )}
                  </Link>
                  
                  <Link 
                    to="/create-session" 
                    className={`relative inline-flex items-center px-3 py-2 text-sm font-medium transition-all duration-300 group ${
                      isActive('/create-session') 
                        ? 'text-neutral-100' 
                        : 'text-neutral-400 hover:text-neutral-200'
                    }`}
                  >
                    Create Session
                    {isActive('/create-session') && (
                      <span className="absolute inset-x-0 -bottom-0.5 h-0.5 bg-gradient-to-r from-neutral-100 to-neutral-400 rounded-full" />
                    )}
                  </Link>
                </>
              )}
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {isAuth ? (
              <div className="flex items-center space-x-4">
                <div className="hidden sm:flex items-center space-x-3">
                  <div className="w-8 h-8 bg-neutral-800 border border-neutral-700 rounded-full flex items-center justify-center">
                    <span className="text-sm font-medium text-neutral-300">
                      {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                    </span>
                  </div>
                  <span className="text-sm text-neutral-300 font-medium">
                    {user?.name || 'User'}
                  </span>
                </div>
                
                <button
                  onClick={handleLogout}
                  className="flex items-center px-4 py-2 text-sm font-medium text-neutral-100 bg-neutral-800 border border-neutral-700 rounded-lg hover:bg-neutral-700 hover:border-neutral-600 transition-all duration-300 hover:shadow-lg transform hover:-translate-y-0.5"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  Sign out
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link 
                  to="/login" 
                  className="px-4 py-2 text-sm font-medium text-neutral-300 border border-neutral-700 rounded-lg hover:bg-neutral-800 hover:text-neutral-100 hover:border-neutral-600 transition-all duration-300"
                >
                  Sign in
                </Link>
                <Link 
                  to="/register" 
                  className="px-4 py-2 text-sm font-medium text-neutral-900 bg-neutral-100 border border-neutral-300 rounded-lg hover:bg-neutral-200 hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300"
                >
                  Sign up
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Mobile menu button (optional) */}
        <div className="sm:hidden flex items-center justify-center py-4">
          <div className="flex space-x-4">
            <Link 
              to="/" 
              className={`px-3 py-2 text-sm font-medium rounded-lg transition-all duration-300 ${
                isActive('/') 
                  ? 'bg-neutral-800 text-neutral-100' 
                  : 'text-neutral-400 hover:text-neutral-200'
              }`}
            >
              Home
            </Link>
            {isAuth && (
              <>
                <Link 
                  to="/my-sessions" 
                  className={`px-3 py-2 text-sm font-medium rounded-lg transition-all duration-300 ${
                    isActive('/my-sessions') 
                      ? 'bg-neutral-800 text-neutral-100' 
                      : 'text-neutral-400 hover:text-neutral-200'
                  }`}
                >
                  My Sessions
                </Link>
                <Link 
                  to="/create-session" 
                  className={`px-3 py-2 text-sm font-medium rounded-lg transition-all duration-300 ${
                    isActive('/create-session') 
                      ? 'bg-neutral-800 text-neutral-100' 
                      : 'text-neutral-400 hover:text-neutral-200'
                  }`}
                >
                  Create
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}