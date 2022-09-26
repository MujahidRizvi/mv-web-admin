import styled from "styled-components";

type SidebarContainerProps = {
  isOpened: boolean;
};

export const SidebarContainer = styled.aside<SidebarContainerProps>`
  min-height: 100vh;
  width: 20%;
  margin-right:20px;
  background-color: ${(props) => props.theme.colors.main};
  color: ${(props) => props.theme.colors.textLight};
  box-shadow: 2px -4px 7px -1px rgba(27,49,69,0.45);
  -webkit-box-shadow: 2px -4px 7px -1px rgba(27,49,69,0.45);
  -moz-box-shadow: 2px -4px 7px -1px rgba(27,49,69,0.45);
  border-top-right-radius: 40px;
  border-bottom-right-radius: 40px;
`;

export const sidebar__item = styled.div`
  padding: 0 20px;
`;

export const sidebar__item_inner = styled.div`
  padding: 15px 25px;
  display: flex;
  align-items: center;
  font-weight: 600;
  transition: color 0.3s ease 0s;
`;
