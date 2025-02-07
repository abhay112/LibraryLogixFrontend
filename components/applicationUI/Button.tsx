import { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn"
import { Loader2 } from "lucide-react"; // Loader icon

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  variant?: "primary" | "secondary" | "danger" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  className?: string;
  children: ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  isLoading = false,
  variant = "primary",
  size = "md",
  className = "",
  children,
  disabled,
  ...props
}) => {
  // Variants for styling
  const variantClasses = {
    primary: "bg-blue-600 hover:bg-blue-700 text-white",
    secondary: "bg-gray-600 hover:bg-gray-700 text-white",
    danger: "bg-red-600 hover:bg-red-700 text-white",
    outline: "border border-gray-300 hover:bg-gray-100 text-black",
    ghost: "text-gray-700 hover:bg-gray-100",
  };

  // Size configurations
  const sizeClasses = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-5 py-2.5 text-lg",
  };

  return (
    <button
      className={cn(
        "flex items-center justify-center rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring",
        variantClasses[variant],
        sizeClasses[size],
        isLoading || disabled ? "opacity-50 cursor-not-allowed" : "",
        className
      )}
      disabled={isLoading || disabled}
      {...props}
    >
      {isLoading && <Loader2 className="w-5 h-5 animate-spin mr-2" />}
      {children}
    </button>
  );
};

export default Button;
