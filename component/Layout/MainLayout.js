import Head from "next/head";
import React from "react";
import Header from "../pages/Header/Header";

const MainLayout = ({ children }) => {
  return (
    <>
      <Head>
        <link
          rel="preload"
          href="/fonts/FugazOne/FugazOne-Regular.ttf"
          as="font"
          crossOrigin=""
        />
      </Head>
      <Header />
      <div className="container">{children}</div>
    </>
  );
};

export default MainLayout;
