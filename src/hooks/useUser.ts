"use client";
import useSWR from "swr";
import postService from "@/services/postService";

const fetchAllPosts = () => postService.getPost().then(res => res.data);
const fetchPostsByUser = (id: string) => postService.getPostUserId(id).then(res => res.data);

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