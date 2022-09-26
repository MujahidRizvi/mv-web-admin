import styled from "styled-components";

export const Container = styled.div`
  text-align: center;
  display: flex;

  min-height: 100vh;
  width:100%;
  background-color:${(props) => props.theme.colors.secondary};

`;

export const Content = styled.div`
  display: flex;
  flex: 1;
`;

export const PageContainer = styled.div`
  padding-top: 30px;
  padding-left:70px;
  padding-right:70px;
  width: 80vw;
  background-color: ${(props) => props.theme.colors.secondary};
  width: 80%;
  color:${(props) => props.theme.colors.textLight}
`;
