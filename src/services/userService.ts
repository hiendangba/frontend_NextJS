import axiosClient from "@/lib/axiosClient";

const userService = {
    getUsers: () => axiosClient.get(`/admins/users`),
    getUserById: (id: string) => axiosClient.get(`/admins/users/${id}`),
    updateProfile: (id: string, data: any) => axiosClient.put(`/admins/users/${id}`, data),
    deleteUserById: (id: string) => axiosClient.delete(`/admins/users/${id}`),
    createUser: (data: any) => axiosClient.post(`/admins/users/`, data),
};

export default userService;
