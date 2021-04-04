import Head from "next/head";
import React, { useState, useEffect } from "react";
import AccountBalanceIcon from "@material-ui/icons/AccountBalance";
import TurnedInIcon from "@material-ui/icons/TurnedIn";
import DateRangeIcon from "@material-ui/icons/DateRange";
import PersonIcon from "@material-ui/icons/Person";
import AssignmentIcon from "@material-ui/icons/Assignment";
import Pagination from "../component/Utility/Pagination";
import HomeModal from "../component/Utility/Modal/HomeModal";
import { requestSummary } from "../lib/http/api";

function Home({ data, context }) {
  const [openModal, setOpenModal] = useState(false);
  const [summaryData, setSummaryData] = useState(data);
  const [dataActive, setDataActive] = useState({});
  const openModalWithData = (data) => (e) => {
    setOpenModal(true);
    setDataActive(data);
  };
  useEffect(() => {
    if (data.length > 0) return;

    (async () => setSummaryData(await requestSummary()))();
  }, []);
  const changeDataActiveIndex = {
    next() {
      setDataActive((current) => {
        let index = summaryData.findIndex((dat) => dat == current);

        if (summaryData[index + 1]) {
          return summaryData[index + 1];
        }
        return current;
      });
    },
    previous() {
      setDataActive((current) => {
        let index = summaryData.findIndex((dat) => dat == current);

        if (index - 1 >= 0 && summaryData[index - 1]) {
          return summaryData[index - 1];
        }
        return current;
      });
    },
  };
  return (
    <>
      <table className="home__table">
        <thead>
          <tr>
            <th>
              <div className="home__table__contentHead">
                <AccountBalanceIcon className="icons" /> Buku
              </div>
            </th>
            <th>
              <div className="home__table__contentHead">
                <AssignmentIcon className="icons" /> Kalimat
              </div>
            </th>
            <th>
              <div className="home__table__contentHead">
                <TurnedInIcon className="icons" /> Halaman
              </div>
            </th>
            <th>
              <div className="home__table__contentHead">
                <DateRangeIcon className="icons" /> Dibuat / update
              </div>
            </th>
            <th>
              <div className="home__table__contentHead">
                <PersonIcon className="icons" /> Oleh
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          {summaryData.map((dataSummary, idxSum) => (
            <tr onClick={openModalWithData(dataSummary)} key={idxSum}>
              <td>{dataSummary.judul}</td>
              <td>
                {dataSummary.kalimat.slice(0, 100) +
                  (dataSummary.kalimat.length > 100 ? "..." : "")}
              </td>
              <td>#{dataSummary.halaman}</td>
              <td>{dataSummary.updatedAt}</td>
              <td>
                <img
                  src={`${process.env.NEXT_PUBLIC_SERVER__NODE_ENDPOINT}/image/${dataSummary.photo}`}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <HomeModal
        changeActive={changeDataActiveIndex}
        dataActive={dataActive}
        openModal={openModal}
        modalHandler={setOpenModal}
        setSummaryData={setSummaryData}
      />
    </>
  );
}
Home.getInitialProps = async (ctx) => {
  if (!ctx.req) return { data: [] };
  return {
    data: await requestSummary(),
  };
};

export default Home;
