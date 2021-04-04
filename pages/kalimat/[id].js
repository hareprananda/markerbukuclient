import React, { useEffect, useState } from "react";
import Kalimat from "../../component/pages/Kalimat";
import { requestBuku, requestSingleMarker } from "../../lib/http/api";
import { useRouter } from "next/router";

const singleKalimat = ({ editInitialData, booksAvailable }) => (
  <Kalimat
    editInitialData={editInitialData}
    booksAvailable={booksAvailable}
    type="edit"
  />
);

singleKalimat.getInitialProps = async (ctx) => {
  if (process.browser)
    return { ...__NEXT_DATA__.props.pageProps, editInitialData: false };

  const { id } = ctx.query;
  return {
    booksAvailable: await requestBuku(),
    editInitialData: await requestSingleMarker(id),
  };
};

export default singleKalimat;
