'use client';

import { Ouroboros } from "@/components/ouroboros";
import Link from "next/link";
import { useRouter } from "next/navigation"; 
import { useState } from "react";

// Tempo para animação: alterar para terminar apenas quando for verificado se há arquivo local com os dados
const ANIMATION_DURATION = 10000; 

export default function Home() {
  const router = useRouter(); 
  const [isAnimating, setIsAnimating] = useState(false);

  const handleNavigation = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault(); // 1. Previne a navegação padrão do Link

    // Aciona o estado da animação e rotação do Ouroboros
    setIsAnimating(true); 

    // Aguarda a duração da animação e navega
    setTimeout(() => {
      router.push(href);
    }, ANIMATION_DURATION);
  };

  return (
    <main className={`w-full min-h-[100vh] flex justify-center items-center ${isAnimating ? 'cursor-wait' : ''}`}>
      <div className="w-[320px] h-[360px] flex flex-col justify-around">
        <h1 className="text-[48px] text-center uppercase font-black">Alchemia</h1>

        <Ouroboros 
          size="100"
          className={`w-full flex justify-center ${isAnimating ? 'spin-on-click z-50' : ''}`}
        />
        
        <Link 
          href="./game"
          onClick={(e) => handleNavigation(e, './game')}
          className={`
            w-full text-center caret-transparent font-bold uppercase py-2 
            outline-offset-2 rounded-md transition-all duration-500
            ${isAnimating 
                ? 'bg-transarent pointer-events-none z-50 '
                : 'bg-violet-600 hover:bg-violet-700 outline-violet-600 focus:outline-1 hover:outline-1'}
          `}
        >
          {isAnimating ? 'Aguarde...' : 'Play'}
        </Link>
      </div>
    </main>
  );
}