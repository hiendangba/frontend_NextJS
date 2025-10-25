"use client";

import { X, MessageCircle } from "lucide-react";
import CommentItemViewer from "./CommentItem";

interface CommentModalViewerProps {
  show: boolean;
  post: any;
  onClose: () => void;
  onOpenViewer?: (images: string[], index: number) => void;
}

export default function CommentModalViewer({
  show,
  post,
  onClose,
  onOpenViewer,
}: CommentModalViewerProps) {

  if (!show || !post) return null;

  const comments = post.commentUsers || [];

  return (
    <div
      className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-[9999]"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-hidden shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold">Bình luận</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-full"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="max-h-[70vh] overflow-y-auto p-4">
          {comments.length > 0 ? (
            comments.map((comment: any) => (
              <CommentItemViewer
                key={comment.id}
                comment={comment}
                onOpenViewer={onOpenViewer}
              />
            ))
          ) : (
            <div className="text-center text-gray-500 py-8">
              <MessageCircle className="w-12 h-12 mx-auto mb-3 text-gray-300" />
              <p>Chưa có bình luận nào</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
