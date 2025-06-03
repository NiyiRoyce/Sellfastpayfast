import React from "react";

interface AppButtonProps {
  icon?: React.ElementType;
  label?: string;
  placeholder?: string;
  variant?: string;
  href?: string;
  className?: string; // ✅ Add this line
}

export const AppButton: React.FC<AppButtonProps> = ({
  icon,
  label,
  placeholder,
  variant = "primary",
  href,
  className = "", // ✅ Default to empty string
}) => {
  const Icon = icon;

  return (
    <a href={href}>
      <div
        className={`${
          variant === "primary" ? "bg-black" : "bg-white"
        } rounded-[16px] xl:px-[1rem] px-[0.8rem] xl:py-[1.125rem] py-[1rem] flex items-center justify-center cursor-pointer shadow-md ${className}`}
      >
        <div className="flex items-center">
          {Icon && (
            <Icon
              className={`${
                variant === "primary" ? "text-white" : "text-white"
              } md:text-[2.5rem] text-[1.3rem]`}
            />
          )}
          <div className="ml-3">
            <h3
              className={`${
                variant === "primary" ? "text-white" : "text-white"
              } opacity-70 xl:text-[0.813rem] text-[11px] font-medium font-outfit`}
            >
              {label}
            </h3>
            <p
              className={`${
                variant === "primary" ? "text-white" : "text-white"
              } font-times font-semibold xl:text-[1.125rem] text-sm leading-[1.25rem]`}
            >
              {placeholder}
            </p>
          </div>
        </div>
      </div>
    </a>
  );
};
