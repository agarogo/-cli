"use client";

import { useRouter } from "next/navigation";

const Page: React.FC = () => {
  const router = useRouter();

  const handleLinkClick = (path: string) => {
    router.push(path);
  };

  return (
    <div className="min-h-screen flex flex-col w-[60%] mx-auto">
      <header className="bg-white py-24">
        <p className="text-6xl font-semibold text-black">Саха тыына</p>
        <p className="mt-2 text-xl text-gray-600">
          <br />
          Платформа для развития интереса
          <br />
          к якутской истории и культуры
        </p>
      </header>
      <section className="py-12">
        <h2 className="text-3xl font-semibold mb-4">
          Мы создали квиз-игру, которая в увлекательной форме поможет вам узнать больше о прошлом региона, его выдающихся личностях и богатом наследии.
        </h2>
        <div className="flex justify-center space-x-4">
          <div className="w-[49%] h-[30vh] mr-auto bg-yellow-300 rounded-lg"></div>
          <div className="w-[49%] h-[30vh] ml-auto bg-purple-600 rounded-lg"></div>
        </div>
      </section>
      <section className="py-12">
        <h2 className="text-3xl font-semibold mb-4">
          Наша цель — пробудить интерес к якутской истории среди молодежи и широкой аудитории через игру, визуальные материалы и доступный формат.
        </h2>
        <div className="flex justify-center space-x-4">
          <div className="w-[49%] h-[30vh] bg-pink-400 rounded-lg"></div>
          <div className="w-[49%] h-[30vh] bg-green-400 rounded-lg"></div>
        </div>
        <p className="mt-4 text-xl text-gray-600">
          Вас ждут вопросы по четырем темам: от древних традиций и оленеводства до советского периода и национальной кухни.
          <br />
          Проверьте свои знания и узнайте новое о Якутии — весело, познавательно и адаптировано для любого устройства!
        </p>
      </section>
      <footer className="bg-white py-6 text-center mt-auto">
        <p className="text-lg font-semibold">
          Открой Якутии заново — играй, учись, вдохновляйся!
        </p>
        <div className="mt-4 space-x-4">
        </div>
      </footer>
    </div>
  );
};

export default Page;