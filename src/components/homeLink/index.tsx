import { IconLink } from "../iconLink";
import { HomeIcon } from "./homeicon";

export const HomeLink = () => {
  return (
    <div className="w-fit h-fit absolute top-4 right-4">
      <IconLink icon={HomeIcon} href="/" className="block p-2 rounded-3xl bg-violet-600 hover:bg-violet-600 outline-violet-700 focus:outline-1 hover:outline-1 outline-offset-2"></IconLink>
    </div>
  )
}