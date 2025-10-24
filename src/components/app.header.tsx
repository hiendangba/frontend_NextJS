'use client';
import Link from 'next/link';

const AppHeader = () => {
    return (
        <header className="bg-white shadow-md w-full">
            <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className="flex-shrink-0">
                        <Link
                            href="/"
                            className="text-xl font-bold text-gray-800 hover:text-gray-600 transition-colors"
                        >
                            Dashboard
                        </Link>
                    </div>

                    <div className="hidden sm:flex sm:space-x-6">
                        <Link
                            href="/admin/accounts"
                            className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 hover:border-b-2 hover:border-blue-500 transition-all"
                        >
                            Quản lý tài khoản
                        </Link>
                        <Link
                            href="/admin/posts"
                            className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 hover:border-b-2 hover:border-blue-500 transition-all"
                        >
                            Quản lý bài đăng
                        </Link>
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default AppHeader;
