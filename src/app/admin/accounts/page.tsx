'use client';
import { useGetUser } from '@/hooks/useUser'
import userService from '@/services/userService';
import { useRouter } from "next/navigation";

const AccountManagementPage = () => {
    const router = useRouter();
    const { data, error, isLoading } = useGetUser();

    if (isLoading) return <p>Đang tải...</p>;
    if (error) return <p>Có lỗi xảy ra</p>;
    // Dữ liệu mẫu
    const response = data.data.users;
    const myId = localStorage.getItem("userId");
    const accounts = response.filter((user: any) => user._id !== myId);
    const handleDelete = async (id: string, name: string) => {
        const confirmDelete = confirm(`Bạn có chắc muốn xóa tài khoản "${name}" không?`);
        if (!confirmDelete) return;

        try {
            await userService.deleteUserById(id);
            alert("Xóa tài khoản thành công!");
            accounts.filter((account: any) => account._id !== id);
        } catch (error: any) {
            console.error("Lỗi khi xóa người dùng:", error);
            alert("Không thể xóa tài khoản. Vui lòng thử lại.");
        }
    };
    return (
        <div className="min-h-screen bg-gray-100 py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-white shadow-sm rounded-lg p-6">
                    <h1 className="text-2xl font-semibold text-gray-900 mb-6">
                        Quản lý tài khoản
                    </h1>
                    <button
                        onClick={() => router.push("/admin/accounts/create")}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                    >
                        + Tạo tài khoản
                    </button>
                    <div className="overflow-x-auto">
                        <table className="min-w-full border border-gray-200 divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Tên
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Email
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        MSSV
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Giới tính
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Vai trò
                                    </th>
                                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Sửa thông tin
                                    </th>
                                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Xóa thông tin
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {Array.isArray(accounts) && accounts.map((account) => (
                                    <tr
                                        key={account._id}
                                        className="transition-all duration-200 hover:bg-gray-50 border-b border-gray-200"
                                    >
                                        <td className="px-6 py-4 text-sm text-gray-900 font-medium">{account.name}</td>
                                        <td className="px-6 py-4 text-sm text-gray-700">{account.email}</td>
                                        <td className="px-6 py-4 text-sm text-gray-700">{account.mssv}</td>
                                        <td className="px-6 py-4 text-sm text-gray-700">{account.gender}</td>

                                        <td className="px-6 py-4 text-sm">
                                            <span
                                                className={`px-3 py-1 rounded-full text-xs font-semibold ${account.role === "Admin"
                                                    ? "bg-blue-100 text-blue-700"
                                                    : "bg-green-100 text-green-700"
                                                    }`}
                                            >
                                                {account.role}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-center">
                                            <button
                                                onClick={() => {
                                                    localStorage.setItem('editAccount', JSON.stringify(account));
                                                    router.push('/admin/accounts/edit');
                                                }}
                                                className="px-3 py-1 rounded-lg bg-yellow-100 text-yellow-700 hover:bg-yellow-200 hover:scale-105 transition-transform duration-150 font-medium"
                                            >
                                                Sửa
                                            </button>
                                        </td>

                                        <td className="px-6 py-4 text-sm text-center">
                                            <button
                                                onClick={() => handleDelete(account._id, account.name)}
                                                className="px-3 py-1 rounded-lg bg-red-100 text-red-700 hover:bg-red-200 hover:scale-105 transition-transform duration-150 font-medium"
                                            >
                                                Xóa
                                            </button>
                                        </td>
                                    </tr>

                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AccountManagementPage;
