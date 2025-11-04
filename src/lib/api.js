const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

/**
 * Get auth token from localStorage
 */
function getAuthToken() {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("vasop-token");
}

/**
 * Save auth token to localStorage
 */
function saveAuthToken(token) {
  if (typeof window === "undefined") return;
  localStorage.setItem("vasop-token", token);
}

/**
 * Remove auth token from localStorage
 */
function removeAuthToken() {
  if (typeof window === "undefined") return;
  localStorage.removeItem("vasop-token");
}

/**
 * Make authenticated API request
 */
async function apiRequest(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;
  const token = getAuthToken();

  const headers = {
    "Content-Type": "application/json",
    ...options.headers,
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  try {
    const response = await fetch(url, {
      ...options,
      headers,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("API request error:", error);
    throw error;
  }
}

/**
 * Auth API functions
 */
export const authAPI = {
  async signup(data) {
    const response = await apiRequest("/auth/signup", {
      method: "POST",
      body: JSON.stringify(data),
    });
    saveAuthToken(response.token);
    return response;
  },

  async login(data) {
    const response = await apiRequest("/auth/login", {
      method: "POST",
      body: JSON.stringify(data),
    });
    saveAuthToken(response.token);
    return response;
  },

  async getProfile() {
    return await apiRequest("/auth/me");
  },

  logout() {
    removeAuthToken();
  },
};

/**
 * Onboarding API functions
 */
export const onboardingAPI = {
  async saveProgress(data) {
    return await apiRequest("/onboarding/save", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  async getMySubmission() {
    return await apiRequest("/onboarding/my-submission");
  },

  async submit(data) {
    return await apiRequest("/onboarding/submit", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },
};

export { getAuthToken, saveAuthToken, removeAuthToken };

