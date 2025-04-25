import React from 'react';

interface SwitchToggleProps {
  label: string;
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SwitchToggle: React.FC<SwitchToggleProps> = ({ label, checked, onChange }) => {
  return (
    <label className="inline-flex items-center space-x-2 cursor-pointer">
      <div className="relative">
        <input
          type="checkbox"
          className="sr-only peer"
          checked={checked}
          onChange={onChange}
        />
        <div className="w-10 h-6 bg-gray-300 rounded-full peer-checked:bg-blue-500 transition-colors"></div>
        <div className="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-md peer-checked:translate-x-[80%] transform transition-transform"></div>
      </div>
      <span className="text-sm text-gray-800">{label}</span>
    </label>
  );
};

export default SwitchToggle;
