import "../styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "../components/layout/Layout";
import { CtxProvider } from "../store/ctxProvider";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <CtxProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </CtxProvider>
  );
}

export default MyApp;
