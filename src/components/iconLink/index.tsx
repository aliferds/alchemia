import Link from "next/link"

export interface IconLinkInterface {
  href: string;
  className?: string
  icon: () => React.ReactNode;
}

export const IconLink = ({href, icon, className} : IconLinkInterface) => {
  return (
    <Link href={href} className={`${className} w-full h-full`}>
      {icon()}
    </Link>
  )
}