import styled from "styled-components";

export const MenuItemContainer = styled.a<{ depth: number }>`
  display: flex;
  flex-direction: row;
  font-size: 15px;
  padding: 10px 0px 10px 10px;
  align-items: center;
  justify-content: space-between;
  margin-top:15px;
  & svg {
    height: 30px;
    margin-right: 10px;
  }

  &:hover {
    border-radius: 15px;
    background-image: linear-gradient(
        to right,
        ${(props) => props.theme.colors.customColor},
        ${(props) => props.theme.colors.customColor}
    );
    color: ${(props) => props.theme.colors.textLight};
    background-color: ${(props) => props.theme.colors.main}; 
  }

  .menu-item {
    padding: 5px 20px;
    display: flex;
    align-items: center;
    font-weight: 600;
    transition: color 0.3s ease 0s;
    
   
  }

  &.selected {
    border-radius: 15px;
    background-image: linear-gradient(
        to right,
        ${(props) => props.theme.colors.customColor},
        ${(props) => props.theme.colors.customColor}
    );
    color: ${(props) => props.theme.colors.textLight};
    background-color: ${(props) => props.theme.colors.customColor}; 
  }
`;
