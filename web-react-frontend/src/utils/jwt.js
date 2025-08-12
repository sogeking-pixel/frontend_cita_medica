// import jwtDecode from "jwt-decode";

export const getAccessToken = () => localStorage.getItem("access_token");

export const setAccessToken = (token) => localStorage.setItem("access_token", token);

export const removeAccessToken = () => localStorage.removeItem("access_token");

export const getRefreshToken = () => localStorage.getItem("refresh_token");

export const setRefreshToken = (token) => localStorage.setItem("refresh_token", token);

export const removeRefreshToken = () => localStorage.removeItem("refresh_token");

export const saveTokens = (accessToken, refreshToken) => {
  localStorage.setItem("access_token", accessToken);
  localStorage.setItem("refresh_token", refreshToken);
};

export const clearTokens = () => {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
};

// export const decodeToken = (token) => {
//   try {
//     return jwtDecode(token);
//   } catch (error) {
//     return null;
//   }
// };
