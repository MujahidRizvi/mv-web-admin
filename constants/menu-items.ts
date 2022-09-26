import React from "react";
import {
  Dashboard,
  ShoppingCart,
  AttachMoney,
  AddShoppingCart,
  Done,
  Business,
  HomeWork,
  Person,
  Category,
  Archive,
  Inventory,
  TakeoutDining,
  Surfing,
  People,
  
} from "@styled-icons/material";

import {Chain} from "@styled-icons/crypto"

const MENU_OPTIONS: MenuOption[] = [
  {
    name: "Dashboard",
    icon: Dashboard,
    url: "/",
  },
  {
    name: "NFT Configurations",
    icon: Chain ,
    url: "",
    subItems: [
      {
        name: "Categories",
        icon: Category,
        url: "/nft-config/categories",
      },
      {
        name: "Collection",
        icon: TakeoutDining,
        url: "/nft-config/collections",
      },
      {
        name: "Assets",
        icon: Inventory,
        url: "/nft-config/assets",
      },
    ],
  },
  {
    name: "Players Management",
    icon: Surfing,
    url: "/players",
    subItems: []
  },
  {
    name: "User Management",
    icon: People,
    url: "/user-management",
    subItems: []
  },
];

export type MenuItem = {
  name: string;
  icon: React.ComponentType;
  url: string;
  id: string;
  depth: number;
  subItems?: MenuItem[];
};

type MenuOption = {
  name: string;
  icon: React.ComponentType;
  url: string;
  subItems?: MenuOption[];
};

function makeMenuLevel(options: MenuOption[], depth = 0): MenuItem[] {
  return options.map((option, idx) => ({
    ...option,
    id: depth === 0 ? idx.toString() : `${depth}.${idx}`,
    depth,
    subItems:
      option.subItems && option.subItems.length > 0
        ? makeMenuLevel(option.subItems, depth + 1)
        : undefined,
  }));
}

export const MENU_ITEMS: MenuItem[] = makeMenuLevel(MENU_OPTIONS);
