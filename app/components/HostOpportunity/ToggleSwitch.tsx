import React, { useState } from "react";

// Reusable Toggle Switch Component
export default function ToggleSwitch({
  label,
  description,
  initialState = false,
  onChange,
  className = "",
}: {
  label: string;
  description?: string;
  initialState?: boolean;
  onChange: (checked: boolean) => void;
  className?: string;
}) {
  const [isChecked, setIsChecked] = useState(initialState);

  const handleToggle = () => {
    setIsChecked(!isChecked);
    onChange(!isChecked);
  };

  return (
    <div className={`flex items-center justify-between my-6 ${className}`}>
      <div className="flex flex-col gap-2">
        <span className="text-gray-800 font-medium">{label}</span>
        {description && (
          <p className="text-[#5D5D5D] text-sm sm:text-lg mt-1">
            {description}
          </p>
        )}
      </div>
      <label
        htmlFor={`toggle-${label.replace(/\s/g, "-")}`}
        className="relative inline-flex items-center cursor-pointer"
      >
        <input
          type="checkbox"
          id={`toggle-${label.replace(/\s/g, "-")}`}
          className="sr-only peer"
          checked={isChecked}
          onChange={handleToggle}
        />
        <div
          className="
          w-11 md:w-12 h-6 md:h-7 
          bg-black 
          rounded-full 
        
          dark:peer-focus:ring-blue-800 
          peer-checked:bg-blue-600 
          relative
          after:content-[''] after:absolute after:top-0.5 after:left-[2px]
          after:bg-white after:border-gray-300 after:border
          after:rounded-full after:h-5 after:md:h-6 after:w-5 after:md:w-6 after:transition-all peer-checked:after:translate-x-full
          md:peer-checked:after:translate-x-[85%] peer-checked:after:border-white
          dark:border-gray-600
        "
        ></div>
      </label>
    </div>
  );
}
