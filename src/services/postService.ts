import axiosClient from "@/lib/axiosClient";

const authService = {
    getPost: () => axiosClient.get(`/post/getPost`),
    getPostUserId: (id: string) => axiosClient.get(`/post/getPost/${id}`),
};

export default authService;
