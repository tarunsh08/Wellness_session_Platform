import { useState, useEffect, createContext, useContext } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { isAuthenticated, getCurrentUser, getToken, getUser } from './utils/auth'; // Import getUser
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import Sessions from './pages/Sessions';
import MySessions from './pages/MySessions';
import CreateSession from './pages/CreateSession';

export const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

const ProtectedRoute = ({ children }) => {
  const { isAuth, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }

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
      try {
        const auth = isAuthenticated();
        const currentUser = getUser();
        setIsAuth(auth);
        setUser(currentUser);
      } catch (error) {
        console.error('Auth check error:', error);
        setIsAuth(false);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
    
    const handleStorageChange = (e) => {
      if (e.key === 'arvyax_token' || e.key === 'arvyax_user') {
        checkAuth();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const login = (token, userData) => {
    localStorage.setItem('arvyax_token', token);
    if (userData) {
      localStorage.setItem('arvyax_user', JSON.stringify(userData));
      setUser(userData);
    }
    setIsAuth(true);
  };

  const logout = () => {
    localStorage.removeItem('arvyax_token');
    localStorage.removeItem('arvyax_user');
    setIsAuth(false);
    setUser(null);
  };

  // Show loading state until auth check is complete
  if (isLoading) {
    return <div className="min-h-screen bg-gray-50 flex items-center justify-center">Loading...</div>;
  }

  return (
    <AuthContext.Provider value={{ isAuth, user, login, logout, isLoading }}>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main className="py-10">
          <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <Routes>
              <Route 
                path="/login" 
                element={!isAuth ? <Login /> : <Navigate to="/my-sessions" replace />} 
              />
              <Route 
                path="/register" 
                element={!isAuth ? <Register /> : <Navigate to="/my-sessions" replace />} 
              />
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
              <Route
                path="/create-session/:id"
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