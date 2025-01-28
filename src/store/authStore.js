import { apiClient } from "@api/apiClient";
import { endpoints } from "@api/endpoints";
import { paths } from "@routes/paths";
import { UserRole } from "@utils/constants";
import {
  getLocalStorageItem,
  removeLocalStorageItem,
  setLocalStorageItem,
} from "@utils/localStorage";
import { create } from "zustand";

const localStorageUser = getLocalStorageItem("user");

export const getLoggedInUserPath = (user) => {
  if (user.role === UserRole.admin || user.role === UserRole.superAdmin) {
    return paths.AdminDashboard;
  } else if (user.role === UserRole.guest) {
    return paths.GuestDashboard;                 
  } else {
    return paths.Index;
  }
};

const handleLogin = async (loginDetails, navigate, set) => {
  try {
    set({ isLoading: true });
    const { data: response } = await apiClient.post(
      endpoints.login,
      loginDetails
    );

    const user = response.data;
    const accessToken = response.accessToken;

    setLocalStorageItem("user", JSON.stringify(user));
    setLocalStorageItem("accessToken", accessToken);

    //  Update User
    set({ user: user, isAuthenticated: true, isLoading: false, error: null });

    // Redirect to the right Dashboard
    navigate(getLoggedInUserPath(user));
  } catch (error) {
    set({
      user: null,
      error: error?.response?.data?.message || "Internal Server error",
      isAuthenticated: false,
      isLoading: false,
    });
  }
};

const handleLogout = async (navigate, set) => {
  set({ isLoading: true, error: null });

  try {
    // Send logout request if backend requires it
    await apiClient.post(endpoints.logout);
    // Remove token and user from localStorage
    removeLocalStorageItem("accessToken");
    removeLocalStorageItem("user");

    // Reset user state
    set({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
    });
    navigate(paths.Index);
  } catch (error) {
    set({
      isLoading: false,
      error: error?.response?.data?.message || "Logout failed",
    });
  }
};

const useAuthStore = create((set, get) => ({
  isAuthenticated: false,
  user: localStorageUser ? JSON.parse(localStorageUser) : null,
  error: null,
  setError: (error) => set({ error }),
  isLoading: false,
  login: async (loginDetails, navigateFn) =>
    handleLogin(loginDetails, navigateFn, set),

  logout: async (navigate) => handleLogout(navigate, set),

  updateUser: (data) => {
    const { user } = get();
    const updatedUser = { ...user, ...data };
    setLocalStorageItem("user", JSON.stringify(updatedUser));
    set({ user: updatedUser || null });
  },

  validateAuth: async () => {
    const token = getLocalStorageItem("accessToken");
    if (!token) {
      set({ isAuthenticated: false });
      return;
    }
    try {
      const response = await apiClient.get(endpoints.validateAuth);
      set({ isAuthenticated: true, user: response.data.data });
    } catch {
      set({ isAuthenticated: false });
      removeLocalStorageItem("accessToken");
      removeLocalStorageItem("user");
    }
  },
}));

export default useAuthStore;
