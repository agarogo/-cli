'use client';

import dynamic from "next/dynamic";
import Header from '@/components/Header';

const Quiz = dynamic(() => import("../Quiz"), { ssr: false });

export default function QuizPage() {
    return (
        <>
            <Header />
            <Quiz />
        </>
    );
}