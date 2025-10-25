'use client';

import { ThumbsUp, MessageCircle, Share2 } from "lucide-react";
import Image from "next/image";
import AltAvatar from "../../../../assets/alt_avatar.png"; // bạn import lại đúng path của bạn

interface PostItemProps {
    post: any;
    onOpenLike: (post: any, modalType: "like" | "share") => void;
    onOpenComment: (post: any) => void;
}

export default function PostItem({ post, onOpenLike, onOpenComment }: PostItemProps) {
    return (
        <div className="bg-white p-4 rounded-2xl shadow-sm">
            {/* Header */}
            <div className="flex items-center gap-3 mb-3">
                <Image
                    src={post.user?.avatarUrl ?? AltAvatar}
                    alt="avatar"
                    width={40}
                    height={40}
                    className="rounded-full w-10 h-10 object-cover"
                />
                <div>
                    <p className="font-semibold">{post.user?.name}</p>
                    <p className="text-gray-400 text-xs">
                        {new Date(post.createdAt).toLocaleString()}
                    </p>
                </div>
            </div>

            {/* Content */}
            <p className="text-[15px] leading-relaxed">{post.content}</p>

            {/* Share root post */}
            {post.rootPost && (
                <div className="mt-3 border rounded-lg bg-gray-50 p-3">
                    <div className="flex items-center gap-3 mb-2">
                        <Image
                            src={post.rootPost.user?.avatarUrl ?? AltAvatar}
                            alt="avatar"
                            width={32}
                            height={32}
                            className="rounded-full w-8 h-8 object-cover"
                        />
                        <div>
                            <p className="font-semibold text-sm">
                                {post.rootPost.user?.name}
                            </p>
                            <p className="text-gray-400 text-xs">
                                {new Date(post.rootPost.createdAt).toLocaleString()}
                            </p>
                        </div>
                    </div>

                    <p className="text-[14px] text-gray-700">
                        {post.rootPost.content}
                    </p>

                    {post.rootPost.images?.length > 0 && (
                        <div className="mt-2 grid grid-cols-2 gap-2">
                            {post.rootPost.images.slice(0, 2).map((src: string, idx: number) => (
                                <div
                                    key={idx}
                                    className="relative overflow-hidden rounded-lg border"
                                >
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img src={src} className="w-full h-40 object-cover" />
                                    {idx === 1 && post.rootPost.images.length > 2 && (
                                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                                            <span className="text-white text-sm font-semibold">
                                                +{post.rootPost.images.length - 2}
                                            </span>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}

            {/* Images */}
            {post.images?.length > 0 && (
                <div className="mt-3 grid grid-cols-2 gap-2">
                    {post.images.slice(0, 4).map((src: string, idx: number) => (
                        <div key={idx} className="relative overflow-hidden rounded-lg border">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={src} className="w-full h-60 object-cover" />
                            {idx === 3 && post.images.length > 4 && (
                                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                                    <span className="text-white text-2xl font-semibold">
                                        +{post.images.length - 4}
                                    </span>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}

            {/* Interaction counts */}
            <div className="mt-3 pt-3 flex items-center justify-between text-sm text-gray-600">
                <div className="flex items-center gap-4">
                    {post.likeCount > 0 && (
                        <button
                            onClick={() => onOpenLike(post, "like")}
                            className="inline-flex items-center gap-1 hover:text-blue-600"
                        >
                            <ThumbsUp className="w-4 h-4" />
                            <span>{post.likeCount}</span>
                        </button>
                    )}

                    {post.commentCount > 0 && (
                        <button
                            onClick={() => onOpenComment(post)}
                            className="inline-flex items-center gap-1 hover:text-green-600"
                        >
                            <MessageCircle className="w-4 h-4" />
                            <span>{post.commentCount} bình luận</span>
                        </button>
                    )}
                </div>

                {post.shareCount > 0 && (
                    <button
                        onClick={() => onOpenLike(post, "share")}
                        className="hover:text-blue-600"
                    >
                        {post.shareCount} lượt chia sẻ
                    </button>
                )}
            </div>


        </div>
    );
}
