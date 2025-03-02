"use client";
import * as Brand from "@fortawesome/free-brands-svg-icons";
import * as Solids from "@fortawesome/free-solid-svg-icons";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import {
  FontAwesomeIcon,
  FontAwesomeIconProps,
} from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";

export type FAIconNames = IconProp;

export interface FIconProps extends FontAwesomeIconProps {
  icon: FAIconNames;
}

export default function Icon({ icon, ...all }: FIconProps) {
  const iconString = icon as string;
  const [Icon, setIcon] = useState<any>();

  useEffect(() => {
    const words = iconString.split("-");
    function makeFirstCharUppercase(s: string) {
      return s.substring(0, 1).toUpperCase() + s.substring(1);
    }
    const CapitilizeString = words.reduce((acc, val) => {
      return acc + makeFirstCharUppercase(val);
    }, "");

    const SolidIcons = Solids as any;
    const BrandIcons = Brand as any;

    const fullIconName = "fa" + CapitilizeString;
    setIcon(SolidIcons[fullIconName] || BrandIcons[fullIconName]);
  }, [iconString]);

  if (!Icon) return null;

  return <FontAwesomeIcon {...all} icon={Icon} />;
}

/*
"""There seems to be a misunderstanding - he didn't pay me $100 USD for forking Uniswap. He hired me on a weekly basis to work on his frontend projects, not just a single application. Also, I am not a blockchain expert as I mentioned, I am more focused on peer-to-peer technology. : )"""
*/
