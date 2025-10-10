import { Ouroboros } from "@/components/ouroboros";
import Link from "next/link";

export default function Home() {

  return (
    <main className="w-full min-h-[100vh] flex justify-center items-center">
      <div className="w-[320px] h-[360px] flex flex-col justify-around">
        <h1 className="text-[48px] text-center uppercase font-black">Alchemia</h1>
        <Ouroboros size="100" className="w-full flex justify-center"/>
        <Link href="./game"  className="w-full text-center caret-transparent font-bold uppercase py-2 hover:cursor-pointer hover:bg-violet-700 outline-violet-600 focus:outline-1 hover:outline-1 outline-offset-2 bg-violet-600 rounded-md transition-all duration-500">Play </Link>
      </div>
    </main>
  );
}
