
"use client";
import useSWR from "swr";
import authService from "@/services/authService";
import { useState, useEffect } from "react";

const fetcher = (id: string) => authService.getTokenById(id).then((res) => res.data);

export function useAuthToken(id: string) {
    const { data, error, isLoading, mutate } = useSWR(
        id ? ["authToken", id] : null, // key = unique identifier
        () => fetcher(id),
        {
            revalidateIfStale: false,
            revalidateOnFocus: false,
            revalidateOnReconnect: false
        }
    );
    return {
        data,
        isLoading,
        error,
        mutate,
    };
}
