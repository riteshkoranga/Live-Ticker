import { useState } from "react";

const CustomDropdown = ({ options, selected, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (option) => {
    onSelect(option);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block w-full">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center bg-gray-700 text-white p-2 text-center rounded-2xl text-xl mb-1 outline-none font-sans hover:bg-gray-800 w-full"
      >
        <span className="flex-grow text-center">{selected}</span>
        {/* Dropdown icon */}
        <svg
          className="w-4 h-4 ml-2"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M6 9l6 6 6-6"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute mt-2 w-full text-center rounded-2xl shadow-lg bg-gray-700 ring-1 ring-black ring-opacity-5 z-10">
          {options.map((option) => (
            <a
              key={option}
              href="#"
              onClick={() => handleSelect(option)}
              className="block px-4 py-2 text-xl text-white hover:bg-gray-700 rounded-2xl"
            >
              {option}
            </a>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomDropdown;
