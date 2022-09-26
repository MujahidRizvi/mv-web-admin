import { useState } from "react";
import { ToastContainer } from "react-toastify";
import Footer from "../Footer";
import Header from "../Header";
import Sidebar from "../CommonComponents/SideBar/SideBar"
import TopNav from "../TopNav";
import { Container, Content, PageContainer } from "./DashboardLayout.styles";
import 'react-toastify/dist/ReactToastify.css';

type DashboardLayoutProps = {
  children: React.ReactNode;
};

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [isOpened, setOpened] = useState(false);
  const toggleDrawer = () => {
    setOpened((prev) => !prev);
  };

  return (
    <Container>
      <Sidebar isOpened={isOpened} />
      <PageContainer>
        <TopNav />
        {children}
        <ToastContainer />
      </PageContainer>
     
    </Container>
  );
}
