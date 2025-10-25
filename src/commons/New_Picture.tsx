interface PictureProps {
  src?: string;
  alt?: string;
  size?: "sm" | "md" | "lg";
  variant?: "circle" | "rounded";
  className?: string;
  onClick?: () => void;
}

export default function Picture({
  src,
  alt = "Avatar",
  size = "md",
  variant = "circle",
  className = "",
  onClick,
}: PictureProps) {
  const sizeClasses: Record<string, string> = {
    sm: "w-8 h-8",
    md: "w-12 h-12",
    lg: "w-16 h-16",
  };

  const variantClasses: Record<string, string> = {
    circle: "rounded-full",
    rounded: "rounded-lg",
  };

  const baseStyle = `
    object-cover
    transition-all duration-200
    hover:scale-105
    shadow-md
    cursor-pointer
  `;

  return (
    <img
      src={src || alt}
      alt={alt}
      onClick={onClick}
      className={`
        ${baseStyle}
        ${sizeClasses[size]}
        ${variantClasses[variant]}
        ${className}
      `}
    />
  );
}
