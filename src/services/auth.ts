import api from "./api";

export const loginUser = async (email: string, password: string) => {
  const response = await api.post("/auth/login", { email, password });
  return response.data;
};

export const verifyToken = async () => {
  try {
    const response = await api.get("/auth/verify");
    return response.status === 200;
  } catch {
    return false;
  }
};
