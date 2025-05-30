"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

const Register: React.FC = () => {
    const router = useRouter();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setError(null);

        try {
            const response = await fetch("http://localhost:8000/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    nickname: name,
                    email,
                    password,
                    test1_percentage: 0,
                    test2_percentage: 0,
                    test3_percentage: 0,
                    test4_percentage: 0,
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.detail || "Ошибка регистрации");
            }

            const data = await response.json();
            console.log("Регистрация успешна:", data);
            router.push("/login");
        } catch (err: any) {
            setError(err.message);
            console.error("Ошибка при регистрации:", err.message);
        }
    };

    return (
        <div className="min-h-screen flex">
            <div className="w-1/2 flex">
                <div className="w-[95%] h-[95%] ml-auto my-auto bg-[#1F1F1F] rounded-[24px]"></div>
            </div>
            <div className="w-1/2 bg-white rounded-r-lg p-8 flex items-center justify-center">
                <div className="max-w-md w-full">
                    <h2 className="text-4xl font-bold mb-4 text-black text-center">Создать аккаунт</h2>
                    <p className="text-xl mb-6 text-center">
                        Уже зарегистрированы?{" "}
                        <a href="/login" className="hover:underline">
                            Войти
                        </a>
                    </p>
                    {error && <p className="text-red-500 text-center mb-4">{error}</p>}
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <input
                                type="text"
                                placeholder="фамилия и имя"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full p-3 border border-gray-300 rounded-full"
                                required
                            />
                        </div>
                        <div>
                            <input
                                type="email"
                                placeholder="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full p-3 border border-gray-300 rounded-full"
                                required
                            />
                        </div>
                        <div>
                            <input
                                type="password"
                                placeholder="пароль"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full p-3 border border-gray-300 rounded-full"
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-black text-xl text-white p-3 rounded-full hover:bg-gray-800"
                        >
                            Зарегистрироваться
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;