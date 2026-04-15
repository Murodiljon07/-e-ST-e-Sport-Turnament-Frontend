import React from "react";

const btnStils = {
  main: "flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl text-sm font-semibold hover:shadow-lg hover:shadow-purple-500/30 transition-all",
  second:
    "flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-gray-300 hover:text-white hover:bg-white/5 transition-all border border-gray-700 hover:border-gray-600",
};

type BtnProps = {
  className: string;
  onClick: () => void;
  btnType: "main" | "second";
  children: ReactNode;
};

function Btn({ children, className, onClick, btnType }: BtnProps) {
  return (
    <button onClick={onClick} className={`${btnStils[btnType]} ${className}`}>
      {children}
    </button>
  );
}

export default Btn;
