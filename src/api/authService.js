// src/api/authService.js
import axios from 'axios';

export const refreshAccessToken = async () => {
  try {
    const refreshToken = localStorage.getItem("refreshToken");
    const res = await axios.post("http://localhost:3000/api/users/refresh-token", { refreshToken });
    localStorage.setItem("accessToken", res.data.accessToken);
    return res.data.accessToken;
  } catch (err) {
    console.error("🔒 Token refresh failed:", err);
    return null;
  }
};
