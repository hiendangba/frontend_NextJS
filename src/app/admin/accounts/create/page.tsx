'use client';
import { useState } from "react";
import { useRouter } from "next/navigation";
import userService from "@/services/userService";

export default function CreateAccountPage() {
    const router = useRouter();
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        mssv: "",
        gender: "nam",
        role: "user",
        dateOfBirth: "",
        address: "", // thêm trường address
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await userService.createUser(form);
            console.log(response)
            setLoading(true);
            alert("Tạo tài khoản thành công!");
        } catch (error: any) {
            alert("Không thể tạo tài khoản. Vui lòng thử lại.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 py-6">
            <div className="max-w-lg mx-auto bg-white p-6 rounded-xl shadow-md">
                <h1 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
                    Tạo tài khoản mới
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
                        placeholder="Mật khẩu"
                        value={form.password}
                        onChange={handleChange}
                        required
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
                            <option value="khác">Khác</option>

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
                        {loading ? "Đang tạo..." : "Tạo tài khoản"}
                    </button>
                    <button
                        type="button"
                        onClick={() => router.push("/admin/accounts")}
                        className="w-full bg-gray-200 text-gray-800 py-2 rounded-lg hover:bg-gray-300 transition"
                    >
                        Quay lại
                    </button>
                </form>
            </div>
        </div>
    );
}
