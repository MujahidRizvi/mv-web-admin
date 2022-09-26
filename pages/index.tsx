import type { NextPage } from "next";
import { Provider } from "react-redux";
import Container from "../components/Container";
import configureStore from "../redux/store";
import { GenerateToken } from "../server-apis/auth-apis";

const Home: NextPage = () => {

  return (
      <Container title="Dashboard">
        <div>Dashboard</div>
      </Container>
  );
};

export default Home;
