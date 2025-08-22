import { useState, useEffect, createContext, useContext } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { isAuthenticated, getCurrentUser, getToken } from './utils/auth';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import Sessions from './pages/Sessions';
import MySessions from './pages/MySessions';
import CreateSession from './pages/CreateSession';

// Create auth context
export const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

// Protected route component
const ProtectedRoute = ({ children }) => {
  const { isAuth } = useAuth();
  const location = useLocation();

  if (!isAuth) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

function App() {
  const [isAuth, setIsAuth] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = () => {
      const token = getToken();
      const auth = isAuthenticated();
      const currentUser = getCurrentUser();
      setIsAuth(auth);
      setUser(currentUser);
      setIsLoading(false);
    };

    checkAuth();
    
    // Listen for storage events to sync auth state across tabs
    const handleStorageChange = (e) => {
      if (e.key === 'token' || e.key === 'user') {
        checkAuth();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const login = (token, userData) => {
    localStorage.setItem('token', token);
    if (userData) {
      localStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);
    }
    setIsAuth(true);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsAuth(false);
    setUser(null);
  };

  if (isLoading) {
    return <div>Loading...</div>; 
  }

  return (
    <AuthContext.Provider value={{ isAuth, user, login, logout }}>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main className="py-10">
          <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <Routes>
              <Route path="/login" element={!isAuth ? <Login /> : <Navigate to="/my-sessions" replace />} />
              <Route path="/register" element={!isAuth ? <Register /> : <Navigate to="/my-sessions" replace />} />
              <Route path="/" element={<Sessions />} />
              
              <Route
                path="/my-sessions"
                element={
                  <ProtectedRoute>
                    <MySessions />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/create-session"
                element={
                  <ProtectedRoute>
                    <CreateSession />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </div>
        </main>
      </div>
    </AuthContext.Provider>
  );
}

export default App;
