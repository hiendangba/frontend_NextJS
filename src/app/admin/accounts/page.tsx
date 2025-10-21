'use client';
const AccountManagementPage = () => {
    // Dữ liệu mẫu
    const accounts = [
        { id: 1, username: 'admin', email: 'admin@example.com', role: 'Quản trị viên', status: 'Hoạt động' },
        { id: 2, username: 'nhanvien1', email: 'staff1@example.com', role: 'Nhân viên', status: 'Khóa' },
        { id: 3, username: 'khachhang', email: 'customer@example.com', role: 'Khách hàng', status: 'Hoạt động' },
    ];

    return (
        <div className="min-h-screen bg-gray-100 py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-white shadow-sm rounded-lg p-6">
                    <h1 className="text-2xl font-semibold text-gray-900 mb-6">
                        Quản lý tài khoản
                    </h1>

                    {/* Bảng quản lý tài khoản */}
                    <div className="overflow-x-auto">
                        <table className="min-w-full border border-gray-200 divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Tên đăng nhập
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Email
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Vai trò
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Trạng thái
                                    </th>
                                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Hành động
                                    </th>
                                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Hành động
                                    </th>
                                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Hành động
                                    </th>
                                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Hành động
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {accounts.map((account) => (
                                    <tr key={account.id}>
                                        <td className="px-6 py-4 text-sm text-gray-900">{account.username}</td>
                                        <td className="px-6 py-4 text-sm text-gray-900">{account.email}</td>
                                        <td className="px-6 py-4 text-sm text-gray-900">{account.role}</td>
                                        <td
                                            className={`px-6 py-4 text-sm font-semibold ${account.status === 'Hoạt động'
                                                ? 'text-green-600'
                                                : 'text-red-600'
                                                }`}
                                        >
                                            {account.status}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-center space-x-2">
                                            <button className="text-blue-600 hover:text-blue-800 font-medium">
                                                Sửa
                                            </button>
                                            <button className="text-red-600 hover:text-red-800 font-medium">
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
