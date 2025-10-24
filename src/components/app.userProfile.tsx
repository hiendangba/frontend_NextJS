"use client";
import { useState, useEffect } from "react";
import { useGetUserById } from "@/hooks/useUser";
import userService from "@/services/userService";

interface UserProfileProps {
    id: string;
}

export default function UserProfile({ id }: UserProfileProps) {
    const { data: userData, error: userError, isLoading: userLoading } = useGetUserById(id);
    const user = userData?.data;

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        mssv: "",
        gender: "",
        dateOfBirth: "",
        address: "",
    });

    useEffect(() => {
        if (user) {
            setFormData({
                name: user.name || "",
                email: user.email || "",
                mssv: user.mssv || "",
                gender: user.gender || "",
                dateOfBirth: user.dateOfBirth
                    ? new Date(user.dateOfBirth).toISOString().split("T")[0]
                    : "",
                address: user.address || "",
            });
        }
    }, [user]);

    if (userLoading) return <p className="text-center mt-10 text-gray-600">Đang tải thông tin người dùng...</p>;
    if (userError) return <p className="text-center mt-10 text-red-600">Lỗi khi tải thông tin</p>;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSave = async () => {
        const payload = {
            ...formData,
            dateOfBirth: formData.dateOfBirth
                ? new Date(formData.dateOfBirth).toISOString()
                : null,
        };
        const response = await userService.updateProfile(id, payload);
        if (response.status === 200)
            alert("Cập nhật thông tin thành công");
        else
            alert("Cập nhật thông tin thất bại");
    };

    return (
        <div className="max-w-lg mx-auto mt-16 bg-gradient-to-br from-blue-50 to-indigo-100 shadow-xl rounded-3xl p-8 border border-blue-200">
            <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-800">{formData.name}</h2>
                <p className="text-sm text-gray-500">{user?.role}</p>
            </div>

            <div className="space-y-5 bg-white rounded-2xl shadow-inner p-6">
                <EditableField label="Họ tên" name="name" value={formData.name} onChange={handleChange} />
                <EditableField label="Email" name="email" value={formData.email} onChange={handleChange} />
                <EditableField label="Mã số sinh viên" name="mssv" value={formData.mssv} onChange={handleChange} />

                <div>
                    <label className="block text-sm text-gray-500 mb-1">Giới tính</label>
                    <select
                        name="gender"
                        value={formData.gender}
                        onChange={handleChange}
                        className="w-full border border-gray-200 rounded-lg px-4 py-2 bg-gray-50 text-gray-700 font-medium focus:outline-none"
                    >
                        <option value="">-- Chọn giới tính --</option>
                        <option value="nam">Nam</option>
                        <option value="nữ">Nữ</option>
                        <option value="khác">Khác</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm text-gray-500 mb-1">Ngày sinh</label>
                    <input
                        type="date"
                        name="dateOfBirth"
                        value={formData.dateOfBirth}
                        onChange={handleChange}
                        className="w-full border border-gray-200 rounded-lg px-4 py-2 bg-gray-50 text-gray-700 font-medium focus:outline-none"
                    />
                </div>

                <EditableField label="Địa chỉ" name="address" value={formData.address} onChange={handleChange} />
            </div>

            <button
                onClick={handleSave}
                className="w-full mt-6 bg-blue-600 text-white py-2 rounded-xl font-semibold hover:bg-blue-700 transition"
            >
                Lưu thay đổi
            </button>
        </div>
    );
}

function EditableField({
    label,
    name,
    value,
    onChange,
}: {
    label: string;
    name: string;
    value?: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
    return (
        <div>
            <label className="block text-sm text-gray-500 mb-1">{label}</label>
            <input
                type="text"
                name={name}
                value={value || ""}
                onChange={onChange}
                className="w-full border border-gray-200 rounded-lg px-4 py-2 bg-gray-50 text-gray-700 font-medium focus:outline-none"
            />
        </div>
    );
}
