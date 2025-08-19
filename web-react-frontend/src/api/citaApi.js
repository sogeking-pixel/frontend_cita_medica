import axiosPublic from "./axiosPublic";

export const getPrivateMedicoDashboard = () => axiosPublic.get("/estado-citas/");
