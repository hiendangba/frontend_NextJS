import axiosClient from "@/lib/axiosClient";

const postService = {
    getPost: () => axiosClient.get(`/admins/home`),
    getPostUserId: (id: string, page = 1, limit = 10) =>
        axiosClient.get(`/admins/detail`, { params: { userId: id, page, limit } }),
};

export default postService;
