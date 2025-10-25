import axiosClient from "@/lib/axiosClient";

const authService = {
    getTokenById: (userId: string) => axiosClient.post(`/auth/getToken`, {  userId }),
};

export default authService;
