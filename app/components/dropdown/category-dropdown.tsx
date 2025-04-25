import { ChevronDown } from 'lucide-react';

interface CategoryDropdownProps {
  value: string;
  onChange: (value: string) => void;
  options: string[];
}

export const CategoryDropdown: React.FC<CategoryDropdownProps> = ({
  value,
  onChange,
  options,
}) => {
  return (
    <div className="relative w-full">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full appearance-none px-4 py-3 border border-blue-400 rounded-full text-gray-600 focus:outline-none"
      >
        <option value="" disabled>Select Category</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-700 pointer-events-none" />
    </div>
  );
};
