import React from "react";
import Image from "next/image";

type Props = {
  elem: string;
};

export const ElementCard = ({ elem }: Props) => {
  return (
    <div>
      <Image width={60} height={60} src={`/elements/${elem}.svg`} alt={`${elem} image`} />
    </div>
  );
};