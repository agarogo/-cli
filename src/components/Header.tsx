"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, []);
  return { isAuthenticated };
};

const Header: React.FC = () => {
  const router = useRouter();
  const { isAuthenticated } = useAuth();

  const handleLinkClick = (path: string) => {
    if (!isAuthenticated && (path === "/tasks" || path === "/Learn")) {
      router.push("/login");
    } else {
      router.push(path);
    }
  };

  const links = [
    { name: "Задания", path: "/tasks" },
    { name: "Рейтинг", path: "/rating" },
  ];

  return (
    <header className="bg-[#F5F5F5] w-[90%] rounded-full mx-auto py-3 px-24 flex justify-between items-center mt-[20px]">
      <div
        onClick={() => handleLinkClick("/")}
        className="text-xl mon font-bold text-[#0A1044] cursor-pointer"
      >
        Саха тыына
      </div>
      <div className="flex justify-center flex-1">
        <div className="flex space-x-6">
          {links.map((link) => (
            <button
              key={link.name}
              onClick={() => handleLinkClick(link.path)}
              className="text-[#0A1044] hover:text-blue-800 text-base font-medium"
            >
              {link.name}
            </button>
          ))}
        </div>
      </div>
      <div className="flex space-x-4">
        {isAuthenticated ? (
          <button
            onClick={() => handleLinkClick("/profile")}
            className="text-[#000000] font-semibold border border-[#000000] px-4 py-2 rounded-full"
          >
            Профиль
          </button>
        ) : (
          <>
            <button
              onClick={() => handleLinkClick("/register")}
              className="text-[#000000] font-semibold border border-[#000000] px-4 py-2 rounded-full"
            >
              Регистрация
            </button>
            <button
              onClick={() => handleLinkClick("/login")}
              className="text-white font-semibold border bg-black border-[#000000] px-4 py-2 rounded-full"
            >
              Войти
            </button>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;