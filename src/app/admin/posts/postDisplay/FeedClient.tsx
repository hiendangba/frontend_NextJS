'use client';

import { useState } from 'react';
import { usePostsByUser } from '@/hooks/useUser';
import PostItem from './postItem';
import LikeModal from './LikeModal';
import CommentModalViewer from './CommentModal';

export default function FeedClient({ userId }: { userId: string }) {
    const { data, isLoading, error } = usePostsByUser(userId);
    const [selectedPost, setSelectedPost] = useState<any>(null);
    const [showLikeModal, setShowLikeModal] = useState(false);
    const [type, setType] = useState<"like" | "share">("like");

    const [showCommentModal, setShowCommentModal] = useState(false);
    const [selectedCommentPost, setSelectedCommentPost] = useState<any>(null);

    const handleOpenCommentModal = (post: any) => {
        setSelectedCommentPost(post);
        setShowCommentModal(true);
    };


    const handleOpenLikeModal = (post: any, modalType: "like" | "share") => {
        setSelectedPost(post);
        setType(modalType);
        setShowLikeModal(true);
    };

    const handleCloseLikeModal = () => {
        setShowLikeModal(false);
        setSelectedPost(null);
    };

    if (isLoading) return <p>Đang tải dữ liệu...</p>;
    if (error) return <p className="text-red-500">Có lỗi khi tải bài viết</p>;

    const posts = data?.data?.listPost || [];

    return (
        <div className="flex flex-col gap-4 max-w-3xl mx-auto p-4">
            {posts.map((post: any) => (
                <PostItem key={post.id} post={post} onOpenLike={handleOpenLikeModal} onOpenComment={handleOpenCommentModal}/>
            ))}

            {showLikeModal && selectedPost && (
                <LikeModal
                    show={showLikeModal}
                    selectedPost={selectedPost}
                    handleClose={handleCloseLikeModal}
                    type={type}
                />
            )}

            <CommentModalViewer
                show={showCommentModal}
                post={selectedCommentPost}
                onClose={() => setShowCommentModal(false)}
                onOpenViewer={(images, index) => console.log("Open viewer", images, index)}
            />
        </div>
    );
}
