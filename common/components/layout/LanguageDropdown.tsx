import { MouseEvent } from "react";

type LocaleOption = {
  value: string;
  label: string;
};

interface LanguageDropdownProps {
  options: LocaleOption[];
  currentLocale: string;
  isOpen: boolean;
  onToggle: () => void;
  onSelect: (locale: string) => void;
  label: string;
  disabled: boolean;
}

export default function LanguageDropdown({
  options,
  currentLocale,
  isOpen,
  onToggle,
  onSelect,
  label,
  disabled,
}: LanguageDropdownProps) {
  const handleSelect = (e: MouseEvent<HTMLButtonElement>, locale: string) => {
    e.preventDefault();
    onSelect(locale);
    onToggle();
  };

  const currentOption = options.find((opt) => opt.value === currentLocale);

  return (
    <div className="relative">
      <button
        onClick={onToggle}
        disabled={disabled}
        className="bg-zinc-500 border px-3 py-1 rounded text-black cursor-pointer flex items-center"
        aria-label={label}
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        {currentOption?.label || "Select Language"}
        <svg
          className={`w-4 h-4 ml-2 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          ></path>
        </svg>
      </button>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-40 bg-zinc-500 rounded-md shadow-lg z-50">
          <ul className="py-1">
            {options.map(({ value, label }) => (
              <li key={value}>
                <button
                  onClick={(e) => handleSelect(e, value)}
                  disabled={disabled}
                  className="w-full text-left px-4 py-2 text-sm text-zinc-950 hover:bg-gray-100"
                >
                  {label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
