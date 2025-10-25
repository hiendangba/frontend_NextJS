'use client';

import { useSearchParams } from 'next/navigation';
import FeedClient from '../postDisplay/FeedClient';

export default function PostDetailPage() {
    const searchParams = useSearchParams();
    const userId = searchParams.get('userId');

    if (!userId) {
        return <p className="text-red-500 p-4">Thiếu userId</p>;
    }

    return (
        <div>
            <h1 className="text-2xl font-semibold mb-4 text-center">
                Bài viết của user: {userId}
            </h1>
            <FeedClient userId={userId} />
        </div>
    );
}
