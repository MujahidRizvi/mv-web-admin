import Switch from "react-switch";
import { SideBar } from "mv-shared-components/dist";
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
} from "@mui/icons-material";

import { Chain } from "@styled-icons/crypto";

function ChainWrapper(props:any) {
  return (<span><Chain size={"30px"}/></span>)
}
const MENU_OPTIONS = [
  {
    name: "Dashboard",
    icon: Dashboard,
    url: "/",
  },
  {
    name: "NFT Configurations",
    icon: ChainWrapper ,
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
    subItems: [],
  },
  {
    name: "User Management",
    icon: People,
    url: "/user-management",
    subItems: [],
  },
];

export default function SideBarWrapper(props:any) {
  return (
    <SideBar
      backgroundColor={"#001321"}
      options={MENU_OPTIONS}
      highlightColor={"#48ABDF"}
      textColor={"white"}
      highlightTextColor={"white"}
      logoImage={"../images/logo.png"
      }
    />
  );
}
