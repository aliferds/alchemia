import { HomeLink } from "@/components/homeLink"
import { Ouroboros } from "@/components/ouroboros"

const GamePage = () => {
  return (
    <main className="w-full h-full min-h-[100vh] relative">
      <div className="relative">

        <h1 className="uppercase font-black text-center text-[32px] py-3">alchemia</h1>
        <HomeLink />
      </div>
      <div className="fixed flex items-center justify-evenly bottom-4 left-1/2 translate-x-[-50%] w-full max-w-[320px] h-[56px] rounded-xl border-2 border-foreground">
        <div className="w-[48px] h-[48px] border-white border-2 rounded-full cursor-pointer"></div>
        <div className="w-[48px] h-[48px] border-white border-2 rounded-full cursor-pointer"></div>
        <div className="w-[48px] h-[48px] border-white border-2 rounded-full cursor-pointer"></div>
        <button className="flex justify-center items-center w-[48px] h-[48px] border-white border-2 bg-violet-600 cursor-pointer rounded-full">
          <Ouroboros size="32px"/>
        </button>
      </div>
    </main>
  )
}

export default GamePage