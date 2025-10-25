'use client';

import Image from "next/image";
import { X, ThumbsUp, Share2 } from "lucide-react";
import AltAvatar from "../../../../assets/alt_avatar.png";

export default function LikeModal({
    show,
    selectedPost,
    handleClose,
    type
}: {
    show: boolean;
    selectedPost: any;
    handleClose: () => void;
    type: "like" | "share";
}) {

    if (!show || !selectedPost) return null;

    const items = type === "like"
        ? selectedPost.likes
        : selectedPost.shareUsers;

    const emptyText = type === "like"
        ? "Chưa có ai thích bài viết này"
        : "Chưa có ai chia sẻ bài viết này";

    const title = type === "like"
        ? "Người đã thích"
        : "Người đã chia sẻ";

    const icon = type === "like"
        ? (<ThumbsUp className="w-3 h-3 text-white fill-white" />)
        : (<Share2 className="w-3 h-3 text-white" />);

    return (
        <div
            className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50"
            onClick={handleClose}
        >
            <div
                className="bg-white rounded-lg w-full max-w-md max-h-[80vh] overflow-hidden"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b">
                    <h2 className="text-lg font-semibold">{title}</h2>
                    <button onClick={handleClose} className="p-1 hover:bg-gray-100 rounded-full">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* User List */}
                <div className="max-h-96 overflow-y-auto">
                    {items?.length > 0 ? (
                        items.map((item: any) => (
                            <div key={item.user.id} className="flex items-center justify-between p-4 hover:bg-gray-50">
                                <div className="flex items-center gap-3">
                                    <Image
                                        src={item.user.avatarUrl ?? AltAvatar}
                                        alt="avatar"
                                        width={48}
                                        height={48}
                                        className="rounded-full w-12 h-12 object-cover"
                                    />

                                    <span className="font-medium">{item.user.name}</span>
                                </div>

                                <div className="bg-blue-600 w-6 h-6 rounded-full flex items-center justify-center">
                                    {icon}
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="p-8 text-center text-gray-500">
                            {type === "like"
                                ? <ThumbsUp className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                                : <Share2 className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                            }
                            <p>{emptyText}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
