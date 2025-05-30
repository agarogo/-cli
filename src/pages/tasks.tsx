"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface User {
  test1_percentage: number | null;
  test2_percentage: number | null;
  test3_percentage: number | null;
  test4_percentage: number | null;
}

const tests = [
  { id: "ancient-yakutia", title: "Древняя Якутия" },
  { id: "yakutia-17th-19th", title: "Якутия в XVII - XIX вв." },
  { id: "soviet-period", title: "Советский период(ЯАССР, репрессии)" },
  { id: "culture-traditions", title: "Культура и традиции Якутии" },
];

export default function TasksPage() {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:8000/users/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setUser(data);
    };
    fetchUser();
  }, []);

  const getPercentage = (index: number) => {
    if (!user) return null;
    return [
      user.test1_percentage,
      user.test2_percentage,
      user.test3_percentage,
      user.test4_percentage,
    ][index];
  };

  return (
    <div className="p-6 w-[60%] mx-auto mt-10">
      <h1 className="text-3xl font-bold mb-4">Недавно пройденные</h1>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        {tests.map((test, index) => {
          const percent = getPercentage(index);
          return (
            <div key={index} className="bg-gray-100 p-4 rounded-xl">
              <p className="text-sm border px-2 py-1 rounded-full w-max border-green-400 text-green-600">
                тест №{index + 1}
              </p>
              <p className="mt-2">пройдено {percent ?? 0}%</p>
            </div>
          );
        })}
      </div>

      <h2 className="text-2xl font-bold mb-4">Все</h2>
      <div className="space-y-4">
        {tests.map((test, index) => (
          <div key={test.id} className="bg-purple-500 text-white p-5 rounded-2xl flex justify-between items-center">
            <div>
              <p className="text-lg font-semibold">{test.title}</p>
              <p className="text-xs mt-1">ОТ НАС</p>
            </div>
            <button
              onClick={() => router.push(`/quiz/${test.id}`)}
              className="bg-black text-white px-4 py-2 rounded-xl"
            >
              пройти
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
