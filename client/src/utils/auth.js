const TOKEN_KEY = "arvyax_token";
const USER_KEY = "arvyax_user";

export const setToken = (token) => localStorage.setItem(TOKEN_KEY, token);
export const getToken = () => localStorage.getItem(TOKEN_KEY);
export const removeToken = () => { localStorage.removeItem(TOKEN_KEY); localStorage.removeItem(USER_KEY); };

export const setUser = (user) => localStorage.setItem(USER_KEY, JSON.stringify(user));
export const getUser = () => {
  try {
    const raw = localStorage.getItem(USER_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

export const isAuthenticated = () => {
  return !!localStorage.getItem(TOKEN_KEY);
};

// Get current user
export const getCurrentUser = () => {
  const user = localStorage.getItem(USER_KEY);
  return user ? JSON.parse(user) : null;
};

// Set auth data
export const setAuthData = (token, user) => {
  setToken(token);
  if (user) {
    setUser(user);
  }
};

// Clear auth data
export const clearAuthData = () => {
  removeToken();
};

// Get auth header
export const getAuthHeader = () => {
  const token = getToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
};
