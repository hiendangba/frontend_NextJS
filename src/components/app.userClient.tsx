"use client";
import { useAuthToken } from "@/hooks/useAuthToken";
import { useGetUserById } from "@/hooks/useUser";
import UserProfile from "@/components/app.userProfile";
interface UserClientProps {
    id: string;
}

export default function UserClient({ id }: UserClientProps) {
    const { data: tokenData, error: tokenError, isLoading: tokenLoading } = useAuthToken(id);
    if (tokenLoading) return <p className="text-center mt-10 text-gray-600">Đang tải...</p>;
    if (tokenError) return <p className="text-center mt-10 text-red-600">Có lỗi xảy ra</p>;
    if (tokenData?.statusCode !== 200)
        return <p className="text-center mt-10 text-red-600">Có lỗi xảy ra {tokenData.message}</p>;
    localStorage.setItem("accessToken", tokenData.data.access_token);
    localStorage.setItem("userId", id);
    return <UserProfile id= {id} />;
}