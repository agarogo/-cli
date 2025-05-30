"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

const Login: React.FC = () => {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setError(null);

        try {
            const response = await fetch("http://localhost:8000/token", {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                body: new URLSearchParams({
                    username: email,
                    password: password,
                }).toString(),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.detail || "Ошибка входа");
            }

            const data = await response.json();
            localStorage.setItem("token", data.access_token);
            console.log("Вход успешен:", data);
            router.push("/");
        } catch (err: any) {
            setError(err.message);
            console.error("Ошибка при входе:", err.message);
        }
    };

    return (
        <div className="min-h-screen flex">
            <div className="w-1/2 flex">
                <div className="w-[95%] h-[95%] ml-auto my-auto bg-[#1F1F1F] rounded-[24px]"></div>
            </div>
            <div className="w-1/2 bg-white rounded-r-lg p-8 flex items-center justify-center">
                <div className="max-w-md w-full">
                    <h2 className="text-4xl font-bold mb-4 text-black text-center">Войти в аккаунт</h2>
                    <p className="text-xl mb-6 text-center">
                        Еще не зарегистрированы?{" "}
                        <a href="/register" className="hover:underline">
                            Создать аккаунт
                        </a>
                    </p>
                    {error && <p className="text-red-500 text-center mb-4">{error}</p>}
                    <form onSubmit={handleSubmit} className="space-y-6">
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
                            className="w-full bg-black text-white p-3 text-xl rounded-full hover:bg-gray-800"
                        >
                            Войти
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;