import "../styles/globals.css";
import Head from "next/head";
import MainLayout from "../component/Layout/MainLayout";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <MainLayout>
        <Component {...pageProps} />
      </MainLayout>
    </>
  );
}

export default MyApp;
