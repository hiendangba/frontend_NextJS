import axiosClient from "@/lib/axiosClient";

const authService = {
    getTokenById: (id: string) => axiosClient.post(`/auth/getToken`, { id }),
};

export default authService;
