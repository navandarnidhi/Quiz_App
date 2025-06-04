import { create } from 'zustand';
import AuthService from "../service/authService.js";

const useAuthStore = create((set) => ({
    // Initial state from AuthService and localStorage
    isAuthenticated: AuthService.isAuthenticated(),
    currentUser: AuthService.getCurrentUser(),
    accessToken: AuthService.getToken(),
    refreshToken: AuthService.getRefreshToken(),
    loading: false,

    // Set loading state
    setLoading: (isLoading) => set({ loading: isLoading }),

    // Set complete login state manually if needed
    setLoginState: (newState) => set(newState),

    // Login action
    login: async (credentials) => {
        set({ loading: true });
        try {
            const result = await AuthService.login(credentials);
            const { userName, role, fullName, accessToken, refreshToken, userId } = result;

            const userProfile = {
                userId,
                userName,
                role,
                fullName: fullName || null
            };

            set({
                isAuthenticated: true,
                currentUser: userProfile,
                accessToken,
                refreshToken
            });
        } catch (error) {
            console.error("Login failed in useAuthStore:", error);
            throw error;
        } finally {
            set({ loading: false });
        }
    },

    // Logout action
    logout: () => {
        AuthService.logout(); // Clear localStorage
        set({
            isAuthenticated: false,
            currentUser: null,
            accessToken: null,
            refreshToken: null
        });
    },

    // Update user profile after login if needed
    setCurrentUser: (user) => set({ currentUser: user }),

    // Update access/refresh tokens
    setTokens: (newAccessToken, newRefreshToken = null) => {
        AuthService.setAccessToken(newAccessToken);
        if (newRefreshToken) {
            AuthService.setRefreshToken(newRefreshToken);
        }
        set({
            accessToken: newAccessToken,
            refreshToken: newRefreshToken || AuthService.getRefreshToken()
        });
    },

    // Re-initialize auth state from localStorage (on app reload)
    initializeAuth: () => {
        set({
            isAuthenticated: AuthService.isAuthenticated(),
            currentUser: AuthService.getCurrentUser(),
            accessToken: AuthService.getToken(),
            refreshToken: AuthService.getRefreshToken()
        });
    }
}));

export default useAuthStore;
