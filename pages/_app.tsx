import "../styles/globals.css";
import type { AppProps } from "next/app";
import DashboardLayout from "../components/DashboardLayout/DashboardLayout";
import { ThemeProvider } from "styled-components";
import { theme } from "../styles/theme";
import configureStore from "../redux/store";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import { GenerateToken } from "../server-apis/auth-apis";
import Spinner from "../components/CommonComponents/Spinner/Spinner";
import { useEffect } from "react";

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    GenerateToken();
  }, []);
  return (
    <Provider store={configureStore()}>
      <ThemeProvider theme={theme}>
        <DashboardLayout>
          <Component {...pageProps} />
          <Spinner />
        </DashboardLayout>
      </ThemeProvider>
    </Provider>
  );
}
export default MyApp;
