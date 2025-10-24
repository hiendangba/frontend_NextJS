'use client';
import { useSearchParams } from 'next/navigation';
import { usePostsByUser } from '@/hooks/useUser'
const PostDetailPage = () => {
    const searchParams = useSearchParams();
    const userId = searchParams.get('userId');
    const { data, error, isLoading } = usePostsByUser(userId);
    console.log(data);
    return <div>Chi tiết bài viết của user: {userId}</div>;
};

export default PostDetailPage;
