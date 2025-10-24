'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import userService from '@/services/userService';

export default function EditAccountPage() {
    const router = useRouter();
    const [form, setForm] = useState({
        _id: '',
        name: '',
        email: '',
        password: '',
        mssv: '',
        gender: 'nam',
        role: 'user',
        dateOfBirth: '',
        address: '',
    });
    const [loading, setLoading] = useState(false);

    // Lấy account từ localStorage khi component mount
    useEffect(() => {
        const savedAccount = localStorage.getItem('editAccount');
        if (savedAccount) {
            const account = JSON.parse(savedAccount);

            // Chuyển dateOfBirth về "yyyy-MM-dd"
            const dateValue = account.dateOfBirth
                ? new Date(account.dateOfBirth).toISOString().split('T')[0]
                : '';

            setForm({
                ...form,
                ...account,
                password: '', // không show mật khẩu cũ
                dateOfBirth: dateValue,
            });
        } else {
            alert('Không tìm thấy tài khoản để chỉnh sửa!');
            router.push('/admin/accounts');
        }
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            // Chỉ gửi những trường cần thiết
            const { _id, name, email, password, mssv, gender, role, dateOfBirth, address } = form;

            const updateData: any = { name, email, mssv, gender, role, dateOfBirth, address };

            // Chỉ thêm password nếu người dùng nhập
            if (password) {
                updateData.password = password;
            }

            console.log('Cập nhật tài khoản với dữ liệu:', updateData);
            const response = await userService.updateProfile(_id, updateData);

            alert('Cập nhật tài khoản thành công!');
            localStorage.removeItem('editAccount'); // xóa dữ liệu tạm
            router.push('/admin/accounts');
        } catch (error: any) {
            console.error('Lỗi khi cập nhật tài khoản:', error);
            alert('Không thể cập nhật tài khoản. Vui lòng thử lại.');
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className="min-h-screen bg-gray-100 py-6">
            <div className="max-w-lg mx-auto bg-white p-6 rounded-xl shadow-md">
                <h1 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
                    Chỉnh sửa tài khoản
                </h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        name="name"
                        type="text"
                        placeholder="Họ tên"
                        value={form.name}
                        onChange={handleChange}
                        required
                        className="w-full border border-gray-300 rounded-lg p-2"
                    />
                    <input
                        name="email"
                        type="email"
                        placeholder="Email"
                        value={form.email}
                        onChange={handleChange}
                        required
                        className="w-full border border-gray-300 rounded-lg p-2"
                    />
                    <input
                        name="password"
                        type="password"
                        placeholder="Mật khẩu mới (để trống nếu không đổi)"
                        value={form.password}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-lg p-2"
                    />
                    <input
                        name="mssv"
                        type="text"
                        placeholder="MSSV"
                        value={form.mssv}
                        onChange={handleChange}
                        required
                        className="w-full border border-gray-300 rounded-lg p-2"
                    />
                    <input
                        name="address"
                        type="text"
                        placeholder="Địa chỉ"
                        value={form.address}
                        onChange={handleChange}
                        required
                        className="w-full border border-gray-300 rounded-lg p-2"
                    />
                    <div className="flex gap-4">
                        <select
                            name="gender"
                            value={form.gender}
                            onChange={handleChange}
                            className="w-1/2 border border-gray-300 rounded-lg p-2"
                        >
                            <option value="nam">Nam</option>
                            <option value="nữ">Nữ</option>
                            <option value="khác">Khác</option>
                        </select>
                        <select
                            name="role"
                            value={form.role}
                            onChange={handleChange}
                            className="w-1/2 border border-gray-300 rounded-lg p-2"
                        >
                            <option value="user">User</option>
                            <option value="admin">Admin</option>
                        </select>
                    </div>
                    <input
                        name="dateOfBirth"
                        type="date"
                        value={form.dateOfBirth}
                        onChange={handleChange}
                        required
                        className="w-full border border-gray-300 rounded-lg p-2"
                    />

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
                    >
                        {loading ? 'Đang cập nhật...' : 'Cập nhật tài khoản'}
                    </button>
                    <button
                        type="button"
                        onClick={() => router.push('/admin/accounts')}
                        className="w-full bg-gray-200 text-gray-800 py-2 rounded-lg hover:bg-gray-300 transition"
                    >
                        Quay lại
                    </button>
                </form>
            </div>
        </div>
    );
}
