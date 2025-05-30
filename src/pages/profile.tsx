"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Profile: React.FC = () => {
    const router = useRouter();
    const [user, setUser] = useState({ nickname: "", email: "", test1: 0, test2: 0, test3: 0, test4: 0 });

    useEffect(() => {
        const token = localStorage.getItem("token");
        console.log("TOKEN:", token); // 👈 посмотри, что выводится

        fetch("http://localhost:8000/users/me", {
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        })
            .then(res => {
                if (!res.ok) throw new Error("Ошибка загрузки профиля");
                return res.json();
            })
            .then(data => {
                setUser({
                    nickname: data.nickname,
                    email: data.email,
                    test1: data.test1_percentage,
                    test2: data.test2_percentage,
                    test3: data.test3_percentage,
                    test4: data.test4_percentage,
                });
            })
            .catch(err => {
                console.error("Ошибка:", err);
            });
    }, []);


    const handleLogout = () => {
        localStorage.removeItem("token");
        router.push("/login");
    };

    return (
        <div className=" flex p-4 w-[80%] mx-auto">
            <div className="w-1/4 h-[80vh] bg-black rounded-[24px] p-6 text-white flex flex-col items-center">
                <div className="w-24 h-24 bg-purple-600 rounded-full mb-4"></div>
                <h2 className="text-xl font-bold">{user.nickname}</h2>
                <p className="text-sm text-gray-300">{user.email}</p>
                <button
                    onClick={handleLogout}
                    className="mt-6 bg-white text-black px-4 py-2 rounded-full hover:bg-gray-200"
                >
                    Выйти
                </button>
            </div>
            <div className="w-3/4 ml-6 flex flex-col">
                <div className="space-y-4">
                    <div className="bg-green-300 h-32 rounded-[20px]"></div>
                    <div className="bg-yellow-300 h-32 rounded-[20px]"></div>
                    <div className="bg-purple-600 p-4 rounded-[20px]">
                        <h3 className="text-white text-lg mb-2">Задания</h3>
                        <div className="space-y-2">
                            <div className="flex justify-between items-center bg-purple-400 p-2 rounded-[12px]">
                                <span className="text-white">Тест по основам Figma</span>
                                <div className="flex space-x-2">
                                    <span className="text-white">{user.test1}/100</span>
                                    <span className="text-white bg-purple-300 px-2 py-1 rounded-full">{Math.round((user.test1 / 100) * 100)}%</span>
                                </div>
                            </div>
                            <div className="flex justify-between items-center bg-purple-400 p-2 rounded-[12px]">
                                <span className="text-white">Задание по модулю дизайна</span>
                                <div className="flex space-x-2">
                                    <span className="text-white">{user.test2}/100</span>
                                    <span className="text-white bg-purple-300 px-2 py-1 rounded-full">{Math.round((user.test2 / 100) * 100)}%</span>
                                </div>
                            </div>
                            <div className="flex justify-between items-center bg-purple-400 p-2 rounded-[12px]">
                                <span className="text-white">Тест по основам Figma</span>
                                <div className="flex space-x-2">
                                    <span className="text-white">{user.test3}/100</span>
                                    <span className="text-white bg-purple-300 px-2 py-1 rounded-full">{Math.round((user.test3 / 100) * 100)}%</span>
                                </div>
                            </div>
                            <div className="flex justify-between items-center bg-purple-400 p-2 rounded-[12px]">
                                <span className="text-white">Задание по модулю дизайна</span>
                                <div className="flex space-x-2">
                                    <span className="text-white">{user.test4}/100</span>
                                    <span className="text-white bg-purple-300 px-2 py-1 rounded-full">{Math.round((user.test4 / 100) * 100)}%</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;