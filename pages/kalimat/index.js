import React from "react";
import Kalimat from "../../component/pages/Kalimat";
import { requestBuku } from "../../lib/http/api";

const Index = ({ booksAvailable }) => {
  return <Kalimat booksAvailable={booksAvailable} />;
};

Index.getInitialProps = async (ctx) => {
  if (process.browser) return __NEXT_DATA__.props.pageProps;

  return {
    booksAvailable: await requestBuku(),
  };
};

export default Index;
