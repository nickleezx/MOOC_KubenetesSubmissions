const RUNTIME_CONFIG = {
  BACKEND_URL: "__BACKEND_URL__",
};

export const getEnv = (key) => {
  const value = RUNTIME_CONFIG[key];

  // Check if the script has replaced the placeholder
  // If it still starts with "__", we are likely in local development
  if (value.startsWith("__")) {
    return import.meta.env[`VITE_${key}`]; 
  }

  return value;
};