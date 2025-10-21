import axiosClient from "@/lib/axiosClient";

const authService = {
    getTokenById: (id: string) => axiosClient.post(`/auth/createToken`, { id }),
};

export default authService;
