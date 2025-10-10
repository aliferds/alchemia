import { Ouroboros } from "@/components/ouroboros";

export default function Home() {
  return (
    <main className="w-full min-h-[100vh] flex justify-center items-center">
      <div className="w-[320px] h-[360px] flex flex-col justify-around">
        <h1 className="text-2xl text-center uppercase font-black">Alchemia</h1>
        <Ouroboros size="125" className="w-full flex justify-center"/>
        <button className="w-full caret-transparent font-bold uppercase py-2 hover:cursor-pointer hover:bg-blue-300 bg-blue-400 transition-all duration-500">Play</button>
      </div>
    </main>
  );
}
