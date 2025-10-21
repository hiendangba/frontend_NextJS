"use client";
import { useAuthToken } from "@/hooks/useAuthToken";

interface UserClientProps {
    id: string;
}

export default function UserClient({ id }: UserClientProps) {
    const { data, error, isLoading } = useAuthToken(id);

    if (isLoading) return <p>Đang tải...</p>;
    if (error) return <p>Có lỗi xảy ra</p>;
    console.log(data);
    return <div>Xin chào {data?.name}</div>;
}
