import { SidebarContainer } from "./Sidebar.styles";
import { MENU_ITEMS } from "../../constants/menu-items";
import MenuItemsList from "../MenuItemsList";
import logo from '../../assets/images/logo.png'
import Image from 'next/image'

type SidebarProps = {
  isOpened: boolean;
};
export default function Sidebar({ isOpened }: SidebarProps) {
  return (
    <SidebarContainer isOpened={isOpened}>
      <div style={{ width: "100%" }}>
        <Image src={logo} />
      </div>
      <MenuItemsList options={MENU_ITEMS} />
    </SidebarContainer>
  );
}
