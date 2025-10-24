'use client';
import { useRouter } from 'next/navigation';
import { useAllPosts } from '@/hooks/useUser'
const PostManagementPage = () => {
    const { data, error, isLoading } = useAllPosts();

    const router = useRouter();

    const handleClick = (id: string) => {
        router.push(`/admin/posts/postdetail?userId=${id}`);
    }

    if (isLoading) return <p>Đang tải...</p>;
    if (error) return <p>Có lỗi xảy ra</p>;
    console.log(data.data)
    const response = data.data;
    const myId = localStorage.getItem("userId");
    console.log("id", myId)
    const usersStats = response.filter((user: any) => user.id !== myId);
    return (
        <div className="min-h-screen bg-gray-100 py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-white shadow-sm rounded-lg p-6">
                    <h1 className="text-2xl font-semibold text-gray-900 mb-6">
                        Quản lý bài đăng
                    </h1>

                    <div className="grid grid-cols-1 gap-6">
                        {Array.isArray(usersStats) && usersStats.map((user) => (
                            <div key={user.id} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-4">
                                <div className="bg-blue-100 p-4 rounded-lg text-center hover:bg-blue-200 transition">
                                    <p className="text-gray-700 font-medium">Tên</p>
                                    <p
                                        className="text-xl font-semibold text-gray-900 hover:underline cursor-pointer"
                                        onClick={() => handleClick(user.id)}
                                    >
                                        {user.name}
                                    </p>
                                </div>
                                <div className="bg-green-100 p-4 rounded-lg text-center">
                                    <p className="text-gray-700 font-medium">Tổng bài đăng</p>
                                    <p className="text-xl font-semibold text-gray-900">{user.totalPosts}</p>
                                </div>
                                <div className="bg-orange-100 p-4 rounded-lg text-center">
                                    <p className="text-gray-700 font-medium">Tổng lượt thích</p>
                                    <p className="text-xl font-semibold text-gray-900">{user.totalLikes}</p>
                                </div>
                                <div className="bg-yellow-100 p-4 rounded-lg text-center">
                                    <p className="text-gray-700 font-medium">Tổng lượt bình luận</p>
                                    <p className="text-xl font-semibold text-gray-900">{user.totalComments}</p>
                                </div>
                                <div className="bg-red-100 p-4 rounded-lg text-center">
                                    <p className="text-gray-700 font-medium">Tổng lượt chia sẻ</p>
                                    <p className="text-xl font-semibold text-gray-900">{user.totalShares}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PostManagementPage;
