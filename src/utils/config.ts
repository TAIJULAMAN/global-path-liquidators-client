

const config: {
  API_URL: string;
  BACKEND_URL: string;
  FRONTEND_URL?: string;
  FRONTEND_API_URL: string;
  PHOTO_URL: string;
} = {
  // Production
  API_URL: "https://darktechteam.com/api/users/",
  BACKEND_URL: "https://darktechteam.com/api/users/",
  FRONTEND_API_URL: "https://darktechteam.com/api",
  PHOTO_URL: "https://darktechteam.com/api",

  // Localhost
  // API_URL: "http://localhost:8000/api",
  // BACKEND_URL: "http://localhost:8000",
  // FRONTEND_URL: "http://localhost:5173",
};

export default config;
