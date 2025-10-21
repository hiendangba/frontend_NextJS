'use client';
import { useSearchParams } from 'next/navigation';

const PostDetailPage = () => {
    const searchParams = useSearchParams();
    const userId = searchParams.get('userId');
    return <div>Chi tiết bài viết của user: {userId}</div>;
};

export default PostDetailPage;
