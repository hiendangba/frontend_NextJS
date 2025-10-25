"use client";

import Picture from "../../../../commons/New_Picture";
import AltAvatar from "@/assets/alt_avatar.png";

interface CommentItemProps {
  comment: any;
  depth?: number;
  onOpenViewer?: (images: string[], index: number) => void;
}

export default function CommentItemViewer({
  comment,
  depth = 0,
  onOpenViewer,
}: CommentItemProps) {
  const isNested = depth > 0;

  return (
    <div className={`mb-4 ${isNested ? "ml-4" : ""}`}>
      <div className="flex gap-3">
        <Picture
          src={
            comment.user?.avatarUrl ||
            comment.user?.avatar ||
            AltAvatar.src
          }
          size="sm"
          variant="circle"
          className="w-10 h-10 flex-shrink-0"
        />

        <div className="flex-1">
          <div
            className={`rounded-lg p-3 ${isNested
                ? "bg-gray-50 border-l-2 border-blue-200"
                : "bg-gray-100"
              }`}
          >
            <p className="font-medium text-sm">{comment.user?.name}</p>
            <p className="text-sm mt-1">{comment.content}</p>

            {/* Images */}
            {comment.images?.length > 0 && (
              <div className="mt-2 grid grid-cols-2 gap-2">
                {comment.images.slice(0, 4).map((src: string, idx: number) => (
                  <div
                    key={idx}
                    className="relative overflow-hidden rounded-lg border cursor-pointer"
                    onClick={() =>
                      onOpenViewer?.(comment.images, idx)
                    }
                  >
                    <img
                      src={src}
                      className="w-full h-24 object-cover"
                      alt=""
                    />
                    {idx === 3 && comment.images.length > 4 && (
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                        <span className="text-white text-sm font-semibold">
                          +{comment.images.length - 4}
                        </span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Created Time */}
          <p className="text-xs text-gray-500 mt-2">
            {new Date(comment.createdAt).toLocaleString()}
          </p>

          {/* Recursive Child Comments */}
          {comment.childs?.length > 0 && (
            <div className="mt-3 space-y-3">
              {comment.childs.map((child: any) => (
                <CommentItemViewer
                  key={child.id}
                  comment={child}
                  depth={depth + 1}
                  onOpenViewer={onOpenViewer}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
