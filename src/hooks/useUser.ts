"use client";
import useSWR from "swr";
import postService from "@/services/postService";
import userService from "@/services/userService";
const fetchAllPosts = () => postService.getPost().then(res => res.data);
const fetchPostsByUser = (id: string) => postService.getPostUserId(id).then(res => res.data);
const fetchAllUsers = () => userService.getUsers().then(res => res.data);
const fetchUserById = (id: string) => userService.getUserById(id).then(res => res.data)

export function useAllPosts() {
    const { data, error, isLoading } = useSWR(
        "allPosts",
        fetchAllPosts,
        {
            revalidateIfStale: false,
            revalidateOnFocus: false,
            revalidateOnReconnect: false
        }
    );

    return { data, isLoading, error };
}


export function usePostsByUser(id: string | null) {
    const { data, error, isLoading } = useSWR(
        id ? ["postsByUser", id] : null,
        () => fetchPostsByUser(id!),
        {
            revalidateIfStale: false,
            revalidateOnFocus: false,
            revalidateOnReconnect: false
        }
    );

    return { data, isLoading, error };
}


export function useGetUser() {
    const { data, error, isLoading } = useSWR(
        "users",
        () => fetchAllUsers(),
        {
            revalidateIfStale: false,
            revalidateOnFocus: false,
            revalidateOnReconnect: false
        }
    );
    return { data, isLoading, error };
}


export function useGetUserById(id: string) {
    const { data, error, isLoading } = useSWR(
        "id",
        () => fetchUserById(id),
        {
            revalidateIfStale: false,
            revalidateOnFocus: false,
            revalidateOnReconnect: false
        }
    );
    return { data, isLoading, error };
}